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
      showCalc: false
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
            return this.diePool[0].currentValue + this.diePool[1].currentValue;
        },
        diceDiff: function () {
            return Math.abs(this.diePool[0].currentValue - this.diePool[1].currentValue);
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
            this.clearDiePool();
            this.roll(0, 3, WHITE);
        },
        roll1d6: function() {
            this.showCalc = false;
            this.clearDiePool();
            this.roll(0, 6, WHITE);
        },
        roll2d6: function() {
            this.showCalc = true;
            this.clearDiePool();
            this.roll(0, 6, WHITE);
            this.roll(1, 6, WHITE);
        },
        rollAct1Notorious: function() {
            this.showCalc = true;
            this.clearDiePool();
            this.roll(0, 6, WHITE);
            this.roll(1, 6, WHITE);
            this.roll(2, 6, BLACK);
        },
        rollAct2: function() {
            this.showCalc = true;
            this.clearDiePool();
            this.roll(0, 6, WHITE);
            this.roll(1, 6, WHITE);
            this.roll(2, 6, BLACK);
        },
        rollAct2Notorious: function() {
            this.showCalc = true;
            this.clearDiePool();
            this.roll(0, 6, WHITE);
            this.roll(1, 6, WHITE);
            this.roll(2, 6, BLACK);
            this.roll(3, 6, BLACK);
        },
        rollAct3: function() {
            this.showCalc = false;
            this.clearDiePool();
            this.roll(0, 6, WHITE);
            this.roll(1, 6, WHITE);
            this.roll(2, 6, WHITE);
            this.roll(3, 6, BLACK);
        },
        rollAct3Notorious: function() {
            this.showCalc = false;
            this.clearDiePool();
            this.roll(0, 6, WHITE);
            this.roll(1, 6, WHITE);
            this.roll(2, 6, WHITE);
            this.roll(3, 6, BLACK);
            this.roll(4, 6, BLACK);
        }
    }
});

