let heroes = [
    {
        "name": "Adam Warlock",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 11
    },
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
        "name": "Drax",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 14,
        "useCounter": true,
        "counter": 0
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
        "name": "Nebula (Hero)",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 9
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
        "name": "Spectrum",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 11
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
        "name": "Venom",
        "isSelected": false,
        "type": "hero",
        "hitpoints": 12
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
        "name": "Corvus Glaive",
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
        "name": "Ebony Maw",
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
        "name": "Hela",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 8,
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
        "name": "Loki",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 20,
        "hitpointsper": true
    },
    {
        "name": "Nebula (Villain)",
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
        "name": "Proxima Midnight",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 9,
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
        "name": "Thanos",
        "isSelected": false,
        "type": "villain",
        "hitpoints": 16,
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
        "name": "All Hail King Loki",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 12,
        "basethreat": 1,
        "belongstotype": "villain",
        "belongsto": ["Loki"]
    },
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
        "name": "Attack on Knowhere",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 6,
        "basethreat": 1,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Ebony Maw"]
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
        "name": "Balance the Scales",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 12,
        "basethreat": 0,
        "belongstotype": "villain",
        "belongsto": ["Thanos"]
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
        "name": "Odin's Torment",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 18,
        "basethreat": 1,
        "belongstotype": "villain",
        "belongsto": ["Hela"]
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
        "name": "The Armies of Thanos",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 6,
        "basethreat": 1,
        "belongstotype": "villain",
        "belongsto": ["Proxima Midnight", "Corvus Glaive"]
    },
    {
        "name": "The Art of Evasion",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 6,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Nebula (Villain)"]
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
        "name": "The Infinity Stones",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 12,
        "basethreat": 0,
        "belongstotype": "villain",
        "belongsto": ["Thanos"]
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
        "name": "The Power Stone",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 9,
        "basethreat": 1,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Ebony Maw"]
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
        "name": "Under Siege",
        "isSelected": false,
        "type": "main_scheme",
        "threat": 6,
        "basethreat": 1,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Proxima Midnight", "Corvus Glaive"]
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
        "belongsto": ["Nebula (Villain)"]
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
        "name": "Casket of Ancient Winters",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 4,
        "basethreat": 4,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Loki"]
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
        "name": "City Under Attack",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Proxima Midnight", "Corvus Glaive"]
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
        "name": "Cull the Weak",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "hero",
        "belongsto": ["Drax"]
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
        "name": "Gjallerbru",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Hela"]
    },
    {
        "name": "Gnipahellir",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Hela"]
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
        "name": "Hall of Nastrond",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 4,
        "basethreat": 4,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Hela"]
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
        "name": "Klyntar Frenzy",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "hero",
        "belongsto": ["Venom"]
    },
    {
        "name": "Bomb Scare",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "module",
        "belongsto": ["Armies of Titan"]
    },
    {
        "name": "Defensive Protocols",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["MTS Campaign"]
    },
    {
        "name": "Find the Norn Stones",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "module",
        "belongsto": ["MTS Campaign"]
    },
    {
        "name": "Hack Sanctuary's Computer",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["MTS Campaign"]
    },
    {
        "name": "Legions of Hel",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["Legions of Hel"]
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
        "name": "Madness on Midgard",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 5,
        "basethreat": 5,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Loki"]
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
        "name": "Open the Bifrost",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Loki"]
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
        "name": "Open the Dungeons",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "module",
        "belongsto": ["MTS Campaign"]
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
        "name": "Reactor Meltdown",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "hero",
        "belongsto": ["Spectrum"]
    },
    {
        "name": "Reactor Overload",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "belongstotype": "villain",
        "belongsto": ["Ebony Maw"]
    },
    {
        "name": "Retrieve Odin's Armor",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["MTS Campaign"]
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
        "name": "Sanctuary",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 3,
        "basethreat": 3,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Thanos"]
    },
    {
        "name": "Save the Shawarma Place",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["MTS Campaign"]
    },
    {
        "name": "Secure the Landing Pad",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["MTS Campaign"]
    },
    {
        "name": "Security Breach",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "basethreatfixed": true,
        "belongstotype": "module",
        "belongsto": ["MTS Campaign"]
    },
    {
        "name": "Self-Preservation",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "hero",
        "belongsto": ["Nebula (Hero)"]
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
        "name": "The Titan's Throne",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "villain",
        "belongsto": ["Thanos"]
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
        "name": "Tribute",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "module",
        "belongsto": ["Children of Thanos"]
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
        "name": "Unnatural Storm",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "module",
        "belongsto": ["Frost Giants"]
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
        "name": "Universal Church of Truth",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 2,
        "basethreat": 2,
        "belongstotype": "hero",
        "belongsto": ["Adam Warlock"]
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
        "name": "War in Asgard",
        "isSelected": false,
        "type": "side_scheme",
        "threat": 6,
        "basethreat": 6,
        "basethreatfixed": true,
        "belongstotype": "villain",
        "belongsto": ["Loki"]
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
        "hitpoints": 5,
        "belongstotype": "hero",
        "belongsto": ["Doctor Strange"]
    },
    {
        "name": "Baron Zemo",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "hero",
        "belongsto": ["Captain America"]
    },
    {
        "name": "Badoon Assassin",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 1,
        "belongstotype": "module",
        "belongsto": ["Band of Badoon"]
    },
    {
        "name": "Badoon Engineer",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "villain",
        "belongsto": ["Drang"]
    },
    {
        "name": "Badoon Grunt",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 2,
        "belongstotype": "module",
        "belongsto": ["Band of Badoon"]
    },
    {
        "name": "Badoon Headhunter",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 7,
        "belongstotype": "module",
        "belongsto": ["Badoon Headhunter"]
    },
    {
        "name": "Badoon Lieutenant",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "module",
        "belongsto": ["Band of Badoon"]
    },
    {
        "name": "Badoon Sentry",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "module",
        "belongsto": ["Band of Badoon"]
    },
    {
        "name": "Badoon Warlord",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "module",
        "belongsto": ["Band of Badoon"]
    },
    {
        "name": "Beetle",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "hero",
        "belongsto": ["Wasp"]
    },
    {
        "name": "Berserk Mutate",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "villain",
        "belongsto": ["Zola"]
    },
    {
        "name": "Blackjack O'Hare",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "hero",
        "belongsto": ["Rocket Raccoon"]
    },
    {
        "name": "Black Dwarf",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "module",
        "belongsto": ["Black Order"]
    },
    {
        "name": "Black Order Infantry",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "module",
        "belongsto": ["Armies of Titan"]
    },
    {
        "name": "Black Order Besieger",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "villain",
        "belongsto": ["Proxima Midnight", "Corvus Glaive"]
    },
    {
        "name": "Black Swan",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "hitpointsper": true,
        "belongstotype": "module",
        "belongsto": ["Band of Badoon"]
    },
    {
        "name": "Chitauri Soldier",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "module",
        "belongsto": ["Temporal"]
    },
    {
        "name": "Corrupt Prison Guard",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "villain",
        "belongsto": ["Wrecker", "Thunderball", "Piledriver", "Bulldozer"]
    },
    {
        "name": "Corvus Glaive",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "module",
        "belongsto": ["Children of Thanos"]
    },
    {
        "name": "Crossfire",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "hero",
        "belongsto": ["Hawkeye"]
    },
    {
        "name": "Deathunt 9000",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "module",
        "belongsto": ["Anachronauts"]
    },
    {
        "name": "Draugr",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "module",
        "belongsto": ["Legions of Hel"]
    },
    {
        "name": "Ebony Maw",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "module",
        "belongsto": ["Children of Thanos"]
    },
    {
        "name": "Edison's Giant Robot",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 8,
        "belongstotype": "hero",
        "belongsto": ["Ms. Marvel"]
    },
    {
        "name": "Electro",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "module",
        "belongsto": ["Power Drain"]
    },
    {
        "name": "Enchantress",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "module",
        "belongsto": ["Enchantress"]
    },
    {
        "name": "Enraged Symbiote",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 2,
        "belongstotype": "hero",
        "belongsto": ["Venom"]
    },
    {
        "name": "Escaped Convict",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 2,
        "belongstotype": "villain",
        "belongsto": ["Wrecker", "Thunderball", "Piledriver", "Bulldozer"]
    },
    {
        "name": "Frost Giant",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "hero",
        "belongsto": ["Thor"]
    },
    {
        "name": "Frost Giant",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "module",
        "belongsto": ["Frost Giants"]
    },
    {
        "name": "Furnax",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "hero",
        "belongsto": ["Groot"]
    },
    {
        "name": "Gamora",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "hero",
        "belongsto": ["Nebula (Hero)"]
    },
    {
        "name": "Garm",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "hitpointsper": true,
        "belongstotype": "villain",
        "belongsto": ["Hela"]
    },
    {
        "name": "Goblin Knight",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 7,
        "belongstotype": "villain",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Goblin Soldier",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "villain",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Goblin Thrall",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "villain",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Headhunter's Henchman",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 8,
        "belongstotype": "module",
        "belongsto": ["Badoon Headhunter"]
    },
    {
        "name": "Hired Gun",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "villain",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Hydra Bomber",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 2,
        "belongstotype": ["module", "villain"],
        "belongsto": ["Bomb Scare", "Crossbones"]
    },
    {
        "name": "Hydra Exo-Soldier",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "villain",
        "belongsto": ["Red Skull"]
    },
    {
        "name": "Hydra Flame-Soldier",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "module",
        "belongsto": ["Hydra Assault"]
    },
    {
        "name": "Hydra Hunter",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "villain",
        "belongsto": ["Taskmaster"]
    },
    {
        "name": "Hydra Jet-Trooper",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "module",
        "belongsto": ["Hydra Assault"]
    },
    {
        "name": "Hydra Mercenary",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": ["villain", "hero"],
        "belongsto": ["Rhino", "Black Widow"]
    },
    {
        "name": "Hydra Regular",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 2,
        "belongstotype": ["hero", "module"],
        "belongsto": ["Spider-Woman", "Hydra Patrol"]
    },
    {
        "name": "Hydra Soldier",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": ["module", "hero", "module"],
        "belongsto": ["Legions of Hydra", "Captain America", "Hydra Patrol"]
    },
    {
        "name": "Kang (Master of Time)",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "module",
        "belongsto": ["Master of Time"]
    },
    {
        "name": "Killmonger",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "hero",
        "belongsto": ["Black Panther"]
    },
    {
        "name": "Kree Commando",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "module",
        "belongsto": ["Kree Militants"]
    },
    {
        "name": "Kree Lieutenant",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 7,
        "belongstotype": "module",
        "belongsto": ["Kree Militants"]
    },
    {
        "name": "Kree Private",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "module",
        "belongsto": ["Kree Militants"]
    },
    {
        "name": "Laufey",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "module",
        "belongsto": ["Frost Giants"]
    },
    {
        "name": "Loki",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "hero",
        "belongsto": ["Thor"]
    },
    {
        "name": "Luminous",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "hero",
        "belongsto": ["Scarlet Witch"]
    },
    {
        "name": "Macrobots",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "villain",
        "belongsto": ["Kang (The Conqueror)", "Kang (Immortus)", "Kang (Iron Lad)", "Kang (Rama-Tut)", "Kang (Scarlet Centurion)"]
    },
    {
        "name": "Madame Hydra",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "module",
        "belongsto": ["Legions of Hydra"]
    },
    {
        "name": "Melter",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "module",
        "belongsto": ["The Masters of Evil"]
    },
    {
        "name": "Mister Knife",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "hero",
        "belongsto": ["Star-Lord"]
    },
    {
        "name": "MODOK",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 8,
        "belongstotype": "module",
        "belongsto": ["The Doomsday Chair"]
    },
    {
        "name": "Monark Starstalker",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 7,
        "belongstotype": "villain",
        "belongsto": ["Collector 1 (Infiltrate)"]
    },
    {
        "name": "Monster",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "villain",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Nebula",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "hero",
        "belongsto": ["Gamora"]
    },
    {
        "name": "Nidhogg",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "hitpointsper": true,
        "belongstotype": "villain",
        "belongsto": ["Hela"]
    },
    {
        "name": "Outrider",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 2,
        "belongstotype": "module",
        "belongsto": ["Armies of Titan"]
    },
    {
        "name": "Pirate Commander",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "module",
        "belongsto": ["Space Pirates"]
    },
    {
        "name": "Pirate Lackey",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "module",
        "belongsto": ["Space Pirates"]
    },
    {
        "name": "Psionic Ghost",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "module",
        "belongsto": ["Menagerie Medley"]
    },
    {
        "name": "Private Security Specialist",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "villain",
        "belongsto": ["Norman Osborn", "Green Goblin"]
    },
    {
        "name": "Proxima Midnight",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "module",
        "belongsto": ["Children of Thanos"]
    },
    {
        "name": "Radioactive Man",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 7,
        "belongstotype": "module",
        "belongsto": ["The Masters of Evil"]
    },
    {
        "name": "Radioactive Man (Spectrum Nemesis)",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "hero",
        "belongsto": ["Spectrum"]
    },
    {
        "name": "Ronan the Accuser",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 9,
        "belongstotype": "module",
        "belongsto": ["Kree Fanatic"]
    },
    {
        "name": "Sandman",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "villain",
        "belongsto": ["Rhino"]
    },
    {
        "name": "Scorpion",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 7,
        "belongstotype": "module",
        "belongsto": ["A Mess of Things"]
    },
    {
        "name": "Servant Bot",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "module",
        "belongsto": ["Menagerie Medley"]
    },
    {
        "name": "Shocker",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "villain",
        "belongsto": ["Rhino"]
    },
    {
        "name": "Sir Raston",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "module",
        "belongsto": ["Anachronauts"]
    },
    {
        "name": "Skurge",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "hitpointsper": true,
        "belongstotype": "villain",
        "belongsto": ["Hela"]
    },
    {
        "name": "Starshark",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 7,
        "belongstotype": "module",
        "belongsto": ["Menagerie Medley"]
    },
    {
        "name": "Supergiant",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "module",
        "belongsto": ["Black Order"]
    },
    {
        "name": "Taskmaster",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "hero",
        "belongsto": ["Black Widow"]
    },
    {
        "name": "Terminatrix",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "module",
        "belongsto": ["Anachronauts"]
    },
    {
        "name": "The Magus",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "hero",
        "belongsto": ["Adam Warlock"]
    },
    {
        "name": "The Sleeper",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "villain",
        "belongsto": ["Red Skull"]
    },
    {
        "name": "The Viper",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "hero",
        "belongsto": ["Spider-Woman"]
    },
    {
        "name": "Thomas Edison",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "hero",
        "belongsto": ["Ms. Marvel"]
    },
    {
        "name": "Tiger Shark",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "module",
        "belongsto": ["The Masters of Evil"]
    },
    {
        "name": "Time-Displaced Soldier",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 3,
        "belongstotype": "module",
        "belongsto": ["Master of Time"]
    },
    {
        "name": "Titania",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "hero",
        "belongsto": ["Titania"]
    },
    {
        "name": "Tombstone",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 9,
        "belongstotype": "module",
        "belongsto": ["Running Interference"]
    },
    {
        "name": "Tyrannosaurus Rex",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "module",
        "belongsto": ["Temporal"]
    },
    {
        "name": "Ultimate Bio-Servant",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "villain",
        "belongsto": ["Zola"]
    },
    {
        "name": "Vulture",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "hero",
        "belongsto": ["Spider-Man"]
    },
    {
        "name": "Weapons Runner",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 2,
        "belongstotype": "villain",
        "belongsto": ["Klaw"]
    },
    {
        "name": "Whiplash",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "hero",
        "belongsto": ["Iron Man"]
    },
    {
        "name": "Whirlwind",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 6,
        "belongstotype": "module",
        "belongsto": ["The Masters of Evil"]
    },
    {
        "name": "Wildrun",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "module",
        "belongsto": ["Anachronauts"]
    },
    {
        "name": "Yellowjacket",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "hero",
        "belongsto": ["Ant-Man"]
    },
    {
        "name": "Yon-Rogg",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "hero",
        "belongsto": ["Captain Marvel"]
    },
    {
        "name": "Yotat the Destroyer",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "hero",
        "belongsto": ["Drax"]
    },
    {
        "name": "Zealot of Truth",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 4,
        "belongstotype": "hero",
        "belongsto": ["Adam Warlock"]
    },
    {
        "name": "Zola's Mutate",
        "isSelected": false,
        "type": "minion",
        "hitpoints": 5,
        "belongstotype": "villain",
        "belongsto": ["Zola"]
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
        "name": "Blade",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Blue Marvel",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
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
        "name": "Captain America",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
    },
    {
        "name": "Captain Marvel",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Charlie-27",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
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
        "name": "Cosmo (MTS Campaign)",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
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
        "name": "Eros",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Falcon",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Fandral",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Gamora",
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
        "name": "Hogun",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
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
        "name": "Jack Flag",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3,
        "useCounter": true,
        "counter": 0
    },
    {
        "name": "Jessica Jones",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Kaluu",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
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
        "name": "Major Victory",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Mantis",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Maria Hill",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Martinex",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
    },
    {
        "name": "Martyr",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Marvel Boy",
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
        "name": "Odin",
        "isSelected": false,
        "type": "ally",
        "hitpoints":6
    },
    {
        "name": "Pip the Troll",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Power Man",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Quake",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
    },
    {
        "name": "Quasar",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
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
        "name": "Star-Lord",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
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
        "name": "Venom",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 4
    },
    {
        "name": "Vision",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "Volstagg",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 5
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
        "name": "White Tiger (Angela Del Toro)",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
    },
    {
        "name": "White Tiger (Ava Ayala)",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 2
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
        "name": "Wrath",
        "isSelected": false,
        "type": "ally",
        "hitpoints": 3
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
        "name": "Badoon Ship",
        "isSelected": false,
        "type": "counter",
        "counter": 0,
        "belongstotype": "module",
        "belongsto": ["Brotherhood of Badoon"]
    },
    {
        "name": "Battery Pack",
        "isSelected": false,
        "type": "counter",
        "counter": 2,
        "belongstotype": "hero",
        "belongsto": ["Rocket Raccoon"]
    },
    {
        "name": "Beat Cop",
        "isSelected": false,
        "type": "counter",
        "counter": 0,
        "belongstotype": "aspect",
        "belongsto": ["Justice"]
    },
    {
        "name": "Defensive Training",
        "isSelected": false,
        "type": "counter",
        "counter": 2,
        "belongstotype": "aspect",
        "belongsto": ["Protection"]
    },
    {
        "name": "Energy Barrier",
        "isSelected": false,
        "type": "counter",
        "counter": 3,
        "belongstotype": "aspect",
        "belongsto": ["Protection"]
    },
    {
        "name": "Energy Channel",
        "isSelected": false,
        "type": "counter",
        "counter": 0,
        "belongstotype": "hero",
        "belongsto": ["Captain Marvel"]
    },
    {
        "name": "Enhanced Awareness",
        "isSelected": false,
        "type": "counter",
        "counter": 3,
        "belongstotype": "aspect",
        "belongsto": ["Basic"]
    },
    {
        "name": "Enhanced Physique",
        "isSelected": false,
        "type": "counter",
        "counter": 3,
        "belongstotype": "aspect",
        "belongsto": ["Basic"]
    },
    {
        "name": "Enhanced Reflexes",
        "isSelected": false,
        "type": "counter",
        "counter": 3,
        "belongstotype": "aspect",
        "belongsto": ["Basic"]
    },
    {
        "name": "Fireball",
        "isSelected": false,
        "type": "counter",
        "counter": 0,
        "belongstotype": "villain",
        "belongsto": ["Ebony Maw"]
    },
    {
        "name": "Hall of Heroes",
        "isSelected": false,
        "type": "counter",
        "counter": 1,
        "belongstotype": "aspect",
        "belongsto": ["Aggression"]
    },
    {
        "name": "Hand Cannon",
        "isSelected": false,
        "type": "counter",
        "counter": 3,
        "belongstotype": "aspect",
        "belongsto": ["Aggression"]
    },
    {
        "name": "Manipulation",
        "isSelected": false,
        "type": "counter",
        "counter": 0,
        "belongstotype": "villain",
        "belongsto": ["Ebony Maw"]
    },
    {
        "name": "Med Team",
        "isSelected": false,
        "type": "counter",
        "counter": 3,
        "belongstotype": "aspect",
        "belongsto": ["Protection"]
    },
    {
        "name": "Nebula's Ship",
        "isSelected": false,
        "type": "counter",
        "counter": 0,
        "belongstotype": "villain",
        "belongsto": ["Nebula (Villain)"]
    },
    {
        "name": "Pacification",
        "isSelected": false,
        "type": "counter",
        "counter": 0,
        "belongstotype": "villain",
        "belongsto": ["Ebony Maw"]
    },
    {
        "name": "Particle Cannon",
        "isSelected": false,
        "type": "counter",
        "counter": 2,
        "belongstotype": "hero",
        "belongsto": ["Rocket Raccoon"]
    },
    {
        "name": "Plasma Pistol",
        "isSelected": false,
        "type": "counter",
        "counter": 3,
        "belongstotype": "aspect",
        "belongsto": ["Basic"]
    },
    {
        "name": "Quinjet",
        "isSelected": false,
        "type": "counter",
        "counter": 0,
        "belongstotype": "aspect",
        "belongsto": ["Leadership"]
    },
    {
        "name": "Rocket Launcher",
        "isSelected": false,
        "type": "counter",
        "counter": 2,
        "belongstotype": "hero",
        "belongsto": ["Rocket Raccoon"]
    },
    {
        "name": "Rocket's Pistol",
        "isSelected": false,
        "type": "counter",
        "counter": 3,
        "belongstotype": "hero",
        "belongsto": ["Rocket Raccoon"]
    },
    {
        "name": "Rubblestorm",
        "isSelected": false,
        "type": "counter",
        "counter": 0,
        "belongstotype": "villain",
        "belongsto": ["Ebony Maw"]
    },
    {
        "name": "Sonic Rifle",
        "isSelected": false,
        "type": "counter",
        "counter": 2,
        "belongstotype": "aspect",
        "belongsto": ["Justice"]
    },
    {
        "name": "Soul World",
        "isSelected": false,
        "type": "counter",
        "counter": 1,
        "belongstotype": "hero",
        "belongsto": ["Adam Warlock"]
    },
    {
        "name": "Surveillance Team",
        "isSelected": false,
        "type": "counter",
        "counter": 3,
        "belongstotype": "aspect",
        "belongsto": ["Justice"]
    },
    {
        "name": "Tac Team",
        "isSelected": false,
        "type": "counter",
        "counter": 3,
        "belongstotype": "aspect",
        "belongsto": ["Aggression"]
    },
    {
        "name": "The Night Nurse",
        "isSelected": false,
        "type": "counter",
        "counter": 3,
        "belongstotype": "aspect",
        "belongsto": ["Protection"]
    },
    {
        "name": "The Poison",
        "isSelected": false,
        "type": "counter",
        "counter": 0,
        "belongstotype": "module",
        "belongsto": ["Galactic Artifacts"]
    },
    {
        "name": "Web Shooter",
        "isSelected": false,
        "type": "counter",
        "counter": 3,
        "belongstotype": "hero",
        "belongsto": ["Spider-Man"]
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
        "name": "Armies of Titan"
    },
    {
        "name": "Badoon Headhunter"
    },
    {
        "name": "Band of Badoon"
    },
    {
        "name": "Black Order"
    },
    {
        "name": "Bomb Scare"
    },
    {
        "name": "Children of Thanos"
    },
    {
        "name": "Enchantress"
    },
    {
        "name": "Frost Giants"
    },
    {
        "name": "Galactic Artifacts"
    },
    {
        "name": "GMW Campaign"
    },
    {
        "name": "Hydra Assault"
    },
    {
        "name": "Hydra Patrol"
    },
    {
        "name": "Infinity Gauntlet"
    },
    {
        "name": "Kree Militants"
    },
    {
        "name": "Legions of Hel"
    },
    {
        "name": "Legions of Hydra"
    },
    {
        "name": "Master of Time"
    },
    {
        "name": "Menagerie Medley"
    },
    {
        "name": "MTS Campaign"
    },
    {
        "name": "Power Drain"
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

let aspects = [
    {
        "name": "Aggression"
    },
    {
        "name": "Justice"
    },
    {
        "name": "Leadership"
    },
    {
        "name": "Protection"
    }
]