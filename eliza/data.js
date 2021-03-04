const LOCALSTORAGENAME = 'elizagamestate';

const PLAYER_TYPE = { Human: 0, AI: 1 };

const ERA = { Canal: 0, Rail: 1 };
const eraStringMap = {
    0: "Canal",
    1: "Rail"
};

const INDUSTRY = { Brewery: 0, Manufacturer: 1, CottonMill: 2, Pottery: 3, CoalMine: 4, IronWorks: 5 };
const industryStringMap = {
    0: "Brewery",
    1: "Manufacturer",
    2: "Cotton Mill",
    3: "Pottery",
    4: "Coal Mine",
    5: "Iron Works"
 };

const LOCATIONTYPE = { Industries: 0, Merchants: 1 };
const locationTypeMap = {
    0: "Industries",
    1: "Merchants"
};

const BONUSTYPE = { Pounds: 0, VPs: 1, Income: 2, Develop: 3 };
const bonusTypeMap = {
    0: "Pounds",
    1: "VPs",
    2: "Income Levels",
    3: "Develop"
};

const DIFFICULTY_LEVEL = { Apprentice: 0, Professional: 1, Manager: 2, Titan: 3 };

// players (holds color, AI vs human, and player board)
const INITIAL_HUMAN_BOARD = {
};

const INITIAL_AI_BOARD = {
};

// ---- TODO: Move to Vue --- //
const HUMAN_PLAYER = {
    id: 0,
    name: "You",
    color: null,
    board: _.cloneDeep(INITIAL_HUMAN_BOARD)
};

const ELIZA = {
    id: 1,
    name: "Eliza",
    color: null,
    board: _.cloneDeep(INITIAL_AI_BOARD),
    difficulty: DIFFICULTY_LEVEL.Apprentice
}

const ELEANOR = {

}

const players = [

];
// ------------------------ //

// ids on industry spots used for reading order
// adjacency listed in clockface order
const INITIAL_BOARD = {
    market: {
        usedCoal: 1,
        usedIron: 1
    },
    locations: [
        {
            id: 0,
            type: LOCATIONTYPE.Merchants,
            name: "Warrington",
            bonus: 5,
            bonusType: BONUSTYPE.Pounds,
            spaces: [
                {
                    id: 0,
                    totalBeer: 0,
                    tile: null
                },
                {
                    id: 1,
                    totalBeer: 0,
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 1,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 1,
                    tile: null
                }
            ]
        },
        {
            id: 1,
            type: LOCATIONTYPE.Industries,
            name: "Stoke-On-Trent",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.CottonMill,
                        INDUSTRY.Manufacturer
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.Pottery,
                        INDUSTRY.IronWorks
                    ],
                    tile: null
                },
                {
                    id: 2,
                    types: [
                        INDUSTRY.Manufacturer
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 0,
                    tile: null
                },
                {
                    toId: 2,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 0,
                    tile: null
                },
                {
                    toId: 2,
                    tile: null
                }
            ]
        },
        {
            id: 2,
            type: LOCATIONTYPE.Industries,
            name: "Leek",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.CottonMill,
                        INDUSTRY.Manufacturer
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.CottonMill,
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 1,
                    tile: null
                },
                {
                    toId: 3,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 1,
                    tile: null
                },
                {
                    toId: 3,
                    tile: null
                }
            ]
        },
        {
            id: 3,
            type: LOCATIONTYPE.Industries,
            name: "Belper",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.CottonMill,
                        INDUSTRY.Manufacturer
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                },
                {
                    id: 2,
                    types: [
                        INDUSTRY.Pottery
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 2,
                    tile: null
                },
                {
                    toId: 7,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 2,
                    tile: null
                },
                {
                    toId: 7,
                    tile: null
                }
            ]
        },
        {
            id: 4,
            type: LOCATIONTYPE.Industries,
            name: "Stone",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.CottonMill,
                        INDUSTRY.Brewery
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.Manufacturer,
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 1,
                    tile: null
                },
                {
                    toId: 9,
                    tile: null
                },
                {
                    toId: 8,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 1,
                    tile: null
                },
                {
                    toId: 5,
                    tile: null
                },
                {
                    toId: 9,
                    tile: null
                },
                {
                    toId: 8,
                    tile: null
                }
            ]
        },
        {
            id: 5,
            type: LOCATIONTYPE.Industries,
            name: "Uttoxeter",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.Manufacturer,
                        INDUSTRY.Brewery
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.CottonMill,
                        INDUSTRY.Brewery
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
            ],
            edgesRail: [
                {
                    toId: 6,
                    tile: null
                },
                {
                    toId: 4,
                    tile: null
                }
            ]
        },
        {
            id: 6,
            type: LOCATIONTYPE.Industries,
            name: "Derby",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.CottonMill,
                        INDUSTRY.Brewery
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.CottonMill,
                        INDUSTRY.Manufacturer
                    ],
                    tile: null
                },
                {
                    id: 2,
                    types: [
                        INDUSTRY.IronWorks
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 3,
                    tile: null
                },
                {
                    toId: 7,
                    tile: null
                },
                {
                    toId: 9,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 3,
                    tile: null
                },
                {
                    toId: 5,
                    tile: null
                },
                {
                    toId: 7,
                    tile: null
                },
                {
                    toId: 9,
                    tile: null
                }
            ]
        },
        {
            id: 7,
            type: LOCATIONTYPE.Merchants,
            name: "Nottingham",
            bonus: 3,
            bonusType: BONUSTYPE.VPs,
            spaces: [
                {
                    id: 0,
                    totalBeer: 0,
                    tile: null
                },
                {
                    id: 1,
                    totalBeer: 0,
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 6,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 6,
                    tile: null
                }
            ]
        },
        {
            id: 8,
            type: LOCATIONTYPE.Industries,
            name: "Stafford",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.Manufacturer,
                        INDUSTRY.Brewery
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.Pottery
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 4,
                    tile: null
                },
                {
                    toId: 11,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 4,
                    tile: null
                },
                {
                    toId: 11,
                    tile: null
                }
            ]
        },
        {
            id: 9,
            type: LOCATIONTYPE.Industries,
            name: "Burton-Upon-Trent",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.Manufacturer,
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.Brewery
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 6,
                    tile: null
                },
                {
                    toId: 12,
                    tile: null
                },
                {
                    toId: 16,
                    tile: null
                },
                {
                    toId: 4,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 6,
                    tile: null
                },
                {
                    toId: 12,
                    tile: null
                },
                {
                    toId: 11,
                    tile: null
                },
                {
                    toId: 4,
                    tile: null
                }
            ]
        },
        {
            id: 10,
            type: LOCATIONTYPE.Industries,
            name: "Northern Farm Brewery (near Cannock)",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.Brewery
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 11,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 11,
                    tile: null
                }
            ]
        },
        {
            id: 11,
            type: LOCATIONTYPE.Industries,
            name: "Cannock",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.Manufacturer,
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 8,
                    tile: null
                },
                {
                    toId: 16,
                    tile: null
                },
                {
                    toId: 15,
                    tile: null
                },
                {
                    toId: 10,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 8,
                    tile: null
                },
                {
                    toId: 9,
                    tile: null
                },
                {
                    toId: 16,
                    tile: null
                },
                {
                    toId: 15,
                    tile: null
                },
                {
                    toId: 10,
                    tile: null
                }
            ]
        },
        {
            id: 11,
            type: LOCATIONTYPE.Industries,
            name: "Tamworth",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.CottonMill,
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.CottonMill,
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 9,
                    tile: null
                },
                {
                    toId: 17,
                    tile: null
                },
                {
                    toId: 19,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 9,
                    tile: null
                },
                {
                    toId: 17,
                    tile: null
                },
                {
                    toId: 19,
                    tile: null
                },
                {
                    toId: 16,
                    tile: null
                }
            ]
        },
        {
            id: 13,
            type: LOCATIONTYPE.Merchants,
            name: "Shrewsbury",
            bonus: 4,
            bonusType: BONUSTYPE.VPs,
            spaces: [
                {
                    id: 0,
                    totalBeer: 0,
                    tile: null
                },
                {
                    id: 1,
                    totalBeer: 0,
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 14,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 14,
                    tile: null
                }
            ]
        },
        {
            id: 14,
            type: LOCATIONTYPE.Industries,
            name: "Coalbrookdale",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.IronWorks,
                        INDUSTRY.Brewery
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.IronWorks
                    ],
                    tile: null
                },
                {
                    id: 2,
                    types: [
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 15,
                    tile: null
                },
                {
                    toId: 21,
                    tile: null
                },
                {
                    toId: 13,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 15,
                    tile: null
                },
                {
                    toId: 21,
                    tile: null
                },
                {
                    toId: 13,
                    tile: null
                }
            ]
        },
        {
            id: 15,
            type: LOCATIONTYPE.Industries,
            name: "Wolverhampton",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.Manufacturer
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.Manufacturer,
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 11,
                    tile: null
                },
                {
                    toId: 16,
                    tile: null
                },
                {
                    toId: 18,
                    tile: null
                },
                {
                    toId: 14,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 11,
                    tile: null
                },
                {
                    toId: 16,
                    tile: null
                },
                {
                    toId: 18,
                    tile: null
                },
                {
                    toId: 14,
                    tile: null
                }
            ]
        },
        {
            id: 16,
            type: LOCATIONTYPE.Industries,
            name: "Walsall",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.IronWorks,
                        INDUSTRY.Manufacturer
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.Manufacturer,
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 11,
                    tile: null
                },
                {
                    toId: 16,
                    tile: null
                },
                {
                    toId: 18,
                    tile: null
                },
                {
                    toId: 14,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 11,
                    tile: null
                },
                {
                    toId: 16,
                    tile: null
                },
                {
                    toId: 18,
                    tile: null
                },
                {
                    toId: 14,
                    tile: null
                }
            ]
        },
        {
            id: 17,
            type: LOCATIONTYPE.Industries,
            name: "Nuneaton",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.Manufacturer,
                        INDUSTRY.Brewery
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.CottonMill,
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 12,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 12,
                    tile: null
                },
                {
                    toId: 20,
                    tile: null
                },
                {
                    toId: 19,
                    tile: null
                }
            ]
        },
        {
            id: 18,
            type: LOCATIONTYPE.Industries,
            name: "Dudley",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.IronWorks
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 15,
                    tile: null
                },
                {
                    toId: 19,
                    tile: null
                },
                {
                    toId: 18,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 15,
                    tile: null
                },
                {
                    toId: 19,
                    tile: null
                },
                {
                    toId: 18,
                    tile: null
                }
            ]
        },
        {
            id: 19,
            type: LOCATIONTYPE.Industries,
            name: "Birmingham",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.CottonMill,
                        INDUSTRY.Manufacturer
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.Manufacturer
                    ],
                    tile: null
                },
                {
                    id: 2,
                    types: [
                        INDUSTRY.IronWorks
                    ],
                    tile: null
                },
                {
                    id: 3,
                    types: [
                        INDUSTRY.Manufacturer
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 16,
                    tile: null
                },
                {
                    toId: 12,
                    tile: null
                },
                {
                    toId: 20,
                    tile: null
                },
                {
                    toId: 26,
                    tile: null
                },
                {
                    toId: 25,
                    tile: null
                },
                {
                    toId: 18,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 16,
                    tile: null
                },
                {
                    toId: 12,
                    tile: null
                },
                {
                    toId: 17,
                    tile: null
                },
                {
                    toId: 20,
                    tile: null
                },
                {
                    toId: 24,
                    tile: null
                },
                {
                    toId: 23,
                    tile: null
                },
                {
                    toId: 25,
                    tile: null
                },
                {
                    toId: 18,
                    tile: null
                }
            ]
        },
        {
            id: 20,
            type: LOCATIONTYPE.Industries,
            name: "Coventry",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.Pottery
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.Manufacturer,
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                },
                {
                    id: 2,
                    types: [
                        INDUSTRY.IronWorks,
                        INDUSTRY.Manufacturer
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 19,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 17,
                    tile: null
                },
                {
                    toId: 19,
                    tile: null
                }
            ]
        },
        {
            id: 21,
            type: LOCATIONTYPE.Industries,
            name: "Kidderminster",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.CottonMill,
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.CottonMill
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 14,
                    tile: null
                },
                {
                    toId: 18,
                    tile: null
                },
                {
                    toId: 25,
                    tile: null
                },
                {
                    toId: 22,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 14,
                    tile: null
                },
                {
                    toId: 18,
                    tile: null
                },
                {
                    toId: 25,
                    tile: null
                },
                {
                    toId: 22,
                    tile: null
                }
            ]
        },
        {
            id: 21,
            type: LOCATIONTYPE.Industries,
            name: "Kidderminster",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.CottonMill,
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.CottonMill
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 14,
                    tile: null
                },
                {
                    toId: 18,
                    tile: null
                },
                {
                    toId: 25,
                    tile: null
                },
                {
                    toId: 22,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 14,
                    tile: null
                },
                {
                    toId: 18,
                    tile: null
                },
                {
                    toId: 25,
                    tile: null
                },
                {
                    toId: 22,
                    tile: null
                }
            ]
        },
        {
            id: 21,
            type: LOCATIONTYPE.Industries,
            name: "Southern Farm Brewery (near Kidderminster)",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.Brewery
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 22,
                    tile: null
                },
                {
                    toId: 25,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 22,
                    tile: null
                },
                {
                    toId: 25,
                    tile: null
                }
            ]
        },
        {
            id: 23,
            type: LOCATIONTYPE.Industries,
            name: "Redditch",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.Manufacturer,
                        INDUSTRY.CoalMine
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.IronWorks
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 24,
                    tile: null
                },
                {
                    toId: 26,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 19,
                    tile: null
                },
                {
                    toId: 24,
                    tile: null
                },
                {
                    toId: 26,
                    tile: null
                }
            ]
        },
        {
            id: 24,
            type: LOCATIONTYPE.Merchants,
            name: "Oxford",
            bonus: 2,
            bonusType: BONUSTYPE.Income,
            spaces: [
                {
                    id: 0,
                    totalBeer: 0,
                    tile: null
                },
                {
                    id: 1,
                    totalBeer: 0,
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 19,
                    tile: null
                },
                {
                    toId: 23,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 19,
                    tile: null
                },
                {
                    toId: 23,
                    tile: null
                }
            ]
        },
        {
            id: 25,
            type: LOCATIONTYPE.Industries,
            name: "Worcester",
            spaces: [
                {
                    id: 0,
                    types: [
                        INDUSTRY.CottonMill
                    ],
                    tile: null
                },
                {
                    id: 1,
                    types: [
                        INDUSTRY.CottonMill
                    ],
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 22,
                    tile: null
                },
                {
                    toId: 21,
                    tile: null
                },
                {
                    toId: 19,
                    tile: null
                },
                {
                    toId: 26,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 22,
                    tile: null
                },
                {
                    toId: 21,
                    tile: null
                },
                {
                    toId: 19,
                    tile: null
                },
                {
                    toId: 26,
                    tile: null
                }
            ]
        },
        {
            id: 26,
            type: LOCATIONTYPE.Merchants,
            name: "Gloucester",
            bonus: 1,
            bonusType: BONUSTYPE.Develop,
            spaces: [
                {
                    id: 0,
                    totalBeer: 0,
                    tile: null
                },
                {
                    id: 1,
                    totalBeer: 0,
                    tile: null
                }
            ],
            edgesCanal: [
                {
                    toId: 23,
                    tile: null
                },
                {
                    toId: 25,
                    tile: null
                }
            ],
            edgesRail: [
                {
                    toId: 23,
                    tile: null
                },
                {
                    toId: 25,
                    tile: null
                }
            ]
        }
    ]
};
