const LOCALSTORAGENAME = "vfgamestate";
const PAGE_STATE = { StartScreen: 0, Technologies: 1, Calculator: 2 };
const FLEET_TYPE = { Corvette: 0, Destroyer: 1, Dreadnaught: 2, Carrier: 3, Sentry: 4, Voidborn: 5, Sector_Defense: 6, Starbase: 7 };
const TECHS = { Sentries: 0, Destroyers: 1, Dreadnaughts: 2, Carriers: 3, DeepSpaceMissiles: 4, EnergyCells: 5, Shields: 6, AutonomousDrones: 7, Targeting: 8, Torpedoes: 9, Starbases: 10
};

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

class PlayerState {
    id;
    playerid;
    name;
    isInvader = true;
    fleets = _.clone(Fleets);
    techs = [];
    useBombard = false;
    bombardAbsorption = 0;
    useTradeToken = false;
    
    constructor(id, playerid, name, isInvader, fleets, techs, useBombard, bombardAbsorption, useTradeToken) {
        this.id = id;
        this.playerid = playerid;
        this.name = name;
        this.isInvader = isInvader;
        this.fleets = fleets; 
        this.techs = techs;
        this.useBombard = useBombard;
        this.bombardAbsorption = bombardAbsorption;
        this.useTradeToken = useTradeToken;
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
        invaderState: new PlayerState(1, -1, '', true, _.cloneDeep(Fleets), [], false, 0, false),
        defenderState: new PlayerState(2, -1, '', false, _.cloneDeep(Fleets), [], false, 0, false),
        results: [],
        computedUpdater: 1,
        version: "0.1"
    } },
    mounted: function() {
        this.computedUpdater++;
        if (localStorage.getItem(LOCALSTORAGENAME)) {
            let gameState = JSON.parse(localStorage.getItem(LOCALSTORAGENAME));
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
            this.pageState = PAGE_STATE.Technologies;

            if (this.numberOfPlayers < 4) {
                this.players.pop();
            }

            if (this.numberOfPlayers < 3) {
                this.players.pop();
            }

            if (this.numberOfPlayers < 2) {
                this.players.pop();
            }

            window.scrollTo(0,0);
            this.saveGameState();
        },
        showTech: function (event) {
            this.pageState = PAGE_STATE.Technologies;
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
        },
        playerHasTech: function (index, tech) {
            return !_.find(this.players[index].techs, function(t) { return t.id === tech.id });
        },
        improveTech: function (event, playerIndex, techIndex) {
            this.players[playerIndex].techs[techIndex].isImproved = true;
            event.preventDefault();
        },
        demoteTech: function (event, playerIndex, techIndex) {
            this.players[playerIndex].techs[techIndex].isImproved = false;
            event.preventDefault();
        },
        removeTech: function (event, playerIndex, techIndex) {
            this.players[playerIndex].techs[techIndex].isImproved = false;
            this.players[playerIndex].unusedTechs.push(_.clone(this.players[playerIndex].techs[techIndex]));
            this.players[playerIndex].techs.splice(techIndex, 1);
            event.preventDefault();
            this.players[playerIndex].unusedTechs = _.sortBy(this.players[playerIndex].unusedTechs, 'name');
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

            event.preventDefault();
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
        updateBombardAbsorption: function(event, calcPlayerIndex, increment) {
            if (increment < 0 && this.calculationPlayers[calcPlayerIndex].bombardAbsorption === 0) { return };

            this.calculationPlayers[calcPlayerIndex].bombardAbsorption = this.calculationPlayers[calcPlayerIndex].bombardAbsorption + increment;

            event.preventDefault();
        },
        calcPlayerChanged: function(calcPlayerChanged) {
            for (let fleet of this.calculationPlayers[calcPlayerChanged].fleets) {
                fleet.power = 0;
            }
            this.calculationPlayers[calcPlayerChanged].useBombard = false;
            this.calculationPlayers[calcPlayerChanged].bombardAbsorption = 0;
        },
        getPlayerById: function (id) {
            return _.find(this.players, function(p) { return p.id === id });
        },
        calculate: function () {

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
            this.invaderState = new PlayerState('', true, _.clone(Fleets), [], false, 0);
            this.defenderState = new PlayerState('', false, _.clone(Fleets), [], false, 0);
        },
        saveGameState: function() {
            let gameState = {};
            gameState.pageState = this.pageState;
            gameState.numberOfPlayers = this.numberOfPlayers;
            gameState.players = this.players;
            gameState.invaderState = this.invaderState;
            gameState.defenderState = this.defenderState;
            //localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(gameState));

            this.computedUpdater++;
        }
    }
}).mount("#vf");