const MOTIVE = { Science: 0, Explore: 1, AntiImperalism: 2, War: 3, Adventure: 4, Humanist: 5 };

const MOTIVE_MULTIPLIER = [
    [0, -1, 1, 0, 3, 6, 4], // science
    [-1, 0, 0, 1, 3, 4, 7], // explore
    [0, 2, 0, -1, 6, 2, 3], // antiimperalism
    [2, 0, -1, 0, 4, 3, 2], // war
    [0, -1, 2, 0, 3, 3, 3], // adventure
    [-1, -1, 0, 0, 8, 5, 3] // humanist
];

const LOCALSTORAGENAME = 'nemoswarcalc';

var app = new Vue({
    el: '#nemocalc',
    data: {
      motive: 0,
      warshipsSunk: null,
      warshipsSunkNumber: null,
      nonWarshipsSunk: null,
      nonWarhsipsSunkNumber: null,
      adventureCards: null,
      adventureCardsNumber: null,
      treasure: null,
      treasureNumber: null,
      liberation: null,
      scienceDiscovered: null,
      wondersSeen: null,
      shipResourcesPenalty: null,
      scouringTheSeas: null,
      charactersRemaining: null
    },
    mounted: function() {
        if (localStorage.getItem(LOCALSTORAGENAME)) {
            let gameState = JSON.parse(localStorage.getItem(LOCALSTORAGENAME));
            this.motive = gameState.motive;
            this.warshipsSunk = gameState.warshipsSunk;
            this.nonWarshipsSunk = gameState.nonWarshipsSunk;
            this.adventureCards = gameState.adventureCards;
            this.treasure = gameState.treasure;
            this.liberation = gameState.liberation;
            this.scienceDiscovered = gameState.scienceDiscovered;
            this.wondersSeen = gameState.wondersSeen;
            this.shipResourcesPenalty = gameState.shipResourcesPenalty;
            this.scouringTheSeas = gameState.scouringTheSeas;
            this.charactersRemaining = gameState.charactersRemaining;
        }
    },
    computed: {
        warshipsSunkTotal: function () {
            return new Number(this.warshipsSunk || 0) + new Number((this.warshipsSunkNumber || 0) * MOTIVE_MULTIPLIER[this.motive][0]);
        },
        nonWarshipsSunkTotal: function () {
            return new Number(this.nonWarshipsSunk) + new Number((this.nonWarshipsSunkNumber || 0) * MOTIVE_MULTIPLIER[this.motive][1]);
        },
        adventureCardsTotal: function () {
            return new Number(this.adventureCards) + new Number((this.adventureCardsNumber || 0) * MOTIVE_MULTIPLIER[this.motive][2]);
        },
        treasureTotal: function () {
            return new Number(this.treasure) + new Number((this.treasureNumber || 0) * MOTIVE_MULTIPLIER[this.motive][3]);
        },
        liberationTotal: function () {
            return (this.liberation || 0) * MOTIVE_MULTIPLIER[this.motive][4];
        },
        scienceDiscoveredTotal: function () {
            return (this.scienceDiscovered || 0) * MOTIVE_MULTIPLIER[this.motive][5];
        },
        wondersSeenTotal: function () {
            return (this.wondersSeen || 0) * MOTIVE_MULTIPLIER[this.motive][6];
        },
        shipResourcesPenaltyTotal: function () {
            return (this.shipResourcesPenalty * -1 || 0);
        },
        scouringTheSeasTotal: function () {
            return (this.scouringTheSeas * 1 || 0);
        },
        charactersRemainingTotal: function () {
            return (this.charactersRemaining * 1 || 0);
        },
        totalScore: function () {
            return new Number(this.warshipsSunkTotal) + this.nonWarshipsSunkTotal + this.adventureCardsTotal + this.treasureTotal + this.liberationTotal + this.scienceDiscoveredTotal + this.wondersSeenTotal + this.shipResourcesPenaltyTotal + this.scouringTheSeasTotal + this.charactersRemainingTotal;
        }
    },
    methods: {
        reset: function () {

        },
        saveGameState: function () {
            let gameState = {};
            gameState.motive = this.motive;
            gameState.warshipsSunk = this.warshipsSunk;
            gameState.nonWarshipsSunk = this.nonWarshipsSunk;
            gameState.adventureCards = this.adventureCards;
            gameState.treasure = this.treasure;
            gameState.liberation = this.liberation;
            gameState.scienceDiscovered = this.scienceDiscovered;
            gameState.wondersSeen = this.wondersSeen;
            gameState.shipResourcesPenalty = this.shipResourcesPenalty;
            gameState.scouringTheSeas = this.scouringTheSeas;
            gameState.charactersRemaining = this.charactersRemaining;
            localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(gameState));
        }
    }
});