const CARD = { Top: 0, Bottom: 1 }
const DEPARTMENT = { RandD: 0, Assembly: 1, Logistics: 2, Design: 3, Admin: 4 };
const VEHICLE = { Concept: 0, SUV: 1, City: 2, Truck: 3, Sports: 4 };
const PART = { Motor: 0, Autopilot: 1, Battery: 2, Body: 3, Electronics: 4, Drivetrain: 5 };
const ENGINEER = { Lacerda: 0, Turczi: 1, Sandra: 2, Human: 3 };
const PHASE = { DepartmentSelection: 0, Working: 1 };
const PLAYERCOLOR = { yellow: 0, blue: 1, purple: 2, red: 3 };
const LOCALSTORAGENAME = 'kanbanevgamestate';

function createDeptCard(id, dept, lacerdaDouble, isReshuffle) {
    return {
        id: id,
        dept: dept,
        lacerdaDouble: lacerdaDouble,
        isReshuffle: isReshuffle
    };
}

// does not include reshuffle card, which is added after first shuffle
const deptDeck = [
    createDeptCard(0, DEPARTMENT.RandD, true, false),
    createDeptCard(1, DEPARTMENT.RandD, true, false),
    createDeptCard(2, DEPARTMENT.Assembly, true, false),
    createDeptCard(3, DEPARTMENT.Assembly, true, false),
    createDeptCard(4, DEPARTMENT.Logistics, false, false),
    createDeptCard(5, DEPARTMENT.Logistics, false, false),
    createDeptCard(6, DEPARTMENT.Design, false, false),
    createDeptCard(7, DEPARTMENT.Design, false, false),
    createDeptCard(8, DEPARTMENT.Admin, true, false),
    createDeptCard(9, DEPARTMENT.Admin, true, false)
];

function createSelectionCard(part, cardToTake) {
    return {
        part: part,
        cardToTake: cardToTake
    };
}

const selectionDeck = [
    createSelectionCard(PART.Motor, CARD.Top),
    createSelectionCard(PART.Motor, CARD.Bottom),
    createSelectionCard(PART.Motor, CARD.Bottom),
    createSelectionCard(PART.Autopilot, CARD.Top),
    createSelectionCard(PART.Autopilot, CARD.Top),
    createSelectionCard(PART.Autopilot, CARD.Bottom),
    createSelectionCard(PART.Battery, CARD.Top),
    createSelectionCard(PART.Battery, CARD.Top),
    createSelectionCard(PART.Battery, CARD.Bottom),
    createSelectionCard(PART.Body, CARD.Top),
    createSelectionCard(PART.Body, CARD.Bottom),
    createSelectionCard(PART.Body, CARD.Bottom),
    createSelectionCard(PART.Electronics, CARD.Top),
    createSelectionCard(PART.Electronics, CARD.Top),
    createSelectionCard(PART.Electronics, CARD.Bottom),
    createSelectionCard(PART.Drivetrain, CARD.Top),
    createSelectionCard(PART.Drivetrain, CARD.Bottom),
    createSelectionCard(PART.Drivetrain, CARD.Bottom)
];

function createPlayer(engineer, dept, part, isLacerdaDouble, isWorking) {
    return {
        engineer: engineer,
        dept: dept,
        part: part,
        isLacerdaDouble: isLacerdaDouble,
        isWorking: isWorking
    };
}

var app = new Vue({
    el: '#kanbanev',
    data: {
      currentPhase: PHASE.DepartmentSelection,
      currentSelectionDeck: selectionDeck,
      currentDeptDeck: deptDeck,
      currentSelectionCard: {},
      currentDeptCards: [],
      players: [
        createPlayer(ENGINEER.Lacerda, null, null, false, false),
        createPlayer(ENGINEER.Turczi, null, null, false, false),
        createPlayer(ENGINEER.Sandra, null, null, false, false),
        createPlayer(ENGINEER.Human, null, null, false, false),
      ],
      playerColor: PLAYERCOLOR.yellow,
      playerStartingCertTrackPosition: 0,
      departmentPhaseIndex: 0,
      workPhaseIndex: 0,
      gameHasStarted: false
    },
    mounted: function() {
        if (localStorage.getItem(LOCALSTORAGENAME)) {
            let gameState = JSON.parse(localStorage.getItem(LOCALSTORAGENAME));
            this.currentPhase = gameState.currentPhase;
            this.currentSelectionDeck = gameState.currentSelectionDeck;
            this.currentDeptDeck = gameState.currentDeptDeck;
            this.currentSelectionCard = gameState.currentSelectionCard;
            this.currentDeptCards = gameState.currentDeptCards;
            this.players = gameState.players;
            this.playerColor = gameState.playerColor;
            this.playerStartingCertTrackPosition = gameState.playerStartingCertTrackPosition;
            this.departmentPhaseIndex = gameState.departmentPhaseIndex;
            this.workPhaseIndex = gameState.workPhaseIndex;
            this.gameHasStarted = gameState.gameHasStarted;
        }
        else {
            this.reset();
        }
    },
    computed: {
        currentPlayer: function () {
            return _.find(this.players, function(p) { return p.isWorking });
        },
        lacerdaPlayer: function () {
            return _.find(this.players, function(p) { return p.engineer === ENGINEER.Lacerda });
        },
        turcziPlayer: function () {
            return _.find(this.players, function(p) { return p.engineer === ENGINEER.Turczi });
        },
        sandraPlayer: function () {
            return _.find(this.players, function(p) { return p.engineer === ENGINEER.Sandra });
        },
        humanPlayer: function () {
            return _.find(this.players, function(p) { return p.engineer === ENGINEER.Human });
        },
        sandrasPosition: function () {
            return _.find(this.players, function(p) { return p.engineer === ENGINEER.Sandra }).dept;
        }
    },
    methods: {
      setPlayerColor: function (color) {
          this.playerColor = color;
          this.saveGameState();
      },
      setStartingCertTrackPosition: function (pos) {
        this.playerStartingCertTrackPosition = pos;
        this.saveGameState();
      },
      startGame: function() {
        this.shuffleSelectionDeck();
        this.shuffleDeptDeck();
        this.addShuffleCard();
        this.refillDeptCards();

        // set starting order
        this.humanPlayer.dept = this.playerStartingCertTrackPosition;
        
        if (this.humanPlayer.dept !== 2) {
            this.turcziPlayer.dept = 2;
        } else {
            this.turcziPlayer.dept = 3;
        }

        if (this.humanPlayer.dept !== 0) {
            this.lacerdaPlayer.dept = 0;
        } else {
            this.lacerdaPlayer.dept = 1;
        }

        this.sandraPlayer.dept = 4;
        this.sortPlayers();
        this.setDepartmentPhaseIndex(0);
        this.gameHasStarted = true;
      },
      addShuffleCard: function () {
        this.currentDeptDeck.push(createDeptCard(10, DEPARTMENT.Admin, false, true));
      },
      shuffleSelectionDeck: function() {
        this.currentSelectionDeck = _.shuffle(selectionDeck);
        this.saveGameState();
      },
      shuffleDeptDeck: function() {
        this.currentDeptDeck = deptDeck;
        this.addShuffleCard();
        this.currentDeptDeck = _.shuffle(this.currentDeptDeck);

        // exclude cards already drawn
        this.currentDeptDeck = _.difference(this.currentDeptDeck, this.currentDeptCards);
        
        this.saveGameState();
      },
      sortPlayers: function () {
        this.players = _.sortBy(this.players, ['dept']);
        this.saveGameState();
      },
      drawSelectionCard: function() {
          if (this.currentSelectionDeck.length === 0) {
              this.shuffleSelectionDeck();
          }
          this.currentSelectionCard = this.currentSelectionDeck.shift();
          this.saveGameState();
      },
      drawDeptCard: function () {
        if (this.currentDeptDeck.length === 0) {
            // reshuffle if empty
            this.shuffleDeptDeck();
        }
        return this.currentDeptDeck.shift();
        this.saveGameState();
      },
      refillDeptCards: function () {
        // add two cards
        let isReshuffle = false;
        while (this.currentDeptCards.length < 3) {
            let deptCard = this.drawDeptCard();

            if (deptCard.isReshuffle) {
                // mark that a reshuffle card was drawn and continue
                isReshuffle = true;
            } else {
                // add card to end of column
                this.currentDeptCards[this.currentDeptCards.length] = deptCard;
            }
        }

        // reshuffle if the reshuffle card was drawn
        if (isReshuffle) {
            this.shuffleDeptDeck();
        }

        this.saveGameState();
      },
      selectDepartmentByCard: function (player) {
        // This function is for Lacerda and Turczi only
        if (player.engineer !== ENGINEER.Lacerda && player.engineer !== ENGINEER.Turczi) {
            throw ("Can only use 'selectDepartmentByCard' with Lacerda or Turczi");
        }

        // first we get the next selection card
        this.drawSelectionCard();

        // player is assigned the part on the selection card
        player.part = this.currentSelectionCard.part;

        // use one of the 3 department cards to assign the department, based on the selection card indication
        let chosenDeptCard = null;
        if (this.currentSelectionCard.cardToTake === CARD.Top) {
            chosenDeptCard = this.currentDeptCards.shift();
        } else {
            chosenDeptCard = this.currentDeptCards.pop();
        }

        player.dept = chosenDeptCard.dept;
        player.isLacerdaDouble = chosenDeptCard.isLacerdaDouble;
        this.saveGameState();
      },
      selectDepartmentManually: function (player, dept) {
          // Human player and Sandra, or Lacerda and Turczi if player must set their position because chosen is unavailable
          player.dept = dept;
          this.saveGameState();
      },
      changePhase: function(phase) {
        this.currentPhase = phase;
        this.saveGameState();
      },
      setDepartmentPhaseIndex: function(index) {
        if (index > 3) {
            // department phase is over
            // start work phase
            this.setWorkPhaseIndex(0);
            this.currentPhase = 1;
            this.saveGameState();
            return;
        }

        this.departmentPhaseIndex = index;

        // set current player
        this.players[this.departmentPhaseIndex].isWorking = true;

        for (let i=0;i<3;i++) {
            if (i !== this.departmentPhaseIndex) {
                this.players[i].isWorking = false;
            }
        }
        this.saveGameState();
      },
      setWorkPhaseIndex: function(index) {
        if (index > 3) {
            // work phase is over
            // start department selection phase
            this.setDepartmentPhaseIndex(0);
            this.currentPhase = 0;
            this.saveGameState();
            return;
        }

        this.workPhaseIndex = index;

        // set current player
        this.players[this.workPhaseIndex].isWorking = true;

        for (let i=0;i<3;i++) {
            if (i !== this.workPhaseIndex) {
                this.players[i].isWorking = false;
            }
        }

        this.saveGameState();
      },
      playerImage: function (engineer) {
        switch (engineer) {
            case 0:
                return "lacerda.png";
                break;
            case 1:
                return "turczi.png";
                break;
            case 2:
                return "sandra.png";
                break;
            case 3:
                switch (this.playerColor) {
                    case PLAYERCOLOR.yellow:
                        return "human_yellow.png";
                        break;
                    case PLAYERCOLOR.blue:
                        return "human_blue.png";
                        break;
                    case PLAYERCOLOR.purple:
                        return "human_purple.png";
                        break;
                    case PLAYERCOLOR.red:
                        return "human_red.png";
                        break;
                }
                break;
        }
      },
      deptImage: function (dept) {
        switch (dept) {
            case 0:
                return "randd.png";
                break;
            case 1:
                return "assembly.png";
                break;
            case 2:
                return "logistics.png";
                break;
            case 3:
                return "design.png"
                break;
            case 4:
                return "admin.png"
                break;
        }
      },
      playerName: function (engineer) {
        switch (engineer) {
            case 0:
                return "Mr. Lacerda";
                break;
            case 1:
                return "Mr. Turczi";
                break;
            case 2:
                return "Sandra";
                break;
            case 3:
                return "You"
                break;
        }
      },
      reset: function() {
        this.currentPhase = PHASE.DepartmentSelection;
        this.currentSelectionDeck = selectionDeck;
        this.currentDeptDeck = deptDeck;
        this.currentSelectionCard = {};
        this.currentDeptCards = [];
        this.players = [
          createPlayer(ENGINEER.Lacerda, null, null, false, false),
          createPlayer(ENGINEER.Turczi, null, null, false, false),
          createPlayer(ENGINEER.Sandra, null, null, false, false),
          createPlayer(ENGINEER.Human, null, null, false, false),
        ];
        this.playerStartingCertTrackPosition = 0;
        this.departmentPhaseIndex = 0;
        this.workPhaseIndex = 0;
        this.gameHasStarted = false;
        this.saveGameState();
      },
      saveGameState: function() {
        let gameState = {};
        gameState.currentPhase = this.currentPhase;
        gameState.currentSelectionDeck = this.currentSelectionDeck;
        gameState.currentDeptDeck = this.currentDeptDeck;
        gameState.currentSelectionCard = this.currentSelectionCard;
        gameState.currentDeptCards = this.currentDeptCards;
        gameState.players = this.players;
        gameState.playerColor = this.playerColor;
        gameState.playerStartingCertTrackPosition = this.playerStartingCertTrackPosition;
        gameState.departmentPhaseIndex = this.departmentPhaseIndex;
        gameState.workPhaseIndex = this.workPhaseIndex;
        gameState.gameHasStarted = this.gameHasStarted;
        localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(gameState));
      }
    }
});