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
        consumedata: consumedata // an array of locationid/spaceid/type/amount
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

// players
const HUMAN_PLAYER = {
    id: 0,
    name: "You",
    player_type: PLAYER_TYPE.Human,
    color: null,
    board: _.cloneDeep(INITIAL_HUMAN_BOARD),
    linktiles: _.cloneDeep(LINK_TILES),
    turnOrder: 0,
    nextAction: null
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
    difficulty: DIFFICULTY_LEVEL.Apprentice,
    turnOrder: 1,
    nextAction: null
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
    difficulty: DIFFICULTY_LEVEL.Apprentice,
    turnOrder: 2,
    nextAction: null
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
        players: [this.humanPlayer, this.eliza],
        showBoardState: false,
        undoState: {}
    },
    mounted: function() {
        this.computedUpdater++;

        // TEMPORARY (remove this later): setup board state
        this.layIndustryTile(PLAYER_TYPE.Human, 0, 21, 0);
        this.layNetworkTile(PLAYER_TYPE.Human, 21, 18);
        this.layNetworkTile(PLAYER_TYPE.Human, 21, 14);
        this.layNetworkTile(PLAYER_TYPE.Human, 14, 15);
        this.layNetworkTile(PLAYER_TYPE.Human, 15, 18);
        this.layNetworkTile(PLAYER_TYPE.Human, 14, 13);
        this.layNetworkTile(PLAYER_TYPE.Human, 21, 25);
        this.layNetworkTile(PLAYER_TYPE.Human, 25, 26);
        this.layIndustryTile(PLAYER_TYPE.Human, 1, 15, 0);

        let paths = this.findAllPathsBetweenLocations(21, 18, false);
        console.log(paths);

        let connectedlocations = this.findAllConnectedLocations(21);
        console.log(connectedlocations);

        let connectedmarketlocations = this.findAllConnectedMarkets(21);
        console.log(connectedmarketlocations);

        let connectedcoallocations = this.findAllConnectedCoal(21);
        console.log(connectedcoallocations);

        let coalClosestToFlipping = this.findCoalClosestToFlipping(21, PLAYER_TYPE.Human);
        console.log(coalClosestToFlipping);

        let unconnectedLocations = this.findUnconnectedLocations(21);
        console.log(unconnectedLocations);
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
            this.eliza.cards = _.shuffle(_.cloneDeep(getAIDeck(this.eliza.deckType, 2)));
            this.eleanor.cards = _.shuffle(_.cloneDeep(getAIDeck(this.eliza.deckType, 2)));

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
        },
        nextGameStep: function () {
            if (this.numberOfPlayers == '2' && this.currentGameStep === GAME_STEPS.Eliza_ShowAction) {
                this.currentGameStep = GAME_STEPS.HumanPlayer_ChooseAction1;
                return;
            }

            if (this.numberOfPlayers == '3' && this.currentGameStep === GAME_STEPS.Eleanor_ShowAction) {
                this.currentGameStep = GAME_STEPS.HumanPlayer_ChooseAction1;
                return;
            }

            this.currentGameStep = this.currentGameStep + 1;
        },
        
        // Primary action functions
        calculateAIAction: function (player_type) {

        },
        executeNextAction: function () {
            // use 'currentPlayer
        },
        executeAIBuild: function (player_type) {

        },
        executeAINetwork: function (player_type) {

        },
        executeAISell: function (player_type) {

        },
        tryHumanBuildAction: function (space, tile) {

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
            edge1.tile = _.cloneDeep(linktile);
            edge2.tile = _.cloneDeep(linktile);
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
        findClosestUnconnectedUnflippedIndustry: function (locationid, player_type, findBelongingToPlayer) {
            // for: Network (after build Coal Mine, Iron Works, or Brewery)
            // if findBelongingToPlayer is true then only find the player's, otherwise find any other than the player's
        },
        findClosestUnconnectedMerchant: function (locationid, industrytype) {
            // for: Network (after build Coal Mine, Iron Works, or Brewery)
        },
        findClosestUnconnectedMatchingMerchant: function (locationid, industrytype) {
            // for: Network (after build Pottery, Cotton Mill, or Manufacturer)
        },
        findUnconnectedLocations: function (locationid) {
            
        },
        findPlayerUnflippedIndustries: function (player_type) {
            // for: Sell, step 1
        },
        findPlayerUnflippedIndustriesConnectedToMarket: function (player_type) {
            // for: Sell, step 1 and 2
            // use "findAllConnectedMarkets" for each unflipped industry
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

            unflippedIndustryLocations = _.filter(this.board.locations, function(o) {
                return o.type === LOCATIONTYPE.Merchants;
            });

            return merchantLocations;
        },
        // end: Eliza rule support


        // -- Eliza consumption support
        findPlayerIronClosestToFlipping: function (locationid, player_type) {
            let player = this.getPlayerFromType(player_type);
        },
        findOpponentIronFurthestFromFlipping: function (locationid, player_type) {
            let player = this.getPlayerFromType(player_type);
        },
        findPlayerBeerClosestToFlipping: function (locationid, player_type) {
            let player = this.getPlayerFromType(player_type);
        },
        findClosestOpponentBeer: function (locationid, player_type) {
            // use id as tiebreaker (lower id is first in clockface order)
            let player = this.getPlayerFromType(player_type);
        },
        findClosestMatchingMarket: function (locationid, industrytype, needBeer) {
            // use beer existence (if needed) as tiebreaker, then id as tiebreaker (lower id is first in clockface order)
        },
        findPlayerUnflippedBreweries: function (player_type) {
            // for: Sell, step 2
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
        findAllConnectedCoal: function (locationid) {
            let connectedLocations = this.findAllConnectedLocations(locationid);
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
        findClosestConnectedCoal: function (locationid) {
            // use "findAllConnectedCoal", already sorted by path length
        },
        findOpponentConnectedBeer: function (locationid, player_type) {
            // also used for Sell, step 2
            let connectedLocations = this.findAllConnectedLocations(locationid);
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
            let connectedLocations = this.findAllConnectedLocations(locationid);
            let player = this.getPlayerFromType(player_type);
            let consumableBeerLocations = [];

            // connected opponent beer
            let connectedOpponentBeerLocations = this.findOpponentConnectedBeer(locationid, player_type);

            // TODO: also get all player beer (connected or not), append and unique select

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
        findAllPathsBetweenLocations: function (locationid1, targetlocationid, requireLinks) {
            // do a depth-first search to connect all locations
            // the resulting array of paths can then be used for various checks
            // this is and findAllPathsUtil is a fundamental function for all
            // other connection-related checks.
            // set "requireLinks" to true to only find paths with placed links (i.e. "connected")
            
            let visited = [locationid1];
            let paths = [];
            let path = [this.findLocationById(locationid1)];

            this.findAllPathsUtil(locationid1, targetlocationid, visited, paths, path, requireLinks);

            // sort shortest paths to the top
            let sortedPaths = _.sortBy(paths, function(a) {
                return a.length;
            });

            _.forEach(sortedPaths, function (p) {
                p.distance = p.length - 1;
            });

            return sortedPaths;
        },
        findAllPathsUtil: function (locationid, targetlocationid, visited, paths, path, requireLinks) {
            if (locationid === targetlocationid) {
                paths.push(_.cloneDeep(path));
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
                    if (!_.includes(visited, e.toId)) {
                        visited.push(e.toId);
                        path.push(self.findLocationById(e.toId));
                        self.findAllPathsUtil(e.toId, targetlocationid, visited, paths, path, requireLinks);
                        visited.pop();
                        path.pop();
                    }
                });
            }
        },
        findAllConnectedLocations: function (locationid) {
            let connectedLocations = [];

            let self = this;
            _.forEach(this.board.locations, function (p) {
                let paths = self.findAllPathsBetweenLocations(locationid, p.id, true);
                if (paths && paths.length > 0) {
                    p.distance = paths[0].distance;
                    connectedLocations.push(p);
                }
            });

            // return closest locations, clockface tiebreaker
            return _.sortBy(_.uniqBy(connectedLocations, 'id'), 'distance', 'id');
        },
        findAllConnectedMarkets: function (locationid) {
            let connectedLocations = this.findAllConnectedLocations(locationid);
            let connectedMarketLocations = [];

            if (connectedLocations && connectedLocations.length > 0) {
                 connectedMarketLocations = _.filter(connectedLocations, function (p) {
                    return p.type === LOCATIONTYPE.Merchants;
                 });
            }

            return connectedMarketLocations;
        },
        isConnectedToMarket: function (locationid) {
            return this.findAllConnectedMarkets(locationid).length > 0;
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
            return industryStringMap[tile.industryType] + ' ' + romanize(tile.level);
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
            this.players = [this.humanPlayer, this.eliza];
            this.showBoardState = false;
            this.undoState = {};
        },
        loadUndoState: function() {

        },
        saveGameState: function () {

        },


        // --- BEGIN: may not truly need these ---
        findCoalClosestToFlipping: function (locationid, player_type) {
            let connectedCoalLocations = this.findAllConnectedCoal(locationid);
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