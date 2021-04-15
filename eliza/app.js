// toString for names of spaces by industries
function spaceToString(space) {
    let toStringResult = _.join(space.types, ' / ');

    let replacedString = toStringResult.replace(/0|1|2|3|4|5/gi, function(matched){
    return industryStringMap[matched];
    });

    return replacedString;
}

function romanize(level) {
    if (level === 1) return "I";
    if (level === 2) return "II";
    if (level === 3) return "III";
    if (level === 4) return "IV";
    if (level === 5) return "V";
    if (level === 6) return "VI";
    if (level === 7) return "VII";
    if (level === 8) return "VIII";

    throw new Exception("Level must be between 1 and 8");
}

// player boards (hold tiles)
const INITIAL_HUMAN_BOARD = _.cloneDeep(INDUSTRY_TILES);

const INITIAL_AI_BOARD = _.filter(INDUSTRY_TILES, function(p) {
    return p.level > 1 && !(p.industrytype === INDUSTRY.Manufacturer && p.level <= 2);
});

// players
const HUMAN_PLAYER = {
    id: 0,
    name: "You",
    player_type: PLAYER_TYPE.Human,
    color: null,
    board: _.cloneDeep(INITIAL_HUMAN_BOARD),
    linktile: _.cloneDeep(LINK_TILE),
    nextLinkTileId: 0,
    totalVP: 0,
    turnOrder: 0,
    currentRoundComplete: false,
    amountSpentThisRound: 0,
    currentTurnIndex: 0, // human player takes two actions
    actionStep: null, // guides showing appropriate UI for the chosen action
    nextAction: { action: null, actiondata: { consumedata: [] }, actiondesc: []} // intended action
};

// AI player 1
const ELIZA = {
    id: 1,
    name: "Eliza",
    player_type: PLAYER_TYPE.Eliza_AI,
    color: PLAYER_COLOR.Gray,
    board: _.cloneDeep(INITIAL_AI_BOARD),
    linktile: _.cloneDeep(LINK_TILE),
    nextLinkTileId: 0,
    deckType: AI_DECK_TYPES.Balanced,
    cards: null,
    currentCard1: null,
    currentCard2: null,
    difficulty: DIFFICULTY_LEVEL.Apprentice,
    totalVP: 0,
    turnOrder: 1,
    currentRoundComplete: false,
    amountSpentThisRound: null,
    nextAction: { action: null, actiondata: { consumedata: [] }, actiondesc: []} // intended action
}

// optional AI player 2
const ELEANOR = {
    id: 2,
    name: "Eleanor",
    player_type: PLAYER_TYPE.Eleanor_AI,
    color: PLAYER_COLOR.Yellow,
    board: _.cloneDeep(INITIAL_AI_BOARD),
    linktile: _.cloneDeep(LINK_TILE),
    nextLinkTileId: 0,
    deckType: AI_DECK_TYPES.Balanced,
    cards: null,
    currentCard1: null,
    currentCard2: null,
    difficulty: DIFFICULTY_LEVEL.Apprentice,
    totalVP: 0,
    turnOrder: 2,
    currentRoundComplete: false,
    amountSpentThisRound: null,
    nextAction: { action: null, actiondata: { consumedata: [] }, actiondesc: []} // intended action
}

var app = new Vue({
    el: '#eliza',
    data: {
        computedUpdater: 0,
        numberOfPlayers: 2,
        useTurnOrder: false,
        soldInCanalEra: false,
        soldInRailEra: false,
        gameHasStarted: false,
        currentRound: 1,
        currentGameStep: GAME_STEPS.Setup,
        currentEra: ERA.Canal,
        currentPlayerType: null,
        board: _.cloneDeep(INITIAL_BOARD),
        humanPlayer: _.cloneDeep(HUMAN_PLAYER),
        eliza: _.cloneDeep(ELIZA),
        eleanor: _.cloneDeep(ELEANOR),
        showBoardState: false,
        humanActionStringMap: _.cloneDeep(humanActionStringMap),
        undoState: {}
    },
    mounted: function() {
        if (localStorage.getItem(LOCALSTORAGENAME)) {
            let gameState = JSON.parse(localStorage.getItem(LOCALSTORAGENAME));
            this.numberOfPlayers = gameState.numberOfPlayers;
            this.gameHasStarted = gameState.gameHasStarted;
            this.useTurnOrder = gameState.useTurnOrder;
            this.soldInCanalEra = gameState.soldInCanalEra;
            this.soldInRailEra = gameState.soldInRailEra;
            this.currentRound = gameState.currentRound;
            this.currentGameStep = gameState.currentGameStep;
            this.currentEra = gameState.currentEra;
            this.currentPlayerType = gameState.currentPlayerType;
            this.board = gameState.board;
            this.humanPlayer = gameState.humanPlayer;
            this.eliza = gameState.eliza;
            this.eleanor = gameState.eleanor;
            this.showBoardState = gameState.showBoardState;
            this.undoState = gameState.undoState;

        } else {
            this.setPlayerColor(0);
        }
    },
    computed: {
        currentPlayer: function () {
            let player = this.getPlayerFromType(this.currentPlayerType);
            return player;
        },
        playersInOrder: function () {
            let players = [];

            if (this.numberOfPlayers === 2) {
                players = [
                    this.humanPlayer,
                    this.eliza
                ];
            } else {
                players = [
                    this.humanPlayer,
                    this.eliza,
                    this.eleanor
                ];
            }

            let sortedPlayers = _.sortBy(players, "turnOrder");

            return sortedPlayers;
        },
        totalEmptyMarketCoalSpaces: function () {
            return this.board.market.totalPossibleCoal - this.board.market.coalInMarket;
        },
        totalEmptyMarketIronSpaces: function () {
            return this.board.market.totalPossibleIron - this.board.market.ironInMarket;
        },
        validHumanBuildLocations: function () {
            let locations = [];
            let self = this;
            if (this.currentEra === ERA.Canal) {
                // locations where the player hasn't built
                locations = _.filter(self.board.locations, function (l) {
                    let canBuildHere = true;
                    _.forEach(l.spaces, function (s) {
                        if (s.tile && s.tile.color === self.humanPlayer.color) {
                            canBuildHere = false;
                        }
                    });

                    return canBuildHere;
                });
            } else {
                // all locations for the number of players
                let cardsForNumberOfPlayers = _.filter(CARDS, function (c) {
                    return c.type === CARD_TYPES.Location && c.minPlayers <= self.numberOfPlayers;
                });

                _.forEach(cardsForNumberOfPlayers, function (c) {
                    locations.push(self.findLocationById(c.locationid));
                });
            }

            let sortedLocations = _.sortBy(locations, 'name');

            return sortedLocations;
        },
        validHumanBuildLocationsForIndustryType: function () {
            this.computedUpdater++;
            let spacesWithLocations = [];
            let self = this;
            let industrytype = this.humanPlayer.nextAction.actiondata.buildindustrytype;

            _.forEach(self.validHumanBuildLocations, function (l) {
                let singleSpaceAvailable = (_.filter(l.spaces, function (s) {
                    return !s.tile && _.includes(s.types, industrytype) && s.types.length === 1;
                })).length > 0;

                let resourcesAvailable = true;
                let tile = self.humanPlayer.nextAction.actiondata.buildtile;

                let isConnectedToMarket = self.isConnectedToMarket(l.id, PLAYER_TYPE.Human);

                if (tile.coalCost > 0) {
                    let allConnectedCoal = self.findAllConnectedCoal(l.id, PLAYER_TYPE.Human);

                    if (!isConnectedToMarket && (!Object.keys(allConnectedCoal) || Object.keys(allConnectedCoal).length === 0)) {
                        resourcesAvailable = false;
                    }
                }

                if (tile.ironCost > 0) {
                    let allUnflippedIron = self.findAllUnflippedIronWorks();

                    if (!isConnectedToMarket && (!allUnflippedIron.length || allUnflippedIron.length === 0)) {
                        resourcesAvailable = false;
                    }
                }

                if (resourcesAvailable) {
                    _.forEach(l.spaces, function (s) {
                        if (!s.tile && _.includes(s.types, industrytype)) {
                            if (s.types.length === 1) {
                                // prefer single spaces
                                spacesWithLocations.push({
                                    locationid: l.id,
                                    spaceid: s.id + 1,
                                    name: l.name,
                                    industrytype: industrytype
                                });
                            } else {
                                if (!singleSpaceAvailable) {
                                    spacesWithLocations.push({
                                        locationid: l.id,
                                        spaceid: s.id + 1,
                                        name: l.name,
                                        industrytype: industrytype
                                    });
                                }
                            }
                        }
                    });
                }
            });

            let sortedSpacesWithLocations = _.sortBy(spacesWithLocations, 'name', 'space');
            return sortedSpacesWithLocations;
        },
        findPlayerUnflippedSellableIndustries: function () {
            // for: Sell, step 1
            let player_type = this.currentPlayer.player_type;
            let player = this.getPlayerFromType(player_type);

            let playerUnflippedSellableIndustryLocations = [];

            let self = this;
            _.forEach(self.board.locations, function(o) {
                if (o.type === LOCATIONTYPE.Industries) {
                    o.spaceswithtiles = [];
                    _.forEach(o.spaces, function(p) {
                        if (p.tile && p.tile.color === player.color && !p.tile.flipped && (p.tile.industrytype === INDUSTRY.Manufacturer || p.tile.industrytype === INDUSTRY.CottonMill || p.tile.industrytype === INDUSTRY.Pottery)) {
                            o.spaceswithtiles.push({
                                spaceid: p.id,
                                tile: p.tile
                            });
                            playerUnflippedSellableIndustryLocations.push(o);
                        }
                    });
                }
            });

            return playerUnflippedSellableIndustryLocations;
        },
        findPlayerUnflippedSellableIndustriesConnectedToMarket: function () {
            // for: Sell, step 1 and 2
            let player_type = this.currentPlayer.player_type;
            let playerUnflippedSellableIndustryLocations = this.findPlayerUnflippedSellableIndustries;

            let playerUnflippedSellableIndustriesConnectedToMarket = [];

            let self = this;
            _.forEach(playerUnflippedSellableIndustryLocations, function (l) {
                let connectedMarkets = self.findAllConnectedMarkets(l.id, player_type);

                if (connectedMarkets && connectedMarkets.length > 0) {
                    // find tiles connected to a matching market
                    _.forEach(l.spaceswithtiles, function (t) {
                        // check each market connected to the tile's location
                        let isConnectedToMatchingMarket = false;
                        let connectedMarketsWithTiles = [];
                        _.forEach(connectedMarkets, function (m) {
                            _.forEach(m.spaces, function (s) {
                                if (s.tile) {
                                    if (_.includes(s.tile.industryTypes, t.tile.industrytype)) {
                                        isConnectedToMatchingMarket = true;
                                        connectedMarketsWithTiles.push({
                                            market: m,
                                            tile: s.tile
                                        });
                                    }
                                }
                            });
                        });

                        if (isConnectedToMatchingMarket) {
                            playerUnflippedSellableIndustriesConnectedToMarket.push({
                                selected: false,
                                locationid: l.id,
                                name: l.name,
                                spaceid: t.spaceid,
                                tile: t.tile,
                                comboid: l.id + " - " + t.spaceid,
                                connectedMarketsWithTiles: connectedMarketsWithTiles
                            });
                        }
                    });
                }
            });

            return _.uniqBy(playerUnflippedSellableIndustriesConnectedToMarket, "comboid");
        }
    },
    methods: {
        next: function () {

            // if starting game
            if (this.currentGameStep === 0) {
                this.currentGameStep = GAME_STEPS.Round;
            }

            // if coming from new round screen
            if (this.currentGameStep === 2) {
                this.currentGameStep = GAME_STEPS.Round;
                return;
            }

            let wasHumanPlayer = false;
            if (this.currentPlayerType === 0) {
                wasHumanPlayer = true;
                
                // NOTE: Actions handled in opposite order since actionStep is incremented

                // if executing confirmed human action
                if (this.currentPlayer.actionStep === '03' || this.currentPlayer.actionStep === '13' || this.currentPlayer.actionStep === '32') {
                    this.executeNextHumanAction();
                    this.calculateNextPlayer();
                }

                // if scout or loan
                if (this.currentPlayer.actionStep === '40') {
                    this.calculateNextPlayer();
                }

                // if human choosing consumption
                if (this.currentPlayer.actionStep === '02' || this.currentPlayer.actionStep === '12' || this.currentPlayer.actionStep === '31') {
                    if (this.humanPlayer.nextAction.actiondata.consumelocations.coal) {
                        let totalChosenCoal = _.sumBy(this.humanPlayer.nextAction.actiondata.consumelocations.coal.coalLocations, function (l) {
                            return l.chosenCoal;
                        });

                        if (this.humanPlayer.nextAction.actiondata.consumelocations.coal.coalNeeded > totalChosenCoal) {
                            alert("You have not chosen enough coal.");
                            return;
                        }

                        if (this.humanPlayer.nextAction.actiondata.consumelocations.coal.coalNeeded < totalChosenCoal) {
                            alert("You have chosen too much coal.");
                            return;
                        }
                    }

                    if (this.humanPlayer.nextAction.actiondata.consumelocations.iron) {
                        let totalChosenIron = _.sumBy(this.humanPlayer.nextAction.actiondata.consumelocations.iron.ironLocations, function (l) {
                            return l.chosenIron;
                        });

                        if (this.humanPlayer.nextAction.actiondata.consumelocations.iron.ironNeeded > totalChosenIron) {
                            alert("You have not chosen enough iron.");
                            return;
                        }

                        if (this.humanPlayer.nextAction.actiondata.consumelocations.iron.ironNeeded < totalChosenIron) {
                            alert("You have chosen too much iron.");
                            return;
                        }
                    }

                    // TODO: Add beer logic
                    if (this.humanPlayer.nextAction.actiondata.consumelocations.beer) {
                    }

                    // Move to next step
                    if (this.currentPlayer.actionStep === '02') {
                        this.currentPlayer.actionStep = '03';
                        this.saveGameState();
                    }

                    if (this.currentPlayer.actionStep === '31') {
                        this.currentPlayer.actionStep = '32';
                        this.saveGameState();
                    }
                }
            
                // if developing
                if (this.currentPlayer.actionStep === '30') {

                    let developabletiles = this.humanPlayer.nextAction.actiondata.developabletiles;

                    let selectedtiles = [];
                    _.forEach(developabletiles, function (i) {
                        _.forEach(i.tiles, function (t) {
                            if (t.selected) {
                                selectedtiles.push(t.developabletile);
                            }
                        });
                    });

                    if (selectedtiles.length === 0) {
                        alert('You must choose at least one tile to develop.');
                        return;
                    }

                    if (selectedtiles.length > 2) {
                        alert('You cannot choose more than 2 tiles to develop.');
                        return;
                    }

                    let consumeLocations = this.humanConsumeLocations(null, 0, selectedtiles.length, null);
                    this.humanPlayer.nextAction.actiondata.consumelocations = consumeLocations;

                    this.currentPlayer.actionStep = '31';
                    this.saveGameState();
                }
            }
                

            // execute AI action if moving on from showing them
            if (!wasHumanPlayer && (this.currentPlayerType === 1 || this.currentPlayerType === 2)) {
                this.executeNextAIAction();
                this.calculateNextPlayer();
            }
        },
        setPlayerColor: function (color) {
            this.humanPlayer.color = color;
            this.saveGameState();
        },
        currentPlayerColorClass: function () {
            return "player-icon-" + this.colorString(this.currentPlayer.color);
        },
        roundsPerEra: function () {
            return this.numberOfPlayers === 2 ? TOTAL_ROUNDS_2PLAYER : TOTAL_ROUNDS_3PLAYER;
        },
        startGame: function() {
            if (!this.humanPlayer.color) {
                alert("You must choose a color.");
                return false;
            }

            this.gameHasStarted = true;
            this.currentPlayerType = PLAYER_TYPE.Human;

            // Set link and tile colors
            let self = this;
            this.humanPlayer.linktile.color = this.humanPlayer.color;
            
            _.forEach(this.humanPlayer.board, function(p) {
                p.color = self.humanPlayer.color;
            });

            this.eliza.linktile.color = this.eliza.color;
            _.forEach(this.eliza.board, function(p) {
                p.color = self.eliza.color;
            });

            this.eleanor.linktile.color = this.eleanor.color;
            _.forEach(this.eleanor.board, function(p) {
                p.color = self.eleanor.color;
            });

            // shuffle cards
            this.eliza.cards = _.shuffle(_.cloneDeep(getAIDeck(this.eliza.deckType, 2)));
            this.eleanor.cards = _.shuffle(_.cloneDeep(getAIDeck(this.eleanor.deckType, 2)));

            // Setup merchant tiles
            this.setupMerchantTiles();


            // --- TEMPORARY
            // Setup board
            this.debugSetupTestBoard();
            // --- END TEMPORARY

            this.saveGameState();
        },

        // UI functions
        setHumanAction(actionStep) {
            this.currentPlayer.actionStep = actionStep;

            if (actionStep === '20') {
                this.humanPlayer.nextAction.actiondata.sellabletiles = this.findPlayerUnflippedSellableIndustriesConnectedToMarket;
                console.log(this.humanPlayer.nextAction.actiondata.sellabletiles);
            }

            if (actionStep === '30') {
                this.setHumanDevelopableTiles();
            }

            this.saveGameState();
        },
        showNextButton() {
            return (this.gameHasStarted && !this.showBoardState && (this.currentGameStep === 0 || (this.currentPlayer.actionStep === '03' || this.currentPlayer.actionStep === '02' || this.currentPlayer.actionStep === '13' || this.currentPlayer.actionStep === '31' || this.currentPlayer.actionStep === '40') || this.currentPlayer.actionStep === '20') || this.currentPlayer.actionStep === '30'  || this.currentPlayer.actionStep === '32' || this.currentPlayerType === 1 || this.currentPlayerType === 2 || this.currentGameStep === 2);
        },
        prevHumanAction: function () {
            if (this.humanPlayer.actionStep === '03') {
                this.prevBuildActionConfirm();
            }

            if (this.humanPlayer.actionStep === '13') {
                this.prevNetworkActionConfirm();
            }

            if (this.humanPlayer.actionStep === '32') {
                this.prevDevelopActionConfirm();
            }
        },

        // UI: Build
        prevSetHumanAction: function () {
            this.setHumanAction(null);
        },
        prevBuildActionConfirm: function () {
            let tile = this.humanPlayer.nextAction.actiondata.buildtile;

            // get consumption options
            if (tile.coalCost > 0 || tile.ironCost > 0) {
                this.setHumanAction('02');
            } else {
                this.setHumanAction('01');
                this.saveGameState();
            }
        },
        setHumanBuildIndustryType: function(industrytype, tileid) {
            this.humanPlayer.nextAction.action = HUMAN_ACTION.Build;
            this.humanPlayer.nextAction.actiondata.buildindustrytype = industrytype;
            let tile = this.findPlayerBoardIndustryTileById(this.humanPlayer.player_type, tileid);
            this.humanPlayer.nextAction.actiondata.buildtile = tile; 
            this.computedUpdater++;
            this.setHumanAction('01');
        },
        prevHumanBuildIndustryType: function() {
            this.humanPlayer.nextAction.action = null;
            this.humanPlayer.nextAction.actiondata.buildindustrytype = null;
            this.humanPlayer.nextAction.actiondata.buildtile = null;
            this.setHumanAction('00');
            return false;
        },
        setHumanBuildLocationAndSpace(locationid, spaceid) {
            let location = this.findLocationById(locationid);
            this.humanPlayer.nextAction.actiondata.buildlocationid = locationid;
            this.humanPlayer.nextAction.actiondata.buildspaceid = spaceid - 1;
            this.humanPlayer.nextAction.actiondata.buildlocationname = location.name;

            // determine needed consumption
            let tile = this.humanPlayer.nextAction.actiondata.buildtile;

            // get consumption options
            if (tile.coalCost > 0 || tile.ironCost > 0) {
                let consumeLocations = this.humanConsumeLocations(locationid, tile.coalCost, tile.ironCost, null);
                this.humanPlayer.nextAction.actiondata.consumelocations = consumeLocations;
                this.setHumanAction('02');
            } else {
                this.humanPlayer.nextAction.actiondata.consumelocations = {};
                this.setHumanAction('03');
            }
        },

        // UI: Network
        validHumanNetworkLocations: function() {
            

            let locations = this.findAllLocationsInNetwork(PLAYER_TYPE.Human);
            let self = this;

            let validLocations = _.filter(locations, function (l) {
                let edges = [];
                if (self.currentEra === ERA.Canal) {
                    edges = l.edgesCanal;
                } else {
                    edges = l.edgesRail;
                }

                return _.filter(edges, function (e) {
                    return !e.tile && !e.isToSouthernFarm;
                }).length > 0;
            });
            
            return _.sortBy(validLocations, 'name');
        },
        setNetworkLocationFrom: function (locationid) {
            this.humanPlayer.nextAction.action = HUMAN_ACTION.Network;
            this.humanPlayer.nextAction.actiondata.networkfromlocationid = locationid;
            this.setHumanAction('11');
        },
        prevNetworkLocationFrom: function () {
            this.humanPlayer.nextAction.actiondata.networkfromlocationid = null;
            this.setHumanAction('10');
        },
        setNetworkLocationTo: function (locationid) {
            this.humanPlayer.nextAction.actiondata.networktolocationid = locationid;

            // TODO: Set coal consumption and move to consumption ('12') if in rail era

            this.setHumanAction('13');
        },
        prevNetworkActionConfirm: function () {
            this.humanPlayer.nextAction.actiondata.networktolocationid = null;
            this.setHumanAction('11');
        },

        // UI: Sell
        prevSetIndustriesToSell: function () {
            this.humanPlayer.nextAction.actiondata.sellabletiles = null;
            this.setHumanAction('00');
        },

        // UI: Develop
        setHumanDevelopableTiles: function () {
            this.humanPlayer.nextAction.action = HUMAN_ACTION.Develop;
            this.humanPlayer.nextAction.actiondata.developabletiles = this.findAllNextDevelopableTilesFromPlayerBoard(PLAYER_TYPE.Human);
        },
        prevDevelopAction: function () {
            this.humanPlayer.nextAction.actiondata.developabletiles = null;
            this.setHumanAction(null);
        },
        prevDevelopActionConfirm: function () {
            this.setHumanAction('30');
        },

        // UI: Consume
        humanConsumeLocations(locationid, totalCoalNeeded, totalIronNeeded, totalBeerNeeded) {
            let consumeLocations = {};

            if (totalCoalNeeded && totalCoalNeeded > 0) {
                consumeLocations.coal = {
                    coalNeeded: totalCoalNeeded,
                    coalLocations: []
                };

                let allConnectedCoal = this.findAllConnectedCoal(locationid, this.currentPlayer.player_type);

                let totalCoalAvailable = 0;
                _.forEach(allConnectedCoal, function (ccl) {
                    _.forEach(ccl, function (l) {
                        _.forEach(l.coalspaces, function (pcs) {
                            if (totalCoalAvailable < totalCoalNeeded) {
                                let resourceArray = [];
                                for (let i=0;i<=pcs.tile.availableCoal;i++) {
                                    resourceArray.push(i);
                                }

                                consumeLocations.coal.coalLocations.push({
                                    locationid: l.id,
                                    name: l.name,
                                    spaceid: pcs.id + 1,
                                    coalAvailable: pcs.tile.availableCoal,
                                    chosenCoal: 0,
                                    resourceArray: resourceArray
                                });

                                totalCoalAvailable = totalCoalAvailable + pcs.tile.availableCoal;
                            }
                        });
                    });
                });

                // TODO: Include market
            }

            if (totalIronNeeded && totalIronNeeded > 0) {
                consumeLocations.iron = {
                    ironNeeded: totalIronNeeded,
                    ironLocations: []
                };

                let allUnflippedIron = this.findAllUnflippedIronWorks();

                let totalIronAvailable = 0;
                _.forEach(allUnflippedIron, function (l) {
                    _.forEach(l.ironspaces, function (is) {
                        let resourceArray = [];
                        for (let i=0;i<=is.tile.availableIron;i++) {
                            resourceArray.push(i);
                        }

                        consumeLocations.iron.ironLocations.push({
                            locationid: l.id,
                            name: l.name,
                            spaceid: is.id + 1,
                            ironAvailable: is.tile.availableIron,
                            chosenIron: 0,
                            resourceArray: resourceArray
                        });
                    });
                });

                // TODO: Include market
            }

            if (totalBeerNeeded && totalBeerNeeded > 0) {
                consumeLocations.beer = {
                    beerNeeded: totalBeerNeeded,
                    beerLocations: []
                };

                // TODO: Get beer consumption
            }

            return consumeLocations;
        },
        setPrevConsume: function() {
            if (this.humanPlayer.nextAction.actiondata.buildindustrytype !== null && this.humanPlayer.nextAction.actiondata.buildindustrytype !== undefined) {
                this.humanPlayer.nextAction.actiondata.buildlocationid = null;
                this.humanPlayer.nextAction.actiondata.buildspaceid = null;
                this.humanPlayer.nextAction.actiondata.buildlocationname = null;
                this.setHumanAction('01');
            }

            if (this.humanPlayer.nextAction.actiondata.developabletiles) {
                this.setHumanAction('30');
            }
        },
        // human action description
        getHumanActionDescription: function () {
            let actions = [];
            let self = this;

            if (this.humanPlayer.nextAction.action === HUMAN_ACTION.Build) {
                let actionstring = '';

                // If Build
                let location = this.findLocationById(this.humanPlayer.nextAction.actiondata.buildlocationid);
                actionstring = actionstring + 'Build ' + this.tileToString(this.humanPlayer.nextAction.actiondata.buildtile) + ' in ' + location.name + ' (Space ' + (this.humanPlayer.nextAction.actiondata.buildspaceid + 1) + ').';

                actions.push({
                    actionDone: false,
                    actionDesc: actionstring
                });

                actionstring = 'Pay £' + this.humanPlayer.nextAction.actiondata.buildtile.poundsCost + '.';
                actions.push({
                    actionDone: false,
                    actionDesc: actionstring
                });

                // TODO: Check move of coal to market

                // TODO: Check move of iron to market
            }

            // If Network
            if (this.humanPlayer.nextAction.action === HUMAN_ACTION.Network) {
                let actionstring = '';
                let locationfrom = this.findLocationById(this.humanPlayer.nextAction.actiondata.networkfromlocationid);
                let locationto = this.findLocationById(this.humanPlayer.nextAction.actiondata.networktolocationid);

                actionstring = actionstring + 'Network from ' + locationfrom.name + ' to ' + locationto.name;
                
                actions.push({
                    actionDone: false,
                    actionDesc: actionstring
                });

                actionstring = '';
                actionstring = actionstring + 'Pay £' + (this.currentEra === ERA.Canal ? CANALERANETWORKCOST : RAILERANETWORKCOST) + '.';
                
                actions.push({
                    actionDone: false,
                    actionDesc: actionstring
                });
            }

            // If Develop
            if (this.humanPlayer.nextAction.action === HUMAN_ACTION.Develop) {
                let developabletiles = this.humanPlayer.nextAction.actiondata.developabletiles;

                let selectedtiles = [];
                _.forEach(developabletiles, function (i) {
                    _.forEach(i.tiles, function (t) {
                        if (t.selected) {
                            let actionstring = '';

                            actionstring = actionstring + 'Develop ' + self.tileToString(t.developabletile) + '.';

                            actions.push({
                                actionDone: false,
                                actionDesc: actionstring
                            });
                        }
                    });
                });
            }

            // If Coal consumption
            if (this.humanPlayer.nextAction.actiondata.consumelocations && this.humanPlayer.nextAction.actiondata.consumelocations.coal) {
                let actionstring = '';

                _.forEach(this.humanPlayer.nextAction.actiondata.consumelocations.coal.coalLocations, function (l) {
                    if (l.chosenCoal > 0) {
                        actionstring = actionstring + 'Consume ' + l.chosenCoal + ' coal from ' + l.name + ' (Space ' + (l.spaceid - 1) + ')';

                        if (l.coalAvailable === l.chosenCoal) {
                            actionstring = actionstring + ' [[ Flips the tile! ]]';
                        }

                        actionstring = actionstring + '.'

                        actions.push({
                            actionDone: false,
                            actionDesc: actionstring
                        });
                    }
                });
            }

            // If iron consumption
            if (this.humanPlayer.nextAction.actiondata.consumelocations && this.humanPlayer.nextAction.actiondata.consumelocations.iron) {
                let actionstring = '';

                _.forEach(this.humanPlayer.nextAction.actiondata.consumelocations.iron.ironLocations, function (l) {
                    if (l.chosenIron > 0) {
                        actionstring = actionstring + 'Consume ' + l.chosenIron + ' iron from ' + l.name + ' (Space ' + (l.spaceid - 1) + ')';

                        if (l.ironAvailable === l.chosenIron) {
                            actionstring = actionstring + ' [[ Flips the tile! ]]';
                        }

                        actionstring = actionstring + '.'

                        actions.push({
                            actionDone: false,
                            actionDesc: actionstring
                        });
                    }
                });
            }

            // TODO: Add beer consumption action strings
            if (this.humanPlayer.nextAction.actiondata.consumelocations && this.humanPlayer.nextAction.actiondata.consumelocations.beer) {
            }

            return actions;
        },
        executeNextHumanAction: function () {
            let self = this; 

            // BUILD
            if (this.humanPlayer.nextAction.action === HUMAN_ACTION.Build) {
                this.layIndustryTile(PLAYER_TYPE.Human, this.humanPlayer.nextAction.actiondata.buildtile.id, this.humanPlayer.nextAction.actiondata.buildlocationid, this.humanPlayer.nextAction.actiondata.buildspaceid);

                // TODO: Move coal to market

                // TODO: Move iron to market

                if (!this.humanPlayer.amountSpentThisRound) {
                    this.humanPlayer.amountSpentThisRound = this.humanPlayer.nextAction.actiondata.buildtile.poundsCost;
                } else {
                    this.humanPlayer.amountSpentThisRound = this.humanPlayer.amountSpentThisRound + this.humanPlayer.nextAction.actiondata.buildtile.poundsCost;
                }
            }

            // NETWORK
            if (this.humanPlayer.nextAction.action === HUMAN_ACTION.Network) {
                this.layNetworkTile(PLAYER_TYPE.Human, this.humanPlayer.nextAction.actiondata.networkfromlocationid, this.humanPlayer.nextAction.actiondata.networktolocationid);

                let networkcost = this.currentEra === ERA.Canal ? CANALERANETWORKCOST : RAILERANETWORKCOST;

                if (!this.humanPlayer.amountSpentThisRound) {
                    this.humanPlayer.amountSpentThisRound = networkcost;
                } else {
                    this.humanPlayer.amountSpentThisRound = this.humanPlayer.amountSpentThisRound + networkcost;
                }
            }

            // SELL

            // DEVELOP
            if (this.humanPlayer.nextAction.action === HUMAN_ACTION.Develop) {
                let developabletiles = this.humanPlayer.nextAction.actiondata.developabletiles;

                let selectedtiles = [];
                _.forEach(developabletiles, function (i) {
                    _.forEach(i.tiles, function (t) {
                        if (t.selected) {
                            let developabletile = t.developabletile;

                            _.remove(self.humanPlayer.board, function (t) {
                                return t.id === developabletile.id;
                            });
                        }
                    });
                });
            }

            // CONSUME
            if (this.humanPlayer.nextAction.actiondata.consumelocations && this.humanPlayer.nextAction.actiondata.consumelocations.coal) {
                _.forEach(self.humanPlayer.nextAction.actiondata.consumelocations.coal.coalLocations, function (l) {
                    let location = self.findLocationById(l.locationid);
                    let tile = location.spaces[l.spaceid - 1].tile;
                    tile.availableCoal = tile.availableCoal - l.chosenCoal;
                });
            }

            if (this.humanPlayer.nextAction.actiondata.consumelocations && this.humanPlayer.nextAction.actiondata.consumelocations.iron) {
                _.forEach(self.humanPlayer.nextAction.actiondata.consumelocations.iron.ironLocations, function (l) {
                    let location = self.findLocationById(l.locationid);
                    let tile = location.spaces[l.spaceid - 1].tile;
                    tile.availableIron = tile.availableIron - l.chosenIron;
                });
            }

            if (this.humanPlayer.nextAction.actiondata.consumelocations && this.humanPlayer.nextAction.actiondata.consumelocations.beer) {

            }
        },
        resetHumanAction: function () {
            this.humanPlayer.nextAction.action = null;
            this.humanPlayer.nextAction.actiondata = {};
            this.humanPlayer.actionStep = null;
        },
        playerAmountSpent: function (player) {
            if (player.currentRoundComplete) {
                return player.amountSpentThisRound ? player.amountSpentThisRound : 0;
            }
            return null;
        },
        
        // Primary action functions
        calculateNextPlayer: function () {
            let self = this;
            if (this.currentPlayerType === PLAYER_TYPE.Human) {
                if (this.humanPlayer.currentTurnIndex === 0 && this.currentRound > 1) { 
                    this.humanPlayer.currentTurnIndex = 1;
                    this.resetHumanAction();
                    this.saveGameState();
                    return;
                } else {
                    this.humanPlayer.currentRoundComplete = true;
                }
            }

            let players = [];

            if (this.numberOfPlayers === 2) {
                players = [
                    this.humanPlayer,
                    this.eliza
                ];
            } else {
                players = [
                    this.humanPlayer,
                    this.eliza,
                    this.eleanor
                ];
            }

            let sortedPlayers = _.sortBy(players, "turnOrder");

            let nextPlayer = _.find(sortedPlayers, function (p) {
                return !p.currentRoundComplete;
            });

            if (!nextPlayer) {
                this.currentRound = this.currentRound + 1;

                // calculate new turn order
                let newSortedPlayers = _.sortBy(players, function (p) {
                    return p.amountSpentThisRound ? p.amountSpentThisRound : 0;
                });
                _.forEach(newSortedPlayers, function (p, index) {
                    let player = self.getPlayerFromType(p.player_type);
                    player.turnOrder = index;
                    player.currentRoundComplete = false;
                    player.amountSpentThisRound = null;
                });

                this.humanPlayer.currentTurnIndex = 0;
                this.resetHumanAction();

                this.currentPlayerType = newSortedPlayers[0].player_type;

                if (this.currentPlayerType === PLAYER_TYPE.Eliza_AI || this.currentPlayerType === PLAYER_TYPE.Eleanor_AI) {
                    this.calculateAIAction(this.currentPlayerType);
                    this.saveGameState();
                }
                this.currentGameStep = 2;
            } else {
                this.currentPlayerType = nextPlayer.player_type;

                if (nextPlayer.player_type === PLAYER_TYPE.Eliza_AI || nextPlayer.player_type === PLAYER_TYPE.Eleanor_AI) {
                    this.calculateAIAction(nextPlayer.player_type);
                    this.saveGameState();
                    return;
                }
            }
            this.saveGameState();
        },
        calculateAIAction: function (player_type) {
            // this function builds the 'nextAction' object attached to the player object. It does not execute any actions.

            let player = this.getPlayerFromType(player_type);
            let action = null;

            player.nextAction.action = null;
            player.nextAction.actiondata = {};

            // data package, start with storing the current round
            // use action data to describe what the AI will do and then eventually do it
            let actiondata = {
                round: this.currentRound,
                neededCoal: 0,
                neededIron: 0,
                neededBeer: 0,
                consumedata: {}
            };

            // draw two cards
            player.currentCard1 = this.findCardById(player.cards.shift());
            player.currentCard2 = this.findCardById(player.cards.shift());
            console.log(player.currentCard1.name);
            console.log(player.currentCard2.name);

            let sell = false;

            // if both cards are industry (non-null industry type) then SELL
            if (!player.currentCard1.locationid && !player.currentCard2.locationid) {
                sell = true;
            }
            else {
                // TRY BUILD (first card, then second card)
                let build = false;
                let actioncards = [player.currentCard1, player.currentCard2];

                // try each card
                for (let cardi = 0; cardi < actioncards.length; cardi++) {
                    let othercardi = cardi === 0 ? 1 : 0;

                    let card = actioncards[cardi];
                    let othercard = actioncards[othercardi];

                    // if location card
                    if (card.locationid) {
                        let availablespaceid = null;

                        // first try brewery
                        availablespaceid = this.findAvailableIndustrySpaceInLocation(card.locationid, INDUSTRY.Brewery, false);

                        if (availablespaceid) {
                            // if a brewery can be built in the location, then check if AI has unflipped breweries
                            if (!this.playerHasUnflippedBrewery(player_type)) {
                                build = true;

                                actiondata.locationid = card.locationid;
                                actiondata.spaceid = availablespaceid;
                                actiondata.industrytype = INDUSTRY.Brewery;
                            }
                        }

                        if (!build) {
                            // then try coal mine
                            availablespaceid = this.findAvailableIndustrySpaceInLocation(card.locationid, INDUSTRY.CoalMine, false);

                            if (availablespaceid) {
                                // if a coal mine can be built in the location, then check if AI has unflipped coal mine
                                if (!this.playerHasUnflippedCoalMine(player_type)) {
                                    build = true;
    
                                    actiondata.locationid = card.locationid;
                                    actiondata.spaceid = availablespaceid;
                                    actiondata.industrytype = INDUSTRY.CoalMine;

                                    let emptyMarketCoal = this.board.market.totalPossibleCoal - this.board.market.coalInMarket;
                                    if (emptyMarketCoal > 0) {
                                        let isConnectedToMarket = this.isConnectedToMarket(card.locationid, player_type);

                                        if (isConnectedToMarket) {
                                            // Find tile to place from player board
                                            let industrytile = this.findNextTileFromPlayerBoard(player_type, actiondata.industrytype);
                                            
                                            if (industrytile.availableCoal > emptyMarketCoal) {
                                                actiondata.coalMoved = industrytile.availableCoal - emptyMarketCoal;
                                                actiondata.willFlip = false;
                                            }
                                            else if (emptyMarketCoal >= industrytile.availableCoal) {
                                                actiondata.coalMoved = industrytile.availableCoal;
                                                actiondata.willFlip = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (!build) {
                            // then try iron works
                            availablespaceid = this.findAvailableIndustrySpaceInLocation(card.locationid, INDUSTRY.IronWorks, false);

                            if (availablespaceid) {
                                // if an iron works can be built in the location, then check if AI has unflipped coal mine
                                if (!this.playerHasUnflippedIronWorks(player_type)) {
                                    build = true;
    
                                    actiondata.locationid = card.locationid;
                                    actiondata.spaceid = availablespaceid;
                                    actiondata.industrytype = INDUSTRY.IronWorks;

                                    let emptyMarketIron = this.board.market.totalPossibleIron - this.board.market.ironInMarket;
                                    if (emptyMarketIron > 0) {
                                        let isConnectedToMarket = this.isConnectedToMarket(card.locationid, player_type);

                                        if (isConnectedToMarket) {
                                            // Find tile to place from player board
                                            let industrytile = this.findNextTileFromPlayerBoard(player_type, actiondata.industrytype);
                                            
                                            if (industrytile.availableIron > emptyMarketIron) {
                                                actiondata.ironMoved = industrytile.availableIron - emptyMarketIron;
                                                actiondata.willFlip = false;
                                            }
                                            else if (emptyMarketIron >= industrytile.availableIron) {
                                                actiondata.ironMoved = industrytile.availableIron;
                                                actiondata.willFlip = true;
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (!build) {
                            // then try pottery
                            availablespaceid = this.findAvailableIndustrySpaceInLocation(card.locationid, INDUSTRY.Pottery, false);

                            if (availablespaceid) {
                                build = true;
    
                                actiondata.locationid = card.locationid;
                                actiondata.spaceid = availablespaceid;
                                actiondata.industrytype = INDUSTRY.Pottery;
                            }
                        }

                        if (!build) {
                            // then try cotton mill
                            availablespaceid = this.findAvailableIndustrySpaceInLocation(card.locationid, INDUSTRY.CottonMill, false);

                            if (availablespaceid) {
                                build = true;
    
                                actiondata.locationid = card.locationid;
                                actiondata.spaceid = availablespaceid;
                                actiondata.industrytype = INDUSTRY.CottonMill;
                            }
                        }

                        if (!build) {
                            // then try manufactured goods
                            availablespaceid = this.findAvailableIndustrySpaceInLocation(card.locationid, INDUSTRY.Manufacturer, false);

                            if (availablespaceid) {
                                build = true;
    
                                actiondata.locationid = card.locationid;
                                actiondata.spaceid = availablespaceid;
                                actiondata.industrytype = INDUSTRY.Manufacturer;
                            }
                        }
                    } else {
                        // if industry card, try sellable goods in adjacent locations
                        let adjacentIndustryLocations = this.findAdjacentIndustryLocationsForAI(othercard.locationid);
                        let availablespaceid = null;
                        
                        let self = this;
                        _.forEach(adjacentIndustryLocations, function (l) {
                            if (!build) {
                                // then try pottery
                                availablespaceid = self.findAvailableIndustrySpaceInLocation(l.id, INDUSTRY.Pottery, false);
    
                                if (availablespaceid) {
                                    build = true;
        
                                    actiondata.locationid = l.id;
                                    actiondata.spaceid = availablespaceid;
                                    actiondata.industrytype = INDUSTRY.Pottery;
                                }
                            }
    
                            if (!build) {
                                // then try cotton mill
                                availablespaceid = self.findAvailableIndustrySpaceInLocation(l.id, INDUSTRY.CottonMill, false);
    
                                if (availablespaceid) {
                                    build = true;
        
                                    actiondata.locationid = l.id;
                                    actiondata.spaceid = availablespaceid;
                                    actiondata.industrytype = INDUSTRY.CottonMill;
                                }
                            }
    
                            if (!build) {
                                // then try manufactured goods
                                availablespaceid = self.findAvailableIndustrySpaceInLocation(l.id, INDUSTRY.Manufacturer, false);
    
                                if (availablespaceid) {
                                    build = true;
        
                                    actiondata.locationid = l.id;
                                    actiondata.spaceid = availablespaceid;
                                    actiondata.industrytype = INDUSTRY.Manufacturer;
                                }
                            }

                            // once we found a build, no more searching needed
                            if (build) {
                                return false;
                            }
                        });
                    }

                    if (build) {
                        // Find tile to place from player board
                        let industrytile = this.findNextTileFromPlayerBoard(player_type, actiondata.industrytype);
                        actiondata.industrytile = industrytile;
                    
                        actiondata.neededCoal = actiondata.neededCoal + industrytile.coalCost;
                        actiondata.neededIron = actiondata.neededIron + industrytile.ironCost;

                        // Calculate network
                        let addVPNoLink = 5;
                        let addVPRailEra = 5;
                        let closestWithPath = null; // closest unconnected
                        actiondata.addVP = 0;
                        // if brewery, coal mine, or iron works
                        if (actiondata.industrytype === 0 || actiondata.industrytype === 4 || actiondata.industrytype === 5) {
                            closestWithPath = this.findClosestUnconnectedUnflippedIndustryWithPath(actiondata.locationid, player_type);

                            if (!closestWithPath) {
                                actiondata.addVP = addVPNoLink;
                            } 
                        }
                        
                        // if pottery, cotton mill, or manufactured goods
                        if (actiondata.industrytype === 1 || actiondata.industrytype === 2 || actiondata.industrytype === 3) {
                            closestWithPath = this.findClosestUnconnectedMerchantWithPath(actiondata.locationid, actiondata.industrytype, player_type);

                            if (!closestWithPath) {
                                actiondata.addVP = addVPNoLink;
                            } 
                        }

                        // find tile to lay (first missing tile along the path)
                        if (closestWithPath) {
                            let path = closestWithPath.path;
                            for (let i=0;i<path.length;i++) {
                                let currentlocation = path[i];
                                let nexttargetlocation = path[i+1];

                                let edges = null;
                                if (this.currentEra === ERA.Canal) {
                                    edges = currentlocation.edgesCanal;
                                } else {
                                    edges = currentlocation.edgesRail;
                                }

                                // check if there is a tile on this portion of the path
                                let edge = _.find(edges, function (e) {
                                    return e.toId === nexttargetlocation.id;
                                });

                                if (!edge.tile) {
                                    actiondata.linktargetlocationid1 = currentlocation.id;
                                    actiondata.linktargetlocationid2 = nexttargetlocation.id;
                                    break;
                                }
                            }
                        }

                        // if we are linking in the rail era, a coal will be needed (plus 5VP for every network action)
                        if (actiondata.linktargetlocationid1 && this.currentEra === ERA.Rail) {
                            actiondata.addVP = actiondata.addVP + addVPRailEra;
                            actiondata.neededCoal = actiondata.neededCoal + 1;
                        }

                        // calculate iron and coal consumption
                        let coalConsumption = null;
                        let ironConsumption = null;

                        if (actiondata.neededCoal > 0) {
                            coalConsumption = this.generateAICoalConsumption(actiondata.locationid, player_type, actiondata.neededCoal);
                            actiondata.consumedata.coalConsumption = coalConsumption;
                        }

                        if (actiondata.neededIron > 0) {
                            ironConsumption = this.generateAIIronConsumption(actiondata.locationid, player_type, actiondata.neededIron);
                            actiondata.consumedata.ironConsumption = ironConsumption;
                        }
                    }

                    if (build) {
                        break;
                    }
                }

                // if built, set the nextaction 
                if (build) {
                    action = AI_ACTION.BuildAndNetwork;
                    
                    player.nextAction.action = action;
                    player.nextAction.actiondata = actiondata;
                } else {
                    // if neither card could be built, sell
                    sell = true;
                }
            }

            // SELL
            if (sell) {
                action = AI_ACTION.Sell;

                // find sellable market-connected industries
                let playerunflippedsellableindustriesconnectedtomarket = this.findPlayerUnflippedSellableIndustriesConnectedToMarket;

                actiondata.industriestosell = playerunflippedsellableindustriesconnectedtomarket;

                // TODO: calculate beer consumption

                player.nextAction.action = action;
                player.nextAction.actiondata = actiondata;
            }

            console.log(player.nextAction);
        },
        getAIActionDescription: function () {
            let actions = [];

            if (this.currentPlayer.nextAction.action === AI_ACTION.BuildAndNetwork) {
                let actionstring = '';

                // If Build and Network
                let location = this.findLocationById(this.currentPlayer.nextAction.actiondata.locationid);
                actionstring = actionstring + 'Build ' + this.tileToString(this.currentPlayer.nextAction.actiondata.industrytile) + ' in ' + location.name + ' (Space ' + (this.currentPlayer.nextAction.actiondata.spaceid + 1) + ').';

                actions.push({
                    actionDone: false,
                    actionDesc: actionstring
                });

                actionstring = 'Spends £' + this.currentPlayer.nextAction.actiondata.industrytile.poundsCost + '.';
                actions.push({
                    actionDone: false,
                    actionDesc: actionstring
                });

                // TODO: Check move of coal to market

                // TODO: Check move of iron to market

                // Network
                actionstring = '';

                // Add VP
                if (this.currentPlayer.nextAction.actiondata.addVP && this.currentPlayer.nextAction.actiondata.addVP > 0) {
                    actionstring = actionstring + 'Could not network, so gains ' + this.currentPlayer.nextAction.actiondata.addVP + 'VP (now has ' + (this.currentPlayer.totalVP + this.currentPlayer.nextAction.actiondata.addVP) + 'VP in total).';
                } else {
                    let locationfrom = this.findLocationById(this.currentPlayer.nextAction.actiondata.linktargetlocationid1);
                    let locationto = this.findLocationById(this.currentPlayer.nextAction.actiondata.linktargetlocationid2);

                    actionstring = actionstring + 'Network from ' + locationfrom.name + ' to ' + locationto.name;
                }

                actions.push({
                    actionDone: false,
                    actionDesc: actionstring
                });
            }

            if (this.currentPlayer.nextAction.action === AI_ACTION.Sell) {
                let actionstring = 'SELL!';

                actions.push({
                    actionDone: false,
                    actionDesc: actionstring
                });
            }

            return actions;
        },
        executeNextAIAction: function () {
            // use 'currentPlayer'
            this.currentPlayer.currentRoundComplete = true;

            // If Build/Network
            if (this.currentPlayer.nextAction.action === AI_ACTION.BuildAndNetwork) {
                let industrytile = this.currentPlayer.nextAction.actiondata.industrytile;

                // Build
                this.layIndustryTile(this.currentPlayer.player_type, industrytile.id, this.currentPlayer.nextAction.actiondata.locationid, this.currentPlayer.nextAction.actiondata.spaceid);

                if (!this.currentPlayer.amountSpentThisRound) {
                    this.currentPlayer.amountSpentThisRound = industrytile.poundsCost;
                } else {
                    this.currentPlayer.amountSpentThisRound = this.currentPlayer.amountSpentThisRound + industrytile.poundsCost;
                }

                // Network
                if (this.currentPlayer.nextAction.actiondata.linktargetlocationid1) {
                    this.layNetworkTile(this.currentPlayer.player_type, this.currentPlayer.nextAction.actiondata.linktargetlocationid1, this.currentPlayer.nextAction.actiondata.linktargetlocationid2);

                    if (this.currentEra === ERA.Rail) {
                        if (!this.currentPlayer.amountSpentThisRound) {
                            this.currentPlayer.amountSpentThisRound = 5;
                        } else {
                            this.currentPlayer.amountSpentThisRound = this.currentPlayer.amountSpentThisRound + 5;
                        }
                    }
                }

                // Add VP
                if (this.currentPlayer.nextAction.actiondata.addVP && this.currentPlayer.nextAction.actiondata.addVP > 0) {
                    this.currentPlayer.totalVP = this.currentPlayer.totalVP + this.currentPlayer.nextAction.actiondata.addVP;
                }
            }
        },
        // end: Primary action functions

        getMerchantLocationIds: function () {
            let merchantLocationIds = [13, 24, 26];
    
            if (this.numberOfPlayers == 3) {
                merchantLocationIds.push(0);
            }

            if (this.numberOfPlayers == 4) {
                merchantLocationIds.push(7);
            }

            return _.sortBy(merchantLocationIds);
        },
        setupMerchantTiles: function () {
            let self = this;
            let merchantTiles = _.shuffle(_.filter(MERCHANT_TILES, function (t) {
                return t.minPlayers <= self.numberOfPlayers;
            }));

            // lay tiles in each merchant location
            let merchantLocationIds = this.getMerchantLocationIds();

            _.forEach(merchantLocationIds, function (id) {
                let location = self.findLocationById(id);

                // lay merchant tile
                _.forEach(location.spaces, function (s) {
                    let merchantTile = merchantTiles.shift();
                    s.tile = merchantTile;

                    if (merchantTile.industryTypes) {
                        s.tile.totalBeer = 1;
                    }
                });
            });
        },
        layIndustryTile: function (player_type, tileid, locationid, spaceid) {
            // This function does no error checking. 'tryHumanBuildAction' does error checking, and is otherwise used by the AI bots directly.

            let player = this.getPlayerFromType(player_type);

            // find the tile on the player's player board
            let tile = _.find(player.board, function(p) {
                return p.id === tileid;
            });

            if (tile !== null && tile !== undefined) {
                // place the tile on the game board
                let location = this.findLocationById(locationid);
                let space = _.find(location.spaces, function (p) {
                    return p.id === spaceid;
                });
                space.tile = _.cloneDeep(tile);

                // If building beer, update availableBeer to 2 if in Rail Era
                if (space.tile.industryType === INDUSTRY.Brewery && this.currentEra === ERA.Rail) {
                    space.tile.availableBeer = 2;
                }

                // remove the tile from the player's board
                _.remove(player.board, function (p) {
                    return p.id === tileid;
                });

                this.computedUpdater++;
            }
        },
        layNetworkTileBase: function (player_type, locationid1, locationid2) {
            let player = this.getPlayerFromType(player_type);

            let linktile = player.linktile;

            // add the tile to the edges
            let location1 = this.findLocationById(locationid1);
            let location2 = this.findLocationById(locationid2);

            let edges1 = null;
            let edges2 = null;

            if (this.currentEra === ERA.Canal) {
                edges1 = location1.edgesCanal;
                edges2 = location2.edgesCanal;
            } else {
                edges1 = location1.edgesRail;
                edges2 = location2.edgesRail;
            }

            // assume the edges sent are valid
            let edge1 = _.find(edges1, function(p) {
                return p.toId === locationid2;
            });

            let edge2 = _.find(edges2, function(p) {
                return p.toId === locationid1;
            });

            // update both edges and remove the tile from the player
            let linktile1 = _.cloneDeep(linktile);
            linktile1.id = player.nextLinkTileId;
            player.nextLinkTileId = player.nextLinkTileId + 1;
            linktile1.toId1 = locationid1;
            linktile1.toId2 = locationid2;

            let linktile2 = _.cloneDeep(linktile);
            linktile2.id = player.nextLinkTileId;
            player.nextLinkTileId = player.nextLinkTileId + 1;
            linktile2.toId1 = locationid2;
            linktile2.toId2 = locationid1;

            edge1.tile = linktile1;
            edge2.tile = linktile2;

            this.computedUpdater++;
        },
        layNetworkTile: function (player_type, locationid1, locationid2) {
            this.layNetworkTileBase(player_type, locationid1, locationid2);

            if ((locationid1 === 21 && locationid2 === 25) || (locationid1 === 25 && locationid2 === 21)) {
                this.layNetworkTileBase(player_type, 21, 22);
                this.layNetworkTileBase(player_type, 25, 22);
            }

            if (locationid1 === 22 || locationid2 === 22) {
                this.layNetworkTileBase(player_type, 21, 25);
            }
        },
        updateTurnOrder: function () {
            // Calculate turn order based on amount spent
            if (this.useTurnOrder) {

            }
        },

        // -- Eliza rule support
        playerHasUnflippedBrewery: function (player_type) {
            // for: Build (Location Card), step 1
            let playerUnflippedBreweries = this.findPlayerUnflippedBreweries(player_type);

            return (playerUnflippedBreweries && playerUnflippedBreweries.length > 0);
        },
        playerHasUnflippedCoalMine: function (player_type) {
            // for: Build (Location Card), step 2
            let playerUnflippedCoalMines = this.findPlayerUnflippedCoalMines(player_type);

            return (playerUnflippedCoalMines && playerUnflippedCoalMines.length > 0);
        },
        playerHasUnflippedIronWorks: function (player_type) {
            // for: Build (Location Card), step 3
            let playerUnflippedIronWorks = this.findPlayerUnflippedIronWorks(player_type);

            return (playerUnflippedIronWorks && playerUnflippedIronWorks.length > 0);
        },
        findAvailableIndustrySpaceInLocation: function (locationid, industrytype, canOverbuild) {
            // for: Build (Location Card), step 4 and Build (Industry Card), step 2
            // return: the spaceid

            let location = this.findLocationById(locationid);
            let validSpaces = [];

            _.forEach(location.spaces, function (s) {
                if (_.includes(s.types, industrytype)) {
                    if (canOverbuild || s.tile === null) {
                        validSpaces.push(s);
                    }
                }
            });

            let sortedSpaces = _.sortBy(validSpaces, function (s) {
                return s.length; // sort single type to the top
            });

            if (sortedSpaces.length > 0) {
                return sortedSpaces[0].id; // choose single type over double
            } else {
                return null;
            }
        },
        findClosestUnconnectedUnflippedIndustryWithPath: function (locationid, player_type, findBelongingToPlayer) {
            // for: Network (after build Coal Mine, Iron Works, or Brewery)
            // if findBelongingToPlayer is true then only find the player's, otherwise find any other than the player's (this allows for both checks in the logic)
            let player = this.getPlayerFromType(player_type);

            let unflippedIndustryLocations = this.findAllUnflippedIndustries();

            let chosenLocationWithPath = null;
            let tempNeededTiles = null;
            let self = this;
            _.forEach(unflippedIndustryLocations, function (l) {
                let path = self.findOptimalAIPathBetweenUnconnectedLocations(locationid, l.id, player_type);

                // if an unflipped location is unconnected, check it
                if (path) {
                    let location = l;
                    l.neededTiles = path.distance - path.numberOfLinks;
                    l.path = path;

                    if (!tempNeededTiles || (l.neededTiles < tempNeededTiles)) {
                        tempNeededTiles = l.neededTiles;
                        chosenLocationWithPath = l;
                    }
                }
            });

            return chosenLocationWithPath;
        },
        findClosestUnconnectedMerchantWithPath: function (locationid, industrytype, player_type) {
            // for: Network (after build Coal Mine, Iron Works, or Brewery)
            // for: Network (after build Pottery, Cotton Mill, or Manufacturer)
            // if industrytype is passed then only find matching merchants

            let merchantLocations = this.findAllMerchants();
            let closestUnconnectedMerchantLocation = null;

            let chosenLocationWithPath = null;
            let tempNeededTiles = null;
            let self = this;
            _.forEach(merchantLocations, function (l) {
                let checkMerchant = true;
                // check if required to match
                if (industrytype) {
                    checkMerchant = false;
                    _.forEach(l.spaces, function (s) {
                        if (s.tile && _.includes(s.tile, industrytype)) {
                            checkMerchant = true;
                            return false;
                        }
                    });
                }

                if (checkMerchant) {
                    let path = self.findOptimalAIPathBetweenUnconnectedLocations(locationid, l.id, player_type);

                    // if a location is unconnected, check it
                    if (path) {
                        let location = l;
                        l.neededTiles = path.distance - path.numberOfLinks;
                        l.path = path;

                        if (!tempNeededTiles || (l.neededTiles < tempNeededTiles)) {
                            tempNeededTiles = l.neededTiles;
                            chosenLocationWithPath = l;
                        }
                    }
                }
            });

            return chosenLocationWithPath;
        },
        findAllUnflippedIndustries: function () {
            let unflippedIndustryLocations = [];

            unflippedIndustryLocations = _.filter(this.board.locations, function(o) {
                let spaces = _.find(o.spaces, function(p) {
                    if (p.tile) {
                        return !p.tile.flipped;
                    }
                    return false;
                });
                return o.type === LOCATIONTYPE.Industries && spaces;
            });

            return unflippedIndustryLocations;
        },
        findAllMerchants: function () {
            let merchantLocations = [];

            merchantLocations = _.filter(this.board.locations, function(o) {
                return o.type === LOCATIONTYPE.Merchants;
            });

            return merchantLocations;
        },
        findAllMerchantsWithTiles: function () {
             let merchantLocations = _.filter(this.board.locations, function(o) {
                return o.type === LOCATIONTYPE.Merchants;
            });

            let merchantLocationsWithTiles = _.filter(merchantLocations, function (l) {
                let spacesWithTiles = _.filter(l.spaces, function (s) {
                    return s.tile;
                });
                return spacesWithTiles.length > 0;
            });

            return merchantLocationsWithTiles;
        },
        findOptimalAIPathBetweenUnconnectedLocations: function (locationid, targetlocationid, player_type) {

            let self = this;
            let paths = self.findAllPathsBetweenLocations(locationid, targetlocationid, false, player_type);

            let connectedPaths = _.filter(paths, function (p) {
                return p.distance === p.numberOfLinks;
            });
            if (connectedPaths.length > 0) { // return null if connected
                return null;
            }

            let filteredPaths = _.filter(paths, function (p) {
                return p.distance > p.numberOfLinks;
            });
            if (filteredPaths && filteredPaths.length > 0) {
                // sort paths
                let sortedPaths = _.sortBy(filteredPaths, function (p) {
                    return p.distance - p.numberOfLinks;
                });

                return sortedPaths[0];
            }
        },
        // end: Eliza rule support


        // -- Eliza consumption support
        generateAICoalConsumption: function (locationid, player_type, neededCoal) {
            // for Build (all eras) and Network (Rail Era)
            let player = this.getPlayerFromType(player_type);
            let consumedCoal = 0;
            let coalConsumption = [];

            let connectedCoalLocations = this.findAllConnectedCoal(locationid, player_type);

            // get all coal in order of distance, player's first
            _.forEach(connectedCoalLocations, function (ccl) {
                _.forEach(ccl, function (l) {
                    let playerCoalSpaces = _.filter(l.coalspaces, function (pcs) {
                        return pcs.tile.color === player.color;
                    });

                    let opponentCoalSpaces = _.filter(l.coalspaces, function (pcs) {
                        return pcs.tile.color !== player.color;
                    });

                    _.forEach(playerCoalSpaces, function (pcs) {
                        if (neededCoal > consumedCoal) {
                            let spaceConsumeData = {
                                locationid: l.id,
                                spaceid: pcs.id,
                                coalConsumed: 0,
                                willFlip: false
                            };
                            
                            for (let i=0; i < pcs.tile.availableCoal; i++) {
                                if (neededCoal > consumedCoal) {
                                    spaceConsumeData.coalConsumed = spaceConsumeData.coalConsumed + 1;
                                    consumedCoal++;
                                }
                            }
                            spaceConsumeData.willFlip = (spaceConsumeData.coalConsumed === pcs.tile.availableCoal);
                            coalConsumption.push(spaceConsumeData);
                        }
                    });

                    _.forEach(opponentCoalSpaces, function (ocs) {
                        if (neededCoal > consumedCoal) {
                            let spaceConsumeData = {
                                locationid: l.id,
                                spaceid: ocs.id,
                                coalConsumed: 0,
                                willFlip: false
                            };
                            
                            for (let i=0; i < ocs.tile.availableCoal; i++) {
                                if (neededCoal > consumedCoal) {
                                    spaceConsumeData.coalConsumed = spaceConsumeData.coalConsumed + 1;
                                    consumedCoal++;
                                }
                            }
                            spaceConsumeData.willFlip = (spaceConsumeData.coalConsumed === ocs.tile.availableCoal);
                            coalConsumption.push(spaceConsumeData);
                        }
                    });

                    // whatever is left take from market
                    if (neededCoal > consumedCoal) {
                        let spaceConsumeData = {
                            locationid: -1,
                            spaceid: -1,
                            coalConsumed: 0,
                            willFlip: false
                        }
                        for (let i=0; i < neededCoal - consumedCoal; i++) {
                            spaceConsumeData.coalConsumed = spaceConsumeData.coalConsumed + 1;
                            consumedCoal++;
                        }
                        coalConsumption.push(spaceConsumeData);
                    }
                });
            });

            return coalConsumption;
        },
        generateAIIronConsumption: function (locationid, player_type, neededIron) {
            // for Build

            let player = this.getPlayerFromType(player_type);
            let consumedIron = 0;
            let ironConsumption = [];

            let unflippedIronLocations = this.findAllUnflippedIronWorks();

            _.forEach(unflippedIronLocations, function (l) {
                let playerIronSpaces = _.filter(l.ironspaces, function (pis) {
                    return pis.tile.color === player.color;
                });
                let sortedPlayerIronSpaces = _.sortBy(playerIronSpaces, function (s) {
                    return s.tile.availableIron;
                });

                let opponentIronSpaces = _.filter(l.ironspaces, function (pis) {
                    return pis.tile.color !== player.color;
                });
                let sortedOpponentIronSpaces = _.orderBy(opponentIronSpaces, [function (s) { return s.tile.availableIron }], ['desc']);

                _.forEach(sortedPlayerIronSpaces, function (pcs) {
                    if (neededIron > consumedIron) {
                        let spaceConsumeData = {
                            locationid: l.id,
                            spaceid: pcs.id,
                            ironConsumed: 0,
                            willFlip: false
                        };
                        
                        for (let i=0; i < pcs.tile.availableIron; i++) {
                            if (neededIron > consumedIron) {
                                spaceConsumeData.ironConsumed = spaceConsumeData.ironConsumed + 1;
                                consumedIron++;
                            }
                        }
                        spaceConsumeData.willFlip = (spaceConsumeData.ironConsumed === pcs.tile.availableIron);
                        ironConsumption.push(spaceConsumeData);
                    }
                });

                _.forEach(sortedOpponentIronSpaces, function (ois) {
                    if (neededIron > consumedIron) {
                        let spaceConsumeData = {
                            locationid: l.id,
                            spaceid: ois.id,
                            ironConsumed: 0,
                            willFlip: false
                        };
                        
                        for (let i=0; i < ois.tile.availableIron; i++) {
                            if (neededIron > consumedIron) {
                                spaceConsumeData.ironConsumed = spaceConsumeData.ironConsumed + 1;
                                consumedIron++;
                            }
                        }
                        spaceConsumeData.willFlip = (spaceConsumeData.ironConsumed === ois.tile.availableIron);
                        ironConsumption.push(spaceConsumeData);
                    }
                });

                // whatever is left take from market
                if (neededIron > consumedIron) {
                    let spaceConsumeData = {
                        locationid: -1,
                        spaceid: -1,
                        ironConsumed: 0,
                        willFlip: false
                    }
                    for (let i=0; i < neededIron - consumedIron; i++) {
                        spaceConsumeData.ironConsumed = spaceConsumeData.ironConsumed + 1;
                        consumedIron++;
                    }
                    ironConsumption.push(spaceConsumeData);
                }
            });
        },
        generateAIBeerConsumption: function (locationid, player_type, neededBeer, industryTypes) {
            // for: Sell, step 2

            // start with merchant beer (using matching industry types)
            let allConnectedMarkets = this.findAllConnectedMarkets(locationid, player_type);

            // continue with player beer (connected or not, closest to flipping first)
            let playerUnflippedBreweries = this.findPlayerUnflippedBreweries(player_type);

            // continue with opponent beer (connected, furthest from flipping first)
            let connectedOpponentBeerLocations = this.findOpponentConnectedBeer(locationid, player_type);
        },
        findPlayerUnflippedBreweries: function (player_type) {
            let player = this.getPlayerFromType(player_type);
            let playerUnflippedBreweryLocations = [];

            playerUnflippedBreweryLocations = _.filter(this.board.locations, function(o) {
                let beerSpaces = _.find(o.spaces, function(p) {
                    if (p.tile) {
                        return p.tile.industrytype === INDUSTRY.Brewery && p.tile.availableBeer > 0 && p.tile.color === player.color;
                    }
                    return false;
                });
                return beerSpaces;
            });

            return playerUnflippedBreweryLocations;
        },
        findPlayerUnflippedCoalMines: function (player_type) {
            let player = this.getPlayerFromType(player_type);
            let playerUnflippedCoalMineLocations = [];

            playerUnflippedCoalMineLocations = _.filter(this.board.locations, function(o) {
                let coalSpaces = _.find(o.spaces, function(p) {
                    if (p.tile) {
                        return p.tile.industrytype === INDUSTRY.CoalMine && p.tile.availableCoal > 0 && p.tile.color === player.color;
                    }
                    return false;
                });
                return coalSpaces;
            });

            return playerUnflippedCoalMineLocations;
        },
        findPlayerUnflippedIronWorks: function (player_type) {
            let player = this.getPlayerFromType(player_type);
            let playerUnflippedIronWorksLocations = [];

            playerUnflippedIronWorksLocations = _.filter(this.board.locations, function(o) {
                let ironSpaces = _.find(o.spaces, function(p) {
                    if (p.tile) {
                        return p.tile.industrytype === INDUSTRY.IronWorks && p.tile.availableIron > 0 && p.tile.color === player.color;
                    }
                    return false;
                });
                return ironSpaces;
            });

            return playerUnflippedIronWorksLocations;
        },
        // end: Eliza consumption support

        // -- Human player consumption support
        findAllConnectedCoal: function (locationid, player_type) {
            let connectedLocations = this.findAllConnectedLocations(locationid, player_type);
            let connectedCoalLocations = [];

            if (connectedLocations && connectedLocations.length > 0) {
                _.forEach(connectedLocations, function(o) {
                    let coalSpaces = _.filter(o.spaces, function(p) {
                        if (p.tile) {
                            return p.tile.industrytype === INDUSTRY.CoalMine && p.tile.availableCoal > 0;
                        }
                        return false;
                    });

                    if (coalSpaces && coalSpaces.length > 0) {
                        o.coalspaces = coalSpaces;
                        connectedCoalLocations.push(o);
                    }
                });
           }

           let groupedConnectedLocations = _.groupBy(connectedCoalLocations, 'distance');
           return groupedConnectedLocations;
        },
        findAllUnflippedIronWorks: function () {
            let playerIronWorksLocations = [];

            _.forEach(this.board.locations, function(o) {
                let ironSpaces = _.filter(o.spaces, function(p) {
                    if (p.tile) {
                        return p.tile.industrytype === INDUSTRY.IronWorks && p.tile.availableIron > 0;
                    }
                    return false;
                });

                if (ironSpaces && ironSpaces.length > 0) {
                    o.ironspaces = ironSpaces;
                    playerIronWorksLocations.push(o);
                }
            });

            return playerIronWorksLocations;
        },
        findOpponentConnectedBeer: function (locationid, player_type) {
            // also used for Sell, step 2
            let connectedLocations = this.findAllConnectedLocations(locationid, player_type);
            let player = this.getPlayerFromType(player_type);
            let connectedOpponentBeerLocations = [];

            if (connectedLocations && connectedLocations.length > 0) {
                _.forEach(connectedLocations, function(o) {
                    let beerSpaces = _.find(o.spaces, function(p) {
                        if (p.tile) {
                            return p.tile.industrytype === INDUSTRY.Brewery && p.tile.availableBeer > 0 && p.tile.color !== player.color;
                        }
                        return false;
                    });

                    if (beerSpaces.length > 0) {
                        o.beerspaces = beerSpaces;
                        connectedOpponentBeerLocations.push(o);
                    }
                });
           }

           return connectedOpponentBeerLocations;
        },
        findConsumableBeer: function (locationid, player_type) {
            let consumableBeerLocations = [];

            // connected opponent beer
            let connectedOpponentBeerLocations = this.findOpponentConnectedBeer(locationid, player_type);

            // all player beer
            let playerUnflippedBreweries = this.findPlayerUnflippedBreweries(player_type);

            // union and unique select, getting all consumable beer locations
            consumableBeerLocations = _.uniqBy(_.union(connectedOpponentBeerLocations, playerUnflippedBreweries), 'id');

            return consumableBeerLocations;
        },
        // end: Human player consumption support

        // -- Supporting logical methods
        isLocationInNetwork: function (locationid, player_type) {
            let player = this.getPlayerFromType(player_type);
            let location = this.findLocationById(locationid);

            // check industries
            let playerIndustries = _.filter(location.spaces, function (p) {
                return p.tile !== null && p.tile !== undefined && p.tile.color === player.color;
            });
            if (playerIndustries && playerIndustries.length > 0) return true;

            // check links
            let edges = null;
            if (this.currentEra === ERA.Canal) {
                edges = location.edgesCanal;
            } else {
                edges = location.edgesRail;
            }

            let playerLinks = _.filter(edges, function (p) {
                return p.tile !== null && p.tile !== undefined && p.tile.color === player.color;
            });
            if (playerLinks && playerLinks.length > 0) return true;

            return false;
        },
        findAllLocationsInNetwork: function (player_type) {
            let player = this.getPlayerFromType(player_type);
            let locationsInPlayerNetwork = [];

            if (this.playerHasNoTilesOnBoard(player_type)) {
                locationsInPlayerNetwork = this.board.locations;
            } else {
                let self = this;
                _.forEach(this.board.locations, function (p) {
                    if (self.isLocationInNetwork(p.id, player_type)) {
                        locationsInPlayerNetwork.push(p);
                    }
                });
            }

            return _.uniqBy(locationsInPlayerNetwork, 'id');
        },
        playerHasNoTilesOnBoard: function (player_type) {
            let player = this.getPlayerFromType(player_type);
            let playerHasNoTiles = true;

            let self = this;
            _.forEach(this.board.locations, function (l) {
                if (l.type === LOCATIONTYPE.Industries) {

                    // check industry tiles
                    _.forEach(l.spaces, function (s) {
                        if (s.tile && s.tile.color === player.color) {
                            playerHasNoTiles = false;
                            return false;
                        }
                    });

                    if (playerHasNoTiles) {
                        // check links
                        let edges = [];
                        if (self.currentEra === ERA.Canal) {
                            edges = l.edgesCanal;
                        } else {
                            edges = l.edgesRail;
                        }

                        _.forEach(edges, function (e) {
                            if (e.tile && e.tile.color === player.color) {
                                playerHasNoTiles = false;
                                return false;
                            }
                        });
                    }
                }
            });

            return playerHasNoTiles;
        },
        findAdjacentIndustryLocationsForAI: function (locationid) {
            let location = this.findLocationById(locationid);
            let edges = [];
            let adjacentIndustryLocations = [];

            if (this.currentEra === ERA.Canal) {
                edges = location.edgesCanal;
            } else {
                edges = location.edgesRail;
            }

            let self = this;
            _.forEach(edges, function (e) {
                if (!(self.numberOfPlayers == '2' && e.toId < 8)) { // AI in two-player game ignores everything north of Stafford
                    let adjacentlocation = self.findLocationById(e.toId);

                    if (adjacentlocation.type === LOCATIONTYPE.Industries) {
                        adjacentIndustryLocations.push(adjacentlocation);
                    }
                }
            });

            return adjacentIndustryLocations;
        },
        findAdjacentIndustryLocationsForHumanNetwork: function (locationid) {
            let location = this.findLocationById(locationid);
            let edges = [];
            let adjacentIndustryLocations = [];

            if (this.currentEra === ERA.Canal) {
                edges = location.edgesCanal;
            } else {
                edges = location.edgesRail;
            }

            let self = this;
            _.forEach(edges, function (e) {
                let adjacentlocation = self.findLocationById(e.toId);

                if (!adjacentlocation.isSouthernFarm && !e.tile) {
                    adjacentIndustryLocations.push(adjacentlocation);
                }
            });

            return _.sortBy(adjacentIndustryLocations, 'name');
        },
        findAllPathsBetweenLocations: function (locationid1, targetlocationid, requireLinks, player_type) {
            // do a depth-first search to connect all locations
            // the resulting array of paths can then be used for various checks
            // this is and findAllPathsUtil is a fundamental function for all
            // other connection-related checks.
            // set "requireLinks" to true to only find paths with placed links (i.e. "connected")
            
            let visited = [locationid1];
            let paths = [];
            let path = [this.findLocationById(locationid1)];
            path.numberOfLinks = 0;
            path.hasOnlyPlayerLinks = true;

            this.findAllPathsUtil(locationid1, targetlocationid, visited, paths, path, requireLinks, player_type);

            // sort shortest paths to the top
            let sortedPaths = _.sortBy(paths, function(a) {
                return a.length;
            });

            // include distance between nodes
            _.forEach(sortedPaths, function (p) {
                p.distance = p.length - 1;
            });

            return sortedPaths;
        },
        findAllPathsUtil: function (locationid, targetlocationid, visited, paths, path, requireLinks, player_type) {

            let player = this.getPlayerFromType(player_type);
            
            if (locationid === targetlocationid) {
                let clonedPath = _.cloneDeep(path);
                clonedPath.numberOfLinks = path.numberOfLinks;
                clonedPath.hasOnlyPlayerLinks = path.hasOnlyPlayerLinks;
                paths.push(clonedPath);
            } else {
                let location = this.findLocationById(locationid);
                let edges = [];

                if (this.currentEra === ERA.Canal) {
                    edges = location.edgesCanal;
                } else {
                    edges = location.edgesRail;
                }

                // optionally, only include edges with links placed on them
                if (requireLinks) {
                    edges = _.filter(edges, function (e) {
                        return e.tile;
                    });
                }

                let self = this;
                _.forEach(edges, function(e) { 
                    if (!(self.numberOfPlayers == '2' && player.player_type !== PLAYER_TYPE.Human && e.toId < 8)) { // AI in two-player game ignores everything north of Stafford
                        if (!_.includes(visited, e.toId)) {
                            visited.push(e.toId);
                            path.push(self.findLocationById(e.toId));
                            if (e.tile) {
                                path.numberOfLinks++;

                                if (e.tile.color !== player.color) {
                                    path.hasOnlyPlayerLinks = false;
                                }
                            }

                            self.findAllPathsUtil(e.toId, targetlocationid, visited, paths, path, requireLinks, player_type);
                            visited.pop();

                            if (e.tile) {
                                path.numberOfLinks--;
                                if (e.tile.color !== player.color) {
                                    path.hasOnlyPlayerLinks = true;
                                }
                            }
                            path.pop();
                        }
                    }
                });
            }
        },
        findAllConnectedLocations: function (locationid, player_type) {
            let connectedLocations = [];

            let self = this;
            _.forEach(this.board.locations, function (p) {
                let paths = self.findAllPathsBetweenLocations(locationid, p.id, true, player_type);
                if (paths && paths.length > 0) {
                    p.distance = paths[0].distance;
                    p.numberOfLinks = paths[0].numberOfLinks;
                    p.hasOnlyPlayerLinks = paths[0].hasOnlyPlayerLinks;
                    connectedLocations.push(p);
                }
            });

            // return closest locations, clockface tiebreaker
            return _.sortBy(_.uniqBy(connectedLocations, 'id'), 'distance', 'id');
        },
        findAllConnectedMarkets: function (locationid, player_type) {
            let connectedLocations = this.findAllConnectedLocations(locationid, player_type);
            let connectedMarketLocations = [];

            if (connectedLocations && connectedLocations.length > 0) {
                 connectedMarketLocations = _.filter(connectedLocations, function (p) {
                    return p.type === LOCATIONTYPE.Merchants;
                 });
            }

            return connectedMarketLocations;
        },
        isConnectedToMarket: function (locationid, player_type) {
            let isConnected = this.findAllConnectedMarkets(locationid, player_type).length > 0;
            return isConnected;
        },
        findLocationsByIndustry: function (industry) {
            // find locations that have a particular industry type
            return _.filter(this.board.locations, function(o) {
                let findSpaces = _.find(o.spaces, function(p) {
                    return _.includes(p.types, industry);
                });
                return findSpaces;
            });
        },
        findLocationById: function (id) {
            return _.find(this.board.locations, function(o) {
                return o.id === id;
            });
        },
        findPlayerBoardIndustryTileById: function(player_type, id) {
            let player = this.getPlayerFromType(player_type);

            return _.find(player.board, function (o) {
                return o.id === id;
            });
        },
        findNextTileFromPlayerBoard: function (player_type, industrytype) {
            let player = this.getPlayerFromType(player_type);

            return _.find(player.board, function (t) {
                return t.industrytype === industrytype;
            });
        },
        findAllNextTilesFromPlayerBoard: function (player_type) {
            let allNextTiles = [];
            
            for (let i=0;i<6;i++) {
                allNextTiles.push(this.findNextTileFromPlayerBoard(player_type, i));
            }

            let self = this;
            return _.sortBy(allNextTiles, function (t) {
                return self.tileToString(t);
            });
        },
        findDevelopableTilesFromPlayerBoard: function (player_type, industrytype) {
            let player = this.getPlayerFromType(player_type);

            let tiles = _.filter(player.board, function (t) {
                return t.industrytype === industrytype;
            });

            developabletiles = [];
            if (tiles && tiles.length > 0) {
                if (!tiles[0].cannotDevelop) {
                    developabletiles.push({
                        selected: false,
                        developabletile: tiles[0]
                    });

                    if (tiles.length > 1) {
                        if (!tiles[1].cannotDevelop) {
                            developabletiles.push({
                                selected: false,
                                developabletile: tiles[1]
                            });
                        }
                    }
                }
            }

            return developabletiles;
        },
        findAllNextDevelopableTilesFromPlayerBoard: function (player_type) {
            let allNextTiles = [];
            
            for (let i=0;i<6;i++) {
                let tileGroup = {
                    industrytype: i,
                    industrytypename: industryStringMap[i],
                    tiles: this.findDevelopableTilesFromPlayerBoard(player_type, i)
                };
                if (tileGroup.tiles.length > 0) {
                    allNextTiles.push(tileGroup);
                }
            }

            return allNextTiles;
        },
        findMainBoardIndustryTileById: function(locationid, tileid) {
            let self = this;
            let location = this.findLocationById(locationid);
            let space = _.find(location.spaces, function (s) {
                return s.tile && s.tile.id === tileid;
            });

            return space.tile;
        },
        findSpacesWithTiles: function (spaces) {
            return _.filter(spaces, function (s) {
                return s.tile;
            });
        },
        reportAdjacentLocations: function (locationid) {
            let location = this.findLocationById(locationid);

            let edges = [];
            let adjacentIndustryLocations = [];

            if (this.currentEra === ERA.Canal) {
                edges = location.edgesCanal;
            } else {
                edges = location.edgesRail;
            }

            let self = this;
            _.forEach(edges, function (e) {
                if (e.tile) {
                    let adjacentlocation = self.findLocationById(e.toId);
                    adjacentlocation.color = e.tile.color;
                    adjacentlocation.colorString = self.colorString(e.tile.color);
                    adjacentIndustryLocations.push(adjacentlocation);
                }
            });

            return adjacentIndustryLocations;
        },
        getPlayerFromType: function (player_type) {
            switch (player_type) {
                case PLAYER_TYPE.Human: return this.humanPlayer;
                case PLAYER_TYPE.Eliza_AI: return this.eliza;
                case PLAYER_TYPE.Eleanor_AI: return this.eleanor;
            }
        },
        getPlayerStringFromColor: function (color) {
            if (color === this.humanPlayer.color) {
                return 'Your';
            }

            if (color === this.eliza.color) {
                return 'Eliza';
            }

            if (color === this.eleanor.color) {
                return 'Eleanor';
            }
        },
        colorString: function (color) {
            return colorMap[color];
        },
        findCardById: function (id) {
            let card = _.find(CARDS, function(c) {
                return c.id === id;
            });

            return _.cloneDeep(card);
        },
        boardIndustryTileToString: function (locationid, tileid) {
            let tile = this.findMainBoardIndustryTileById(locationid, tileid);
            return this.tileToString(tile);
        },
        tileToString: function (tile) {
            return industryStringMap[tile.industrytype] + ' (Level ' + romanize(tile.level) + ')';
        },
        boardIndustryTileToStringWithResources: function (locationid, tileid, includeTotalBeerOnMerchantTile) {
            let tile = this.findMainBoardIndustryTileById(locationid, tileid);
            let tilestring = '';

            if (tile.isMerchantTile) {

                if (tile.industryTypes) {

                    tilestring = tilestring + 'Merchant Tile [';

                    _.forEach(tile.industryTypes, function (i, index, arr) {
                        tilestring = tilestring + industryStringMap[i];

                        if (index !== arr.length - 1) {
                            tilestring = tilestring + ', ';
                        }
                    });

                    tilestring = tilestring + ']';

                    if (includeTotalBeerOnMerchantTile) {
                        tilestring = tilestring + ' (' + tile.totalBeer + ' beer left)';
                    }

                } else {
                    tilestring = tilestring + 'Merchant Tile (Empty)';
                }

            } else {

                tilestring = industryStringMap[tile.industrytype] + ' (Level ' + romanize(tile.level) + ')';

                if (tile.availableCoal > 0) {
                    tilestring = tilestring + ' | ' + tile.availableCoal + ' coal left';
                }

                if (tile.availableIron > 0) {
                    tilestring = tilestring + ' | ' + tile.availableIron + ' iron left';
                }

                if (tile.availableBeer > 0) {
                    tilestring = tilestring + ' | ' + tile.availableBeer + ' beer left';
                }

                tilestring = tilestring + (tile.flipped ? ' (Flipped!)' : ' (Unflipped)');

            }

            return tilestring;
        },
        // -- end Supporting logical methods

        toggleShowBoardState: function () {
            this.showBoardState = this.showBoardState ? false : true;
            return false;
        },
        reset: function () {
            this.numberOfPlayers = 2;
            this.gameHasStarted = false;
            this.useTurnOrder = false;
            this.soldInCanalEra = false;
            this.soldInRailEra = false;
            this.currentRound = 1;
            this.currentGameStep = GAME_STEPS.Setup;
            this.currentEra = ERA.Canal;
            this.currentPlayerType = PLAYER_TYPE.Human;
            this.board = _.cloneDeep(INITIAL_BOARD);
            this.humanPlayer = _.cloneDeep(HUMAN_PLAYER);
            this.eliza = _.cloneDeep(ELIZA);
            this.eleanor = _.cloneDeep(ELEANOR);
            this.showBoardState = false;
            this.undoState = {};
            this.saveGameState();
        },
        newGame: function () {
            if (confirm('Are you sure you want to start a NEW GAME?')) { this.reset(); };
        },
        loadUndoState: function() {

        },
        undo: function () {
            if (confirm('Are you sure you want to UNDO?')) { this.loadUndoState(); }
        },
        saveGameState: function () {
            let gameState = {};
            gameState.numberOfPlayers = this.numberOfPlayers;
            gameState.gameHasStarted = this.gameHasStarted;
            gameState.useTurnOrder = this.useTurnOrder;
            gameState.soldInCanalEra = this.soldInCanalEra;
            gameState.soldInRailEra = this.soldInRailEra;
            gameState.currentRound = this.currentRound;
            gameState.currentGameStep = this.currentGameStep;
            gameState.currentEra = this.currentEra;
            gameState.currentPlayerType = this.currentPlayerType;
            gameState.board = this.board;
            gameState.humanPlayer = this.humanPlayer;
            gameState.eliza = this.eliza;
            gameState.eleanor = this.eleanor;
            gameState.showBoardState = this.showBoardState;
            gameState.undoState = this.undoState;
            localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(gameState));
        },


        debugSetupTestBoard: function () {
            // TEMPORARY (remove this later): setup board state
            this.layIndustryTile(PLAYER_TYPE.Human, 0, 14, 2);
            this.layIndustryTile(PLAYER_TYPE.Human, 1, 15, 1);
            this.layIndustryTile(PLAYER_TYPE.Human, 7, 23, 1);
            this.layIndustryTile(PLAYER_TYPE.Human, 23, 25, 0);
            this.layIndustryTile(PLAYER_TYPE.Human, 24, 25, 1);
            this.layIndustryTile(PLAYER_TYPE.Human, 25, 2, 0);
            this.layIndustryTile(PLAYER_TYPE.Human, 26, 3, 0);
            this.layIndustryTile(PLAYER_TYPE.Human, 27, 6, 0);
            this.layIndustryTile(PLAYER_TYPE.Eliza_AI, 37, 23, 0);
            this.layNetworkTile(PLAYER_TYPE.Human, 14, 21);
            this.layNetworkTile(PLAYER_TYPE.Human, 21, 18);
            this.layNetworkTile(PLAYER_TYPE.Human, 21, 14);
            this.layNetworkTile(PLAYER_TYPE.Human, 14, 15);
            this.layNetworkTile(PLAYER_TYPE.Eliza_AI, 15, 18);
            this.layNetworkTile(PLAYER_TYPE.Human, 14, 13);
            this.layNetworkTile(PLAYER_TYPE.Human, 21, 25);
            this.layNetworkTile(PLAYER_TYPE.Human, 25, 26);
            this.layNetworkTile(PLAYER_TYPE.Eliza_AI, 23, 26);
        },
        // --- BEGIN: may not truly need these ---
        findCoalClosestToFlipping: function (locationid, player_type) {
            let connectedCoalLocations = this.findAllConnectedCoal(locationid, player_type);
            let player = this.getPlayerFromType(player_type);

            let closestToFlippingLocationId = null;
            let closestToFlippingSpaceId = null;
            let closestToFlippingColor = null;
            let tempAvailableCoal = null;
            let location = null;
            _.forEach(connectedCoalLocations, function (c) {
                _.forEach(c.spaces, function (s) {
                    if (s.tile && s.tile.industrytype === INDUSTRY.CoalMine && s.tile.availableCoal > 0) {
                        if (!tempAvailableCoal) {
                            tempAvailableCoal = s.tile.availableCoal;
                            closestToFlippingLocationId = c.id;
                            closestToFlippingSpaceId = s.id;
                            closestToFlippingColor = s.tile.color;
                        } else {
                            if (s.tile.availableCoal < tempAvailableCoal) {
                                tempAvailableCoal = s.tile.availableCoal;
                                closestToFlippingLocationId = c.id;
                                closestToFlippingSpaceId = s.id;
                                closestToFlippingColor = s.tile.color;
                            }

                            // player's coal wins tie breaks
                            if (s.tile.availableCoal === tempAvailableCoal) {
                                if (s.tile.color === player.color && closestToFlippingColor !== player.color) {
                                    tempAvailableCoal = s.tile.availableCoal;
                                    closestToFlippingLocationId = c.id;
                                    closestToFlippingSpaceId = s.id;
                                }
                            }
                        }
                    }
                });
            });

            if (closestToFlippingLocationId) {
                location = this.findLocationById(closestToFlippingLocationId);
            }

            return {
                closestToFlippingLocation: location,
                closestToFlippingSpaceId: closestToFlippingSpaceId
            }
        },
        findBeerClosestToFlipping: function (locationid) {
            let connectedBeerLocations = this.findAllConnectedBeer(locationid);

            let closestToFlippingLocationId = null;
            let closestToFlippingSpaceId = null;
            let tempAvailableBeer = null;
            let location = null;
            _.forEach(connectedBeerLocations, function (c) {
                _.forEach(c.spaces, function (s) {
                    if (s.tile && s.tile.industrytype === INDUSTRY.Brewery && s.tile.availableBeer > 0) {
                        if (!tempAvailableBeer) {
                            tempAvailableBeer = s.tile.tempAvailableBeer;
                            closestToFlippingLocationId = c.id;
                            closestToFlippingSpaceId = s.id;
                        } else {
                            if (s.tile.availableBeer < tempAvailableBeer) {
                                tempAvailableBeer = s.tile.availableBeer;
                                closestToFlippingLocationId = c.id;
                                closestToFlippingSpaceId = s.id;
                            }
                        }
                    }
                });
            });

            if (closestToFlippingLocationId) {
                location = this.findLocationById(closestToFlippingLocationId);
            }

            return {
                closestToFlippingLocation: location,
                closestToFlippingSpaceId: closestToFlippingSpaceId
            }
        }
        // --- END: may not truly need these ---
    }
});