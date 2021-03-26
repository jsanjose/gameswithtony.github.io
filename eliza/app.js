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

// action object stores the next action intended to be taken
// when the 'Next' button is taken then the action is
// these are stored on each player object
// 'consumedata' is an array of tileids with how many of each resource taken from each tile
function createAction(action, data) {
    return {
        round: 0, // increment each round (use this over page refreshes to see if the action needs to be recalculated)
        action: action,
        data: data
    };
}

function createBuildData(locationid, industrytype, consumedata) {
    return {
        locationid: locationid,
        industrytype: industrytype,
        consumedata: consumedata
    };
}

function createNetworkData(locationid1, locationid2, consumedata) {
    return {
        locationid1: locationid1,
        locationid2: locationid2,
        consumedata: consumedata
    };
}

function createDevelopData(consumedata) {
    return {
        consumedata: consumedata
    };
}

function createConsumeData(locationid, spaceid, resourcetype, totalavailable, totalconsumed) {
    return {
        locationid: locationid,
        spaceid: spaceid,
        resourcetype: resourcetype,
        totalavailable: totalavailable,
        totalconsumed: totalconsumed
    };
}

// players
const HUMAN_PLAYER = {
    id: 0,
    name: "You",
    player_type: PLAYER_TYPE.Human,
    color: null,
    board: _.cloneDeep(INITIAL_HUMAN_BOARD),
    linktiles: _.cloneDeep(LINK_TILES),
    turnOrder: 0,
    currentTurnIndex: 0, // human player takes two actions
    nextAction: null // intended action
};

// AI player 1
const ELIZA = {
    id: 1,
    name: "Eliza",
    player_type: PLAYER_TYPE.Eliza_AI,
    color: null,
    board: _.cloneDeep(INITIAL_AI_BOARD),
    linktiles: _.cloneDeep(LINK_TILES),
    deckType: AI_DECK_TYPES.Balanced,
    cards: null,
    currentCard1: null,
    currentCard2: null,
    difficulty: DIFFICULTY_LEVEL.Apprentice,
    turnOrder: 1,
    nextAction: null // intended action
}

// optional AI player 2
const ELEANOR = {
    id: 2,
    name: "Eleanor",
    player_type: PLAYER_TYPE.Eleanor_AI,
    color: null,
    board: _.cloneDeep(INITIAL_AI_BOARD),
    linktiles: _.cloneDeep(LINK_TILES),
    deckType: AI_DECK_TYPES.Balanced,
    cards: null,
    currentCard1: null,
    currentCard2: null,
    difficulty: DIFFICULTY_LEVEL.Apprentice,
    turnOrder: 2,
    nextAction: null // intended action
}

var app = new Vue({
    el: '#eliza',
    data: {
        computedUpdater: 0,
        numberOfPlayers: 2,
        gameHasStarted: false,
        currentRound: 0,
        currentGameStep: GAME_STEPS.Setup,
        currentEra: ERA.Canal,
        currentPlayer: PLAYER_TYPE.Human,
        board: _.cloneDeep(INITIAL_BOARD),
        humanPlayer: _.cloneDeep(HUMAN_PLAYER),
        eliza: _.cloneDeep(ELIZA),
        eleanor: _.cloneDeep(ELEANOR),
        showBoardState: false,
        undoState: {}
    },
    mounted: function() {
        this.computedUpdater++;

        this.startGame();

        // TEMPORARY (remove this later): setup board state
        this.layIndustryTile(PLAYER_TYPE.Human, 0, 21, 0);
        this.layNetworkTile(PLAYER_TYPE.Human, 21, 18);
        this.layNetworkTile(PLAYER_TYPE.Human, 21, 14);
        this.layNetworkTile(PLAYER_TYPE.Human, 14, 15);
        this.layNetworkTile(PLAYER_TYPE.Eliza_AI, 15, 18);
        this.layNetworkTile(PLAYER_TYPE.Human, 14, 13);
        this.layNetworkTile(PLAYER_TYPE.Human, 21, 25);
        this.layNetworkTile(PLAYER_TYPE.Human, 25, 26);
        this.layIndustryTile(PLAYER_TYPE.Human, 1, 15, 0);
        this.layIndustryTile(PLAYER_TYPE.Human, 34, 23, 0);

        let closestUnconnectedUnflippedIndustryWithPath = this.findClosestUnconnectedUnflippedIndustryWithPath(21, PLAYER_TYPE.Human);
        console.log(closestUnconnectedUnflippedIndustryWithPath);

        let closestUnconnectedMerchantWithPath = this.findClosestUnconnectedMerchantWithPath(21, null, PLAYER_TYPE.Human);
        console.log(closestUnconnectedMerchantWithPath);

        let allNextTiles = this.findAllNextTilesFromPlayerBoard(PLAYER_TYPE.Human);
        let self = this;
        _.forEach(allNextTiles, function (t) {
            console.log(self.industryTileToString(t));
        });

        this.calculateAIAction(PLAYER_TYPE.Eliza_AI);
    },
    computed: {
        validHumanBuildLocations: function () {
            let locations = [];
            let self = this;
            if (this.currentEra === ERA.Canal) {
                // locations where the player hasn't built
                locations = _.filter(this.board.locations, function (l) {
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

            return _.sortBy(locations, 'name');
        },
        validHumanNetworkLocations: function() {
            this.computedUpdater++;
            let locations = this.findAllLocationsInNetwork(PLAYER_TYPE.Human);

            if (locations.length === 0) {
                return _.sortBy(this.board.locations, 'name');
            }
            return _.sortBy(locations, 'name');
        }
    },
    methods: {
        setPlayerColor: function (color) {
            this.humanPlayer.color = color;
            this.saveGameState();
        },
        startGame: function() {
            this.gameHasStarted = true;

            // TODO: This will be replaced with a start screen for deck types, color choice, and number of players
            this.humanPlayer.color = PLAYER_COLOR.LightBlue;
            this.eliza.color = PLAYER_COLOR.Red;
            this.eleanor.color = PLAYER_COLOR.Yellow;

            // TEMPORARY (CHANGE THIS TO PLAYER CHOICE): set player colors
            _.forEach(this.humanPlayer.linktiles, function(p) {
                p.color = PLAYER_COLOR.LightBlue;
            });
            _.forEach(this.humanPlayer.board, function(p) {
                p.color = PLAYER_COLOR.LightBlue;
            });

            _.forEach(this.eliza.linktiles, function(p) {
                p.color = PLAYER_COLOR.Red;
            });
            _.forEach(this.eliza.board, function(p) {
                p.color = PLAYER_COLOR.Red;
            });

            _.forEach(this.eleanor.linktiles, function(p) {
                p.color = PLAYER_COLOR.Yellow;
            });
            _.forEach(this.eleanor.board, function(p) {
                p.color = PLAYER_COLOR.Yellow;
            });

            // shuffle cards
            this.eliza.cards = _.shuffle(_.cloneDeep(getAIDeck(this.eliza.deckType, 2)));
            this.eleanor.cards = _.shuffle(_.cloneDeep(getAIDeck(this.eliza.deckType, 2)));
        },
        nextGameStep: function () {
            this.currentGameStep = this.currentGameStep + 1;
        },
        
        // Primary action functions
        calculateAIAction: function (player_type) {
            // this function builds the 'nextAction' object attached to the player object. It does not execute any actions.

            let player = this.getPlayerFromType(player_type);
            let action = null;

            // data package, start with storing the current round
            // use action data to describe what the AI will do and then eventually do it
            let actiondata = {
                round: this.currentRound,
                neededCoal: 0,
                neededIron: 0,
                neededBeer: 0
            };

            // draw two cards
            player.currentCard1 = this.findCardById(player.cards.shift());
            player.currentCard2 = this.findCardById(player.cards.shift());
            console.log('--------------');
            console.log(player.currentCard1.name);
            console.log(player.currentCard2.name);

            let sell = false;

            // if both cards are industry (non-null industry type) then SELL
            if (player.currentCard1.industrytype && player.currentCard2.industrytype) {
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
                    if (!card.industrytype) {
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

                                    // TODO: check if moving coal to market and flipping
                                    // add this to actiondata (coalMoved, willFlip)
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

                                    // TODO: check if moving iron to market and flipping
                                    // add this to actiondata (ironMoved, willFlip)
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

                            if (build) {
                                return false;
                            }
                        });
                    }

                    if (build) {
                        // Find tile to place from player board
                        let industrytile = this.findNextTileFromPlayerBoard(player_type, actiondata.industrytype);
                        actiondata.industrytile = industrytile;

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
                            closestWithPath = this.findClosestUnconnectedMerchantWithPath(actiondata.locationid, actiondata.industryptype, player_type);

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
                        if (actiondata.linktargetlocationid && this.currentEra === ERA.Rail) {
                            actiondata.addVP = actiondata.addVP + addVPRailEra;
                            actiondata.neededCoal = actiondata.neededCoal + 1;
                        }

                        // TODO: calculate iron and coal consumption
                    }

                    if (build) {
                        break;
                    }
                }

                // if built, set the nextaction 
                if (build) {
                    action = AI_ACTION.BuildAndNetwork;
                    
                    player.nextAction = {
                        action: action,
                        actiondata: actiondata
                    };
                } else {
                    // if neither card could be built, sell
                    sell = true;
                }
            }

            // SELL
            if (sell) {
                action = AI_ACTION.Sell;

                // TODO: flip sellable market-connected industries

                // TODO: calculate beer consumption
            }

            console.log(actiondata);
        },
        executeNextAction: function () {
            // use 'currentPlayer'
        },
        executeAIBuildAndNetwork: function (player_type) {
            
        },
        executeAISell: function (player_type) {

        },
        tryHumanBuildAction: function (locationid, spaceid, tile) {

        },
        tryHumanNetworkAction: function (locationid1, locationid2, tile) {

        },
        // end: Primary action functions


        layIndustryTile: function (player_type, tileid, locationid, spaceid) {
            // This function does no error checking. 'tryHumanBuildAction' does error checking, and is otherwise used by the AI bots directly.

            let player = this.getPlayerFromType(player_type);

            // find the tile on the player's player board
            let tile = _.find(player.board, function(p) {
                return p.id === tileid;
            });

            if (tile !== null) {
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
            }
        },
        layNetworkTile: function (player_type, locationid1, locationid2) {
            // This function does no error checking. 'tryHumanNetworkAction' does error checking, and is otherwise used by the AI bots directly.

            let player = this.getPlayerFromType(player_type);

            let linktile = player.linktiles.pop();

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
            linktile1.toId1 = locationid1;
            linktile1.toId2 = locationid2;

            let linktile2 = _.cloneDeep(linktile);
            linktile2.toId1 = locationid2;
            linktile2.toId2 = locationid1;

            edge1.tile = linktile1;
            edge2.tile = linktile2;
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
                return sortedSpaces[0]; // choose single type over double
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
        findPlayerUnflippedIndustries: function (player_type) {
            // for: Sell, step 1
            let player = this.getPlayerFromType(player_type);

            let playerUnflippedIndustryLocations = [];

            playerUnflippedIndustryLocations = _.filter(this.board.locations, function(o) {
                let spaces = _.find(o.spaces, function(p) {
                    if (p.tile && p.tile.color === player.color) {
                        return !p.tile.flipped;
                    }
                    return false;
                });
                return o.type === LOCATIONTYPE.Industries && spaces;
            });

            return playerUnflippedIndustryLocations;
        },
        findPlayerUnflippedIndustriesConnectedToMarket: function (player_type) {
            // for: Sell, step 1 and 2
            // use "findAllConnectedMarkets" for each unflipped industry

            let playerUnflippedIndustryLocations = this.findPlayerUnflippedIndustries(player_type);

            let playerUnflippedIndustriesConnectedToMarket = [];

            let self = this;
            _.forEach(playerUnflippedIndustryLocations, function (l) {
                let connectedMarkets = self.findAllConnectedMarkets(l.id, player_type);

                if (connectedMarkets && connectedMarkets.length > 0) {
                    playerUnflippedIndustriesConnectedToMarket.push(l);
                }
            });

            return playerUnflippedIndustriesConnectedToMarket;
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
        generateAIIndustryTileConsumption: function (tileid) {

        },
        generateAINetworkTileConsumption: function (tileid) {

        },
        generateAICoalConsumption: function (locationid, player_type, neededCoal) {
            // for Build (all eras) and Network (Rail Era)
            let player = this.getPlayerFromType(player_type);
            let coalConsumptionData = [];

            let connectedCoalLocations = this.findAllConnectedCoal(locationid, player_type);

            // TODO: generate consumption
        },
        generateAIIronConsumption: function (locationid, player_type, neededIron) {
            // for Build

            // start with player iron (closest to flipping first)

            // continue with opponent iron (furthest from flipping first)
        },
        generateAIBeerConsumption: function (locationid, player_type, neededBeer) {
            // for: Sell, step 2

            // start with merchant beer

            // continue with player beer (connected or not, closest to flipping first)

            // continue with opponent beer (connected, furthest from flipping first)
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
                connectedCoalLocations = _.filter(connectedLocations, function(o) {
                    let coalSpaces = _.find(o.spaces, function(p) {
                        if (p.tile) {
                            return p.tile.industrytype === INDUSTRY.CoalMine && p.tile.availableCoal > 0;
                        }
                        return false;
                    });
                    return coalSpaces;
                });
           }

           return connectedCoalLocations;
        },
        findAllUnflippedIronWorks: function () {
            let playerIronWorksLocations = [];

            playerIronWorksLocations = _.filter(this.board.locations, function(o) {
                let ironSpaces = _.find(o.spaces, function(p) {
                    if (p.tile) {
                        return p.tile.industrytype === INDUSTRY.IronWorks && p.tile.availableIron > 0;
                    }
                    return false;
                });
                return ironSpaces;
            });

            return playerIronWorksLocations;
        },
        findOpponentConnectedBeer: function (locationid, player_type) {
            // also used for Sell, step 2
            let connectedLocations = this.findAllConnectedLocations(locationid, player_type);
            let player = this.getPlayerFromType(player_type);
            let connectedOpponentBeerLocations = [];

            if (connectedLocations && connectedLocations.length > 0) {
                connectedOpponentBeerLocations = _.filter(connectedLocations, function(o) {
                    let beerSpaces = _.find(o.spaces, function(p) {
                        if (p.tile) {
                            return p.tile.industrytype === INDUSTRY.Brewery && p.tile.availableBeer > 0 && p.tile.color !== player.color;
                        }
                        return false;
                    });
                    return beerSpaces;
                });
           }

           return connectedOpponentBeerLocations;
        },
        findConsumableBeer: function (locationid, player_type) {
            let connectedLocations = this.findAllConnectedLocations(locationid, player_type);
            let player = this.getPlayerFromType(player_type);
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
            // TODO: when the human chooses to network, use this to show list of possible starting points
            let player = this.getPlayerFromType(player_type);
            let locationsInPlayerNetwork = [];

            let self = this;
            _.forEach(this.board.locations, function (p) {
                if (self.isLocationInNetwork(p.id, player_type)) {
                    locationsInPlayerNetwork.push(p);
                }
            });

            return _.uniqBy(locationsInPlayerNetwork, 'id');
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
            return this.findAllConnectedMarkets(locationid, player_type).length > 0;
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

            for (let i=0;i<5;i++) {
                allNextTiles.push(this.findNextTileFromPlayerBoard(player_type, i));
            }

            return allNextTiles;
        },
        getPlayerFromType: function (player_type) {
            switch (player_type) {
                case PLAYER_TYPE.Human: return this.humanPlayer;
                case PLAYER_TYPE.Eliza_AI: return this.eliza;
                case PLAYER_TYPE.Eleanor_AI: return this.eleanor;
            }
        },
        findCardById: function (id) {
            let card = _.find(CARDS, function(c) {
                return c.id === id;
            });

            return _.cloneDeep(card);
        },
        industryTileToString: function (tile) {
            return industryStringMap[tile.industrytype] + ' (Level ' + romanize(tile.level) + ')';
        },
        // -- end Supporting logical methods

        reset: function () {
            this.numberOfPlayers = 2;
            this.gameHasStarted = false;
            this.currentRound = 0;
            this.currentGameStep = GAME_STEPS.Setup;
            this.currentEra = ERA.Canal;
            this.currentPlayer = PLAYER_TYPE.Human;
            this.board = _.cloneDeep(INITIAL_BOARD);
            this.humanPlayer = _.cloneDeep(HUMAN_PLAYER);
            this.eliza = _.cloneDeep(ELIZA);
            this.eleanor = _.cloneDeep(ELEANOR);
            this.showBoardState = false;
            this.undoState = {};
        },
        loadUndoState: function() {

        },
        saveGameState: function () {

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