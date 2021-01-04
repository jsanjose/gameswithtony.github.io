const MISSION_A = 'A';
const MISSION_B = 'B';
const MISSION_C = 'C';
const ORBITAL = 0;
const COLONY = 1;
const LOCALSTORAGENAME = 'onmarsgamestate';

function createCard(action, travel, mission) {
    return {
        action: action,
        travel: travel,
        mission: mission
    };
}

const soloDeck = [
    createCard(1, true, MISSION_A),
    createCard(1, true, MISSION_B),
    createCard(1, true, MISSION_B),
    createCard(1, true, MISSION_C),
    createCard(1, false, MISSION_C),
    createCard(2, true, MISSION_A),
    createCard(2, false, MISSION_A),
    createCard(2, true, MISSION_B),
    createCard(2, true, MISSION_C),
    createCard(3, true, MISSION_A),
    createCard(3, false, MISSION_B),
    createCard(3, true, MISSION_C)
];

var app = new Vue({
    el: '#onmars',
    data: {
      currentDeck: soloDeck,
      currentCard: soloDeck[0],
      showMission: false,
      currentSide: ORBITAL,
      tempSide: ORBITAL,
      showReference: false
    },
    mounted: function() {
        if (localStorage.getItem(LOCALSTORAGENAME)) {
            let gameState = JSON.parse(localStorage.getItem(LOCALSTORAGENAME));
            this.currentDeck = gameState.currentDeck;
            this.currentCard = gameState.currentCard;
            this.showMission = gameState.showMission;
            this.currentSide = gameState.currentSide;
        }
        else {
            this.reset();
        }
    },
    computed: {
        cardsLeft: function() {
            if (this.currentDeck.length > 0) {
                return this.currentDeck.length + " left";
            }
            return "Reshuffle";
        },
        gameHasNotStarted: function () {
            return this.currentDeck.length === 12 && !this.showMission;
        }
    },
    methods: {
      shuffle: function() {
        this.currentDeck = _.shuffle(soloDeck);
        this.saveGameState();
      },
      draw: function() {
          this.currentSide = this.tempSide;
          if (this.currentDeck.length === 0) {
              this.shuffle();
              this.showMission = true;
          }
          this.currentCard = this.currentDeck.shift();
          this.saveGameState();
      },
      reset: function() {
          this.showMission = false;
          this.shuffle();
      },
      setSide: function(side) {
          if (this.gameHasNotStarted) {
            this.currentSide = side;
            this.tempSide = this.currentSide;
            this.saveGameState();
          } else {
              this.tempSide = side;
          }
      },
      turnOrderSpace: function() {
          if (!this.currentCard.travel) {
              return 4;
          }
          else {
              return this.currentCard.action;
          }
      },
      saveGameState: function() {
        let gameState = {};
        gameState.currentDeck = this.currentDeck;
        gameState.currentCard = this.currentCard;
        gameState.showMission = this.showMission;
        gameState.currentSide = this.currentSide;
        localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(gameState));
      },
      actionImage: function () {
          if (this.currentSide === ORBITAL) {
                switch (this.currentCard.action) {
                    case 1:
                        return "obtainblueprint.png";
                        break;
                    case 2:
                        return "learnnewtechnology.png";
                        break;
                    case 3:
                        return "researchanddevelopment.png";
                        break;
                }
          }

          if (this.currentSide === COLONY) {
                switch (this.currentCard.action) {
                    case 1:
                        return "constructabuilding.png";
                        break;
                    case 2:
                        return "upgradeabuilding.png";
                        break;
                    case 3:
                        return "hireascientist.png";
                        break;
                }
          }
      },
      showReferenceModal: function () {
        this.showReference = true;
      },
      hideReferenceModal: function () {
        this.showReference = false;
      },
      hexDirImage: function () {
          if (!this.currentCard.travel) {
              return "bt-rl.png";
          }
          else {
              switch (this.currentCard.action) {
                  case 1:
                      return "tb-lr.png";
                      break;
                  case 2:
                      return "tb-rl.png";
                      break;
                  case 3:
                      return "bt-lr.png";
                      break;
              }
          }
      }
    }
});