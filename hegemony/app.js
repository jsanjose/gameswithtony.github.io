const LOCALSTORAGENAME = "hggamestate";
const PAGE_STATE = { StartScreen: 0, Grid: 1 };
const PLAYER_TYPE = { Human: 0, SimpleAutoma: 0, AdvancedAutoma: 1 };
const PLAYER_CLASS = { Working: 0, Middle: 1, Capitalist: 2, State: 3 };
const ACTION_TYPE = { AssignWorkers: 0, BuildCompany: 1, BuyGoodsAndServices: 2, Demonstration: 3, Lobby: 4, ProposeBill: 5, SellCompany: 6, SellToTheForeignMarket: 7, SpecialAction: 8, Strike: 9 };
const POLICY_TYPE = { FiscalPolicy: 1, LaborMarket: 2, Taxation: 3, HealthcareAndBenefits: 4, Education: 5, ForeignTrade: 6, Immigration: 7 };
const PRIORITY_GRID_ITEM_TYPE = { Action: 0, Policy: 1 };

function getActionTypeName(actiontypeid) {
    switch (actiontypeid) {
        case ACTION_TYPE.AssignWorkers: return 'Assign Workers';
        case ACTION_TYPE.BuildCompany: return 'Build Company';
        case ACTION_TYPE.BuyGoodsAndServices: return 'Buy Goods And Services';
        case ACTION_TYPE.Demonstration: return 'Demonstration';
        case ACTION_TYPE.Lobby: return 'Lobby';
        case ACTION_TYPE.ProposeBill: return 'Propose Bill';
        case ACTION_TYPE.SellCompany: return 'Sell Company';
        case ACTION_TYPE.SellToTheForeignMarket: return 'Sell To The Foreign Market';
        case ACTION_TYPE.SpecialAction: return 'Special Action';
        case ACTION_TYPE.Strike: return 'Strike';
    }
}

function getActionTypeAcronym(actiontypeid) {
    switch (actiontypeid) {
        case ACTION_TYPE.AssignWorkers: return 'AW';
        case ACTION_TYPE.BuildCompany: return 'BC';
        case ACTION_TYPE.BuyGoodsAndServices: return 'BGS';
        case ACTION_TYPE.Demonstration: return 'DEM';
        case ACTION_TYPE.Lobby: return 'LOB';
        case ACTION_TYPE.ProposeBill: return 'PB';
        case ACTION_TYPE.SellCompany: return 'SC';
        case ACTION_TYPE.SellToTheForeignMarket: return 'SFM';
        case ACTION_TYPE.SpecialAction: return 'SA';
        case ACTION_TYPE.Strike: return 'STR';
    }
}

function getPolicyTypeName(policytypeid) {
    switch (policytypeid) {
        case POLICY_TYPE.FiscalPolicy: return 'Fiscal Policy';
        case POLICY_TYPE.LaborMarket: return 'Labor Market';
        case POLICY_TYPE.Taxation: return 'Taxation';
        case POLICY_TYPE.HealthcareAndBenefits: return 'Healthcare and Benefits';
        case POLICY_TYPE.Education: return 'Education';
        case POLICY_TYPE.ForeignTrade: return 'Foreign Trade';
        case POLICY_TYPE.Immigration: return 'Immigration';
    }
}

function getPolicyTypeAcronym(policytypeid) {
    switch (policytypeid) {
        case POLICY_TYPE.FiscalPolicy: return 'FP';
        case POLICY_TYPE.LaborMarket: return 'LM';
        case POLICY_TYPE.Taxation: return 'TAX';
        case POLICY_TYPE.HealthcareAndBenefits: return 'H&B';
        case POLICY_TYPE.Education: return 'EDU';
        case POLICY_TYPE.ForeignTrade: return 'FT';
        case POLICY_TYPE.Immigration: return 'IMM';
    }
}

class ActionType {
    id;
    acronym;
    griditemtype;
    cssclass;
    constructor(id, cssclass) {
        this.id = id;
        this.name = getActionTypeName(id);
        this.acronym = getActionTypeAcronym(id);
        this.cssclass = cssclass;
        this.griditemtype = PRIORITY_GRID_ITEM_TYPE.Action;
    }
}

const ActionTypes = [
    new ActionType(ACTION_TYPE.BuildCompany, 'item--bc'),
    new ActionType(ACTION_TYPE.BuyGoodsAndServices, 'item--bgs'),
    new ActionType(ACTION_TYPE.Demonstration, 'item--dem'),
    new ActionType(ACTION_TYPE.Lobby, 'item--lb'),
    new ActionType(ACTION_TYPE.ProposeBill, 'item--pb'),
    new ActionType(ACTION_TYPE.SellCompany, 'item--sc'),
    new ActionType(ACTION_TYPE.SellToTheForeignMarket, 'item--sfm'),
    new ActionType(ACTION_TYPE.AssignWorkers, 'item--aw'),
    new ActionType(ACTION_TYPE.SpecialAction, 'item--sa'),
    new ActionType(ACTION_TYPE.Strike, 'item--str')
]

function getActionTypeById(actiontypeid) {
    return _.cloneDeep(_.find(ActionTypes, function(a) { return a.id === actiontypeid; }));
}

class PolicyType {
    id;
    name;
    isWelfareState;
    griditemtype;
    acronym;
    cssclass;
    constructor(id, isWelfareState, cssclass, acronym) {
        this.id = id;
        this.name = getPolicyTypeName(id);
        this.isWelfareState = isWelfareState;
        this.acronym = getPolicyTypeAcronym(id);
        this.cssclass = cssclass;
        this.griditemtype = PRIORITY_GRID_ITEM_TYPE.Policy;
    }
}

const PolicyTypes = [
    new PolicyType(POLICY_TYPE.FiscalPolicy, false, 'item--fp'),
    new PolicyType(POLICY_TYPE.LaborMarket, false, 'item--lm'),
    new PolicyType(POLICY_TYPE.Taxation, false, 'item--tax'),
    new PolicyType(POLICY_TYPE.HealthcareAndBenefits, true, 'item--hb'),
    new PolicyType(POLICY_TYPE.Education, true, 'item--edu'),
    new PolicyType(POLICY_TYPE.ForeignTrade, false, 'item--ft'),
    new PolicyType(POLICY_TYPE.Immigration, false, 'item--imm')
]

function getPolicyTypeById(policytypeid) {
    return _.cloneDeep(_.find(PolicyTypes, function(p) { return p.id === policytypeid; }));
}

// priority grid (advanced automa)
class PriorityGridItem {
    item;
    constructor(item) {
        this.item = item;
    }
}

class PriorityGrid {
    actions = [[]]; // 2D array
    policies = [[]]; // 2D array
    actionsaside = [];
    policiesaside = [];
    constructor(actions, policies) {
        this.actions = actions;
        this.policies = policies;
    }
}

// automa
class Automa {
    automatype;
    playerclass;
    prioritygrid;
    constructor(automatype, playerclass, prioritygrid) {
        this.automatype = automatype;
        this.playerclass = playerclass;

        if (prioritygrid) this.prioritygrid = prioritygrid;
        
        if (!prioritygrid && automatype == PLAYER_TYPE.AdvancedAutoma) { // starting grids
            if (playerclass === PLAYER_CLASS.Working) {
                this.prioritygrid = new PriorityGrid(
                    [
                        [
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.SpecialAction)),
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.Strike)),
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.Demonstration))
                        ],
                        [
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.AssignWorkers)),
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.BuyGoodsAndServices)),
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.ProposeBill))
                        ]
                    ],
                    [
                        [
                            new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.LaborMarket)),
                            new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.HealthcareAndBenefits)),
                            new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.ForeignTrade)),
                        ],
                        [
                            new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.FiscalPolicy)),
                            new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.Education)),
                        ]
                    ]
                );

                this.prioritygrid.policiesaside = [
                    new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.Taxation)),
                    new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.Immigration))
                ];
            }

            if (playerclass === PLAYER_CLASS.Capitalist) {
                this.prioritygrid = new PriorityGrid(
                    [
                        [
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.SpecialAction)),
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.Lobby)),
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.SellCompany))
                        ],
                        [
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.BuildCompany)),
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.SellToTheForeignMarket)),
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.ProposeBill))
                        ]
                    ],
                    [
                        [
                            new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.LaborMarket)),
                            new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.HealthcareAndBenefits)),
                            new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.ForeignTrade)),
                            new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.Immigration))
                        ],
                        [
                            new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.Taxation))
                        ]
                    ]
                );

                this.prioritygrid.policiesaside = [
                    new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.FiscalPolicy)),
                    new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.Education))
                ];
            }

            if (playerclass === PLAYER_CLASS.Middle) {
                this.prioritygrid = new PriorityGrid(
                    [
                        [
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.SpecialAction)),
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.SellToTheForeignMarket)),
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.ProposeBill))
                        ],
                        [
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.BuyGoodsAndServices)),
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.BuildCompany)),
                            new PriorityGridItem(getActionTypeById(ACTION_TYPE.AssignWorkers))
                        ]
                    ],
                    [
                        [
                            new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.FiscalPolicy)),
                            new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.Taxation)),
                            new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.Education)),
                            new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.Immigration))
                        ]
                    ]
                );

                this.prioritygrid.policiesaside = [
                    new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.LaborMarket)),
                    new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.HealthcareAndBenefits)),
                    new PriorityGridItem(getPolicyTypeById(POLICY_TYPE.ForeignTrade))
                ];
            }
        }
    }

    getGridArea(griditemtype) {
        return griditemtype === PRIORITY_GRID_ITEM_TYPE.Action ? this.prioritygrid.actions : this.prioritygrid.policies;
    }

    getGridAreaSetAside(griditemtype) {
        return griditemtype === PRIORITY_GRID_ITEM_TYPE.Action ? this.prioritygrid.actionsaside : this.prioritygrid.policiesaside;
    }


    moveGridItemUp(griditemtype, itemid, numberOfMoves) {
        let gridarea = this.getGridArea(griditemtype);

        let row = 0;
        let rowIndex = -1;
        for (let gridarearow of gridarea) {
            rowIndex = _.findIndex(gridarearow, function(r) { return r.item.id === itemid });    
            if (rowIndex > -1) {
                break;
            }
            row++;
        }

        let item = gridarea[row][rowIndex];

        for (let i=0; i < numberOfMoves; i++) {
            if (gridarea.length < row + numberOfMoves + 1) { // add new row if needed
                gridarea.push([]);
            }
        }

        gridarea[row + numberOfMoves].push(item);
        gridarea[row].splice(rowIndex, 1);
    }

    moveGridItemDown(griditemtype, itemid, numberOfMoves) {
        let gridarea = this.getGridArea(griditemtype);

        let row = 0;
        let rowIndex = -1;
        for (let gridarearow of gridarea) {
            rowIndex = _.findIndex(gridarearow, function(r) { return r.item.id === itemid });    
            if (rowIndex > -1) {
                break;
            }
            row++;
        }

        let item = gridarea[row][rowIndex];

        let rowsAdded = 0;
        let origRow = row;
        for (let i=origRow; i < numberOfMoves; i++) {
            if (origRow - numberOfMoves < 0) { // add new row if needed
                gridarea.unshift([]);
                rowsAdded++;
                row++;
            }
        }

        gridarea[row - numberOfMoves].push(item);
        gridarea[row].splice(rowIndex, 1);
    }

    setItemAside(griditemtype, itemid) {
        let gridarea = this.getGridArea(griditemtype);
        let gridareaaside = this.getGridAreaSetAside(griditemtype);

        let row = 0;
        let rowIndex = -1;
        for (let gridarearow of gridarea) {
            rowIndex = _.findIndex(gridarearow, function(r) { return r.item.id === itemid });    
            if (rowIndex > -1) {
                break;
            }
            row++;
        }

        let item = gridarea[row][rowIndex];

        gridareaaside.push(item);
        gridarea[row].splice(rowIndex, 1);
    }

    returnItemToGrid(griditemtype, itemid, placement) {
        let gridarea = this.getGridArea(griditemtype);
        let gridareaaside = this.getGridAreaSetAside(griditemtype);
        let asideitem = _.find(gridareaaside, function(a) { return a.item.id === itemid });    

        if (placement == 1 && gridarea.length > 1 && asideitem) { // end of second from bottom row
            gridarea[1].push(asideitem);
            _.remove(gridareaaside, function(a) { return a.item.id === itemid });
            return;
        }

        if (gridarea.length > 0 && asideitem) { // end of bottom row
            gridarea[0].push(asideitem);
            _.remove(gridareaaside, function(a) { return a.item.id === itemid });
        }
    }

    collapseEmptyRows(griditemtype) {
        let gridarea = this.getGridArea(griditemtype);
        _.remove(gridarea, function(g) { return !_.isArray(g) || g.length === 0 });
    }
}

// players
class Player {
    id;
    name;
    type;
    constructor(id, name, type) {
        this.id = id;
        this.name = name;
        this.type = type;
    }
}

// app
const { createApp } = Vue
createApp({
    data() { return {
        numberOfPlayersIncludingAutoma: 1,
        pageState: PAGE_STATE.Grid,
        players: [],
        WorkingClassAutoma: new Automa(PLAYER_TYPE.AdvancedAutoma, PLAYER_CLASS.Working),
        CapitalistClassAutoma: new Automa(PLAYER_TYPE.AdvancedAutoma, PLAYER_CLASS.Capitalist),
        MiddleClassAutoma: new Automa(PLAYER_TYPE.AdvancedAutoma, PLAYER_CLASS.Middle),
        automaInFocus: PLAYER_CLASS.Capitalist,
        itemTypeInFocus: PRIORITY_GRID_ITEM_TYPE.Action,
        selectedItem: null,
        selectedSetAsideItem: null,
        computedUpdater: 1,
        version: "0.2"
    } },
    watch: {
        
    },
    mounted: function() {
        this.computedUpdater++;
        if (localStorage.getItem(LOCALSTORAGENAME)) {
            let gameState = JSON.parse(localStorage.getItem(LOCALSTORAGENAME));

            this.numberOfPlayersIncludingAutoma = gameState.numberOfPlayersIncludingAutoma;
            this.pageState = gameState.pageState;
            this.players = gameState.players;
            this.WorkingClassAutoma = new Automa(gameState.WorkingClassAutoma.automatype, gameState.WorkingClassAutoma.playerclass, gameState.WorkingClassAutoma.prioritygrid);
            this.CapitalistClassAutoma = new Automa(gameState.CapitalistClassAutoma.automatype, gameState.CapitalistClassAutoma.playerclass, gameState.CapitalistClassAutoma.prioritygrid);
            this.MiddleClassAutoma = new Automa(gameState.MiddleClassAutoma.automatype, gameState.MiddleClassAutoma.playerclass, gameState.MiddleClassAutoma.prioritygrid);
            this.automaInFocus = gameState.automaInFocus;
            this.itemTypeInFocus = gameState.itemTypeInFocus;
            this.selectedItem = gameState.selectedItem;
            this.selectedSetAsideItem = gameState.selectedSetAsideItem;
        }
    },
    computed: {
        currentAutoma: function() {
            if (this.automaInFocus == PLAYER_CLASS.Working) return this.WorkingClassAutoma;
            if (this.automaInFocus == PLAYER_CLASS.Middle) return this.MiddleClassAutoma;
            if (this.automaInFocus == PLAYER_CLASS.Capitalist) return this.CapitalistClassAutoma;
        },
        currentAutomaGridSide: function() {
            if (this.itemTypeInFocus == PRIORITY_GRID_ITEM_TYPE.Action) return this.currentAutoma.prioritygrid.actions;
            if (this.itemTypeInFocus == PRIORITY_GRID_ITEM_TYPE.Policy) return this.currentAutoma.prioritygrid.policies;
        },
        currentAutomaGridSideSetAside: function() {
            if (this.itemTypeInFocus == PRIORITY_GRID_ITEM_TYPE.Action) return this.currentAutoma.prioritygrid.actionsaside;
            if (this.itemTypeInFocus == PRIORITY_GRID_ITEM_TYPE.Policy) return this.currentAutoma.prioritygrid.policiesaside;
        },
        itemTypeInFocusClass: function() {
            return this.itemTypeInFocus == PRIORITY_GRID_ITEM_TYPE.Action ? "priority-grid--actions" : "priority-grid--policies"
        },
        canCollapse: function() {
            let canCollapse = false;
            for (let gridrow of this.currentAutomaGridSide) {
                if (!_.isArray(gridrow) || gridrow.length === 0) {
                    return true;
                }
            }
            return canCollapse;
        },
        topTwoDesc: function() {
            let topTwo = [];
            let reversedGridSide = _.reverse(_.cloneDeep(this.currentAutomaGridSide));
            for (let gridrow of reversedGridSide) {
                for (let griditem of gridrow) {
                    topTwo.push(griditem);
                    if (topTwo.length == 2) break;
                }
                if (topTwo.length == 2) break;
            }

            let topTwoDesc = '';
            for (let top of topTwo) {
                topTwoDesc = topTwoDesc + top.item.name + ', '
            }

            return topTwoDesc.slice(0, -2);
        }
    },
    methods: {
        start: function() {

        },
        saveGameState: function() {
            let gameState = {};

            gameState.numberOfPlayersIncludingAutoma = this.numberOfPlayersIncludingAutoma;
            gameState.pageState = this.pageState;
            gameState.players = this.players;
            gameState.WorkingClassAutoma = this.WorkingClassAutoma;
            gameState.CapitalistClassAutoma = this.CapitalistClassAutoma;
            gameState.MiddleClassAutoma = this.MiddleClassAutoma;
            gameState.automaInFocus = this.automaInFocus;
            gameState.itemTypeInFocus = this.itemTypeInFocus;
            gameState.selectedItem = this.selectedItem;
            gameState.selectedSetAsideItem = this.selectedSetAsideItem;

            localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(gameState));
            this.computedUpdater++;
        },
        newgame: function(event) {
            if (confirm('Are you sure you want to start a new game?\n\nThis will reset ALL automas.')) {
                this.numberOfPlayersIncludingAutoma = 1;
                this.pageState = PAGE_STATE.Grid;
                this.players = [];
                this.WorkingClassAutoma = new Automa(PLAYER_TYPE.AdvancedAutoma, PLAYER_CLASS.Working);
                this.CapitalistClassAutoma = new Automa(PLAYER_TYPE.AdvancedAutoma, PLAYER_CLASS.Capitalist);
                this.MiddleClassAutoma = new Automa(PLAYER_TYPE.AdvancedAutoma, PLAYER_CLASS.Middle);
                this.automaInFocus = PLAYER_CLASS.Capitalist;
                this.itemTypeInFocus = PRIORITY_GRID_ITEM_TYPE.Action;
                this.selectedItem = null;
                this.selectedSetAsideItem = null;
                this.saveGameState();
                this.computedUpdater++;
            }
            event.preventDefault();
        },
        setAutomaInFocus(index) {
            this.selectedItem = null;
            this.saveGameState();
            this.computedUpdater++;
        },
        setItemTypeInFocus(itemtypeid) {
            if (this.itemTypeInFocus != itemtypeid) this.selectedItem = null;
            this.itemTypeInFocus = itemtypeid;
            this.saveGameState();
            this.computedUpdater++;
        },
        selectItem(item, event) {
            this.selectedItem = item;
            this.saveGameState();
            this.computedUpdater++;
            event.preventDefault();
        },
        moveSelectedItemUp(event) {
            let item = this.selectedItem;
            this.currentAutoma.moveGridItemUp(item.griditemtype, item.id, 1);
            this.saveGameState();
            this.computedUpdater++;
            event.preventDefault();
        },
        moveSelectedItemDown(event) {
            let item = this.selectedItem;
            this.currentAutoma.moveGridItemDown(item.griditemtype, item.id, 1);
            this.saveGameState();
            this.computedUpdater++;
            event.preventDefault();
        },
        setSelectedItemAside(event) {
            let item = this.selectedItem;
            this.currentAutoma.setItemAside(item.griditemtype, item.id);
            this.selectedItem = null;
            this.saveGameState();
            this.computedUpdater++;
            event.preventDefault();
        },
        deselectItem(event) {
            this.selectedItem = null;
            this.saveGameState();
            this.computedUpdater++;
            event.preventDefault();
        },
        selectItemSetAside(item, event) {
            this.selectedSetAsideItem = item;
            this.saveGameState();
            this.computedUpdater++;
            event.preventDefault();
        },
        deselectSetAsideItem(event) {
            this.selectedSetAsideItem = null;
            this.saveGameState();
            this.computedUpdater++;
            event.preventDefault();
        },
        returnItemAsideToGrid(event, placement) {
            let item = this.selectedSetAsideItem;
            this.currentAutoma.returnItemToGrid(item.griditemtype, item.id, placement);
            this.selectedSetAsideItem = null;
            this.saveGameState();
            this.computedUpdater++;
            event.preventDefault();
        },
        collapse(event) {
            this.currentAutoma.collapseEmptyRows(this.itemTypeInFocus);
            this.saveGameState();
            this.computedUpdater++;
            event.preventDefault();
        }
    }
}).mount("#hg");