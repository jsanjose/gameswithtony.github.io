const LOCALSTORAGENAME = "mcgamestate";

const updateHitPoints = function (points) {
    this.hitpoints = this.hitpoints + points;
    app.saveGameState();
}

function createCharacter(name, hitpoints) {
    return {
        name: name,
        hitpoints: hitpoints,
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
            };
        }
    },
    computed: {
        
    },
    methods: {
        edit: function () {
            this.isEditing = true;
        },
        save: function () {
            this.isEditing = false;
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