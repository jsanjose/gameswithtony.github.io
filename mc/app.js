const LOCALSTORAGENAME = "mcgamestate";

const TYPE = { MainScheme: 0, SideScheme: 1, Character: 2 };

const PAGE_STATE = { Main: 0, Edit: 1, Load: 2 };

const updateHitPoints = function (points, event) {
    let totalpoints = new Number(this.hitpoints) + new Number(points);

    if (totalpoints > this.maxhitpoints) {
        totalpoints = this.maxhitpoints;
    }

    this.hitpoints = totalpoints;
    app.saveGameState();
    event.preventDefault();
    app.$forceUpdate();
}

const toggleStatus = function (type, event) {
    if (type === 0) {
        this.isStunned = !this.isStunned;
    }

    if (type === 1) {
        this.isConfused = !this.isConfused;
    }

    if (type === 2) {
        this.isTough = !this.isTough;
    }

    app.saveGameState();
    event.preventDefault();
    app.$forceUpdate();
}

function createCharacter(id, name, hitpoints) {
    return {
        id: id,
        name: name,
        hitpoints: hitpoints,
        maxhitpoints: hitpoints,
        hide: false,
        isStunned: false,
        isTough: false,
        isConfused: false,
        type: TYPE.Character,
        updateHitPoints: updateHitPoints,
        toggleStatus: toggleStatus
    };
}
let sampleScheme = createCharacter('Main Scheme', 7);
sampleScheme.type = TYPE.MainScheme;
sampleScheme.hitpoints = 0;

var app = new Vue({
    el: '#mc',
    data: {
        characters: [
            sampleScheme,
            createCharacter(1, 'Villian', 14),
            createCharacter(2, 'Hero', 10)
        ],
        pageState: PAGE_STATE.Main,
        showToggleButtons: true,
        charactersbeforeedit: null,
        numberOfPlayers: 1,
        heroes: heroes,
        villains: villains,
        main_schemes: main_schemes,
        side_schemes: side_schemes,
        minions: minions,
        allies: allies
    },
    mounted: function() {
        this.computedUpdater++;
        if (localStorage.getItem(LOCALSTORAGENAME)) {
            let gameState = JSON.parse(localStorage.getItem(LOCALSTORAGENAME));
            this.characters = gameState.characters;

            if (gameState.hasOwnProperty("showToggleButtons")) {
                this.showToggleButtons = gameState.showToggleButtons;
            }

            if (gameState.hasOwnProperty("numberOfPlayers")) {
                this.numberOfPlayers = gameState.numberOfPlayers;
            }

            for(let i=0; i < this.characters.length; i++) {
                this.characters[i].updateHitPoints = updateHitPoints;
                this.characters[i].toggleStatus = toggleStatus;
                
                // properties added after release...
                if (!this.characters[i].hasOwnProperty("id")) {
                    this.characters[i].id = i+1;
                }

                if (!this.characters[i].hasOwnProperty("hide")) {
                    this.characters[i].hide = false;
                }

                if (!this.characters[i].hasOwnProperty("maxhitpoints")) {
                    this.characters[i].maxhitpoints = 10;
                }

                if (!this.characters[i].hasOwnProperty("isStunned")) {
                    this.characters[i].isStunned = false;
                }

                if (!this.characters[i].hasOwnProperty("isTough")) {
                    this.characters[i].isTough = false;
                }

                if (!this.characters[i].hasOwnProperty("isConfused")) {
                    this.characters[i].isConfused = false;
                }

                if (!this.characters[i].hasOwnProperty("type")) {
                    this.characters[i].type = TYPE.Character;
                }
            };
        }
    },
    computed: {
        
    },
    methods: {
        edit: function () {
            this.pageState = PAGE_STATE.Edit;
            this.charactersbeforeedit = _.cloneDeep(this.characters);
            window.scrollTo(0,0);
        },
        save: function () {
            // check if current hitpoints are greater than any new max hitpoints
            for(let i=0; i < this.characters.length; i++) {
                if (this.characters[i].hitpoints > this.characters[i].maxhitpoints) {
                    this.characters[i].hitpoints = this.characters[i].maxhitpoints;
                }

                // check if new max hit points are larger
                let currentid = this.characters[i].id;
                let matchingpreviouscharacter = this.charactersbeforeedit.find(function (c) { return c.id === currentid });
                if (matchingpreviouscharacter) {
                    let maxdiff = new Number(this.characters[i].maxhitpoints) - new Number(matchingpreviouscharacter.maxhitpoints);

                    if (maxdiff > 0 && this.characters[i].hitpoints < this.characters[i].maxhitpoints) {
                        this.characters[i].hitpoints = new Number(this.characters[i].hitpoints) + new Number(maxdiff);
                    }
                }  else {
                    // new schemes
                    if (this.characters[i].type == TYPE.MainScheme) {
                        this.characters[i].hitpoints = 0;
                    }

                    if (this.characters[i].type == TYPE.SideScheme) {
                        this.characters[i].hitpoints = this.characters[i].maxhitpoints;
                    }
                }
            }

            this.characters.sort(function (a, b) {
                if (a.type == b.type) return 0;
                if (a.type < b.type) return -1;
                return 1;
            });

            this.pageState = PAGE_STATE.Main;
            window.scrollTo(0,0);
            this.saveGameState();
        },
        add: function (event) {
            this.characters.push(createCharacter(this.characters.length + 1, '', 10));
            event.preventDefault();
        },
        showOfficialList: function (event) {
            this.pageState = PAGE_STATE.Load;
            window.scrollTo(0,0);
            event.preventDefault();
        },
        addofficial: function () {
            for (let i=0;i<this.heroes.length;i++) {
                if (this.heroes[i].isSelected) {
                    this.characters.push(createCharacter(1000+i, this.heroes[i].name, this.heroes[i].hitpoints));
                    this.heroes[i].isSelected = false;
                }
            }

            for (let i=0;i<this.villains.length;i++) {
                if (this.villains[i].isSelected) {
                    this.characters.push(createCharacter(2000+i, this.villains[i].name, this.villains[i].hitpoints));
                    this.villains[i].isSelected = false;
                }
            }

            for (let i=0;i<this.main_schemes.length;i++) {
                if (this.main_schemes[i].isSelected) {
                    let threat = this.calculateThreat(this.main_schemes[i]);

                    let newcharacter = createCharacter(3000+i, this.main_schemes[i].name, threat);
                    newcharacter.type = TYPE.MainScheme;
                    newcharacter.hitpoints = 0;
                    this.characters.push(newcharacter);
                    this.main_schemes[i].isSelected = false;
                }
            }

            for (let i=0;i<this.side_schemes.length;i++) {
                if (this.side_schemes[i].isSelected) {
                    let threat = this.calculateThreat(this.side_schemes[i]);

                    let newcharacter = createCharacter(4000+i, this.side_schemes[i].name, threat);
                    newcharacter.type = TYPE.SideScheme;
                    this.characters.push(newcharacter);
                    this.side_schemes[i].isSelected = false;
                }
            }

            for (let i=0;i<this.allies.length;i++) {
                if (this.allies[i].isSelected) {
                    this.characters.push(createCharacter(5000+i, this.allies[i].name, this.allies[i].hitpoints));
                    this.allies[i].isSelected = false;
                }
            }

            for (let i=0;i<this.minions.length;i++) {
                if (this.minions[i].isSelected) {
                    this.characters.push(createCharacter(6000+i, this.minions[i].name, this.minions[i].hitpoints));
                    this.minions[i].isSelected = false;
                }
            }
            
            this.characters.sort(function (a, b) {
                if (a.type == b.type) return 0;
                if (a.type < b.type) return -1;
                return 1;
            });

            window.scrollTo(0,0);
            this.saveGameState();
            this.pageState = PAGE_STATE.Main;
        },
        calculateThreat: function (scheme) {
            let threat = 0;
            let basethreat = 0;

            if (scheme.threat && scheme.type === 'main_scheme') {
                threat = scheme.threat * this.numberOfPlayers;
            }

            if (scheme.basethreatfixed) {
                basethreat = scheme.basethreat;
            } else {
                if (scheme.basethreat) {
                    basethreat = scheme.basethreat * this.numberOfPlayers;
                }
            }

            return threat + basethreat;
        },
        moveup: function (index, event) {
            let tmp = _.cloneDeep(this.characters[index]);
            let prev = _.cloneDeep(this.characters[index - 1]);

            if (prev.type == 2) {
                this.characters[index] = prev;
                this.characters[index - 1] = tmp;
            }

            this.$forceUpdate();
            event.preventDefault();
        },
        movedown: function (index, event) {
            if (this.characters.length > index + 1) {
                let tmp = _.cloneDeep(this.characters[index]);
                let next = _.cloneDeep(this.characters[index + 1]);

                if (next.type == 2) {
                    this.characters[index] = next;
                    this.characters[index + 1] = tmp;
                }
            }

            this.$forceUpdate();
            event.preventDefault();
        },
        remove: function (index, event) {
            if (confirm('Are you sure you want to remove this character?')) {
                this.characters.splice(index, 1);
            }
            event.preventDefault();
        },
        removeAll: function (event) {
            if (confirm('Are you sure you want to clear the app?')) {
                this.characters = [];
            }
            
            window.scrollTo(0,0);
            event.preventDefault();
        },
        toggleHide: function (index) {
            this.characters[index].hide = !this.characters[index].hide;
        },
        editmaxhitpoints: function(index, event) {
            this.pageState = PAGE_STATE.Edit;
            this.charactersbeforeedit = _.cloneDeep(this.characters);
            let self = this;
            Vue.nextTick(function () {
                console.log(self.$refs['maxhitpoints' + index]);
                self.$refs['maxhitpoints' + index][0].focus();
            });
        },
        reset: function() {
            this.characters = [
                createCharacter(1, 'Villian', 14),
                createCharacter(2, 'Hero', 10)
            ];
            this.pageState = PAGE_STATE.Main;
            this.saveGameState();
        },
        saveGameState: function() {
            let gameState = {};
            gameState.characters = this.characters;
            gameState.showToggleButtons = this.showToggleButtons;
            gameState.numberOfPlayers = this.numberOfPlayers;
            localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(gameState));

            this.computedUpdater++;
        }
    }
});