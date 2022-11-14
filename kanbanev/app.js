const CARD = { Top: 0, Bottom: 1 }
const DEPARTMENT = { RandD: 0, Assembly: 1, Logistics: 2, Design: 3, Admin: 4 };
const VEHICLE = { Concept: 0, SUV: 1, City: 2, Truck: 3, Sports: 4 };
const PART = { Motor: 0, Autopilot: 1, Battery: 2, Body: 3, Electronics: 4, Drivetrain: 5 };
const ENGINEER = { Lacerda: 0, Turczi: 1, Sandra: 2, Human: 3 };
const PHASE = { DepartmentSelection: 0, Working: 1 };
const PLAYERCOLOR = { yellow: 0, blue: 1, purple: 2, red: 3 };
const DEPTPOSITION = { Top: 0, Bottom: 1, SandrasDesk: 2 };
const LOCALSTORAGENAME = 'kanbanevgamestate';
const sandraWorkstationOrder = [
    [DEPARTMENT.RandD, DEPTPOSITION.Top],
    [DEPARTMENT.RandD, DEPTPOSITION.Bottom],
    [DEPARTMENT.Assembly, DEPTPOSITION.Top],
    [DEPARTMENT.Assembly, DEPTPOSITION.Bottom],
    [DEPARTMENT.Logistics, DEPTPOSITION.Top],
    [DEPARTMENT.Logistics, DEPTPOSITION.Bottom],
    [DEPARTMENT.Design, DEPTPOSITION.Top],
    [DEPARTMENT.Design, DEPTPOSITION.Bottom],
    [DEPARTMENT.Admin, DEPTPOSITION.SandrasDesk]
];

function chooseRandom(min, max, exclude) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let result = Math.floor(Math.random() * (max - min + 1) + min);

    // assumes at most only one excluded value at a time
    if (exclude) {
        if (result === exclude) {
            if (result === 8) {
                result = 1;
            } else {
                result++;
            }
        }
    }

    return result;
}

function createDeptCard(id, dept, lacerdaDouble, isReshuffle, parts) {
    return {
        id: id,
        dept: dept,
        lacerdaDouble: lacerdaDouble,
        isReshuffle: isReshuffle,
        parts: parts
    };
}

// does not include reshuffle card, which is added after first shuffle
const deptDeck = [
    createDeptCard(0, DEPARTMENT.RandD, true, false, null),
    createDeptCard(1, DEPARTMENT.RandD, true, false, [PART.Motor]),
    createDeptCard(2, DEPARTMENT.Assembly, true, false, null),
    createDeptCard(3, DEPARTMENT.Assembly, true, false, [PART.Electronics, PART.Drivetrain]),
    createDeptCard(4, DEPARTMENT.Logistics, false, false, null),
    createDeptCard(5, DEPARTMENT.Logistics, false, false, [PART.Body]),
    createDeptCard(6, DEPARTMENT.Design, false, false, null),
    createDeptCard(7, DEPARTMENT.Design, false, false, [PART.Battery]),
    createDeptCard(8, DEPARTMENT.Admin, true, false, null),
    createDeptCard(9, DEPARTMENT.Admin, true, false, [PART.Autopilot])
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

function createPlayer(engineer, dept, position, part, isLacerdaDouble, isWorking) {
    return {
        engineer: engineer,
        dept: dept,
        position: position,
        part: part,
        isLacerdaDouble: isLacerdaDouble,
        isWorking: isWorking
    };
}

var app = new Vue({
    el: '#kanbanev',
    data: {
      isDisabledButton: false,
      currentPhase: PHASE.DepartmentSelection,
      currentSelectionDeck: selectionDeck,
      currentDeptDeck: deptDeck,
      currentSelectionCard: {},
      currentDeptCards: [],
      players: [
        createPlayer(ENGINEER.Lacerda, null, DEPTPOSITION.Top, null, false, false),
        createPlayer(ENGINEER.Turczi, null, DEPTPOSITION.Bottom, null, false, false),
        createPlayer(ENGINEER.Sandra, null, DEPTPOSITION.SandrasDesk, null, false, false),
        createPlayer(ENGINEER.Human, null, null, null, false, false),
      ],
      playerColor: PLAYERCOLOR.yellow,
      playerStartingCertTrackPosition: 0,
      phaseIndex: 0,
      computedUpdater: 0,
      gameHasStarted: false,
      isFirstDeptSelection: true,
      lacerdaTrainingTrack: [1, 1, 1, 1, 1],
      turcziTrainingTrack: [0, 0, 0, 0, 0],
      difficultyCards: [
          { id: 0, include: false }, { id: 1, include: false }, { id: 2, include: false }, { id: 3, include: false }, { id: 4, include: false }, { id: 5, include: false }, { id: 6, include: false }, { id: 7, include: false }, { id: 8, include: false }
      ],
      useDEArt: false,
      niceSandra: false,
      undoState: {}
    },
    mounted: function() {
        this.computedUpdater++;
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
            this.phaseIndex = gameState.phaseIndex;
            this.gameHasStarted = gameState.gameHasStarted;
            this.isFirstDeptSelection = gameState.isFirstDeptSelection;

            // added post-release
            if (gameState.lacerdaTrainingTrack) {
                this.lacerdaTrainingTrack = gameState.lacerdaTrainingTrack;
            }
            if (gameState.turcziTrainingTrack) {
                this.turcziTrainingTrack = gameState.turcziTrainingTrack;
            }
            if (gameState.difficultyCards) {
                // data type changed
                if (gameState.difficultyCards[1].id) {
                    this.difficultyCards = gameState.difficultyCards;
                }
            }

            if (gameState.undoState) {
                this.undoState = _.cloneDeep(gameState.undoState);
            }

            if (gameState.hasOwnProperty('useDEArt')) {
                this.useDEArt = gameState.useDEArt;
            }

            if (gameState.hasOwnProperty('niceSandra')) {
                this.niceSandra = gameState.niceSandra;
            }
        }
        else {
            this.reset();
        }
    },
    computed: {
        currentPlayer: function () {
            this.computedUpdater;
            return _.find(this.players, function(p) { return p.isWorking });
        },
        currentPlayerName: function () {
            this.computedUpdater;
            let currentPlayer = _.find(this.players, function(p) { return p.isWorking });

            let playerName;
            switch (currentPlayer.engineer) {
                case ENGINEER.Lacerda: 
                    playerName = "Mr. Lacerda";
                    break;
                case ENGINEER.Turczi:
                    playerName = "Mr. Turczi";
                    break;
                case ENGINEER.Human:
                    playerName = "You";
                    break;
                case ENGINEER.Sandra:
                    playerName = "Sandra";
                    break;
            }

            return playerName;
        },
        lacerdaPlayer: function () {
            this.computedUpdater;
            return _.find(this.players, function(p) { return p.engineer === ENGINEER.Lacerda });
        },
        turcziPlayer: function () {
            this.computedUpdater;
            return _.find(this.players, function(p) { return p.engineer === ENGINEER.Turczi });
        },
        sandraPlayer: function () {
            this.computedUpdater;
            return _.find(this.players, function(p) { return p.engineer === ENGINEER.Sandra });
        },
        humanPlayer: function () {
            this.computedUpdater;
            return _.find(this.players, function(p) { return p.engineer === ENGINEER.Human });
        },
        sandrasPosition: function () {
            this.computedUpdater;
            return _.find(this.players, function(p) { return p.engineer === ENGINEER.Sandra }).dept;
        },
        currentPlayerImage: function () {
            this.computedUpdater;
            return this.playerImage(this.currentPlayer.engineer);
        },
        currentPartImage: function () {
            this.computedUpdater;
            return this.partImage(this.currentPlayer.part);
        },
        currentLacerdaPartImage: function () {
            this.computedUpdater;
            return this.partImage(this.lacerdaPlayer.part);
        },
        currentTurcziPartImage: function () {
            this.computedUpdater;
            return this.partImage(this.turcziPlayer.part);
        },
        currentCarImage: function () {
            this.computedUpdater;
            return this.carImage(this.sandrasPosition);
        },
        currentKanbanImage: function () {
            this.computedUpdater;
            return this.kanbanImage(this.sandrasPosition);
        },
        currentTrainingTrackImage: function () {
            this.computedUpdater;
            let path = 'training';
            let playerPrefix = '';
            let direction = (this.currentPlayer.dept === 0 || this.currentPlayer.dept === 3) ? 'rl' : 'lr';
            let level = 0;

            if (this.currentPlayer.engineer === ENGINEER.Lacerda) {
                playerPrefix = 'L';
                level = this.lacerdaTrainingTrack[this.currentPlayer.dept];
            }

            if (this.currentPlayer.engineer === ENGINEER.Turczi) {
                playerPrefix = 'T';
                level = this.turcziTrainingTrack[this.currentPlayer.dept];
            }

            return this.getImage(path + playerPrefix + "_" + direction + "_" + level);
        },
        currentTrainingTrackLevel: function () {
            this.computedUpdater;
            let level = 0;

            if (this.currentPlayer.engineer === ENGINEER.Lacerda) {
                level = this.lacerdaTrainingTrack[this.currentPlayer.dept];
            }

            if (this.currentPlayer.engineer === ENGINEER.Turczi) {
                level = this.turcziTrainingTrack[this.currentPlayer.dept];
            }

            return level;
        },
        lacerdaIsCertified: function() {
            // assumes Lacerda is the current player
            this.computedUpdater;
            let level = this.lacerdaTrainingTrack[this.currentPlayer.dept];
            return level > 2;
        },
        isEndOfDay: function() {
            this.computedUpdater++;
            return this.currentPhase === PHASE.Working && this.phaseIndex === 3;
        },
        isEndOfWeek: function() {
            this.computedUpdater++;
            return !this.isFirstDeptSelection && this.currentPhase === PHASE.Working && this.currentPlayer.engineer === ENGINEER.Sandra && this.currentPlayer.dept === DEPARTMENT.Admin;
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
      chooseRandomDifficulty: function() {
        for (let i=0;i<9;i++) {
            this.difficultyCards[i].include = false;
        }

        let randomResult1 = chooseRandom(0, 8);
        let randomResult2 = chooseRandom(0, 8, randomResult1);

        this.difficultyCards[randomResult1].include = true;
        this.difficultyCards[randomResult2].include = true;

        return false;
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
        this.setPhaseIndex(0);

        // for the first department selection phase, don't preset the human player
        if (this.isFirstDeptSelection) {
            let humanPlayer = _.find(this.players, function(p) { return p.engineer === ENGINEER.Human  });
            if (humanPlayer.engineer === ENGINEER.Human) {
                humanPlayer.dept = null;
                humanPlayer.position = null;
            }
        }

        this.gameHasStarted = true; // must do this last
        this.saveUndoState();
        this.saveGameState();
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
        this.players = _.sortBy(this.players, ['dept', 'position']);
        this.saveGameState();
      },
      drawSelectionCard: function() {
          if (this.currentSelectionDeck.length === 0) {
              this.shuffleSelectionDeck();
          }
          this.currentSelectionCard = this.currentSelectionDeck.shift();
          this.saveGameState();
      },
      drawPart: function () {
        this.drawSelectionCard();
        this.currentPlayer.part = this.currentSelectionCard.part;
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

        let escaper = 0;
        while (this.currentDeptCards.length < 3) {
            if (escaper > 100) {
                alert("Something went wrong during department card refill. Try refreshing.")
                return;
            }

            let deptCard = this.drawDeptCard();

            if (deptCard.isReshuffle) {
                // mark that a reshuffle card was drawn and continue
                isReshuffle = true;
            } else {
                // add card to end of column
                this.currentDeptCards[this.currentDeptCards.length] = deptCard;
            }

            escaper++;
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

        // cannot assign to department that it is already in
        let chosenDept = chosenDeptCard.dept;

        if (player.dept === chosenDept) {
            if (chosenDeptCard.dept === 4) {
                chosenDept = 0;
            } else {
                chosenDept = chosenDept + 1;
            }
        }

        // find an empty spot
        let isAvailable = false;
        let playerPos = (player.engineer === ENGINEER.Lacerda) ? DEPTPOSITION.Bottom : DEPTPOSITION.Top;

        let escaper = 0;
        while (!isAvailable) {
            if (escaper > 100) {
                alert("Something went wrong during AI workstation selection. Try refreshing.")
                return;
            }

            let occupant = this.workStationOccupiedBy(chosenDept, playerPos);
            if (occupant !== undefined) {
                if (chosenDept === 4) {
                    chosenDept = 0;
                } else {
                    chosenDept = chosenDept + 1;
                }
            } else {
                player.dept = chosenDept;
                player.position = playerPos;
                isAvailable = true;
            }

            escaper++;
        }

        this.saveGameState();
      },
      changePhase: function() {
        if (this.currentPhase === PHASE.DepartmentSelection) {
            this.currentPhase = PHASE.Working;
        } else {
            this.isFirstDeptSelection = false;
            this.refillDeptCards();
            this.currentPhase = PHASE.DepartmentSelection;
        }
        this.sortPlayers();
        this.saveGameState();
      },
      setPhaseIndex: function(index) {
        if (this.isDisabledButton) return;
        this.isDisabledButton = true;

        let donePlayer = this.players[this.phaseIndex];

        if (this.gameHasStarted && donePlayer.engineer === ENGINEER.Human && (donePlayer.dept === null || donePlayer.position === null)) {
            alert("You must choose a department and workstation.");
            this.isDisabledButton = false;
            return;
        }

        if (index > 3) {
            // department phase is over
            // start work phase
            this.changePhase();
            this.phaseIndex = 0;
        } else {
            this.phaseIndex = index;
        }

        // set current player
        this.players[this.phaseIndex].isWorking = true;

        for (let i=0;i<3;i++) {
            if (i !== this.phaseIndex) {
                this.players[i].isWorking = false;
            }
        }

        let newCurrentPlayer = _.find(this.players, function(p) { return p.isWorking });

        // if department phase, and is Lacerda or Turczi, draw a card and pre-set the workstation
        if (this.currentPhase === PHASE.DepartmentSelection) {
            if (newCurrentPlayer.engineer === ENGINEER.Lacerda || newCurrentPlayer.engineer === ENGINEER.Turczi) {
                this.selectDepartmentByCard(newCurrentPlayer);

                if (newCurrentPlayer.engineer === ENGINEER.Lacerda) {
                    newCurrentPlayer.position = 1;
                }

                if (newCurrentPlayer.engineer === ENGINEER.Turczi) {
                    newCurrentPlayer.position = 0;
                }
            }

            if (newCurrentPlayer.engineer === ENGINEER.Sandra && !this.isFirstDeptSelection) {
                // find next available workstation
                let dept = newCurrentPlayer.dept;
                let pos = newCurrentPlayer.position;
                let isAvailable = false;

                if (dept === DEPARTMENT.Admin) {
                    // loop back to top
                    dept = DEPARTMENT.RandD;
                } else {
                    // move to next department
                    dept = dept + 1;
                }

                if (dept === DEPARTMENT.Admin) {
                    pos = DEPTPOSITION.SandrasDesk;
                    isAvailable = true;
                } else {

                    pos = DEPTPOSITION.Top;

                    let escaper = 0;
                    while (!isAvailable) {
                        if (escaper > 100) {
                            alert("Something went wrong during Sandra's workstation selection. Try refreshing.")
                            return;
                        }

                        let occupant = this.workStationOccupiedBy(dept, pos);
                    
                        if (occupant === undefined) {
                            isAvailable = true;
                        } else {
                            if (pos === DEPTPOSITION.Top) {
                                pos = DEPTPOSITION.Bottom;
                            } else {
                                dept = dept + 1;

                                if (dept === DEPARTMENT.Admin) {
                                    pos = DEPTPOSITION.SandrasDesk;
                                    isAvailable = true;
                                } else {
                                    pos = DEPTPOSITION.Top;
                                }
                            }
                        }
                        escaper++;
                    }
                }
                
                newCurrentPlayer.dept = dept;
                newCurrentPlayer.position = pos;
            }
        }

        // if working phase, increment Lacerda or Turczi training levels
        if (this.currentPhase === PHASE.Working && (newCurrentPlayer.engineer === ENGINEER.Lacerda || newCurrentPlayer.engineer === ENGINEER.Turczi)) {
            let trainingTrack = [];
            if (newCurrentPlayer.engineer === ENGINEER.Lacerda) {
                trainingTrack = this.lacerdaTrainingTrack;
            }
            else if (newCurrentPlayer.engineer === ENGINEER.Turczi) {
                trainingTrack = this.turcziTrainingTrack;
            }

            if (trainingTrack[newCurrentPlayer.dept] < 5) {
                trainingTrack[newCurrentPlayer.dept]++;
            }

            // if current department is admin, increment where Sandra is
            if (newCurrentPlayer.dept === DEPARTMENT.Admin) {
                // if Lacerda is certified in admin, do it twice

                // also: if difficulty card #1 is selected or Lacerda is certified, then always advance a second time on Sandra's current position, whether certified or not (we check this first, so the first movement doesn't affect the Lacerda certification check if Sandra is also in admin)
                if (newCurrentPlayer.engineer === ENGINEER.Lacerda && ((trainingTrack[DEPARTMENT.Admin] > 2 && !this.difficultyCards[0].include) || this.difficultyCards[0].include)) {
                    if (trainingTrack[this.sandrasPosition] < 5) {
                        trainingTrack[this.sandrasPosition]++;
                    }
                }

                // also advance on Sandra's current position
                if (trainingTrack[this.sandrasPosition] < 5) {
                    trainingTrack[this.sandrasPosition]++;
                }
            }
        }

        // if this is the working phase and it is the end of day (Sandra in Admin) and the remaining Plan card has parts
        if (!this.isFirstDeptSelection && this.currentPhase === PHASE.Working && newCurrentPlayer.engineer === ENGINEER.Sandra && newCurrentPlayer.dept === DEPARTMENT.Admin && this.currentDeptCards[0].parts) {
            this.drawSelectionCard();
        }

        // save undo
        if (this.gameHasStarted && this.currentPhase === PHASE.DepartmentSelection && newCurrentPlayer.engineer === ENGINEER.Human) {
            this.saveUndoState();
        }

        this.saveGameState();
        window.scrollTo(0,0);
        let self = this;

        setTimeout(() => {
            this.isDisabledButton = false;
        }, 1000);

      },
      setDept: function(dept) {
        this.currentPlayer.dept = dept;

        if (this.currentPlayer.engineer === ENGINEER.Sandra && dept === DEPARTMENT.Admin) {
            this.currentPlayer.position = DEPTPOSITION.SandrasDesk;
        }

        this.saveGameState();
      },
      setPos: function(pos) {
          this.currentPlayer.position = pos;
          this.saveGameState();
      },
      playerImage: function (engineer) {
        switch (engineer) {
            case 0:
                return this.getImage("lacerda");
                break;
            case 1:
                return this.getImage("turczi");
                break;
            case 2:
                return this.getImage("sandra");
                break;
            case 3:
                switch (this.playerColor) {
                    case PLAYERCOLOR.yellow:
                        return this.getImage("human_yellow");
                        break;
                    case PLAYERCOLOR.blue:
                        return this.getImage("human_blue");
                        break;
                    case PLAYERCOLOR.purple:
                        return this.getImage("human_purple");
                        break;
                    case PLAYERCOLOR.red:
                        return this.getImage("human_red");
                        break;
                }
                break;
        }
      },
      deptImage: function (dept) {
        switch (dept) {
            case 0:
                return this.useDEArt ? this.getImage("de_randd") : this.getImage("randd");
                break;
            case 1:
                return this.useDEArt ? this.getImage("de_assembly") : this.getImage("assembly");
                break;
            case 2:
                return this.useDEArt ? this.getImage("de_logistics") : this.getImage("logistics");
                break;
            case 3:
                return this.useDEArt ? this.getImage("de_design") : this.getImage("design")
                break;
            case 4:
                return this.useDEArt ? this.getImage("de_admin") : this.getImage("admin")
                break;
        }
      },
      deptImageYellow: function (dept) {
        switch (dept) {
            case 0:
                return this.getImage("randd_yellow");
                break;
            case 1:
                return this.getImage("assembly_yellow");
                break;
            case 2:
                return this.getImage("logistics_yellow");
                break;
            case 3:
                return this.getImage("design_yellow")
                break;
            case 4:
                return this.getImage("admin_yellow")
                break;
        }
      },
      partImage: function (dept) {
        switch (dept) {
            case 0:
                return this.getImage("motor");
                break;
            case 1:
                return this.getImage("autopilot");
                break;
            case 2:
                return this.getImage("battery");
                break;
            case 3:
                return this.getImage("body");
                break;
            case 4:
                return this.getImage("electronics");
                break;
            case 5:
                return this.getImage("drivetrain");
                break;
        }
      },
      carImage: function (dept) {
        switch (dept) {
            case 0:
                return this.getImage("concept");
                break;
            case 1:
                return this.getImage("suv");
                break;
            case 2:
                return this.getImage("city");
                break;
            case 3:
                return this.getImage("truck");
                break;
            case 4:
                return this.getImage("sports");
                break;
        }
      },
      kanbanImage: function (dept) {
        if (dept === 0 || dept === 1 || dept === 2) {
            return this.getImage("kanban_above");
        }
        if (dept === 3 || dept === 4) {
            return this.getImage("kanban_below");
        }
      },
      getImage: function (name) {
        return 'data:image/png;base64,' + IMAGES[name];
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
      workStationOccupiedBy: function(dept, pos) {
        return _.find(this.players, function(p) { return p.dept === dept && p.position === pos });
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
        this.phaseIndex = 0;
        this.gameHasStarted = false;
        this.isFirstDeptSelection = true;
        this.lacerdaTrainingTrack = [1, 1, 1, 1, 1];
        this.turcziTrainingTrack = [0, 0, 0, 0, 0];
        this.difficultyCards = [
            { id: 0, include: false }, { id: 1, include: false }, { id: 2, include: false }, { id: 3, include: false }, { id: 4, include: false }, { id: 5, include: false }, { id: 6, include: false }, { id: 7, include: false }, { id: 8, include: false }
        ];
        this.useDEArt = false;
        this.niceSandra = false;
        this.undoState = {};
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
        gameState.phaseIndex = this.phaseIndex;
        gameState.gameHasStarted = this.gameHasStarted;
        gameState.isFirstDeptSelection = this.isFirstDeptSelection;
        gameState.lacerdaTrainingTrack = this.lacerdaTrainingTrack;
        gameState.turcziTrainingTrack = this.turcziTrainingTrack;
        gameState.difficultyCards = this.difficultyCards;
        gameState.useDEArt = this.useDEArt;
        gameState.niceSandra = this.niceSandra;
        gameState.undoState = this.undoState;
        localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(gameState));

        this.computedUpdater++;
      },
      saveUndoState: function() {
        this.undoState = {};
        this.undoState.currentPhase = _.cloneDeep(this.currentPhase);
        this.undoState.currentSelectionDeck = _.cloneDeep(this.currentSelectionDeck);
        this.undoState.currentDeptDeck = _.cloneDeep(this.currentDeptDeck);
        this.undoState.currentSelectionCard = _.cloneDeep(this.currentSelectionCard);
        this.undoState.currentDeptCards = _.cloneDeep(this.currentDeptCards);
        this.undoState.players = _.cloneDeep(this.players);
        this.undoState.playerColor = this.playerColor;
        this.undoState.playerStartingCertTrackPosition = _.cloneDeep(this.playerStartingCertTrackPosition);
        this.undoState.phaseIndex = _.cloneDeep(this.phaseIndex);
        this.undoState.gameHasStarted = this.gameHasStarted;
        this.undoState.isFirstDeptSelection = _.cloneDeep(this.isFirstDeptSelection);
        this.undoState.lacerdaTrainingTrack = _.cloneDeep(this.lacerdaTrainingTrack);
        this.undoState.turcziTrainingTrack = _.cloneDeep(this.turcziTrainingTrack);
        this.undoState.difficultyCards = _.cloneDeep(this.difficultyCards);
        this.undoState.niceSandra = this.niceSandra;

        // only one level of undo is saved
        this.undoState.undoState = _.cloneDeep({});
        
        this.saveGameState();
        this.computedUpdater++;
      },
      loadUndoState: function() {
        if (confirm("WARNING: This will reset the entire app to your most recent department selection step. Are you sure you want to UNDO?")) {
            if (this.undoState.currentPhase === null || this.undoState.currentPhase === undefined) {
                return;
            }

            this.currentPhase = _.cloneDeep(this.undoState.currentPhase);
            this.currentSelectionDeck = _.cloneDeep(this.undoState.currentSelectionDeck);
            this.currentDeptDeck = _.cloneDeep(this.undoState.currentDeptDeck);
            this.currentSelectionCard = _.cloneDeep(this.undoState.currentSelectionCard);
            this.currentDeptCards = _.cloneDeep(this.undoState.currentDeptCards);
            this.players = _.cloneDeep(this.undoState.players);
            this.playerColor = this.undoState.playerColor;
            this.playerStartingCertTrackPosition = this.undoState.playerStartingCertTrackPosition;
            this.phaseIndex = _.cloneDeep(this.undoState.phaseIndex);
            this.gameHasStarted = this.undoState.gameHasStarted;
            this.isFirstDeptSelection = _.cloneDeep(this.undoState.isFirstDeptSelection);

            // added post-release
            if (this.lacerdaTrainingTrack) {
                this.lacerdaTrainingTrack = _.cloneDeep(this.undoState.lacerdaTrainingTrack);
            }
            if (this.turcziTrainingTrack) {
                this.turcziTrainingTrack = _.cloneDeep(this.undoState.turcziTrainingTrack);
            }
            if (this.difficultyCards) {
                // data type changed
                if (this.difficultyCards[1].id) {
                    this.difficultyCards = _.cloneDeep(this.undoState.difficultyCards);
                }
            }
            if (this.niceSandra) {
                this.niceSandra = this.undoState.niceSandra;
            }

            this.saveGameState();
            this.computedUpdater++;
        }
      }
    }
});