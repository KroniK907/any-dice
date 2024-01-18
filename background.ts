import { Storage } from '@plasmohq/storage';
import type { DiceFamily, DiceSet } from './interfaces';
import { isToday } from 'date-fns';

log.enabled = process.env.PLASMO_PUBLIC_LOG_ENABLED;

const storage = new Storage({area: 'local'});

function log(str, data={}, force=false) {
    if (log.enabled || force) {
        console.log('any-dice: ' + str, data);
    }
}

function isDarkMode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

function getDiceFamilies() {
    let url = 'https://dice-service.dndbeyond.com/dice/v1/getallfamilysets';
    let data = fetch(url)
        .then((response) => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Dice Family Fetch Failed, using provided getallfamilysets.json instead');
        })
        .then((data) => {
            return data.data;
        })
        .catch((error) => {
            log(error, {}, true);
            let data = require("./getallfamilysets.json");
            return data.data;
        });
    return data;
}

async function initializeStorage() {
    let lastUpdate = await storage.get('lastUpdatedDiceFamilies');
    if(!lastUpdate || !isToday(lastUpdate)) {
        let getFamilies = await getDiceFamilies();
        await storage.set('allFamilySets', getFamilies);

        let allFamilySets = await storage.get('allFamilySets');
        storeDiceFamilies(allFamilySets);
    }
}

async function storeDiceFamilies(allFamilySets) {
    let diceFamilies = [];

    for(let familySet of allFamilySets) {
        let diceFamily: DiceFamily = {
            familyId: familySet.familyId,
            name: familySet.name,
            description: familySet.description,
            marketplaceUrl: familySet.marketplaceUrl,
            marketingAvatarUrl: familySet.marketingAvatarUrl,
            productBlurb: familySet.productBlurb,
            sets: []
        };
        diceFamilies.push('diceFamily-' + diceFamily.familyId);
        await storage.set('diceFamily-' + diceFamily.familyId, diceFamily);

        for(let set of familySet.sets.definitionData) {
            let diceSet: DiceSet = {
                setId: set.id,
                name: set.name,
                avatarUrl: set.avatarUrl,
                manifestUrl: set.manifestUrl,
                fullName: set.fullName,
                familyId: familySet.familyId
            };
            diceFamily.sets.push('diceSet-' + diceSet.setId);
            await storage.set('diceSet-' + diceSet.setId, diceSet);
        }
    }

    await storage.set('diceFamilies', diceFamilies);

    let date = new Date();
    await storage.set('lastUpdatedDiceFamilies', date.toISOString());
}

initializeStorage();

chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: [1],
    addRules: [{
        id: 1,
        condition: {
            urlFilter: "https://dice-service.dndbeyond.com/diceuserconfig/v1/get|"
        },
        action: {
            type: "redirect",
            redirect: { url: 'data:application/json,{ "id": 0, "success": true, "message": "", "data": { "id": "", "manifestUrl": "/bundles/battle-for-beyond/leila/manifest.json", "familyId": "023", "setId": "02302", "settings": { "volume": 1, "vibrationEnabled": true, "particlesEnabled": true, "animationQuality": 3, "shadowQuality": 3 } } }' }
        }
    }]
});
