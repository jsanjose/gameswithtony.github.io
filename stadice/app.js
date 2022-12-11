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
    createDie(0, 20, WHITE),
    createDie(1, 20, WHITE),
    createDie(2, 20, WHITE),
    createDie(3, 20, WHITE),
    createDie(4, 20, WHITE),
    createDie(5, 20, WHITE),
    createDie(6, 6, BLACK),
    createDie(7, 6, BLACK),
    createDie(8, 6, BLACK),
    createDie(9, 6, BLACK),
    createDie(10, 6, BLACK),
    createDie(11, 6, BLACK),
    createDie(12, 6, BLACK),
    createDie(13, 6, BLACK),
    createDie(14, 6, BLACK),
    createDie(15, 6, BLACK),
    createDie(16, 6, BLACK),
    createDie(17, 6, BLACK)
]; 

var app = new Vue({
    el: '#stadice',
    data: {
      diePool: diePoolInit,
      showCalc: false,
      totalRolls: 0
    },
    mounted: function() {
        
    },
    computed: {
        activeDice: function () {
                return this.diePool.filter(function (die) {
                return die.showDie;
            })
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
            window.scrollTo(0,0);
        },
        roll1d20: function() {
            this.clearDiePool();
            this.roll(0, 20, WHITE);
            this.totalRolls++;
        },
        roll2d20: function() {
            this.clearDiePool();
            this.roll(0, 20, WHITE);
            this.roll(1, 20, WHITE);
            this.totalRolls++;
        },
        roll3d20: function() {
            this.clearDiePool();
            this.roll(0, 20, WHITE);
            this.roll(1, 20, WHITE);
            this.roll(2, 20, WHITE);
            this.totalRolls++;
        },
        roll4d20: function() {
            this.clearDiePool();
            this.roll(0, 20, WHITE);
            this.roll(1, 20, WHITE);
            this.roll(2, 20, WHITE);
            this.roll(3, 20, WHITE);
            this.totalRolls++;
        },
        roll5d20: function() {
            this.clearDiePool();
            this.roll(0, 20, WHITE);
            this.roll(1, 20, WHITE);
            this.roll(2, 20, WHITE);
            this.roll(3, 20, WHITE);
            this.roll(4, 20, WHITE);
            this.totalRolls++;
        },
        roll1d6: function() {
            this.clearDiePool();
            this.roll(0, 6, BLACK);
            this.totalRolls++;
        },
        roll2d6: function() {
            this.clearDiePool();
            this.roll(0, 6, BLACK);
            this.roll(1, 6, BLACK);
            this.totalRolls++;
        },
        roll3d6: function() {
            this.clearDiePool();
            this.roll(0, 6, BLACK);
            this.roll(1, 6, BLACK);
            this.roll(2, 6, BLACK);
            this.totalRolls++;
        },
        roll4d6: function() {
            this.clearDiePool();
            this.roll(0, 6, BLACK);
            this.roll(1, 6, BLACK);
            this.roll(2, 6, BLACK);
            this.roll(3, 6, BLACK);
            this.totalRolls++;
        },
        roll5d6: function() {
            this.clearDiePool();
            this.roll(0, 6, BLACK);
            this.roll(1, 6, BLACK);
            this.roll(2, 6, BLACK);
            this.roll(3, 6, BLACK);
            this.roll(4, 6, BLACK);
            this.totalRolls++;
        },
        roll6d6: function() {
            this.clearDiePool();
            this.roll(0, 6, BLACK);
            this.roll(1, 6, BLACK);
            this.roll(2, 6, BLACK);
            this.roll(3, 6, BLACK);
            this.roll(4, 6, BLACK);
            this.roll(5, 6, BLACK);
            this.totalRolls++;
        },
        roll7d6: function() {
            this.clearDiePool();
            this.roll(0, 6, BLACK);
            this.roll(1, 6, BLACK);
            this.roll(2, 6, BLACK);
            this.roll(3, 6, BLACK);
            this.roll(4, 6, BLACK);
            this.roll(5, 6, BLACK);
            this.roll(6, 6, BLACK);
            this.totalRolls++;
        },
        roll8d6: function() {
            this.clearDiePool();
            this.roll(0, 6, BLACK);
            this.roll(1, 6, BLACK);
            this.roll(2, 6, BLACK);
            this.roll(3, 6, BLACK);
            this.roll(4, 6, BLACK);
            this.roll(5, 6, BLACK);
            this.roll(6, 6, BLACK);
            this.roll(7, 6, BLACK);
            this.totalRolls++;
        },
        roll9d6: function() {
            this.clearDiePool();
            this.roll(0, 6, BLACK);
            this.roll(1, 6, BLACK);
            this.roll(2, 6, BLACK);
            this.roll(3, 6, BLACK);
            this.roll(4, 6, BLACK);
            this.roll(5, 6, BLACK);
            this.roll(6, 6, BLACK);
            this.roll(7, 6, BLACK);
            this.roll(8, 6, BLACK);
            this.totalRolls++;
        },
        roll10d6: function() {
            this.clearDiePool();
            this.roll(0, 6, BLACK);
            this.roll(1, 6, BLACK);
            this.roll(2, 6, BLACK);
            this.roll(3, 6, BLACK);
            this.roll(4, 6, BLACK);
            this.roll(5, 6, BLACK);
            this.roll(6, 6, BLACK);
            this.roll(7, 6, BLACK);
            this.roll(8, 6, BLACK);
            this.roll(9, 6, BLACK);
            this.totalRolls++;
        }
    }
});

