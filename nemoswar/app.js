const WHITE = 0;
const BLACK = 1;

function rollDie(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function createDie(id, d, color) {
    return {
        id: id,
        d: d,
        color: color,
        currentValue: 1,
        showDie: true,
        selectable: false,
        selected: false
    };
}

const diePoolInit = [
    createDie(0, 6, WHITE),
    createDie(1, 6, WHITE),
    createDie(2, 6, WHITE),
    createDie(3, 6, BLACK),
    createDie(4, 6, BLACK)
]; 

var app = new Vue({
    el: '#nemo',
    data: {
      diePool: diePoolInit,
      showCalc: false,
      totalRolls: 0,
      isAct3Roll: false
    },
    mounted: function() {
        
    },
    computed: {
        activeDice: function () {
                return this.diePool.filter(function (die) {
                return die.showDie;
            })
        },
        diceSum: function () {
            let sum = 0;
            let die1 = this.diePool[0].currentValue;
            let die2 = this.diePool[1].currentValue;
            let die3 = this.diePool[2].currentValue;
            let diff1 = Math.abs(die1-die2);

            if (this.isAct3Roll) {
                let diff2 = Math.abs(die2-die3);
                let diff3 = Math.abs(die3-die1);

                if (diff1 >= diff2 && diff1 >= diff3) {
                    sum = die1 + die2;
                }
                else if (diff2 >= diff1 && diff2 >= diff3) {
                    sum = die2 + die3;
                }
                else if (diff3 >= diff1 && diff3 >= diff2) {
                    sum = die3 + die1;
                }
            } else {
                sum = die1 + die2;
            }

            return sum;
        },
        diceDiff: function () {
            let diff = 0;
            let die1 = this.diePool[0].currentValue;
            let die2 = this.diePool[1].currentValue;
            let die3 = this.diePool[2].currentValue;
            let diff1 = Math.abs(die1-die2);

            if (this.isAct3Roll) {
                let diff2 = Math.abs(die2-die3);
                let diff3 = Math.abs(die3-die1);

                if (diff1 >= diff2 && diff1 >= diff3) {
                    diff = diff1;
                }
                else if (diff2 >= diff1 && diff2 >= diff3) {
                    diff = diff2;
                }
                else if (diff3 >= diff1 && diff3 >= diff2) {
                    diff = diff3;
                }
            } else {
                diff = diff1;
            }

            return diff;
        }
    },
    methods: {
        clearDiePool: function() {
            this.diePool.forEach(function(item, index) {
                item.currentValue = 1;
                item.showDie = false;
            });
        },
        roll: function (index, d, color) {
            this.diePool[index].currentValue = rollDie(1, d);
            this.diePool[index].color = color;
            this.diePool[index].showDie = true;
        },
        roll1d3: function() {
            this.showCalc = false;
            this.isAct3Roll = false;
            this.clearDiePool();
            this.roll(0, 3, WHITE);
            this.totalRolls++;
        },
        roll1d6: function() {
            this.showCalc = false;
            this.isAct3Roll = false;
            this.clearDiePool();
            this.roll(0, 6, WHITE);
            this.totalRolls++;
        },
        roll2d6: function() {
            this.showCalc = true;
            this.isAct3Roll = false;
            this.clearDiePool();
            this.roll(0, 6, WHITE);
            this.roll(1, 6, WHITE);
            this.totalRolls++;
        },
        rollAct1Notorious: function() {
            this.showCalc = true;
            this.isAct3Roll = false;
            this.clearDiePool();
            this.roll(0, 6, WHITE);
            this.roll(1, 6, WHITE);
            this.roll(2, 6, BLACK);
            this.totalRolls++;
        },
        rollAct2: function() {
            this.showCalc = true;
            this.isAct3Roll = false;
            this.clearDiePool();
            this.roll(0, 6, WHITE);
            this.roll(1, 6, WHITE);
            this.roll(2, 6, BLACK);
            this.totalRolls++;
        },
        rollAct2Notorious: function() {
            this.showCalc = true;
            this.isAct3Roll = false;
            this.clearDiePool();
            this.roll(0, 6, WHITE);
            this.roll(1, 6, WHITE);
            this.roll(2, 6, BLACK);
            this.roll(3, 6, BLACK);
            this.totalRolls++;
        },
        rollAct3: function() {
            this.showCalc = true;
            this.isAct3Roll = true;
            this.clearDiePool();
            this.roll(0, 6, WHITE);
            this.roll(1, 6, WHITE);
            this.roll(2, 6, WHITE);
            this.roll(3, 6, BLACK);
            this.totalRolls++;
        },
        rollAct3Notorious: function() {
            this.showCalc = true;
            this.isAct3Roll = true;
            this.clearDiePool();
            this.roll(0, 6, WHITE);
            this.roll(1, 6, WHITE);
            this.roll(2, 6, WHITE);
            this.roll(3, 6, BLACK);
            this.roll(4, 6, BLACK);
            this.totalRolls++;
        }
    }
});

