const LOCALSTORAGENAME = "mcgamestate";

const updateHitPoints = function (points, event) {
    this.hitpoints = this.hitpoints + points;
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
        updateHitPoints: updateHitPoints
    };
}

var app = new Vue({
    el: '#mc',
    data: {
        characters: [
            createCharacter('Villian', 14),
            createCharacter('Hero', 10)
        ],
        isEditing: false
    },
    mounted: function() {
        this.computedUpdater++;
        if (localStorage.getItem(LOCALSTORAGENAME)) {
            let gameState = JSON.parse(localStorage.getItem(LOCALSTORAGENAME));
            this.characters = gameState.characters;

            for(let i=0; i < this.characters.length; i++) {
                this.characters[i].updateHitPoints = updateHitPoints;

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
            this.isEditing = false;
            window.scrollTo(0,0);
            this.saveGameState();
        },
        add: function () {
            this.characters.push(createCharacter('', 10));
        },
        remove: function (index) {
            if (confirm('Are you sure you want to remove this character?')) {
                this.characters.splice(index, 1);
            }
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
            localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(gameState));

            this.computedUpdater++;
        }
    }
});