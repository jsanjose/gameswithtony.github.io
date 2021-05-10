const LOCALSTORAGENAME = "mcgamestate";

function createCharacter(name, hitpoints) {
    return {
        name: name,
        hitpoints: hitpoints,
        updateHitPoints: function (points) {
            this.hitpoints = this.hitpoints + points;
        }
    };
}

var app = new Vue({
    el: '#mc',
    data: {
        characters: [
            createCharacter('Villian', 14),
            createCharacter('Hero', 10)
        ]
    },
    mounted: function() {
        this.computedUpdater++;
        if (localStorage.getItem(LOCALSTORAGENAME)) {
            let gameState = JSON.parse(localStorage.getItem(LOCALSTORAGENAME));
            this.characters = gameState.characters;
        }
    },
    computed: {
        
    },
    methods: {
        reset: function() {
            this.characters = [
                createCharacter('Villian', 14),
                createCharacter('Hero', 10)
            ];
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