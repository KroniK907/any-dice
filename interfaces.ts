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

export type {
    DiceFamily,
    DiceSet
}