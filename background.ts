import type {
    DiceFamily,
    DiceSet,
    DiceUserSettings,
    DiceUserData,
    DiceUserResponse
} from './interfaces';
import { isToday } from 'date-fns';
import { log, storage } from '$lib/utils';

async function getDiceFamilies() {
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
    let storageInitialized: boolean = await storage.get('storageInitialized');
    if(storageInitialized) {
        let lastUpdate = await storage.get('lastUpdatedDiceFamilies');
        if(!isToday(lastUpdate)) {
            storeDiceFamilies();
        }
    } else {
        storeDiceFamilies();

        await storage.set('selectedSet', 'none');

        await storage.set('settings_volume', 1);
        await storage.set('settings_vibration', true);
        await storage.set('settings_particles', true);
        await storage.set('settings_animationQual', 3);
        await storage.set('settings_shadowQual', 3);

        await storage.set('storageInitialized', true);
    }
}

async function storeDiceFamilies() {
    let getFamilies = await getDiceFamilies();
    await storage.set('allFamilySets', getFamilies)

    let diceFamilies:{[key:string]:DiceFamily} = {}
    let diceSets:{[key:string]:DiceSet} = {}

    for(let familySet of getFamilies) {
        let diceFamily: DiceFamily = {
            familyId: familySet.familyId,
            name: familySet.name,
            description: familySet.description,
            marketplaceUrl: familySet.marketplaceUrl,
            marketingAvatarUrl: familySet.marketingAvatarUrl,
            productBlurb: familySet.productBlurb,
            sets: {}
        };
        for(let set of familySet.sets.definitionData) {
            let diceSet: DiceSet = {
                setId: set.id,
                name: set.name,
                avatarUrl: set.avatarUrl,
                manifestUrl: set.manifestUrl,
                fullName: set.fullName,
                familyId: familySet.familyId
            };
            diceFamily.sets[set.id] = diceSet
            diceSets[set.id] = diceSet
        }
        diceFamilies[familySet.familyId] = diceFamily
    }

    await storage.set('diceFamilies', diceFamilies);
    await storage.set('diceSets', diceSets);

    let date = new Date();
    await storage.set('lastUpdatedDiceFamilies', date.toISOString());
}

async function buildDiceUserConfig() {
    let selectedSet:string = await storage.get('selectedSet');
    if(selectedSet !== 'none' && selectedSet) {
        let diceSets:{[key:string]:DiceSet} = await storage.get('diceSets');
        let diceSet:DiceSet = diceSets[selectedSet]
        let settings: DiceUserSettings = {
            volume: await storage.get('settings_volume'),
            vibrationEnabled: await storage.get('settings_vibration'),
            particlesEnabled: await storage.get('settings_particles'),
            animationQuality: await storage.get('settings_animationQual'),
            shadowQuality: await storage.get('settings_shadowQual')
        }
        let data: DiceUserData = {
            id: "",
            manifestUrl: diceSet.manifestUrl,
            familyId: diceSet.familyId,
            setId: diceSet.setId,
            settings: settings
        }
        let response: DiceUserResponse = {
            id: "",
            success: true,
            message: "",
            data: data
        } 

        let mime = 'data:application/json,'
        let url = mime + JSON.stringify(response);

        await storage.set('redirectUrl', url);
        updateRedirect(url);
    } else {
        await storage.set('redirectUrl', null)
        updateRedirect(null);
    }
}

async function updateRedirect(url: string) {
    log('Updating Redirect: ', url)
    if(url) {
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1],
            addRules: [{
                id: 1,
                condition: {
                    urlFilter: "https://dice-service.dndbeyond.com/diceuserconfig/v1/get|"
                },
                action: {
                    //@ts-ignore
                    type: "redirect",
                    redirect: { url: url }
                }
            }]
        });
    } else {
        chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: [1]
        })
    }
}

initializeStorage();
buildDiceUserConfig();

storage.watch({
    selectedSet: (c) => {
        buildDiceUserConfig();
        log('New Set Selected: ', c)
    }
});
