const LOCALSTORAGENAME = "mcgamestate";

const updateHitPoints = function (points, event) {
    let totalpoints = new Number(this.hitpoints) + new Number(points);

    if (totalpoints > this.maxhitpoints) {
        totalpoints = this.maxhitpoints;
    }

    this.hitpoints = totalpoints;
    app.saveGameState();
    event.preventDefault();
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
}

function createCharacter(name, hitpoints) {
    return {
        name: name,
        hitpoints: hitpoints,
        maxhitpoints: hitpoints,
        hide: false,
        isStunned: false,
        isTough: false,
        isConfused: false,
        updateHitPoints: updateHitPoints,
        toggleStatus: toggleStatus
    };
}

var app = new Vue({
    el: '#mc',
    data: {
        characters: [
            createCharacter('Villian', 14),
            createCharacter('Hero', 10)
        ],
        isEditing: false,
        showToggleButtons: false
    },
    mounted: function() {
        this.computedUpdater++;
        if (localStorage.getItem(LOCALSTORAGENAME)) {
            let gameState = JSON.parse(localStorage.getItem(LOCALSTORAGENAME));
            this.characters = gameState.characters;

            if (gameState.hasOwnProperty("showToggleButtons")) {
                this.showToggleButtons = gameState.showToggleButtons;
            }

            for(let i=0; i < this.characters.length; i++) {
                this.characters[i].updateHitPoints = updateHitPoints;
                this.characters[i].toggleStatus = toggleStatus;

                // properties added after release...
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
            };
        }
    },
    computed: {
        
    },
    methods: {
        edit: function () {
            this.isEditing = true;
            window.scrollTo(0,0);
        },
        save: function () {
            // check if current hitpoints are greater than any new max hitpoints
            for(let i=0; i < this.characters.length; i++) {
                if (this.characters[i].hitpoints > this.characters[i].maxhitpoints) {
                    this.characters[i].hitpoints = this.characters[i].maxhitpoints;
                }
            }

            this.isEditing = false;
            window.scrollTo(0,0);
            this.saveGameState();
        },
        add: function (event) {
            this.characters.push(createCharacter('', 10));
            event.preventDefault();
        },
        remove: function (index, event) {
            if (confirm('Are you sure you want to remove this character?')) {
                this.characters.splice(index, 1);
            }
            event.preventDefault();
        },
        toggleHide: function (index) {
            this.characters[index].hide = !this.characters[index].hide;
        },
        reset: function() {
            this.characters = [
                createCharacter('Villian', 14),
                createCharacter('Hero', 10)
            ];
            this.isEditing = false;
            this.saveGameState();
        },
        saveGameState: function() {
            let gameState = {};
            gameState.characters = this.characters;
            gameState.showToggleButtons = this.showToggleButtons;
            localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(gameState));

            this.computedUpdater++;
        }
    }
});