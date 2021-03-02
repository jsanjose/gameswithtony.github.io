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