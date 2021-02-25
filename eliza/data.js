const LOCALSTORAGENAME = 'elizagamestate';
const ERA = { Canal: 0, Rail: 1 };
const INDUSTRY = { Brewery: 0, Manufacturer: 1, CottonMill: 2, Pottery: 3, CoalMine: 4, IronWorks: 5 };
const LOCATIONTYPE = { Industries: 0, Merchants: 1 };
const BONUSTYPE = { Pounds: 0, VPs: 1 };

// ids on industry spots used for reading order
// adjacency listed in clockface order
const INITIAL_BOARD = {
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
        }
    ]
};
