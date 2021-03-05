// toString for names of spaces by industries
function spaceToString(space) {
    let toStringResult = _.join(space.types, ' / ');

    let replacedString = toStringResult.replace(/0|1|2|3|4|5/gi, function(matched){
    return industryStringMap[matched];
    });

    return replacedString;
}

// player boards (hold tiles)
const INITIAL_HUMAN_BOARD = {

};

const INITIAL_AI_BOARD = {
};

// players
const HUMAN_PLAYER = {
    id: 0,
    name: "You",
    color: null,
    board: _.cloneDeep(INITIAL_HUMAN_BOARD)
};

// AI player 1
const ELIZA = {
    id: 1,
    name: "Eliza",
    color: null,
    board: _.cloneDeep(INITIAL_AI_BOARD),
    difficulty: DIFFICULTY_LEVEL.Apprentice
}

// future AI player 2
const ELEANOR = {
    id: 2,
    name: "Eleanor",
    color: null,
    board: _.cloneDeep(INITIAL_AI_BOARD),
    difficulty: DIFFICULTY_LEVEL.Apprentice
}

var app = new Vue({
    el: '#eliza',
    data: {
        computedUpdater: 0,
        numberOfPlayers: 2,
        board: _.cloneDeep(INITIAL_BOARD),
        humanPlayer: _.cloneDeep(HUMAN_PLAYER),
        eliza: _.cloneDeep(ELIZA),
        eleanor: _.cloneDeep(ELEANOR),
        players: [this.humanPlayer, this.eliza],
        undoState: {}
    },
    mounted: function() {
        this.computedUpdater++;
        console.log(this.findLocationsByIndustry(INDUSTRY.CoalMine));
        console.log(this.findLocationById(19));
    },
    computed: {

    },
    methods: {
        layIndustryTile: function (tile) {

        },
        findLocationsByIndustry: function (industry) {
            // find spaces that have a particular industry type
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
        reset: function () {
            this.numberOfPlayers = 2;
            this.board = _.cloneDeep(INITIAL_BOARD);
            this.humanPlayer = _.cloneDeep(HUMAN_PLAYER),
            this.eliza = _.cloneDeep(ELIZA),
            this.eleanor = _.cloneDeep(ELEANOR),
            this.players = [this.humanPlayer, this.eliza],
            this.undoState = {};
        }
    }
});