const LOCALSTORAGENAME = "hggamestate";
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

class ActionType {
    id;
    acronym;
    griditemtype;
    constructor(id) {
        this.id = id;
        this.name = getActionTypeName(id);
        this.acronym = getActionTypeAcronym(id);
        this.griditemtype = PRIORITY_GRID_ITEM_TYPE.Action;
    }
}

const ActionTypes = [
    new ActionType(ACTION_TYPE.BuildCompany),
    new ActionType(ACTION_TYPE.BuyGoodsAndServices),
    new ActionType(ACTION_TYPE.Demonstration),
    new ActionType(ACTION_TYPE.Lobby),
    new ActionType(ACTION_TYPE.ProposeBill),
    new ActionType(ACTION_TYPE.SellCompany),
    new ActionType(ACTION_TYPE.SellToTheForeignMarket),
    new ActionType(ACTION_TYPE.AssignWorkers),
    new ActionType(ACTION_TYPE.SpecialAction),
    new ActionType(ACTION_TYPE.Strike)
]

function getActionTypeById(actiontypeid) {
    return _.cloneDeep(_.find(ActionTypes, function(a) { return a.id === actiontypeid; }));
}

class PolicyType {
    id;
    name;
    isWelfareState;
    griditemtype;
    constructor(id, isWelfareState) {
        this.id = id;
        this.name = getPolicyTypeName(id);
        this.isWelfareState = isWelfareState;
        this.griditemtype = PRIORITY_GRID_ITEM_TYPE.Policy;
    }
}

const PolicyTypes = [
    new PolicyType(POLICY_TYPE.FiscalPolicy, false),
    new PolicyType(POLICY_TYPE.LaborMarket, false),
    new PolicyType(POLICY_TYPE.Taxation, false),
    new PolicyType(POLICY_TYPE.HealthcareAndBenefits, true),
    new PolicyType(POLICY_TYPE.Education, true),
    new PolicyType(POLICY_TYPE.ForeignTrade, false),
    new PolicyType(POLICY_TYPE.Immigration, false)
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
    setasideitems;
    constructor(automatype, playerclass, prioritygrid, setasideitems) {
        this.automatype = automatype;
        this.playerclass = playerclass;
        this.setasideitems = setasideitems;
        
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
                )
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
                )
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
                )
            }
        }
    }

    getGridArea(griditemtype) {
        return griditemtype === PRIORITY_GRID_ITEM_TYPE.Action ? this.prioritygrid.actions : this.prioritygrid.policies;
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

    collapseEmptyRows(griditemtype) {
        let gridarea = this.getGridArea(griditemtype);
        _.remove(gridarea, function(g) { return !_.isArray(g) || g.length === 0 });
    }

    setItemAside(griditemtype, itemid) {

    }

    returnItemToGrid(griditemtype, itemid) {
        
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
        players: [],
        WorkingClassAutoma: new Automa(PLAYER_TYPE.AdvancedAutoma, PLAYER_CLASS.Working),
        CapitalistClassAutoma: new Automa(PLAYER_TYPE.AdvancedAutoma, PLAYER_CLASS.Capitalist),
        MiddleClassAutoma: new Automa(PLAYER_TYPE.AdvancedAutoma, PLAYER_CLASS.Middle),
        computedUpdater: 1,
        version: "0.01"
    } },
    watch: {
        
    },
    mounted: function() {
        this.computedUpdater++;
        if (localStorage.getItem(LOCALSTORAGENAME)) {
            let gameState = JSON.parse(localStorage.getItem(LOCALSTORAGENAME));
            this.computedUpdater++;
        }
    },
    computed: {
        
    },
    methods: {
        start: function() {

        },
        newgame: function() {

        },
        saveGameState: function() {
            let gameState = {};

            localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(gameState));

            this.computedUpdater++;
        }
    }
}).mount("#hg");