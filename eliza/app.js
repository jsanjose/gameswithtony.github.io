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
    linktiles: _.cloneDeep(LINK_TILES)
};

// AI player 1
const ELIZA = {
    id: 1,
    name: "Eliza",
    player_type: PLAYER_TYPE.Eliza_AI,
    color: null,
    board: _.cloneDeep(INITIAL_AI_BOARD),
    linktiles: _.cloneDeep(LINK_TILES),
    cards: null,
    difficulty: DIFFICULTY_LEVEL.Apprentice
}

// optional AI player 2
const ELEANOR = {
    id: 2,
    name: "Eleanor",
    player_type: PLAYER_TYPE.Eleanor_AI,
    color: null,
    board: _.cloneDeep(INITIAL_AI_BOARD),
    linktiles: _.cloneDeep(LINK_TILES),
    cards: null,
    difficulty: DIFFICULTY_LEVEL.Apprentice
}

var app = new Vue({
    el: '#eliza',
    data: {
        computedUpdater: 0,
        numberOfPlayers: 2,
        gameHasStarted: false,
        currentEra: ERA.Canal,
        board: _.cloneDeep(INITIAL_BOARD),
        humanPlayer: _.cloneDeep(HUMAN_PLAYER),
        eliza: _.cloneDeep(ELIZA),
        eleanor: _.cloneDeep(ELEANOR),
        players: [this.humanPlayer, this.eliza],
        undoState: {}
    },
    mounted: function() {
        this.computedUpdater++;

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

        // TEMPORARY (remove this later): setup board state
        this.layIndustryTile(PLAYER_TYPE.Human, 0, 21, 0);
        this.layNetworkTile(PLAYER_TYPE.Human, 0, 21, 18);
    },
    computed: {

    },
    methods: {
        startGame: function() {
            // TODO: This will be replaced with a start screen for deck types and number of players
            this.eliza.cards = _.cloneDeep(getAIDeck(AI_DECK_TYPES.Balanced, 2));
            this.eleanor.cards = _.cloneDeep(getAIDeck(AI_DECK_TYPES.Balanced, 2));
        },
        tryHumanBuildAction: function (space, tile) {

        },
        tryHumanNetworkAction: function (locationid1, locationid2, tile) {

        },
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
        layNetworkTile: function (player_type, linktileid, locationid1, locationid2) {
            // This function does no error checking. 'tryHumanNetworkAction' does error checking, and is otherwise used by the AI bots directly.

            let player = this.getPlayerFromType(player_type);

            // get the link tile
            let linktile = _.find(player.linktiles, function(p) {
                return p.id === linktileid;
            });

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

            _.remove(player.linktiles, function (p) {
                return p.id === linktileid;
            });
        },
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

            return locationsInPlayerNetwork;
        },
        findAllPathsBetweenLocations: function (locationid1, targetlocationid) {
            // do a depth-first search to connect all locations
            // the resulting array of paths can then be used for various checks
            // this is and findAllPathsUtil is a fundamental function for all
            // other connection-related checks.
            
            let visited = [locationid1];
            let paths = [];
            let path = [this.findLocationById(locationid1)];

            this.findAllPathsUtil(locationid1, targetlocationid, visited, paths, path);

            // sort shortest paths to the top
            let sortedPaths = _.sortBy(paths, function(a) {
                return a.length;
            });

            console.log(sortedPaths);
            return sortedPaths;
        },
        findAllPathsUtil: function (locationid, targetlocationid, visited, paths, path) {
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

                let self = this;
                _.forEach(edges, function(e) { 
                    if (!_.includes(visited, e.toId)) {
                        visited.push(e.toId);
                        path.push(self.findLocationById(e.toId));
                        self.findAllPathsUtil(e.toId, targetlocationid, visited, paths, path);
                        visited.pop();
                        path.pop();
                    }
                });
            }
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
        reset: function () {
            this.numberOfPlayers = 2;
            this.gameHasStarted = false;
            this.currentEra = ERA.Canal;
            this.board = _.cloneDeep(INITIAL_BOARD);
            this.humanPlayer = _.cloneDeep(HUMAN_PLAYER),
            this.eliza = _.cloneDeep(ELIZA),
            this.eleanor = _.cloneDeep(ELEANOR),
            this.players = [this.humanPlayer, this.eliza],
            this.undoState = {};
        }
    }
});