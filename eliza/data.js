const LOCALSTORAGENAME = 'elizagamestate';
const ERA = { Canal: 0, Rail: 1 };
const INDUSTRY = { Brewery: 0, Manufacturer: 1, CottonMill: 2, Pottery: 3, CoalMine: 4, IronWorks: 5 };
const LOCATIONTYPE = { Industries: 0, Merchants: 1 };
const BONUSTYPE = { Pounds: 0, VPs: 1, Income: 2, Develop: 3 };

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
            name: "Farm Brewery (Connected to Cannock)",
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
                    toId: 18,
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
                    toId: 18,
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
        }
    ]
};
