const fs = require('fs');
const path = require('path');

function capitalizeSetCode(setCode) {
    // Convert set_code like "morlock_siege" to "Morlock Siege"
    return setCode.split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');  // Join with space instead of empty string
}

function usesCounters(card) {
    // Check for S.H.I.E.L.D. support cards
    if (card.type_code === 'support' && card.traits && card.traits.includes('S.H.I.E.L.D.')) {
        return true;
    }
    
    // Check for Suit form upgrades
    if (card.type_code === 'upgrade' && card.text && card.text.includes('Suit form.')) {
        return true;
    }

    if (!card.text) return false;
    
    // Strip HTML tags and convert to lowercase
    const text = card.text.toLowerCase().replace(/<[^>]*>/g, '');
    
    // Patterns that indicate a card receives or uses counters itself
    const receivesCounterPatterns = [
        /uses \(\d+ \w+ counters?\)/,  // "Uses (3 warrior counters)"
        /enters? play with \d+ \w+ counters?/i,  // "enters play with 2 psionic counters"
        /starts? with \d+ \w+ counters?/i,  // "starts with 3 growth counters"
        /place \d+ \w+ counters? on (this|itself|~)/i,  // "place 2 growth counters on this card"
        /put \d+ \w+ counters? on (this|itself|~)/i,  // "put 3 time counters on ~"
        /remove \d+ \w+ counters? from (this|itself|~)/i,  // "remove a quantum counter from this card"
        /ratings counters? here/i,  // For environment cards that track ratings counters
        /\d+ \w+ counters? on it/i,  // "with 2 acceleration counters on it"
        /\d+ \w+ counters? from it/i,  // "remove 1 threat counter from it"
        /counters? from (this|itself|~)/i,  // Generic "remove counters from this card"
        /\d+ \w+ counters? here/i,  // "momentum counter here"
        /gets \+\d+ \w+ for each \w+ counter/i,  // "gets +1 ATK for each momentum counter"
        /gets \+\d+ \w+ points? for each \w+ counter/i,  // "gets +1 hit points for each luck counter"
        /place \d+ \w+ counters? here\b/i,  // "place 1 knock counter here"
        /\w+ counters? here\b/i,  // "knock counter here"
        /if there (is|are) \d+ \w+ counters? here/i,  // "if there are 3 knock counters here"
        /if there are at least \d+ \w+ counters? here/i  // "if there are at least 3 knock counters here"
    ];

    // Patterns that indicate the card only gives counters to other cards
    const givesCounterPatterns = [
        /place \d+ \w+ counters? on (target|another|that|a|an|the \w+)/i,  // "place 1 counter on target"
        /put \d+ \w+ counters? on (target|another|that|a|an|the \w+)/i,  // "put 1 counter on another"
        /remove \d+ \w+ counters? from (target|another|that|a|an|the \w+)/i,  // "remove counter from target"
        /counter(s|ed|ing)? target/i,  // "counter target attack"
        /counter(s|ed|ing)? (a|an|that)/i,  // "counter an attack"
        /place \d+\[per_hero\] \w+ counters? on/i,  // "place 3[per_hero] ratings counters on"
        /place \d+ ratings counters? on/i,  // "place 1 ratings counter on The Champion"
        /place \d+ \w+ counters? on each/i,  // "place 1 threat counter on each scheme"
        /place \d+ \w+ counters? on \w+(?! (counter|here))/i,  // "place 1 momentum counter on Juggernaut" but not if followed by "counter" or "here"
        /place \d+ all-purpose counters? on/i,  // "place 1 all-purpose counter on a S.H.I.E.L.D. support"
        /move \d+ all-purpose counters? from/i,  // "move 1 all-purpose counter from a S.H.I.E.L.D. support"
        /add \d+ all-purpose counters? to/i,  // "add 1 all-purpose counter to a S.H.I.E.L.D. support"
        /place a total of \d+ all-purpose counters?/i,  // "place a total of 3 all-purpose counters..."
        /remove \d+ all-purpose counters? from/i  // "remove 1 all-purpose counter from a support"
    ];

    // If card has any receives pattern, it uses counters
    const receives = receivesCounterPatterns.some(pattern => pattern.test(text));
    
    // If card only has gives patterns and no receives patterns, it doesn't use counters
    const onlyGives = !receives && givesCounterPatterns.some(pattern => pattern.test(text));

    return receives && !onlyGives;
}

function processCardData(inputDir, outputFile) {
    // First read the existing data file
    let existingData = {
        heroes: [],
        villains: [],
        main_schemes: [],
        side_schemes: [],
        minions: [],
        allies: [],
        counter_cards: [],
        modules: [],  // Start with empty array
        aspects: [
            { name: "Aggression" },
            { name: "Justice" },
            { name: "Leadership" },
            { name: "Protection" }
        ]
    };

    // Add debug logging
    console.log('Starting processing...');

    if (fs.existsSync(outputFile)) {
        const content = fs.readFileSync(outputFile, 'utf8');
        
        // Load all arrays consistently
        const heroesMatch = content.match(/let heroes = (.*?);/s);
        if (heroesMatch) existingData.heroes = eval(heroesMatch[1]);
        const villainsMatch = content.match(/let villains = (.*?);/s);
        if (villainsMatch) existingData.villains = eval(villainsMatch[1]);
        const mainSchemesMatch = content.match(/let main_schemes = (.*?);/s);
        if (mainSchemesMatch) existingData.main_schemes = eval(mainSchemesMatch[1]);
        const sideSchemesMatch = content.match(/let side_schemes = (.*?);/s);
        if (sideSchemesMatch) existingData.side_schemes = eval(sideSchemesMatch[1]);
        const minionsMatch = content.match(/let minions = (.*?);/s);
        if (minionsMatch) existingData.minions = eval(minionsMatch[1]);
        const alliesMatch = content.match(/let allies = (.*?);/s);
        if (alliesMatch) existingData.allies = eval(alliesMatch[1]);
        const counterCardsMatch = content.match(/let (counter_cards|countercards) = (.*?);/s);
        if (counterCardsMatch) existingData.counter_cards = eval(counterCardsMatch[2]);
        const modulesMatch = content.match(/let modules = (.*?);/s);
        if (modulesMatch) existingData.modules = eval(modulesMatch[1]);
        const aspectsMatch = content.match(/let aspects = (.*?);/s);
        if (aspectsMatch) existingData.aspects = eval(aspectsMatch[1]);
    }

    // Log new modules as we find them
    const modules = new Set();
    
    const heroes = [];
    const villains = [];
    const minions = [];
    const allies = [];
    const mainSchemes = [];
    const sideSchemes = [];
    const counterCards = [];
    const heroNameMap = new Map();
    const villainNameMap = new Map();
    const villainSetCodes = new Set();
    const seenAllies = new Set();

    // Read all JSON files in the input directory
    const files = fs.readdirSync(inputDir).filter(file => file.endsWith('.json'));

    // First pass: Process heroes and villains only
    for (const file of files) {
        const data = JSON.parse(fs.readFileSync(path.join(inputDir, file), 'utf8'));
        for (const card of data) {
            if (card.type_code === 'hero' && card.set_code) {
                heroNameMap.set(card.set_code, card.name);
            }
            
            // Store all villain cards by set_code for lookup
            if (card.type_code === 'villain' && card.stage === 1) {
                villainNameMap.set(card.set_code, card.name);
                villainSetCodes.add(card.set_code);  // Add to Set
            }
            
            // Only process stage 1 villains for the villains array
            if (card.type_code === 'villain' && card.stage === null && card.back_link) {
                const villainCard = {
                    name: card.name,
                    isSelected: false,
                    type: 'villain',
                    hitpoints: card.health,
                    hitpointsper: card.health_per_hero || false
                };
                villains.push(villainCard);
            }
        }
    }

    // Second pass: Process everything else
    for (const file of files) {
        const data = JSON.parse(fs.readFileSync(path.join(inputDir, file), 'utf8'));
        for (const card of data) {
            const baseCard = {
                name: card.name,
                isSelected: false
            };

            // Process based on type_code
            switch (card.type_code) {
                case 'hero':
                    const heroCard = {
                        ...baseCard,
                        type: 'hero',
                        hitpoints: card.health
                    };
                    
                    if (usesCounters(card)) {
                        heroCard.useCounter = true;
                        heroCard.counter = 0;
                    }
                    
                    heroes.push(heroCard);
                    break;

                case 'minion':
                    const minionCard = {
                        ...baseCard,
                        type: 'minion',
                        hitpoints: card.health,
                        hitpointsper: card.health_per_hero || false
                    };

                    // Check if minion uses counters
                    if (usesCounters(card)) {
                        minionCard.useCounter = true;
                        minionCard.counter = 0;
                    }

                    // Add belongsto relationships if card has a set_code
                    if (card.set_code) {
                        if (card.set_code.includes('_nemesis')) {
                            const heroSetCode = card.set_code.replace('_nemesis', '');
                            const heroName = heroNameMap.get(heroSetCode);
                            minionCard.belongstotype = 'hero';
                            minionCard.belongsto = [heroName];
                        } else {
                            // Check if this belongs to a villain
                            const villainName = villainNameMap.get(card.set_code);
                            if (villainName) {
                                minionCard.belongstotype = 'villain';
                                minionCard.belongsto = [villainName];
                            } else {
                                minionCard.belongstotype = 'module';
                                const moduleName = capitalizeSetCode(card.set_code);
                                minionCard.belongsto = [moduleName];
                                if (!villainSetCodes.has(card.set_code)) {
                                    modules.add(moduleName);
                                }
                            }
                        }
                    }
                    
                    minions.push(minionCard);
                    break;

                case 'ally':
                    if (!seenAllies.has(card.name)) {
                        seenAllies.add(card.name);
                        allies.push({
                            ...baseCard,
                            type: 'ally',
                            hitpoints: card.health
                        });
                    }
                    break;

                case 'main_scheme':
                    // Process all main scheme cards that don't have a front_link (they're not the back of another card)
                    if (!card.front_link) {
                        // For stage 1 cards (with back_link), find the stage 2 card to get values
                        // For stage 2+ cards (no back_link), use their own values
                        const stage2Card = card.back_link ? data.find(c => c.code === card.back_link) : card;
                        
                        const mainSchemeCard = {
                            ...baseCard,
                            type: 'main_scheme',
                            threat: stage2Card.threat || 0,  // Get threat from stage 2/back side
                            basethreat: stage2Card.base_threat || 0  // Get base_threat from stage 2/back side
                        };

                        // Check if main scheme uses counters by looking at both sides
                        if (usesCounters(card) || (stage2Card && usesCounters(stage2Card))) {
                            mainSchemeCard.useCounter = true;
                            mainSchemeCard.counter = 0;
                        }

                        if (card.set_code) {
                            // Get the villain's name directly from the map
                            const villainName = villainNameMap.get(card.set_code);
                            if (villainName) {
                                mainSchemeCard.belongstotype = 'villain';
                                mainSchemeCard.belongsto = [villainName];
                            } else {
                                // If no villain found, treat as module
                                mainSchemeCard.belongstotype = 'module';
                                const moduleName = capitalizeSetCode(card.set_code);
                                mainSchemeCard.belongsto = [moduleName];
                                if (!villainSetCodes.has(card.set_code)) {
                                    modules.add(moduleName);
                                }
                            }
                        }

                        mainSchemes.push(mainSchemeCard);
                    }
                    break;

                case 'side_scheme':
                case 'player_side_scheme':
                    if (card.stage === 1 || !card.stage) {
                        const sideSchemeCard = {
                            ...baseCard,
                            type: 'side_scheme',
                            threat: card.base_threat,
                            basethreat: card.base_threat,
                            basethreatfixed: card.base_threat_fixed || false
                        };

                        // Only add isPlayerSideScheme if it's true
                        if (card.type_code === 'player_side_scheme') {
                            sideSchemeCard.isPlayerSideScheme = true;
                        }

                        if (card.set_code) {
                            if (card.set_code.includes('_nemesis')) {
                                const heroSetCode = card.set_code.replace('_nemesis', '');
                                const heroName = heroNameMap.get(heroSetCode);
                                sideSchemeCard.belongstotype = 'hero';
                                sideSchemeCard.belongsto = [heroName];
                            } else if (card.type_code === 'player_side_scheme') {
                                // Check if this is an aspect card
                                if (['aggression', 'justice', 'leadership', 'protection'].includes(card.faction_code)) {
                                    sideSchemeCard.belongstotype = 'aspect';
                                    sideSchemeCard.belongsto = [card.faction_code.charAt(0).toUpperCase() + card.faction_code.slice(1)];
                                } else {
                                    // Check if it belongs to a hero
                                    const heroName = heroNameMap.get(card.set_code);
                                    if (heroName) {
                                        sideSchemeCard.belongstotype = 'hero';
                                        sideSchemeCard.belongsto = [heroName];
                                    } else {
                                        // If no hero found, treat as module
                                        sideSchemeCard.belongstotype = 'module';
                                        const moduleName = capitalizeSetCode(card.set_code);
                                        sideSchemeCard.belongsto = [moduleName];
                                        if (!villainSetCodes.has(card.set_code)) {
                                            modules.add(moduleName);
                                        }
                                    }
                                }
                            } else {
                                // Check if this belongs to a villain first
                                const villainName = villainNameMap.get(card.set_code);
                                if (villainName) {
                                    sideSchemeCard.belongstotype = 'villain';
                                    sideSchemeCard.belongsto = [villainName];
                                } else {
                                    sideSchemeCard.belongstotype = 'module';
                                    const moduleName = capitalizeSetCode(card.set_code);
                                    sideSchemeCard.belongsto = [moduleName];
                                    if (!villainSetCodes.has(card.set_code)) {
                                        modules.add(moduleName);
                                    }
                                }
                            }
                        }

                        sideSchemes.push(sideSchemeCard);
                    }
                    break;

                case 'villain':
                    // Add stage 1 villains or villains with no stage
                    if (card.stage === 1 || !card.stage) {
                        const villainCard = {
                            ...baseCard,
                            type: 'villain',
                            hitpoints: card.health,
                            hitpointsper: card.health_per_hero || false
                        };

                        // Check if villain uses counters
                        if (usesCounters(card)) {
                            villainCard.useCounter = true;
                            villainCard.counter = 0;
                        }

                        villains.push(villainCard);

                        // Add to villain name map for belongsto relationships
                        if (card.set_code) {
                            villainNameMap.set(card.set_code, card.name);
                            villainSetCodes.add(card.set_code);
                        }
                    }
                    break;

                default:
                    // Skip if card is already one of our main types
                    if (['villain', 'hero', 'ally', 'minion', 'main_scheme', 'side_scheme'].includes(card.type_code)) {
                        break;
                    }

                    // If it's not one of our main types but uses counters, add to counter cards
                    if (usesCounters(card)) {
                        // Only add stage 1 environment cards that use counters
                        if (card.type_code === 'environment' && card.back_link && !card.stage) {
                            const counterCard = {
                                ...baseCard,
                                type: 'counter',
                                counter: 0
                            };
                            
                            // Add belongsto relationships if card has a set_code
                            if (card.set_code) {
                                if (card.set_code.includes('_nemesis')) {
                                    const heroSetCode = card.set_code.replace('_nemesis', '');
                                    const heroName = heroNameMap.get(heroSetCode);
                                    counterCard.belongstotype = 'hero';
                                    counterCard.belongsto = [heroName];
                                } else {
                                    counterCard.belongstotype = 'module';
                                    const moduleName = capitalizeSetCode(card.set_code);
                                    counterCard.belongsto = [moduleName];
                                    if (!villainSetCodes.has(card.set_code)) {
                                        modules.add(moduleName);
                                    }
                                }
                            }
                            
                            counterCards.push(counterCard);
                        }
                        // For non-environment cards that use counters
                        else if (card.type_code !== 'environment') {
                            const counterCard = {
                                ...baseCard,
                                type: 'counter',
                                counter: 0
                            };
                            
                            // Add belongsto relationships if card has a set_code
                            if (card.set_code) {
                                if (card.set_code.includes('_nemesis')) {
                                    const heroSetCode = card.set_code.replace('_nemesis', '');
                                    const heroName = heroNameMap.get(heroSetCode);
                                    counterCard.belongstotype = 'hero';
                                    counterCard.belongsto = [heroName];
                                } else {
                                    counterCard.belongstotype = 'module';
                                    const moduleName = capitalizeSetCode(card.set_code);
                                    counterCard.belongsto = [moduleName];
                                    if (!villainSetCodes.has(card.set_code)) {
                                        modules.add(moduleName);
                                    }
                                }
                            }
                            
                            counterCards.push(counterCard);
                        }
                    }
                    break;
            }
        }
    }

    // Just before creating the output content, sort all arrays:
    heroes.sort((a, b) => a.name.localeCompare(b.name));
    villains.sort((a, b) => a.name.localeCompare(b.name));
    mainSchemes.sort((a, b) => a.name.localeCompare(b.name));
    sideSchemes.sort((a, b) => a.name.localeCompare(b.name));
    minions.sort((a, b) => a.name.localeCompare(b.name));
    allies.sort((a, b) => a.name.localeCompare(b.name));
    counterCards.sort((a, b) => a.name.localeCompare(b.name));
    // Sort modules array after mapping
    const sortedModules = Array.from(modules)
        .sort((a, b) => a.localeCompare(b))
        .map(m => ({ name: m }));

    // Merge function for arrays
    function mergeArrays(existing, newItems, type) {
        const merged = [...existing];
        for (const newItem of newItems) {
            const existingIndex = merged.findIndex(e => e.name === newItem.name);
            if (existingIndex === -1) {
                // New item, just add it (we'll sort at the end)
                merged.push(newItem);
            } else if (type === 'ally' && merged[existingIndex].hitpoints !== newItem.hitpoints) {
                // Ally with different hitpoints, append source
                const source = newItem.belongsto?.[0] || 'Unknown';
                newItem.name = `${newItem.name} (${source})`;
                merged.push(newItem);
            }
            // else skip duplicate
        }
        // Sort the entire array at the end
        return merged.sort((a, b) => a.name.localeCompare(b.name));
    }

    // Create a mergeModules function similar to mergeArrays
    function mergeModules(existing, newNames) {
        const merged = [...existing];  // Start with existing modules
        for (const name of newNames) {
            if (!merged.find(m => m.name === name)) {
                // Find insert position to maintain alphabetical order
                const insertIndex = merged.findIndex(m => m.name.localeCompare(name) > 0);
                if (insertIndex === -1) {
                    merged.push({ name });
                } else {
                    merged.splice(insertIndex, 0, { name });
                }
            }
        }
        return merged;
    }

    // Merge all arrays
    const finalData = {
        heroes: mergeArrays(existingData.heroes, heroes, 'hero'),
        villains: mergeArrays(existingData.villains, villains, 'villain'),
        main_schemes: mergeArrays(existingData.main_schemes, mainSchemes, 'main_scheme'),
        side_schemes: mergeArrays(existingData.side_schemes, sideSchemes, 'side_scheme'),
        minions: mergeArrays(existingData.minions, minions, 'minion'),
        allies: mergeArrays(existingData.allies, allies, 'ally'),
        counter_cards: mergeArrays(existingData.counter_cards, counterCards, 'counter'),
        modules: mergeModules(existingData.modules, Array.from(modules)),
        aspects: existingData.aspects
    };

    // Before writing the output file, show report of new items:
    console.log('\nNew items found:');
    console.log('---------------');

    if (heroes.length > 0) {
        console.log('\nHeroes:', heroes.map(h => h.name));
    }

    if (villains.length > 0) {
        console.log('\nVillains:', villains.map(v => v.name));
    }

    if (mainSchemes.length > 0) {
        console.log('\nMain Schemes:', mainSchemes.map(m => m.name));
    }

    if (sideSchemes.length > 0) {
        console.log('\nSide Schemes:', sideSchemes.map(s => s.name));
    }

    if (minions.length > 0) {
        console.log('\nMinions:', minions.map(m => m.name));
    }

    if (allies.length > 0) {
        console.log('\nAllies:', allies.map(a => a.name));
    }

    if (counterCards.length > 0) {
        console.log('\nCounter Cards:', counterCards.map(c => c.name));
    }

    if (modules.size > 0) {
        console.log('\nModules:', Array.from(modules));
    }

    console.log('\n---------------');

    // Create the output content
    const output = `let heroes = ${JSON.stringify(finalData.heroes, null, 4)};\n\n` +
                  `let villains = ${JSON.stringify(finalData.villains, null, 4)};\n\n` +
                  `let main_schemes = ${JSON.stringify(finalData.main_schemes, null, 4)};\n\n` +
                  `let side_schemes = ${JSON.stringify(finalData.side_schemes, null, 4)};\n\n` +
                  `let minions = ${JSON.stringify(finalData.minions, null, 4)};\n\n` +
                  `let allies = ${JSON.stringify(finalData.allies, null, 4)};\n\n` +
                  `let countercards = ${JSON.stringify(finalData.counter_cards, null, 4)};\n\n` +
                  `let modules = ${JSON.stringify(finalData.modules, null, 4)};\n\n` +
                  `let aspects = ${JSON.stringify(finalData.aspects, null, 4)};`;

    // Write the output file
    fs.writeFileSync(outputFile, output, 'utf8');
}

// Usage
const inputDirectory = './data';  // Directory containing JSON files
const outputFile = './processed.js';

try {
    processCardData(inputDirectory, outputFile);
    console.log('Data processing completed successfully');
} catch (error) {
    console.error('Error processing data:', error);
}