let heroes = [
    {
        "name": "Ant-Man",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 12
    },
    {
        "name": "Black Panther",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 11
    },
    {
        "name": "Black Widow",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 9
    },
    {
        "name": "Captain America",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 11
    },
    {
        "name": "Captain Marvel",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 12
    },
    {
        "name": "Doctor Strange",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 10
    },
    {
        "name": "Gamora",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 10
    },
    {
        "name": "Groot",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 10,
        "useCounter": true,
        "counter": 0
    },
    {
        "name": "Hawkeye",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 9
    },
    {
        "name": "Hulk",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 18
    },
    {
        "name": "Iron Man",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 9
    },
    {
        "name": "Ms. Marvel",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 10
    },
    {
        "name": "Quicksilver",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 9
    },
    {
        "name": "Rocket Raccoon",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 9
    },
    {
        "name": "Scarlet Witch",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 10
    },
    {
        "name": "She-Hulk",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 15
    },
    {
        "name": "Spider-Man",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 10
    },
    {
        "name": "Spider-Woman",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 11
    },
    {
        "name": "Star-Lord",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 10
    },
    {
        "name": "Thor",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 14
    },
    {
        "name": "Wasp",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 11
    }
];

let villains = [
    {
        "name": "Absorbing Man",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 14,
        "hitpointsper": true
    },
    {
        "name": "Bulldozer",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 12,
        "hitpointsper": true
    },
    {
        "name": "Collector 1 (Infiltrate)",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 13,
        "hitpointsper": true
    },
    {
        "name": "Collector 2 (Escape)",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 8,
        "hitpointsper": true
    },
    {
        "name": "Crossbones",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 12,
        "hitpointsper": true
    },
    {
        "name": "Drang",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 14,
        "hitpointsper": true
    },
    {
        "name": "Green Goblin",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 14,
        "hitpointsper": true
    },
    {
        "name": "Kang (Immortus)",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 18
    },
    {
        "name": "Kang (Iron Lad)",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 18
    },
    {
        "name": "Kang (Rama-Tut)",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 18
    },
    {
        "name": "Kang (Scarlet Centurion)",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 18
    },
    {
        "name": "Kang (The Conqueror)",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 12,
        "hitpointsper": true
    },
    {
        "name": "Klaw",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 12,
        "hitpointsper": true
    },
    {
        "name": "Nebula",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 14,
        "hitpointsper": true
    },
    {
        "name": "Norman Osborn",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 14,
        "hitpointsper": true
    },
    {
        "name": "Piledriver",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 11,
        "hitpointsper": true
    },
    {
        "name": "Red Skull",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 12,
        "hitpointsper": true
    },
    {
        "name": "Ronan",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 14,
        "hitpointsper": true
    },
    {
        "name": "Rhino",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 14,
        "hitpointsper": true
    },
    {
        "name": "Taskmaster",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 13,
        "hitpointsper": true
    },
    {
        "name": "Thunderball",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 13,
        "hitpointsper": true
    },
    {
        "name": "Ultron",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 17,
        "hitpointsper": true
    },
    {
        "name": "Wrecker",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 14,
        "hitpointsper": true
    },
    {
        "name": "Zola",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 12,
        "hitpointsper": true
    }
];

let main_schemes = [
    {
        "name": "Assault on NORAD",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 10,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Ultron"]
    },
    {
        "name": "Attack on Mount Athena",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 3,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Crossbones"]
    },
    {
        "name": "Breakout",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 6,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Wrecker", "Thunderball", "Piledriver", "Bulldozer"]
    },
    {
        "name": "Corporate Acquisition",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 10,
        "basethreat": 1,
        "belongstotype": "villain",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Countdown to Oblivion",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 5,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Ultron"]
    },
    {
        "name": "Hostile Takeover",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 7,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Hunting Down Heroes",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 12,
        "basethreat": 1,
        "belongstotype": "villain",
        "belongsto": ["Taskmaster"]
    },
    {
        "name": "Inexorable Fate",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 9,
        "basethreat": 1,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Kang (Iron Lad)"]
    },
    {
        "name": "Interception Imminent",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 10,
        "basethreat": 1,
        "belongstotype": "villain",
        "belongsto": ["Ronan"]
    },
    {
        "name": "Kang's Arrival",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 7,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Kang (The Conqueror)", "Kang (Immortus)", "Kang (Iron Lad)", "Kang (Rama-Tut)", "Kang (Scarlet Centurion)"]
    },
    {
        "name": "Kang's Wrath",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 10,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Kang (The Conqueror)", "Kang (Immortus)", "Kang (Iron Lad)", "Kang (Rama-Tut)", "Kang (Scarlet Centurion)"]
    },
    {
        "name": "Lost in the Museum",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 15,
        "basethreat": 11,
        "belongstotype": "villain",
        "belongsto": ["Collector 1 (Infiltrate)", "Collector 2 (Escape)"]
    },
    {
        "name": "Mutagen Cloud",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 11,
        "basethreat": 4,
        "belongstotype": "villain",
        "belongsto": ["Green Goblin"]
    },
    {
        "name": "New World Hydra",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 11,
        "basethreat": 1,
        "belongstotype": "villain",
        "belongsto": ["Red Skull"]
    },
    {
        "name": "None Shall Pass",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 12,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Absorbing Man"]
    },
    {
        "name": "Protect the Planet",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 8,
        "basethreat": 4,
        "belongstotype": "villain",
        "belongsto": ["Drang"]
    },
    {
        "name": "Secret Rendezvous",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 8,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Klaw"]
    },
    {
        "name": "Take What Is Mine",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 10,
        "basethreat": 1,
        "belongstotype": "villain",
        "belongsto": ["Ronan"]
    },
    {
        "name": "Terrestrial Invasion",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 8,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Drang"]
    },
    {
        "name": "The Art of Evasion",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 6,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Nebula"]
    },
    {
        "name": "The Break-In!",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 7,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Rhino"]
    },
    {
        "name": "The Chronopolis",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 9,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Kang (Immortus)"]
    },
    {
        "name": "The Crimson Cowl",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 3,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Ultron"]
    },
    {
        "name": "The Getaway",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 5,
        "basethreat": 1,
        "belongstotype": "villain",
        "belongsto": ["Crossbones"]
    },
    {
        "name": "The Grand Collection",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 10,
        "basethreat": 4,
        "belongstotype": "villain",
        "belongsto": ["Collector 1 (Infiltrate)"]
    },
    {
        "name": "The Great Escape",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 12,
        "basethreat": 8,
        "belongstotype": "villain",
        "belongsto": ["Collector 2 (Escape)"]
    },
    {
        "name": "The Infinity Stone",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 6,
        "basethreat": 1,
        "belongstotype": "villain",
        "belongsto": ["Crossbones"]
    },
    {
        "name": "The Island of Dr. Zola",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 6,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Zola"]
    },
    {
        "name": "The Mad Doctor",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 8,
        "basethreat": 1,
        "belongstotype": "villain",
        "belongsto": ["Zola"]
    },
    {
        "name": "The Master of Time",
        "isSelected": false,
        "type": "main_scheme",
        "threat": null,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Kang (The Conqueror)", "Kang (Immortus)", "Kang (Iron Lad)", "Kang (Rama-Tut)", "Kang (Scarlet Centurion)"]
    },
    {
        "name": "The Missing Milano",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 11,
        "basethreat": 7,
        "belongstotype": "villain",
        "belongsto": ["Collector 2 (Escape)"]
    },
    {
        "name": "The Present Future War",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 9,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Kang (The Conqueror)", "Kang (Immortus)", "Kang (Iron Lad)", "Kang (Rama-Tut)", "Kang (Scarlet Centurion)"]
    },
    {
        "name": "The Realm of Rama-Tut",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 9,
        "basethreat": 1,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Kang (Rama-Tut)"]
    },
    {
        "name": "The Rise of the Red Skull",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 8,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Red Skull"]
    },
    {
        "name": "Underground Distribution",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 6,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Klaw"]
    },
    {
        "name": "Unleashing the Mutagen",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 7,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Warp Drive Initiated",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 9,
        "basethreat": 3,
        "belongstotype": "villain",
        "belongsto": ["Nebula"]
    }
];

let side_schemes = [
    {
        "name": "A Mess of Things",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["A Mess of Things"]
    },
    {
        "name": "Avalanche!",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Absorbing Man"]
    },
    {
        "name": "Badoon Blitz",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["GMW Campaign"]
    },
    {
        "name": "Blazing Inferno",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "hero",
        "belongsto": ["Groot"]
    },
    {
        "name": "Blockade",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Drang"]
    },
    {
        "name": "Bombardment",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "villain",
        "belongsto": ["Drang"]
    },
    {
        "name": "Bomb Scare",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["Bomb Scare"]
    },
    {
        "name": "Breakin' & Takin'",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Rhino"]
    },
    {
        "name": "Budding Crime Syndicate",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "hero",
        "belongsto": ["Star-Lord"]
    },
    {
        "name": "Captured by Hydra",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 5,
        "basethreat": 5,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Taskmaster"]
    },
    {
        "name": "Cannonade",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 1,
        "basethreat": 1,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["Ship Command"]
    },
    {
        "name": "Censor the Past",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "villain",
        "belongsto": ["Red Skull"]
    },
    {
        "name": "Clear the Road",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 4,
        "basethreat": 4,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Bulldozer"]
    },
    {
        "name": "Collapsing Bridge",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Cornered Staff",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Crossbones"]
    },
    {
        "name": "Corrupted Timestream",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Kang (The Conqueror)", "Kang (Immortus)", "Kang (Iron Lad)", "Kang (Rama-Tut)", "Kang (Scarlet Centurion)"]
    },
    {
        "name": "Crossbones' Assault",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Crossbones"]
    },
    {
        "name": "Crowd Control",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Rhino"]
    },
    {
        "name": "Crystal Ball",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["Galactic Artifacts"]
    },
    {
        "name": "Cut the Power",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "villain",
        "belongsto": ["Ronan"]
    },
    {
        "name": "Day of Reckoning",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 6,
        "basethreat": 6,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Wrecker"]
    },
    {
        "name": "Defense Network",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Klaw"]
    },
    {
        "name": "Drone Factory",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 4,
        "basethreat": 4,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Ultron"]
    },
    {
        "name": "Extortion of Seismic Proportion",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "hero",
        "belongsto": ["Quicksilver"]
    },
    {
        "name": "Family Feud",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "hero",
        "belongsto": ["Thor"]
    },
    {
        "name": "Fugitive Recovery",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["Badoon Headhunter"]
    },
    {
        "name": "Gallery of Splendor",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["GMW Campaign"]
    },
    {
        "name": "Generation Why?",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "hero",
        "belongsto": ["Ms. Marvel"]
    },
    {
        "name": "Goblin Nation",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "module",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Goblin Reinforcements",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Guerilla Tactics",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 5,
        "basethreat": 5,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["GMW Campaign"]
    },
    {
        "name": "Highway Robbery",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "hero",
        "belongsto": ["Spider-Man"]
    },
    {
        "name": "Hit Squad",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "hero",
        "belongsto": ["Captain America"]
    },
    {
        "name": "Hujahdarian Monarch Egg",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["Galactic Artifacts"]
    },
    {
        "name": "Hydra Patrol",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "module",
        "belongsto": ["Hydra Patrol"]
    },
    {
        "name": "Hydra Prison",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 1,
        "basethreat": 1,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Zola"]
    },
    {
        "name": "Hydra Reinforcements",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Red Skull"]
    },
    {
        "name": "Illegal Arms Factory",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Klaw"]
    },
    {
        "name": "Imminent Overload",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "hero",
        "belongsto": ["Iron Man"]
    },
    {
        "name": "Invasive AI",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "villain",
        "belongsto": ["Ultron"]
    },
    {
        "name": "Judge, Jury, Executioner",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "villain",
        "belongsto": ["Ronan"]
    },
    {
        "name": "Kang's Dominion",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "villain",
        "belongsto": ["Kang (The Conqueror)", "Kang (Immortus)", "Kang (Iron Lad)", "Kang (Rama-Tut)", "Kang (Scarlet Centurion)"]
    },
    {
        "name": "Kree Supremacy",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 6,
        "basethreat": 6,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["GMW Campaign"]
    },
    {
        "name": "Killer for Hire",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "hero",
        "belongsto": ["Black Widow"]
    },
    {
        "name": "Legions of Hydra",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["Legions of Hydra"]
    },
    {
        "name": "Lethal Intent",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2
    },
    {
        "name": "Light of Centuries Sphere",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "module",
        "belongsto": ["Master of Time"]
    },
    {
        "name": "Magical Teapot",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["Galactic Artifacts"]
    },
    {
        "name": "Marked for Death",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 5,
        "basethreat": 5,
        "basethreatfixed": true,
        "belongstotype": "hero",
        "belongsto": ["Hawkeye"]
    },
    {
        "name": "Mass Chaos",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 0,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Red Skull"]
    },
    {
        "name": "Mother's Orders",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "hero",
        "belongsto": ["Wasp"]
    },
    {
        "name": "Open the Dark Dimension",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "hero",
        "belongsto": ["Doctor Strange"]
    },
    {
        "name": "Oppressive Armada",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 1,
        "basethreat": 1,
        "belongstotype": "villain",
        "belongsto": ["Drang"]
    },
    {
        "name": "Oscorp Manufacturing",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Overrun",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 1,
        "basethreat": 1,
        "belongstotype": "villain",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Payoff",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Personal Challenge",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "hero",
        "belongsto": ["She-Hulk"]
    },
    {
        "name": "Philosopher's Stone",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["Galactic Artifacts"]
    },
    {
        "name": "Pile It On!",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Piledriver"]
    },
    {
        "name": "Pincer Maneuver",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Ronan"]
    },
    {
        "name": "Pinned Down",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Kang (The Conqueror)", "Kang (Immortus)", "Kang (Iron Lad)", "Kang (Rama-Tut)", "Kang (Scarlet Centurion)"]
    },
    {
        "name": "Power Drain",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Prison Camps",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "villain",
        "belongsto": ["Red Skull"]
    },
    {
        "name": "Rampage",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 4,
        "basethreat": 4,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Kang (The Conqueror)", "Kang (Immortus)", "Kang (Iron Lad)", "Kang (Rama-Tut)", "Kang (Scarlet Centurion)"]
    },
    {
        "name": "Running Interference",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 1,
        "basethreat": 1,
        "belongstotype": "module",
        "belongsto": ["Running Interference"]
    },
    {
        "name": "Sibling Rivalry",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 4,
        "basethreat": 4,
        "basethreatfixed": true,
        "belongstotype": "hero",
        "belongsto": ["Gamora"]
    },
    {
        "name": "Sound the Alarms",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "module",
        "belongsto": ["Space Pirates"]
    },
    {
        "name": "Spatial Positioning",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "villain",
        "belongsto": ["Drang"]
    },
    {
        "name": "Super Absorbing Power",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "villain",
        "belongsto": ["Absorbing Man"]
    },
    {
        "name": "Superior Tactics",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Ronan"]
    },
    {
        "name": "Taskmaster's Training Camp",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Taskmaster"]
    },
    {
        "name": "Tech Theft",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "hero",
        "belongsto": ["Ant-Man"]
    },
    {
        "name": "Test Subjects",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Zola"]
    },
    {
        "name": "The \"Immortal\" Klaw",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "villain",
        "belongsto": ["Klaw"]
    },
    {
        "name": "The Anachronauts",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "module",
        "belongsto": ["Anachronauts"]
    },
    {
        "name": "The Doomsday Chair",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 8,
        "basethreat": 8,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["The Doomsday Chair"]
    },
    {
        "name": "The Masters of Evil",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "module",
        "belongsto": ["The Masters of Evil"]
    },
    {
        "name": "The Next Evolution",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": false,
        "belongstotype": "hero",
        "belongsto": ["Scarlet Witch"]
    },
    {
        "name": "The Psych-Magnitron",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "hero",
        "belongsto": ["Captain Marvel"]
    },
    {
        "name": "The Red House",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": false,
        "belongstotype": "villain",
        "belongsto": ["Red Skull"]
    },
    {
        "name": "The Sleeper Awakened",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 0,
        "basethreat": 0,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Red Skull"]
    },
    {
        "name": "The Viper's Ambition",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "hero",
        "belongsto": ["Spider-Woman"]
    },
    {
        "name": "There is No Escape",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 4,
        "basethreat": 4,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["GMW Campaign"]
    },
    {
        "name": "Thunderstruck",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 5,
        "basethreat": 5,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Thunderball"]
    },
    {
        "name": "Time Portal",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "module",
        "belongsto": ["Temporal"]
    },
    {
        "name": "Total Destruction",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "hero",
        "belongsto": ["Hulk"]
    },
    {
        "name": "Ultron's Imperative",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Ultron"]
    },
    {
        "name": "Under Attack",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["Under Attack"]
    },
    {
        "name": "Usurp The Throne",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "hero",
        "belongsto": ["Black Panther"]
    },
    {
        "name": "Vendetta",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "hero",
        "belongsto": ["Rocket Raccoon"]
    },
    {
        "name": "Zola's Experiments",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "villain",
        "belongsto": ["Zola"]
    }
];

let minions = [
    {
        "name": "Abomination",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "hero",
        "belongsto": ["Hulk"]
    },
    {
        "name": "Advanced Ultron Drone",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "villain",
        "belongsto": ["Ultron"]
    },
    {
        "name": "Ancient Warrior",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 2,
        "belongstotype": "module",
        "belongsto": ["Temporal"]
    },
    {
        "name": "Apocryphus",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "module",
        "belongsto": ["Anachronauts"]
    },
    {
        "name": "Armored Guard",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "villain",
        "belongsto": ["Klaw"]
    },
    {
        "name": "Avalanche",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "hero",
        "belongsto": ["Quicksilver"]
    },
    {
        "name": "Baron Mordo",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    },
    {
        "name": "Baron Zemo",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    },
    {
        "name": "Badoon Assassin",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 1
    },
    {
        "name": "Badoon Engineer",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3
    },
    {
        "name": "Badoon Grunt",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 2
    },
    {
        "name": "Badoon Headhunter",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 7
    },
    {
        "name": "Badoon Lieutenant",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6
    },
    {
        "name": "Badoon Sentry",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    },
    {
        "name": "Badoon Warlord",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Beetle",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Berserk Mutate",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3
    },
    {
        "name": "Blackjack O'Hare",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3
    },
    {
        "name": "Chitauri Soldier",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3
    },
    {
        "name": "Corrupt Prison Guard",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3
    },
    {
        "name": "Crossfire",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Deathunt 9000",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6
    },
    {
        "name": "Edison's Giant Robot",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 8
    },
    {
        "name": "Electro",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6
    },
    {
        "name": "Escaped Convict",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 2
    },
    {
        "name": "Frost Giant",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Furnax",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6
    },
    {
        "name": "Goblin Knight",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 7
    },
    {
        "name": "Goblin Soldier",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    },
    {
        "name": "Goblin Thrall",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3
    },
    {
        "name": "Headhunter's Henchman",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 8
    },
    {
        "name": "Hired Gun",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3
    },
    {
        "name": "Hydra Bomber",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 2
    },
    {
        "name": "Hydra Exo-Soldier",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    },
    {
        "name": "Hydra Flame-Soldier",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Hydra Hunter",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3
    },
    {
        "name": "Hydra Jet-Trooper",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3
    },
    {
        "name": "Hydra Mercenary",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3
    },
    {
        "name": "Hydra Regular",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 2
    },
    {
        "name": "Hydra Soldier",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Kang (Master of Time)",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6
    },
    {
        "name": "Killmonger",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    },
    {
        "name": "Kree Commando",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6
    },
    {
        "name": "Kree Lieutenant",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 7
    },
    {
        "name": "Kree Private",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    },
    {
        "name": "Loki",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Luminous",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    },
    {
        "name": "MODOK",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 8
    },
    {
        "name": "Macrobots",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Madame Hydra",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6
    },
    {
        "name": "Melter",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    },
    {
        "name": "Mister Knife",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6
    },
    {
        "name": "Monark Starstalker",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 7
    },
    {
        "name": "Monster",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6
    },
    {
        "name": "Nebula",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    },
    {
        "name": "Pirate Commander",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6
    },
    {
        "name": "Pirate Lackey",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3
    },
    {
        "name": "Psionic Ghost",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Private Security Specialist",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Radioactive Man",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 7
    },
    {
        "name": "Ronan the Accuser",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 9
    },
    {
        "name": "Sandman",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Scorpion",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 7
    },
    {
        "name": "Servant Bot",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3
    },
    {
        "name": "Shocker",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3
    },
    {
        "name": "Sir Raston",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6
    },
    {
        "name": "Starshark",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 7
    },
    {
        "name": "Taskmaster",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Terminatrix",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    },
    {
        "name": "The Sleeper",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    },
    {
        "name": "The Viper",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    },
    {
        "name": "Thomas Edison",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3
    },
    {
        "name": "Tiger Shark",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6
    },
    {
        "name": "Time-Displaced Soldier",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3
    },
    {
        "name": "Titania",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6
    },
    {
        "name": "Tombstone",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 9
    },
    {
        "name": "Tyrannosaurus Rex",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6
    },
    {
        "name": "Ultimate Bio-Servant",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Vulture",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Weapons Runner",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 2
    },
    {
        "name": "Whiplash",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Whirlwind",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6
    },
    {
        "name": "Wildrun",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    },
    {
        "name": "Yellowjacket",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4
    },
    {
        "name": "Yon-Rogg",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    },
    {
        "name": "Zola's Mutate",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5
    }
];

let allies = [
    {
        "name": "Adam Warlock",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Agent 13",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Agent Coulson",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Angela",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Ant-Man",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3,
        "useCounter": true,
        "counter": 0
    },
    {
        "name": "Beta Ray Bill",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
    },
    {
        "name": "Black Cat",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Black Knight",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Black Widow",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Brawn",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 5
    },
    {
        "name": "Brother Voodoo",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Bug",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Captain Marvel",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Clea",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Cosmo",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Daredevil",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Drax",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
    },
    {
        "name": "Elektra",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Falcon",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Giant-Man",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
    },
    {
        "name": "Goliath",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
    },
    {
        "name": "Groot",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 6
    },
    {
        "name": "Hawkeye (Barton)",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3,
        "useCounter": true,
        "counter": 4
    },
    {
        "name": "Hawkeye (Bishop)",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Heimdall",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
    },
    {
        "name": "Hellcat",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Hercules",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
    },
    {
        "name": "Hulk",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 5
    },
    {
        "name": "Iron Fist",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3,
        "useCounter": true,
        "counter": 2
    },
    {
        "name": "Iron Man",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Ironheart",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Jessica Jones",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Lady Sif",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Lockjaw",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
    },
    {
        "name": "Luke Cage",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 5
    },
    {
        "name": "Maria Hill",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Mockingbird",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Moon Knight",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Multiple Man",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Nick Fury",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Nova",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Nova Prime",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Nebula",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Quake",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Quicksilver",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
    },
    {
        "name": "Red Dagger",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Rocket Raccoon",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Ronin",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Scarlet Witch",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Sentry",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 5
    },
    {
        "name": "Shang-Chi",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "She-Hulk",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
    },
    {
        "name": "Shuri",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Speed",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
    },
    {
        "name": "Spider-Girl",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Spider-Man",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Spider-Woman",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Squirrel Girl",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Starhawk",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Stinger",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Thor",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
    },
    {
        "name": "Tigra",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "U.S. Agent",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 5
    },
    {
        "name": "Valkyrie",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Vision",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "War Machine",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Warlock",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Wasp",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 0
    },
    {
        "name": "White Tiger",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Wiccan",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Winter Soldier",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
    },
    {
        "name": "Wonder Man",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Wong",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Yondu",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    }
];

let countercards = [
    {
        "name": "Badoon's Ship",
        "isSelected": false,
        "type": "counter",
        "counter": 0
    },
    {
        "name": "Battery Pack",
        "isSelected": false,
        "type": "counter",
        "counter": 2
    },
    {
        "name": "Beat Cop",
        "isSelected": false,
        "type": "counter",
        "counter": 0
    },
    {
        "name": "Energy Barriers",
        "isSelected": false,
        "type": "counter",
        "counter": 3
    },
    {
        "name": "Energy Channel",
        "isSelected": false,
        "type": "counter",
        "counter": 0
    },
    {
        "name": "Enhanced Awareness",
        "isSelected": false,
        "type": "counter",
        "counter": 3
    },
    {
        "name": "Enhanced Physique",
        "isSelected": false,
        "type": "counter",
        "counter": 3
    },
    {
        "name": "Enhanced Reflexes",
        "isSelected": false,
        "type": "counter",
        "counter": 3
    },
    {
        "name": "Hall of Heroes",
        "isSelected": false,
        "type": "counter",
        "counter": 1
    },
    {
        "name": "Hand Cannon",
        "isSelected": false,
        "type": "counter",
        "counter": 3
    },
    {
        "name": "Med Team",
        "isSelected": false,
        "type": "counter",
        "counter": 3
    },
    {
        "name": "Nebula's Ship",
        "isSelected": false,
        "type": "counter",
        "counter": 0
    },
    {
        "name": "Particle Cannon",
        "isSelected": false,
        "type": "counter",
        "counter": 2
    },
    {
        "name": "Quinjet",
        "isSelected": false,
        "type": "counter",
        "counter": 0
    },
    {
        "name": "Rocket Launcher",
        "isSelected": false,
        "type": "counter",
        "counter": 2
    },
    {
        "name": "Rocket's Pistol",
        "isSelected": false,
        "type": "counter",
        "counter": 3
    },
    {
        "name": "Surveillance Team",
        "isSelected": false,
        "type": "counter",
        "counter": 3
    },
    {
        "name": "Tac Team",
        "isSelected": false,
        "type": "counter",
        "counter": 3
    },
    {
        "name": "The Night Nurse",
        "isSelected": false,
        "type": "counter",
        "counter": 3
    },
    {
        "name": "Web Shooter",
        "isSelected": false,
        "type": "counter",
        "counter": 3
    }
];

let modules = [
    {
        "name": "A Mess of Things"
    },
    {
        "name": "Anachronauts"
    },
    {
        "name": "Badoon Headhunter"
    },
    {
        "name": "Bomb Scare"
    },
    {
        "name": "Galactic Artifacts"
    },
    {
        "name": "GMW Campaign"
    },
    {
        "name": "Hydra Patrol"
    },
    {
        "name": "Legions of Hydra"
    },
    {
        "name": "Master of Time"
    },
    {
        "name": "Running Interference"
    },
    {
        "name": "Ship Command"
    },
    {
        "name": "Space Pirates"
    },
    {
        "name": "Temporal"
    },
    {
        "name": "The Doomsday Chair"
    },
    {
        "name": "The Masters of Evil"
    },
    {
        "name": "Under Attack"
    }
]