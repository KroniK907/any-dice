interface DiceFamily {
    familyId: string;
    name: string;
    description: string;
    marketplaceUrl: string;
    marketingAvatarUrl: string;
    productBlurb: string;
    sets: Array<string>;
}

interface DiceSet {
    setId: string;
    name: string;
    avatarUrl: string;
    manifestUrl: string;
    fullName: string;
    familyId: string;
}

interface DiceUserSettings {
    volume: number;
    vibrationEnabled: boolean;
    particlesEnabled: boolean;
    animationQuality: number;
    shadowQuality: number;
}

interface DiceUserData {
    id: string;
    manifestUrl: string;
    familyId: string;
    setId: string; 
    settings: DiceUserSettings;
}

interface DiceUserResponse {
    id: string;
    success: boolean;
    message: string;
    data: DiceUserData;
}

export type {
    DiceFamily,
    DiceSet,
    DiceUserSettings,
    DiceUserData,
    DiceUserResponse
}
