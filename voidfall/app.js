const LOCALSTORAGENAME = "vfgamestate";
const PAGE_STATE = { StartScreen: 0, Technologies: 1, Calculator: 2 };
const FLEET_TYPE = { Corvette: 0, Destroyer: 1, Dreadnaught: 2, Carrier: 3, Sentry: 4, Voidborn: 5, Sector_Defense: 6, Starbase: 7 };
const TECHS = { Sentries: 0, Destroyers: 1, Dreadnaughts: 2, Carriers: 3, DeepSpaceMissiles: 4, EnergyCells: 5, Shields: 6, AutonomousDrones: 7, Targeting: 8, Torpedoes: 9, Starbases: 10
};

function getFleetDesc(fleet_type) {
    switch (fleet_type) {
        case FLEET_TYPE.Corvette: return 'Corvette';
        case FLEET_TYPE.Destroyer: return 'Destroyer';
        case FLEET_TYPE.Dreadnaught: return 'Dreadnaught';
        case FLEET_TYPE.Carrier: return 'Carrier';
        case FLEET_TYPE.Sentry: return 'Sentry';
        case FLEET_TYPE.Voidborn: return 'Voidborn';
    }
}

const { createApp } = Vue

// tech data
class Technology {
    id;
    name;
    isImproved;
    constructor(id, name, isImproved) {
        this.id = id;
        this.name = name;
        this.isImproved = isImproved;
    }
}

let Technologies = [
    new Technology(TECHS.AutonomousDrones, "Autonomous Drones", false),
    new Technology(TECHS.Carriers, "Carriers", false),
    new Technology(TECHS.DeepSpaceMissiles, "Deep Space Missiles", false),
    new Technology(TECHS.Destroyers, "Destroyers", false),
    new Technology(TECHS.Dreadnaughts, "Dreadnaughts", false),
    new Technology(TECHS.EnergyCells, "Energy Cells", false),
    new Technology(TECHS.Sentries, "Sentries", false),
    new Technology(TECHS.Shields, "Shields", false),
    new Technology(TECHS.Starbases, "Starbases", false),
    new Technology(TECHS.Targeting, "Targeting", false),
    new Technology(TECHS.Torpedoes, "Torpedoes", false),
]

// player classes
class Player {
    id = 0;
    name = '';
    techs = [];
    unusedTechs = [];
    constructor(id, name, techs, unusedTechs) {
        this.id = id;
        this.name = name;
        this.techs = techs;
        this.unusedTechs = unusedTechs;
    }

    isHumanPlayer() {
        return this.id > 0 && this.id != 1000;
    }
}

class PlayerFleet {
    fleetType;
    name;
    power = 0;
    constructor(fleetType, name, power) {
        this.fleetType = fleetType;
        this.name = name;
        this.power = power;
    }
}

let Fleets = [
    new PlayerFleet(FLEET_TYPE.Corvette, 'Corvettes', 0),
    new PlayerFleet(FLEET_TYPE.Destroyer, 'Destroyers', 0),
    new PlayerFleet(FLEET_TYPE.Dreadnaught, 'Dreadnaughts', 0),
    new PlayerFleet(FLEET_TYPE.Carrier, 'Carriers', 0),
    new PlayerFleet(FLEET_TYPE.Sentry, 'Sentries', 0),
    new PlayerFleet(FLEET_TYPE.Voidborn, 'Voidborn', 0),
    new PlayerFleet(FLEET_TYPE.Sector_Defense, 'Sector Defenses', 0),
    new PlayerFleet(FLEET_TYPE.Starbase, 'Starbases', 0)
];

class PlayerDamageOption {
    fleetType;
    powerLoss;
    constructor(fleetType, powerLoss) {
        this.fleetType = fleetType;
        this.powerLoss = powerLoss;
    }
}

class PlayerState {
    id;
    playerid;
    name;
    isInvader = true;
    fleets = _.clone(Fleets);
    techs = [];
    useBombard = false;
    bombardAbsorption = 0;
    spendTradeTokenToUseAutonomousDrones = false;
    spendEnergyToUseBasicDeepSpaceMissiles = false;
    adjacentSectorsWithShipyards = 0;
    adjacentSectorsWithStarbases = 0;
    totalApproachAbsorption = null;
    totalSalvoAbsorption = null;
    
    constructor(id, playerid, name, isInvader, fleets, techs, useBombard, bombardAbsorption, spendTradeTokenToUseAutonomousDrones, spendEnergyToUseBasicDeepSpaceMissiles, adjacentSectorsWithShipyards, adjacentSectorsWithStarbases) {
        this.id = id;
        this.playerid = playerid;
        this.name = name;
        this.isInvader = isInvader;
        this.fleets = fleets; 
        this.techs = techs;
        this.useBombard = useBombard;
        this.bombardAbsorption = bombardAbsorption;
        this.spendTradeTokenToUseAutonomousDrones = spendTradeTokenToUseAutonomousDrones;
        this.spendEnergyToUseBasicDeepSpaceMissiles = spendEnergyToUseBasicDeepSpaceMissiles;
        this.adjacentSectorsWithShipyards = adjacentSectorsWithShipyards;
        this.adjacentSectorsWithStarbases = adjacentSectorsWithStarbases;
        this.totalApproachAbsorption = null;
        this.totalSalvoAbsorption = null;
    }

    getSortableId() {
        if (this.totalVoidbornFleetPower() > 0) {
            return "V" + this.totalVoidbornFleetPower();
        } else {
            let str = "PLYR_";
            str = str + this.totalDreadnaughtFleetPower() + this.totalDestroyerFleetPower() + this.totalSentryFleetPower() + this.totalCarrierFleetPower() + this.totalCorvetteFleetPower();
            return str;
        }
    }

    totalFleetPower() {
        return _.sumBy(_.filter(this.fleets, function(f) {  return f.fleetType !== FLEET_TYPE.Sector_Defense && f.fleetType !== FLEET_TYPE.Starbase; }), function(f) { return f.power });
    }

    totalFleetPowerIsZero() {
        return this.totalFleetPower() === 0;
    }

    isHumanPlayer() {
        return this.playerid > 0 && this.playerid != 1000;
    }

    totalCorvetteFleetPower() {
        return _.find(this.fleets, function(f) { return f.fleetType === FLEET_TYPE.Corvette }).power;
    }

    totalDestroyerFleetPower() {
        return _.find(this.fleets, function(f) { return f.fleetType === FLEET_TYPE.Destroyer }).power;
    }

    totalDreadnaughtFleetPower() {
        return _.find(this.fleets, function(f) { return f.fleetType === FLEET_TYPE.Dreadnaught }).power;
    }

    totalCarrierFleetPower() {
        return _.find(this.fleets, function(f) { return f.fleetType === FLEET_TYPE.Carrier }).power;
    }

    totalSentryFleetPower() {
        return _.find(this.fleets, function(f) { return f.fleetType === FLEET_TYPE.Sentry }).power;
    }

    totalVoidbornFleetPower() {
        return _.find(this.fleets, function(f) { return f.fleetType === FLEET_TYPE.Voidborn }).power;
    }

    totalSectorDefense() {
        return _.find(this.fleets, function(f) { return f.fleetType === FLEET_TYPE.Sector_Defense }).power;
    }

    totalStarbase() {
        return _.find(this.fleets, function(f) { return f.fleetType === FLEET_TYPE.Starbase }).power;
    }

    getFleet(fleetType) {
        // needs to be a reference to the fleet for later updates
        return _.find(this.fleets, function(f) { return f.fleetType === fleetType });
    }

    hasTargetingTech() {
        return _.find(this.techs, function(t) { return t.id === TECHS.Targeting });
    }

    hasImprovedTargetingTech() {
        const tech = _.find(this.techs, function(t) { return t.id === TECHS.Targeting });

        if (tech) {
            return tech.isImproved;
        }
        return false;
    }

    hasDeepSpaceMissiles() {
        return _.find(this.techs, function(t) { return t.id === TECHS.DeepSpaceMissiles });
    }

    hasBasicDeepSpaceMissiles() {
        const tech = _.find(this.techs, function(t) { return t.id === TECHS.DeepSpaceMissiles });

        if (tech) {
            return !tech.isImproved;
        }
        return false;
    }

    hasImprovedDeepSpaceMissiles() {
        const tech = _.find(this.techs, function(t) { return t.id === TECHS.DeepSpaceMissiles });

        if (tech) {
            return tech.isImproved;
        }
        return false;
    }

    hasShields() {
        return _.find(this.techs, function(t) { return t.id === TECHS.Shields });
    }

    hasImprovedShields() {
        const tech = _.find(this.techs, function(t) { return t.id === TECHS.Shields });

        if (tech) {
            return tech.isImproved;
        }
        return false;
    }

    hasEnergyCellTech() {
        return _.find(this.techs, function(t) { return t.id === TECHS.EnergyCells });
    }

    hasImprovedDestroyers() {
        const tech = _.find(this.techs, function(t) { return t.id === TECHS.Destroyers });

        if (tech) {
            return tech.isImproved;
        }
        return false;
    }

    hasImprovedDreadnaughts() {
        const tech = _.find(this.techs, function(t) { return t.id === TECHS.Dreadnaughts });

        if (tech) {
            return tech.isImproved;
        }
        return false;
    }

    hasImprovedCarriers() {
        const tech = _.find(this.techs, function(t) { return t.id === TECHS.Carriers });

        if (tech) {
            return tech.isImproved;
        }
        return false;
    }

    hasAutonomousDrones() {
        return _.find(this.techs, function(t) { return t.id === TECHS.AutonomousDrones });
    }

    hasImprovedAutonomousDrones() {
        const tech = _.find(this.techs, function(t) { return t.id === TECHS.AutonomousDrones });

        if (tech) {
            return tech.isImproved;
        }
        return false;
    }

    hasTorpedoes() {
        return _.find(this.techs, function(t) { return t.id === TECHS.Torpedoes });
    }

    hasBasicTorpedoes() {
        const tech = _.find(this.techs, function(t) { return t.id === TECHS.Torpedoes });

        if (tech) {
            return !tech.isImproved;
        }
        return false;
    }

    hasImprovedTorpedoes() {
        const tech = _.find(this.techs, function(t) { return t.id === TECHS.Torpedoes });

        if (tech) {
            return tech.isImproved;
        }
        return false;
    }

    hasCorvetteRelatedTech() {
        return this.hasShields() || this.hasTorpedoes();
    }

    isDamagePlayerWouldntChoose(fleetType) {
        return fleetType !== FLEET_TYPE.Corvette && !this.hasCorvetteRelatedTech() && this.totalCorvetteFleetPower() > 0;
    }

    initiative() {
        // initiative should be calculated at the beginning of each salvo step
        if (this.hasImprovedTargetingTech()) {
            return 10000;
        }

        let totalInitiative = 0;
        const corvetteFleetPower = this.totalCorvetteFleetPower();
        const destroyerFleetPower = this.totalDestroyerFleetPower();
        const dreadnaughtFleetPower = this.totalDreadnaughtFleetPower();
        const carrierFleetPower = this.totalCarrierFleetPower(); 
        const totalVoidbornFleetPower = this.totalVoidbornFleetPower();
        let initialInitiative = corvetteFleetPower + destroyerFleetPower + dreadnaughtFleetPower + carrierFleetPower + totalVoidbornFleetPower;

        totalInitiative = totalInitiative + initialInitiative;

        if (dreadnaughtFleetPower > 0) { 
            totalInitiative = totalInitiative + 1;
        }

        if (this.isInvader && destroyerFleetPower > 0) { 
            totalInitiative = totalInitiative + 1;
        }

        const sentryFleetPower = this.totalSentryFleetPower();
        if (this.isInvader) {
            totalInitiative = totalInitiative + sentryFleetPower;
        }

        return totalInitiative;
    }

    updateAbsorptionUsed(attack, isApproachStep) {
        if (isApproachStep) {
            this.totalApproachAbsorption = this.totalApproachAbsorption - attack;
            if (this.totalApproachAbsorption < 0) { this.totalApproachAbsorption = 0; }
        } else {
            this.totalSalvoAbsorption = this.totalSalvoAbsorption - attack;
            if (this.totalSalvoAbsorption < 0) { this.totalSalvoAbsorption = 0; }
        }
    }

    absorption(isApproachStep) {
        let totalAbsorption = 0;

        if ((isApproachStep && this.totalApproachAbsorption === null) || (!isApproachStep && this.totalSalvoAbsorption === null)) {

            // defender approach
            if (!this.isInvader && isApproachStep) {
                if (this.hasImprovedShields() && this.totalCorvetteFleetPower() > 0) {
                    totalAbsorption = totalAbsorption + 1;
                }
            }

            // invader approach
            if (this.isInvader && isApproachStep) {
                if (this.hasImprovedShields() && this.totalCorvetteFleetPower() > 0) {
                    totalAbsorption = totalAbsorption + 1;
                }

                totalAbsorption = totalAbsorption + this.totalDreadnaughtFleetPower();

                if (this.hasAutonomousDrones() && this.spendTradeTokenToUseAutonomousDrones) {
                    totalAbsorption = totalAbsorption + 1;
                }

                if (this.useBombard) {
                    totalAbsorption = totalAbsorption + this.bombardAbsorption;
                }
            }

            // defender salvo
            // salvo absorption should only be calculated and used ONCE during a combat
            if (!this.isInvader && !isApproachStep) {
                if (this.hasShields() && this.totalCorvetteFleetPower() > 0) {
                    totalAbsorption = totalAbsorption + 1;
                }

                totalAbsorption = totalAbsorption + this.totalDreadnaughtFleetPower();

                totalAbsorption = totalAbsorption + this.totalCarrierFleetPower();
            }

            // invader salvo
            // salvo absorption should only be calculated and used ONCE during a combat
            if (this.isInvader && !isApproachStep) {
                if (this.hasShields() && this.totalCorvetteFleetPower() > 0) {
                    totalAbsorption = totalAbsorption + 1;
                }

                if (this.hasAutonomousDrones() && this.spendTradeTokenToUseAutonomousDrones) {
                    totalAbsorption = totalAbsorption + 1;
                }

                if (this.hasImprovedAutonomousDrones() && this.spendTradeTokenToUseAutonomousDrones) {
                    totalAbsorption = totalAbsorption + 2;
                }

                if (this.useBombard) {
                    totalAbsorption = totalAbsorption + this.bombardAbsorption;
                }
            }

            if (isApproachStep) {
                this.totalApproachAbsorption = totalAbsorption;
            } else {
                this.totalSalvoAbsorption = totalAbsorption;
            }
        }

        return isApproachStep ? this.totalApproachAbsorption : this.totalSalvoAbsorption;
    }

    damage(isApproachStep, isFirstSalvoStep) {
        let totalDamage = 0;

        // defender approach
        if (!this.isInvader && isApproachStep) {
            totalDamage = totalDamage + this.totalSectorDefense();
            totalDamage = totalDamage + this.totalStarbase();
            totalDamage = totalDamage + this.totalSentryFleetPower();

            if (this.hasImprovedDeepSpaceMissiles()) {
                totalDamage = totalDamage + this.adjacentSectorsWithStarbases;
                totalDamage = totalDamage + (this.adjacentSectorsWithShipyards * 2);
            }

            if (this.hasEnergyCellTech() && totalDamage > 0) {
                totalDamage = totalDamage + 1;
            }
        }

        // invader approach
        if (this.isInvader && isApproachStep) {
            if (this.hasImprovedDestroyers && this.totalDestroyerFleetPower() > 0) {
                totalDamage = totalDamage + 1;
            }

            if (this.hasBasicDeepSpaceMissiles() && this.spendEnergyToUseBasicDeepSpaceMissiles && (this.adjacentSectorsWithShipyards + this.adjacentSectorsWithStarbases > 0)) {
                totalDamage = totalDamage + 1;
            }

            if (this.hasImprovedDeepSpaceMissiles() && (this.adjacentSectorsWithShipyards + this.adjacentSectorsWithStarbases > 0)) {
                if (this.adjacentSectorsWithShipyards + this.adjacentSectorsWithStarbases > 1) {
                    totalDamage = totalDamage + 2;
                } else {
                    totalDamage = totalDamage + 1;
                }
            }
        }

        // defender salvo
        if (!this.isInvader && !isApproachStep) {
            totalDamage = 1; // base damage is always 1
            if (this.hasBasicTorpedoes() && this.totalCorvetteFleetPower() > 0 && isFirstSalvoStep) {
                totalDamage = totalDamage + 1;
            }

            if (this.hasImprovedTorpedoes() && this.totalCorvetteFleetPower() > 0) {
                totalDamage = totalDamage + 1;
            }
        }

        // invader salvo
        if (this.isInvader && !isApproachStep) {
            totalDamage = 1; // base damage is always 1
            if (this.hasBasicTorpedoes() && this.totalCorvetteFleetPower() > 0 && isFirstSalvoStep) {
                totalDamage = totalDamage + 1;
            }

            if (this.hasImprovedTorpedoes() && this.totalCorvetteFleetPower() > 0) {
                totalDamage = totalDamage + 1;
            }

            if (isFirstSalvoStep) {
                totalDamage = totalDamage + this.totalDestroyerFleetPower();
            }
        }

        return totalDamage;
    }

    calculateDamageCombinations(damageToApply) {
        const allDistributions = [];
        const fleetsWithPower = _.filter(this.fleets, function(f) { return f.power > 0 && f.fleetType !== FLEET_TYPE.Sector_Defense && f.fleetType !== FLEET_TYPE.Starbase });

        if (damageToApply > this.totalFleetPower()) {
            damageToApply = this.totalFleetPower();
        } 
        
        // Initialize a queue with a single empty distribution and remaining damage to apply.
        const queue = [{ distribution: [], remainingDamage: damageToApply }];

        while (queue.length > 0) {
            const { distribution, remainingDamage } = queue.shift();

            const nextIndex = distribution.length;

            if (nextIndex === fleetsWithPower.length) {
                // We've made it through all fleets. Check if we've distributed all damage.
                if (remainingDamage === 0) {
                    allDistributions.push([...distribution]);
                }
                continue;
            }

            // We loop through each possible damage value for the current fleet.
            const maxDamageForThisFleet = Math.min(remainingDamage, fleetsWithPower[nextIndex].power);
            for (let damage = 0; damage <= maxDamageForThisFleet; damage++) {
                queue.push({
                    distribution: [...distribution, { fleetType: fleetsWithPower[nextIndex].fleetType, damage }],
                    remainingDamage: remainingDamage - damage,
                });
            }
        }

        // check if we're not dropping Corvettes when we could
        let misusingCorvettes = false;
        let totalCorvetteFleetPower = this.totalCorvetteFleetPower();
        let hasCorvetteRelatedTech = this.hasCorvetteRelatedTech();
        let canPrioritizeCorvettes = totalCorvetteFleetPower > 0 && !hasCorvetteRelatedTech;

        for (let distribution of allDistributions) {
            let corvetteUsage = _.filter(distribution, function(d) { return d.fleetType === FLEET_TYPE.Corvette });
            let corvetteUsageSum = _.sumBy(corvetteUsage, 'damage');
            let nonCorvetteUsage = _.filter(distribution, function(d) { return d.fleetType === FLEET_TYPE.Carrier || d.fleetType === FLEET_TYPE.Destroyer || d.fleetType === FLEET_TYPE.Dreadnaught || d.fleetType === FLEET_TYPE.Sentry });
            let nonCorvetteUsageSum = _.sumBy(nonCorvetteUsage, 'damage');
            if (canPrioritizeCorvettes && nonCorvetteUsageSum > 0 && corvetteUsageSum < totalCorvetteFleetPower) {
                distribution.misusingCorvettes = true;
            }
        }

        let distributionsToReturn = [];
        let isMisusingCorvettes = _.filter(allDistributions, function(d) { return d.misusingCorvettes });
        let isNotMisusingCorvettes = _.filter(allDistributions, function(d) { return !d.misusingCorvettes });
        if (canPrioritizeCorvettes && isNotMisusingCorvettes.length === 0) {
            distributionsToReturn = allDistributions;
        }
        else if (canPrioritizeCorvettes && isNotMisusingCorvettes && isNotMisusingCorvettes.length > 0) {
            distributionsToReturn = isNotMisusingCorvettes;
        }
        else {
            distributionsToReturn = allDistributions;
        }

        return distributionsToReturn;              
    }
}

// calculation results classes
const STEP_TYPE = { Approach: 0, Salvo: 1 };
const RESULT_TYPE = { Unknown: 0, Tie: 1, Invader: 2, Defender: 3 };
class Result {
    winner;
    steps = [];
    invader;
    defender;
    fleets;
    sortableId = "";
    constructor(winner, steps, invader, defender, invaderFleet, defenderFleet) {
        this.winner = winner;
        this.steps = steps;
        this.invader = invader;
        this.defender = defender;
        this.fleets = {
            invaderFleet: invaderFleet,
            defenderFleet: defenderFleet
        }

        if (this.winner === RESULT_TYPE.Tie) {
            this.sortableId = this.invader.getSortableId() + "_" + this.defender.getSortableId();
        }
        if (this.winner === RESULT_TYPE.Invader) {
            this.sortableId = this.invader.getSortableId();
        }
        if (this.winner === RESULT_TYPE.Defender) {
            this.sortableId = this.defender.getSortableId();
        }
    }
}

class ResultStep {
    stepType;
    salvoNumber = 1;
    details = [];
    desc;
    invader;
    defender;
    constructor(stepType, salvoNumber, details, desc, invader, defender) {
        this.stepType = stepType;
        this.salvoNumber = salvoNumber;
        this.details = details;
        this.desc = desc;
        this.invader = invader;
        this.defender = defender;
    }
}

class ResultDetail {
    invaderInitiative = 0;
    defenderInitiative = 0;
    invaderDamage = 0;
    defenderDamage = 0;
    invaderAbsorption = 0;
    defenderAbsorption = 0;
    desc;
    constructor(invaderInitiative, defenderInitiative, invaderDamage, defenderDamage, invaderAbsorption, defenderAbsorption, desc) {
        this.invaderInitiative = invaderInitiative;
        this.defenderInitiative = defenderInitiative;
        this.invaderDamage = invaderDamage;
        this.defenderDamage = defenderDamage;
        this.invaderAbsorption = invaderAbsorption;
        this.defenderAbsorption = defenderAbsorption;
        this.desc = desc;
    }
}

// app
createApp({
    data() { return {
        numberOfPlayers: 1,
        pageState: PAGE_STATE.StartScreen,
        players: [
            new Player(1, 'Player 1', [], _.clone(Technologies)),
            new Player(2, 'Player 2', [], _.clone(Technologies)),
            new Player(3, 'Player 3', [], _.clone(Technologies)),
            new Player(4, 'Player 4', [], _.clone(Technologies))
        ],
        technologies: _.clone(Technologies),
        invaderState: new PlayerState(1, -1, '', true, _.cloneDeep(Fleets), [], false, 0, false, false, 0, 0),
        defenderState: new PlayerState(2, -1, '', false, _.cloneDeep(Fleets), [], false, 0, false, false, 0, 0),
        results: [],
        showResults: false,
        computedUpdater: 1,
        version: "0.35"
    } },
    watch: {
        numberOfPlayers(val) {
            let numberOfPlayers = val;
            let nextPlayerNumber = this.players.length + 1;
    
            while (this.players.length < numberOfPlayers) {
                this.players.push(new Player(nextPlayerNumber, 'Player ' + nextPlayerNumber, [], _.clone(Technologies)));
                nextPlayerNumber = this.players.length + 1;
            }
        }
    },
    mounted: function() {
        this.computedUpdater++;
        if (localStorage.getItem(LOCALSTORAGENAME)) {
            let gameState = JSON.parse(localStorage.getItem(LOCALSTORAGENAME));

            this.pageState = gameState.pageState;
            this.numberOfPlayers = gameState.numberOfPlayers;
 
            for (let i=0; i<gameState.players.length; i++) {
                this.players[i] = new Player(gameState.players[i].id, gameState.players[i].name, gameState.players[i].techs, gameState.players[i].unusedTechs);
            }

            if (this.numberOfPlayers < 4) {
                this.players.pop();
            }

            if (this.numberOfPlayers < 3) {
                this.players.pop();
            }

            if (this.numberOfPlayers < 2) {
                this.players.pop();
            }

            this.technologies = gameState.technologies;

            this.invaderState = new PlayerState(gameState.invaderState.id, gameState.invaderState.playerid, gameState.invaderState.name, gameState.invaderState.isInvader, gameState.invaderState.fleets, gameState.invaderState.techs, gameState.invaderState.useBombard, gameState.invaderState.bombardAbsorption, gameState.invaderState.spendTradeTokenToUseAutonomousDrones, gameState.invaderState.spendEnergyToUseBasicDeepSpaceMissiles, gameState.invaderState.adjacentSectorsWithShipyards, gameState.invaderState.adjacentSectorsWithStarbases);

            this.defenderState = new PlayerState(gameState.defenderState.id, gameState.defenderState.playerid, gameState.defenderState.name, gameState.defenderState.isInvader, gameState.defenderState.fleets, gameState.defenderState.techs, gameState.defenderState.useBombard, gameState.defenderState.bombardAbsorption, gameState.defenderState.spendTradeTokenToUseAutonomousDrones, gameState.defenderState.spendEnergyToUseBasicDeepSpaceMissiles, gameState.defenderState.adjacentSectorsWithShipyards, gameState.defenderState.adjacentSectorsWithStarbases);

            this.computedUpdater++;
        }
    },
    computed: {
        calculationPlayers: function () {
            return [
                this.invaderState,
                this.defenderState
            ]
        }
    },
    methods: {
        start: function () {
            if (this.players.length === 4) {
                if (this.numberOfPlayers < 4) {
                    this.players.pop();
                }

                if (this.numberOfPlayers < 3) {
                    this.players.pop();
                }

                if (this.numberOfPlayers < 2) {
                    this.players.pop();
                }
            }
            
            this.pageState = PAGE_STATE.Technologies;

            window.scrollTo(0,0);
            this.saveGameState();
        },
        showTech: function (event) {
            this.pageState = PAGE_STATE.Technologies;
            console.log(this.players);
            window.scrollTo(0,0);
            event.preventDefault();
            this.saveGameState();
        },
        showCalculator: function (event) {
            this.pageState = PAGE_STATE.Calculator;
            window.scrollTo(0,0);
            event.preventDefault();
            this.saveGameState();
        },
        addTech: function (playerIndex, tech, unusedTechIndex) {
            this.players[playerIndex].techs.push(_.clone(tech));
            this.players[playerIndex].unusedTechs.splice(unusedTechIndex, 1);
            this.players[playerIndex].techs = _.sortBy(this.players[playerIndex].techs, 'name');
            this.saveGameState();
            this.showResults = false;
        },
        playerHasTech: function (index, tech) {
            return !_.find(this.players[index].techs, function(t) { return t.id === tech.id });
        },
        improveTech: function (event, playerIndex, techIndex) {
            this.players[playerIndex].techs[techIndex].isImproved = true;
            event.preventDefault();
            this.saveGameState();
            this.showResults = false;
        },
        demoteTech: function (event, playerIndex, techIndex) {
            this.players[playerIndex].techs[techIndex].isImproved = false;
            event.preventDefault();
            this.saveGameState();
            this.showResults = false;
        },
        removeTech: function (event, playerIndex, techIndex) {
            this.players[playerIndex].techs[techIndex].isImproved = false;
            this.players[playerIndex].unusedTechs.push(_.clone(this.players[playerIndex].techs[techIndex]));
            this.players[playerIndex].techs.splice(techIndex, 1);
            event.preventDefault();
            this.players[playerIndex].unusedTechs = _.sortBy(this.players[playerIndex].unusedTechs, 'name');
            this.saveGameState();
            this.showResults = false;
        },
        showFleet: function(calcPlayerIndex, playerFleetIndex) {
            let showFleet = true;
            let player = this.getPlayerById(this.calculationPlayers[calcPlayerIndex].playerid);

            // destroyers
            if (player && !_.find(player.techs, function(t) { return t.id === TECHS.Destroyers }) && this.calculationPlayers[calcPlayerIndex].fleets[playerFleetIndex].fleetType === FLEET_TYPE.Destroyer) {
                showFleet = false;
            }

            // dreadnaughts
            if (player && !_.find(player.techs, function(t) { return t.id === TECHS.Dreadnaughts }) && this.calculationPlayers[calcPlayerIndex].fleets[playerFleetIndex].fleetType === FLEET_TYPE.Dreadnaught) {
                showFleet = false;
            }

            // carriers
            if (player && !_.find(player.techs, function(t) { return t.id === TECHS.Carriers }) && this.calculationPlayers[calcPlayerIndex].fleets[playerFleetIndex].fleetType === FLEET_TYPE.Carrier) {
                showFleet = false;
            }

            // sentries
            if (player && !_.find(player.techs, function(t) { return t.id === TECHS.Sentries }) && this.calculationPlayers[calcPlayerIndex].fleets[playerFleetIndex].fleetType === FLEET_TYPE.Sentry) {
                showFleet = false;
            }

            // starbases
            if (player && !_.find(player.techs, function(t) { return t.id === TECHS.Starbases }) && this.calculationPlayers[calcPlayerIndex].fleets[playerFleetIndex].fleetType === FLEET_TYPE.Starbase) {
                showFleet = false;
            }

            // voidborn
            if (this.calculationPlayers[calcPlayerIndex].playerid != 1000 && this.calculationPlayers[calcPlayerIndex].fleets[playerFleetIndex].fleetType === FLEET_TYPE.Voidborn) {
                showFleet = false;
            }

            if (this.calculationPlayers[calcPlayerIndex].playerid == 1000 && this.calculationPlayers[calcPlayerIndex].fleets[playerFleetIndex].fleetType !== FLEET_TYPE.Voidborn && this.calculationPlayers[calcPlayerIndex].fleets[playerFleetIndex].fleetType !== FLEET_TYPE.Sector_Defense) {
                showFleet = false;
            }

            if (this.calculationPlayers[calcPlayerIndex].isInvader && this.calculationPlayers[calcPlayerIndex].fleets[playerFleetIndex].fleetType === FLEET_TYPE.Sector_Defense) {
                showFleet = false;
            }

            // reset power to zero if tech is gone
            if (!showFleet) { this.calculationPlayers[calcPlayerIndex].fleets[playerFleetIndex].power = 0; }

            return showFleet;
        },
        updatePlayerFleet: function(event, calcPlayerIndex, playerFleetIndex, increment) {
            if (increment < 0 && this.calculationPlayers[calcPlayerIndex].fleets[playerFleetIndex].power === 0) { return };

            this.calculationPlayers[calcPlayerIndex].fleets[playerFleetIndex].power = this.calculationPlayers[calcPlayerIndex].fleets[playerFleetIndex].power + increment;

            if (this.showResults) { // if we're already showing results, re-calculate automatically
                this.calculate();
            }

            event.preventDefault();
            this.saveGameState();
        },
        playerByIdHasTech: function(playerid, techid) {
            if (playerid <= 0 || playerid == 1000) { return false; }
            let player = this.getPlayerById(playerid);
            if (!player) {
                return false;
            }
            return _.find(player.techs, function(t) { return t.id === techid });
        },
        playerHasAutonomousDrones: function(playerid) {
            return this.playerByIdHasTech(playerid, TECHS.AutonomousDrones);
        },
        playerHasBasicDeepSpaceMissiles: function(playerid) {
            const tech = this.playerByIdHasTech(playerid, TECHS.DeepSpaceMissiles);
            if (tech) {
                return !tech.isImproved;
            }
        },
        playerHasImprovedDeepSpaceMissiles: function(playerid) {
            const tech = this.playerByIdHasTech(playerid, TECHS.DeepSpaceMissiles);
            if (tech) {
                return tech.isImproved;
            }
        },
        playerHasStarbases: function(playerid) {
            return this.playerByIdHasTech(playerid, TECHS.Starbases);
        },
        updateBombardAbsorption: function(event, calcPlayerIndex, increment) {
            if (increment < 0 && this.calculationPlayers[calcPlayerIndex].bombardAbsorption === 0) { return };

            this.calculationPlayers[calcPlayerIndex].bombardAbsorption = this.calculationPlayers[calcPlayerIndex].bombardAbsorption + increment;

            this.showResults = true;

            event.preventDefault();
            this.saveGameState();
        },
        updateAdjacentSectorsWithShipyards: function(event, calcPlayerIndex, increment) {
            if (increment < 0 && this.calculationPlayers[calcPlayerIndex].adjacentSectorsWithShipyards === 0) { return };

            this.calculationPlayers[calcPlayerIndex].adjacentSectorsWithShipyards = this.calculationPlayers[calcPlayerIndex].adjacentSectorsWithShipyards + increment;

            this.showResults = true;

            event.preventDefault();
            this.saveGameState();
        },
        updateAdjacentSectorsWithStarbases: function(event, calcPlayerIndex, increment) {
            if (increment < 0 && this.calculationPlayers[calcPlayerIndex].adjacentSectorsWithStarbases === 0) { return };

            this.calculationPlayers[calcPlayerIndex].adjacentSectorsWithStarbases = this.calculationPlayers[calcPlayerIndex].adjacentSectorsWithStarbases + increment;

            this.showResults = true;

            event.preventDefault();
            this.saveGameState();
        },
        calcPlayerChanged: function(calcPlayerChanged) {
            for (let fleet of this.calculationPlayers[calcPlayerChanged].fleets) {
                fleet.power = 0;
            }
            this.calculationPlayers[calcPlayerChanged].spendTradeTokenToUseAutonomousDrones = false;
            this.calculationPlayers[calcPlayerChanged].useBombard = false;
            this.calculationPlayers[calcPlayerChanged].bombardAbsorption = 0;
            this.calculationPlayers[calcPlayerChanged].spendEnergyToUseBasicDeepSpaceMissiles = false;
            this.calculationPlayers[calcPlayerChanged].adjacentSectorsWithShipyards = 0;
            this.calculationPlayers[calcPlayerChanged].adjacentSectorsWithStarbases = 0;
            this.showResults = false;

            // copy techs
            let player = this.getPlayerById(this.calculationPlayers[calcPlayerChanged].playerid);
            if (player && player.isHumanPlayer()) {
                this.calculationPlayers[calcPlayerChanged].techs = player.techs;
            }
            this.computedUpdater++;
            this.saveGameState();
        },
        getPlayerById: function (id) {
            return _.find(this.players, function(p) { return p.id === id });
        },
        calculate: function () {
            // calculate possible invader/defender outcomes (Voidfall rulebook, page 35)
            let invader = _.cloneDeep(this.invaderState);
            let defender = _.cloneDeep(this.defenderState);

            if (invader.playerid === defender.playerid) {
                alert("ERROR: The invader and defender must be different players!");
                return;
            }

            if (invader.isHumanPlayer()) {
                invader.techs = _.cloneDeep(this.getPlayerById(invader.playerid).techs);
            }

            if (defender.isHumanPlayer()) {
                defender.techs = _.cloneDeep(this.getPlayerById(defender.playerid).techs);
            }

            let results = [];
            results = _.flattenDeep(this.runCalc(invader, defender, false, 0, [], results));
            let groupedResults = _.groupBy(results, 'winner');
            //console.log(groupedResults);

            // prepare results
            let preparedResults = {};
            
            let ties = groupedResults["1"];
            let groupedTies;
            if (ties) {
                groupedTies = _.groupBy(_.orderBy(ties, ["sortableId"], ["desc"]), "sortableId");
                let preparedTies = [];
                Object.entries(groupedTies).forEach(([key, value]) => {
                    preparedTies.push({ invaderFleet: value[0].fleets.invaderFleet, defenderFleet: value[0].fleets.defenderFleet, steps: value[0].steps });
                });
                preparedResults.ties = preparedTies;
            }

            let invaderWins = groupedResults["2"];
            let groupedInvaderWins;
            if (invaderWins) {
                groupedInvaderWins = _.groupBy(_.orderBy(invaderWins, ["sortableId"], ["desc"]), "sortableId");
                let preparedInvaderWins = [];
                Object.entries(groupedInvaderWins).forEach(([key, value]) => {
                    preparedInvaderWins.push({ winnerFleet: value[0].fleets.invaderFleet, steps: value[0].steps });
                });
                preparedResults.invaderWins = preparedInvaderWins;
            }

            let defenderWins = groupedResults["3"];
            let groupedDefenderWins;
            if (defenderWins) { 
                groupedDefenderWins = _.groupBy(_.orderBy(defenderWins, "sortableId", ["sortableId"], ["desc"]), "sortableId");
                let preparedDefenderWins = [];
                Object.entries(groupedDefenderWins).forEach(([key, value]) => {
                    preparedDefenderWins.push({ winnerFleet: value[0].fleets.defenderFleet, steps: value[0].steps });
                });
                preparedResults.defenderWins = preparedDefenderWins;
            }

            this.results = preparedResults;
            this.showResults = true;
            this.saveGameState();
        },
        runCalc: function(invader, defender, hasAbsorptionStepRun = false, salvoNumber, steps = [], results = []) {
            // combat ends when one side has no fleet power
            let invaderFleetPower = invader.totalFleetPower();
            let defenderFleetPower = defender.totalFleetPower();

            // approach
            if (!hasAbsorptionStepRun) {
                
                let defenderAbsorption = defender.absorption(true);
                let invaderDamage = invader.damage(true, false);
                let invaderDamageToApply =  Math.max(0, invaderDamage - defenderAbsorption);
                let damageCombinations = defender.calculateDamageCombinations(invaderDamageToApply);
                defender.updateAbsorptionUsed(invaderDamage, true);
                if (invaderDamageToApply < 0) { invaderDamageToApply = 0; }
                let wasDamageFullyAbsorbed = invaderDamageToApply === 0;
                if (wasDamageFullyAbsorbed) { invaderDamageToApply = 1; } // temporary for the loop

                let invaderAbsorption = invader.absorption(true);
                let defenderDamage = defender.damage(true, false);
                let defenderDamageToApply =  Math.max(0, defenderDamage - invaderAbsorption);
                let damageCombinations2 = invader.calculateDamageCombinations(defenderDamageToApply);
                invader.updateAbsorptionUsed(defenderDamage, true);
                if (defenderDamageToApply < 0) { defenderDamageToApply = 0; }
                let wasDamageFullyAbsorbed2 = defenderDamageToApply === 0;
                if (wasDamageFullyAbsorbed2) { defenderDamageToApply = 1; } // temporary for the loop

                for (let damageCombination of damageCombinations) {
                    let resultDesc = '';
                    for (let dc of damageCombination) {
                        if (dc.damage > 0) resultDesc = resultDesc + `${dc.damage} defender ${getFleetDesc(dc.fleetType)} lost. `;
                    }
                    let newSteps = [...steps];
                    if (!wasDamageFullyAbsorbed) {
                        for (let dc of damageCombination) {
                            let fleet = defender.getFleet(dc.fleetType);
                            fleet.power = fleet.power - dc.damage;
                        }
                    }

                    for (let damageCombination2 of damageCombinations2) {
                        for (let dc of damageCombination2) {
                            if (dc.damage > 0) resultDesc = resultDesc + `${dc.damage} invader ${getFleetDesc(dc.fleetType)} lost. `;
                        }
                        let newSteps2 = [...newSteps];
                        if (!wasDamageFullyAbsorbed2) {
                            for (let dc of damageCombination2) {
                                let fleet = invader.getFleet(dc.fleetType);
                                fleet.power = fleet.power - dc.damage;
                            }
                        }

                        let resultDetail = null;

                        if (wasDamageFullyAbsorbed && wasDamageFullyAbsorbed2) {
                            resultDetail = new ResultDetail(-1, -1, invaderDamage, defenderDamage, invaderAbsorption, defenderAbsorption, `No damage to either side.`);
                        }
                        else {
                            resultDetail = new ResultDetail(-1, -1, invaderDamage, defenderDamage, invaderAbsorption, defenderAbsorption, resultDesc);
                        }

                        newSteps2.push(new ResultStep(STEP_TYPE.Approach, salvoNumber, resultDetail, "Invader and Defender hit simultaneously", _.cloneDeep(invader), _.cloneDeep(defender)));

                        if (invader.totalFleetPower() === 0 && defender.totalFleetPower() === 0) {
                            let result = new Result(RESULT_TYPE.Tie, newSteps2, _.cloneDeep(invader), _.cloneDeep(defender), _.cloneDeep(invader.fleets), _.cloneDeep(defender.fleets));
                            let newResults = [...results];
                            newResults.push(result);
                            return [...newResults];
                        }
            
                        if (invader.totalFleetPower() === 0 && defender.totalFleetPower() > 0) {
                            let result = new Result(RESULT_TYPE.Defender, newSteps2, _.cloneDeep(invader), _.cloneDeep(defender), _.cloneDeep(invader.fleets), _.cloneDeep(defender.fleets));
                            let newResults = [...results];
                            newResults.push(result);
                            return [...newResults];
                        }
            
                        if (invader.totalFleetPower() > 0 && defender.totalFleetPower() === 0) {
                            let result = new Result(RESULT_TYPE.Invader, newSteps2, _.cloneDeep(invader), _.cloneDeep(defender), _.cloneDeep(invader.fleets), _.cloneDeep(defender.fleets));
                            let newResults = [...results];
                            newResults.push(result);
                            return [...newResults];
                        }

                        results.push(this.runCalc(_.cloneDeep(invader), _.cloneDeep(defender), true, salvoNumber, [...newSteps2]));

                        if (!wasDamageFullyAbsorbed2) {
                            for (let dc of damageCombination2) {
                                let fleet = invader.getFleet(dc.fleetType);
                                fleet.power = fleet.power + dc.damage;
                            }
                        }
                    }

                    if (!wasDamageFullyAbsorbed) {
                        for (let dc of damageCombination) {
                            let fleet = defender.getFleet(dc.fleetType);
                            fleet.power = fleet.power + dc.damage;
                        }
                    }
                }
            }

            // salvos
            if (hasAbsorptionStepRun) {
                let initiative = this.calculateInitiative(invader, defender);
                salvoNumber = salvoNumber + 1;

                if (initiative.invaderInitiative > initiative.defenderInitiative) {
                    let defenderAbsorption = defender.absorption(false);
                    let invaderDamage = invader.damage(false, salvoNumber === 1);
                    let invaderDamageToApply = Math.max(0, invaderDamage - defenderAbsorption);
                    let damageCombinations = defender.calculateDamageCombinations(invaderDamageToApply);
                    defender.updateAbsorptionUsed(invaderDamage, false);
                    if (invaderDamageToApply < 0) { invaderDamageToApply = 0; }
                    let wasDamageFullyAbsorbed = invaderDamageToApply === 0;
                    if (wasDamageFullyAbsorbed) { invaderDamageToApply = 1; } // temporary for the loop
                    
                    for (let damageCombination of damageCombinations) {
                        let newSteps = [...steps];
                        let resultDesc = '';
                        for (let dc of damageCombination) {
                            if (dc.damage > 0) resultDesc = resultDesc + `${dc.damage} defender ${getFleetDesc(dc.fleetType)} lost. `;
                        }
                        if (!wasDamageFullyAbsorbed) {
                            for (let dc of damageCombination) {
                                let fleet = defender.getFleet(dc.fleetType);
                                fleet.power = fleet.power - dc.damage;
                            }

                            if (defenderAbsorption > 0) {
                                resultDesc = resultDesc + defenderAbsorption + ' absorption.';
                            }

                            let resultDetail = new ResultDetail(initiative.invaderInitiative, initiative.defenderInitiative, invaderDamage, 0, 0, defenderAbsorption, resultDesc);

                            newSteps.push(new ResultStep(STEP_TYPE.Salvo, salvoNumber, resultDetail, "Invader hits first", _.cloneDeep(invader), _.cloneDeep(defender)));

                            // when one goes first, check after each half of the salvo
                            if (invader.totalFleetPower() === 0 && defender.totalFleetPower() === 0) {
                                let result = new Result(RESULT_TYPE.Tie, newSteps, _.cloneDeep(invader), _.cloneDeep(defender), _.cloneDeep(invader.fleets), _.cloneDeep(defender.fleets));
                                let newResults = [...results];
                                newResults.push(result);
                                return [...newResults];
                            }
                
                            if (invader.totalFleetPower() > 0 && defender.totalFleetPower() === 0) {
                                let result = new Result(RESULT_TYPE.Invader, newSteps, _.cloneDeep(invader), _.cloneDeep(defender), _.cloneDeep(invader.fleets), _.cloneDeep(defender.fleets));
                                let newResults = [...results];
                                newResults.push(result);
                                return [...newResults];
                            }
                        } else {
                            let resultDetail = new ResultDetail(initiative.invaderInitiative, initiative.defenderInitiative, invaderDamage, 0, 0, defenderAbsorption, `Defender absorbed all damage.`);

                            newSteps.push(new ResultStep(STEP_TYPE.Salvo, salvoNumber, resultDetail, "Invader hits first", _.cloneDeep(invader), _.cloneDeep(defender)));
                        }

                        let invaderAbsorption = invader.absorption(false);
                        let defenderDamage = defender.damage(false, salvoNumber === 1);
                        let defenderDamageToApply =  Math.max(0, defenderDamage - invaderAbsorption);
                        let damageCombinations = invader.calculateDamageCombinations(defenderDamageToApply);
                        invader.updateAbsorptionUsed(defenderDamage, false);
                        if (defenderDamageToApply < 0) { defenderDamageToApply = 0; }
                        let wasDamageFullyAbsorbed2 = defenderDamageToApply === 0;
                        if (wasDamageFullyAbsorbed2) { defenderDamageToApply = 1; } // temporary for the loop
                        for (let damageCombination of damageCombinations) {
                            let resultDesc = '';
                            for (let dc of damageCombination) {
                                if (dc.damage > 0) resultDesc = resultDesc + `${dc.damage} invader ${getFleetDesc(dc.fleetType)} lost. `;
                            }
                            let newSteps2 = [...newSteps];
                            if (!wasDamageFullyAbsorbed2) {
                                for (let dc of damageCombination) {
                                    let fleet = invader.getFleet(dc.fleetType);
                                    fleet.power = fleet.power - dc.damage;
                                }

                                if (invaderAbsorption > 0) {
                                    resultDesc = resultDesc + invaderAbsorption + ' absorption.';
                                }

                                let resultDetail = new ResultDetail(initiative.invaderInitiative, initiative.defenderInitiative, 0, defenderDamage, invaderAbsorption, 0, resultDesc);

                                newSteps2.push(new ResultStep(STEP_TYPE.Salvo, salvoNumber, resultDetail, "Defender hits second", _.cloneDeep(invader), _.cloneDeep(defender)));

                                // when one goes first, check after each half of the salvo
                                if (invader.totalFleetPower() === 0 && defenderFleetPower === 0) {
                                    let result = new Result(RESULT_TYPE.Tie, newSteps2, _.cloneDeep(invader), _.cloneDeep(defender), _.cloneDeep(invader.fleets), _.cloneDeep(defender.fleets));
                                    let newResults = [...results];
                                    newResults.push(result);
                                    return [...newResults];
                                }
                    
                                if (invader.totalFleetPower() === 0 && defender.totalFleetPower() > 0) {
                                    let result = new Result(RESULT_TYPE.Defender, newSteps2, _.cloneDeep(invader), _.cloneDeep(defender), _.cloneDeep(invader.fleets), _.cloneDeep(defender.fleets));
                                    let newResults = [...results];
                                    newResults.push(result);
                                    return [...newResults];
                                }
                            } else {
                                let resultDetail = new ResultDetail(initiative.invaderInitiative, initiative.defenderInitiative, 0, defenderDamage, invaderAbsorption, 0, `Invader absorbed all damage.`);

                                newSteps2.push(new ResultStep(STEP_TYPE.Salvo, salvoNumber, resultDetail, "Defender hits second", _.cloneDeep(invader), _.cloneDeep(defender)));
                            }

                            results.push(this.runCalc(_.cloneDeep(invader), _.cloneDeep(defender), hasAbsorptionStepRun, salvoNumber, [...newSteps2]));

                            if (!wasDamageFullyAbsorbed2) {
                                for (let dc of damageCombination) {
                                    let fleet = invader.getFleet(dc.fleetType);
                                    fleet.power = fleet.power + dc.damage;
                                }
                            }
                        }

                        if (!wasDamageFullyAbsorbed) {
                            for (let dc of damageCombination) {
                                let fleet = defender.getFleet(dc.fleetType);
                                fleet.power = fleet.power + dc.damage;
                            }
                        }
                    
                    }
                }

                if (initiative.invaderInitiative < initiative.defenderInitiative) {

                    let invaderAbsorption = invader.absorption(false);
                    let defenderDamage = defender.damage(false, salvoNumber === 1);
                    let defenderDamageToApply =  Math.max(0, defenderDamage - invaderAbsorption);
                    let damageCombinations = invader.calculateDamageCombinations(defenderDamageToApply);
                    invader.updateAbsorptionUsed(defenderDamage, false);
                    if (defenderDamageToApply < 0) { defenderDamageToApply = 0; }
                    let wasDamageFullyAbsorbed = defenderDamageToApply === 0;
                    if (wasDamageFullyAbsorbed) { defenderDamageToApply = 1; } // temporary for the loop
                    for (let damageCombination of damageCombinations) {
                        let resultDesc = '';
                        for (let dc of damageCombination) {
                            if (dc.damage > 0) resultDesc = resultDesc + `${dc.damage} invader ${getFleetDesc(dc.fleetType)} lost. `;
                        }
                        let newSteps = [...steps];

                        if (!wasDamageFullyAbsorbed) {
                            for (let dc of damageCombination) {
                                let fleet = invader.getFleet(dc.fleetType);
                                fleet.power = fleet.power - dc.damage;
                            }

                            if (invaderAbsorption > 0) {
                                resultDesc = resultDesc + invaderAbsorption + ' absorption.';
                            }

                            let resultDetail = new ResultDetail(initiative.invaderInitiative, initiative.defenderInitiative, 0, defenderDamage, invaderAbsorption, 0, resultDesc);

                            newSteps.push(new ResultStep(STEP_TYPE.Salvo, salvoNumber, resultDetail, "Defender hits first", _.cloneDeep(invader), _.cloneDeep(defender)));

                            if (invader.totalFleetPower() === 0 && defender.totalFleetPower() === 0) {
                                let result = new Result(RESULT_TYPE.Tie, newSteps, _.cloneDeep(invader), _.cloneDeep(defender), _.cloneDeep(invader.fleets), _.cloneDeep(defender.fleets));
                                let newResults = [...results];
                                newResults.push(result);
                                return [...newResults];
                            }
                
                            if (invader.totalFleetPower() === 0 && defender.totalFleetPower() > 0) {
                                let result = new Result(RESULT_TYPE.Defender, newSteps, _.cloneDeep(invader), _.cloneDeep(defender), _.cloneDeep(invader.fleets), _.cloneDeep(defender.fleets));
                                let newResults = [...results];
                                newResults.push(result);
                                return [...newResults];
                            }
                        } else {
                            let resultDetail = new ResultDetail(initiative.invaderInitiative, initiative.defenderInitiative, 0, defenderDamage, invaderAbsorption, 0, `Invader absorbed all damage`);

                            newSteps.push(new ResultStep(STEP_TYPE.Salvo, salvoNumber, resultDetail, "Defender hits first", _.cloneDeep(invader), _.cloneDeep(defender)));
                        }

                        let defenderAbsorption = defender.absorption(false);
                        let invaderDamage = invader.damage(false, salvoNumber === 1);
                        let invaderDamageToApply =  Math.max(0, invaderDamage - defenderAbsorption);
                        let damageCombinations = defender.calculateDamageCombinations(invaderDamageToApply);
                        defender.updateAbsorptionUsed(invaderDamage, false);
                        let wasDamageFullyAbsorbed2 = invaderDamageToApply === 0;
                        if (wasDamageFullyAbsorbed2) { invaderDamageToApply = 1; } // temporary for the loop
                        for (let damageCombination of damageCombinations) {
                            let resultDesc = '';
                            for (let dc of damageCombination) {
                                if (dc.damage > 0) resultDesc = resultDesc + `${dc.damage} defender ${getFleetDesc(dc.fleetType)} lost. `;
                            }
                            let newSteps2 = [...newSteps];
                            if (!wasDamageFullyAbsorbed2) {
                                for (let dc of damageCombination) {
                                    let fleet = defender.getFleet(dc.fleetType);
                                    fleet.power = fleet.power - dc.damage;
                                }

                                if (defenderAbsorption > 0) {
                                    resultDesc = resultDesc + defenderAbsorption + ' absorption.';
                                }

                                let resultDetail = new ResultDetail(initiative.invaderInitiative, initiative.defenderInitiative, invaderDamage, 0, 0, defenderAbsorption, resultDesc);

                                newSteps2.push(new ResultStep(STEP_TYPE.Salvo, salvoNumber, resultDetail, "Invader hits second", _.cloneDeep(invader), _.cloneDeep(defender)));

                                // when one goes first, check after each half of the salvo
                                if (invader.totalFleetPower() === 0 && defender.totalFleetPower() === 0) {
                                    let result = new Result(RESULT_TYPE.Tie, newSteps2, _.cloneDeep(invader), _.cloneDeep(defender), _.cloneDeep(invader.fleets), _.cloneDeep(defender.fleets));
                                    let newResults = [...results];
                                    newResults.push(result);
                                    return [...newResults];
                                }
                    
                                if (invader.totalFleetPower() > 0 && defender.totalFleetPower() === 0) {
                                    let result = new Result(RESULT_TYPE.Invader, newSteps2, _.cloneDeep(invader), _.cloneDeep(defender), _.cloneDeep(invader.fleets), _.cloneDeep(defender.fleets));
                                    let newResults = [...results];
                                    newResults.push(result);
                                    return [...newResults];
                                }
                            } else {
                                let resultDetail = new ResultDetail(initiative.invaderInitiative, initiative.defenderInitiative, invaderDamage, 0, 0, defenderAbsorption, `Defender absorbed all damage`);

                                newSteps2.push(new ResultStep(STEP_TYPE.Salvo, salvoNumber, resultDetail, "Invader hits second", _.cloneDeep(invader), _.cloneDeep(defender)));
                            }

                            results.push(this.runCalc(_.cloneDeep(invader), _.cloneDeep(defender), hasAbsorptionStepRun, salvoNumber, [...newSteps2]));

                            if (!wasDamageFullyAbsorbed2) {
                                for (let dc of damageCombination) {
                                    let fleet = defender.getFleet(dc.fleetType);
                                    fleet.power = fleet.power + dc.damage;
                                }
                            }
                        }

                        if (!wasDamageFullyAbsorbed) {
                            for (let dc of damageCombination) {
                                let fleet = invader.getFleet(dc.fleetType);
                                fleet.power = fleet.power + dc.damage;
                            }
                        }
                    }
                }

                if (initiative.invaderInitiative === initiative.defenderInitiative) {

                    let defenderAbsorption = defender.absorption(false);
                    let invaderDamage = invader.damage(false, salvoNumber === 1);
                    let invaderDamageToApply =  Math.max(0, invaderDamage - defenderAbsorption);
                    let damageCombinations = defender.calculateDamageCombinations(invaderDamageToApply);
                    defender.updateAbsorptionUsed(invaderDamage, false);
                    if (invaderDamageToApply < 0) { invaderDamageToApply = 0; }
                    let wasDamageFullyAbsorbed = invaderDamageToApply === 0;
                    if (wasDamageFullyAbsorbed) { invaderDamageToApply = 1; } // temporary for the loop

                    let invaderAbsorption = invader.absorption(false);
                    let defenderDamage = defender.damage(false, salvoNumber === 1);
                    let defenderDamageToApply =  Math.max(0, defenderDamage - invaderAbsorption);
                    let damageCombinations2 = invader.calculateDamageCombinations(defenderDamageToApply);
                    invader.updateAbsorptionUsed(defenderDamage, false);
                    if (defenderDamageToApply < 0) { defenderDamageToApply = 0; }
                    let wasDamageFullyAbsorbed2 = defenderDamageToApply === 0;
                    if (wasDamageFullyAbsorbed2) { defenderDamageToApply = 1; } // temporary for the loop

                    for (let damageCombination of damageCombinations) {
                        let resultDesc = '';
                        for (let dc of damageCombination) {
                            if (dc.damage > 0) resultDesc = resultDesc + `${dc.damage} defender ${getFleetDesc(dc.fleetType)} lost. `;
                        }
                        let newSteps = [...steps];
                        if (!wasDamageFullyAbsorbed) {
                            for (let dc of damageCombination) {
                                let fleet = defender.getFleet(dc.fleetType);
                                fleet.power = fleet.power - dc.damage;
                            }
                        }

                        for (let damageCombination2 of damageCombinations2) {
                            for (let dc of damageCombination2) {
                                if (dc.damage > 0) resultDesc = resultDesc + `${dc.damage} invader ${getFleetDesc(dc.fleetType)} lost. `;
                            }
                            let newSteps2 = [...newSteps];
                            if (!wasDamageFullyAbsorbed2) {
                                for (let dc of damageCombination2) {
                                    let fleet = invader.getFleet(dc.fleetType);
                                    fleet.power = fleet.power - dc.damage;
                                }
                            }

                            let resultDetail = null;

                            if (wasDamageFullyAbsorbed && wasDamageFullyAbsorbed2) {
                                resultDetail = new ResultDetail(initiative.invaderInitiative, initiative.defenderInitiative, invaderDamage, defenderDamage, invaderAbsorption, defenderAbsorption, `No damage to either side.`);
                            }
                            else {

                                if (defenderAbsorption > 0) {
                                    resultDesc = resultDesc + defenderAbsorption + ' defender absorption.';
                                }

                                if (invaderAbsorption > 0) {
                                    resultDesc = resultDesc + invaderAbsorption + ' invader absorption.';
                                }

                                resultDetail = new ResultDetail(initiative.invaderInitiative, initiative.defenderInitiative, invaderDamage, defenderDamage, invaderAbsorption, defenderAbsorption, resultDesc);
                            }

                            newSteps2.push(new ResultStep(STEP_TYPE.Salvo, salvoNumber, resultDetail, "Invader and Defender hit simultaneously", _.cloneDeep(invader), _.cloneDeep(defender)));

                            if (invader.totalFleetPower() === 0 && defender.totalFleetPower() === 0) {
                                let result = new Result(RESULT_TYPE.Tie, newSteps2, _.cloneDeep(invader), _.cloneDeep(defender), _.cloneDeep(invader.fleets), _.cloneDeep(defender.fleets));
                                let newResults = [...results];
                                newResults.push(result);
                                return [...newResults];
                            }
                
                            if (invader.totalFleetPower() === 0 && defender.totalFleetPower() > 0) {
                                let result = new Result(RESULT_TYPE.Defender, newSteps2, _.cloneDeep(invader), _.cloneDeep(defender), _.cloneDeep(invader.fleets), _.cloneDeep(defender.fleets));
                                let newResults = [...results];
                                newResults.push(result);
                                return [...newResults];
                            }
                
                            if (invader.totalFleetPower() > 0 && defender.totalFleetPower() === 0) {
                                let result = new Result(RESULT_TYPE.Invader, newSteps2, _.cloneDeep(invader), _.cloneDeep(defender), _.cloneDeep(invader.fleets), _.cloneDeep(defender.fleets));
                                let newResults = [...results];
                                newResults.push(result);
                                return [...newResults];
                            }

                            results.push(this.runCalc(_.cloneDeep(invader), _.cloneDeep(defender), hasAbsorptionStepRun, salvoNumber, [...newSteps2]));

                            if (!wasDamageFullyAbsorbed2) {
                                for (let dc of damageCombination2) {
                                    let fleet = invader.getFleet(dc.fleetType);
                                    fleet.power = fleet.power + dc.damage;
                                }
                            }
                        }

                        if (!wasDamageFullyAbsorbed) {
                            for (let dc of damageCombination) {
                                let fleet = defender.getFleet(dc.fleetType);
                                fleet.power = fleet.power + dc.damage;
                            }
                        }
                    }
                }
            }

            return [...results];
        },
        calculateInitiative: function(invader, defender) {
            const invaderInitiative = invader.initiative();
            const defenderInitiative = defender.initiative();
            return {
                invaderInitiative: invaderInitiative,
                defenderInitiative: defenderInitiative
            }
        },
        calculateAbsorption: function(invader, defender, isApproachStep) {
            const invaderAbsorption = invader.absorption(isApproachStep);
            const defenderAbsorption = defender.absorption(isApproachStep);
            return {
                invaderAbsorption: invaderAbsorption,
                defenderAbsorption: defenderAbsorption
            }
        },
        calculateDamage: function(invader, defender, isApproachStep, isFirstSalvoStep) {
            const invaderDamage = invader.damage(isApproachStep, isFirstSalvoStep);
            const defenderDamage = defender.damage(isApproachStep, isFirstSalvoStep);
            return {
                invaderDamage: invaderDamage,
                defenderDamage: defenderDamage
            }
        },
        getFleetDesc(fleetType) {
            return getFleetDesc(fleetType);
        },
        newgame: function (event) {
            if (confirm('Are you sure you want to clear the app and start a new game?')) {
                this.pageState = PAGE_STATE.StartScreen;
                this.numberOfPlayers = 1;
                this.players = [
                    new Player(1, 'Player 1', [], _.clone(Technologies)),
                    new Player(2, 'Player 2', [], _.clone(Technologies)),
                    new Player(3, 'Player 3', [], _.clone(Technologies)),
                    new Player(4, 'Player 4', [], _.clone(Technologies))
                ];
                this.resetPlayerStates();
                this.results = [];
                this.showResults = false;
            }
            
            window.scrollTo(0,0);
            event.preventDefault();
            this.saveGameState();
        },
        resetCalc: function() {
            this.resetPlayerStates();
            this.results = [];
            this.saveGameState();
        },
        resetPlayerStates() {
            this.invaderState = new PlayerState(1, -1, '', true, _.cloneDeep(Fleets), [], false, 0, false, false, 0, 0);
            this.defenderState = new PlayerState(2, -1, '', false, _.cloneDeep(Fleets), [], false, 0, false, false, 0, 0);
            this.saveGameState();
        },
        saveGameState: function() {
            let gameState = {};
            gameState.pageState = this.pageState;
            gameState.numberOfPlayers = this.numberOfPlayers;
            gameState.players = this.players;
            gameState.technologies = this.technologies;
            gameState.invaderState = this.invaderState;
            gameState.defenderState = this.defenderState;

            localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(gameState));

            this.computedUpdater++;
        }
    }
}).mount("#vf");