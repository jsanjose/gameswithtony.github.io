let map = INITIAL_BOARD.locations;

// find spaces that have a particular industry type
let typeSearch = INDUSTRY.CoalMine;
let spacesWithType = _.filter(map, function(o) {
    let findSpaces = _.find(o.spaces, function(p) {
        return _.includes(p.types, typeSearch);
    });
    return findSpaces;
});

console.log(spacesWithType);


// toString for spaces
function spaceToString(space) {
    let toStringResult = _.join(space.types, ' / ');

    let replacedString = toStringResult.replace(/0|1|2|3|4|5/gi, function(matched){
    return industryStringMap[matched];
    });

    return replacedString;
}

let locationId = 1;
let selectedLocation = (_.filter(map, function(o) {
    return o.id === locationId;
}))[0];

console.log(spaceToString(selectedLocation.spaces[0]));


var app = new Vue({
    el: '#eliza',
    data: {
        computedUpdater: 0,
        undoState: {}
    },
    mounted: function() {
        this.computedUpdater++;
    },
    computed: {

    },
    methods: {

    }
});