const LOCALSTORAGENAME = "hggamestate";
const AUTOMA_TYPE = { Simple: 0, Advanced: 1 };
const PLAYER_CLASS = { Working: 0, Middle: 1, Capitalist: 2, State: 3 };
const ACTION_TYPE = { AssignWorkers: 0, BuildCompany: 1, BuyGoodsAndServices: 2, Demonstration: 3, Lobby: 4, ProposeBill: 5, SellCompany: 6, SellToTheForeignMarket: 7, SpecialAction: 8, Strike: 9 };
const POLICY_TYPE = { FiscalPolicy: 1, LaborMarket: 2, Taxation: 3, HealthcareAndBenefits: 4, Education: 5, ForeignTrade: 6, Immigration: 7 };

function getActionTypeName(actiontypeid) {
    switch (actiontypeid) {
        case ACTION_TYPE.AssignWorkers: 'Assign Workers';
        case ACTION_TYPE.BuildCompany: 'Build Company';
        case ACTION_TYPE.BuyGoodsAndServices: 'Buy Goods And Services';
        case ACTION_TYPE.Demonstration: 'Demonstration';
        case ACTION_TYPE.Lobby: 'Lobby';
        case ACTION_TYPE.ProposeBill: 'Propose Bill';
        case ACTION_TYPE.SellCompany: 'Sell Company';
        case ACTION_TYPE.SellToTheForeignMarket: 'Sell To The Foreign Market';
        case ACTION_TYPE.SpecialAction: 'Special Action';
        case ACTION_TYPE.Strike: 'Strike';
    }
}

function getActionTypeAcronym(actiontypeid) {
    switch (actiontypeid) {
        case ACTION_TYPE.AssignWorkers: 'AW';
        case ACTION_TYPE.BuildCompany: 'BC';
        case ACTION_TYPE.BuyGoodsAndServices: 'BGS';
        case ACTION_TYPE.Demonstration: 'DEM';
        case ACTION_TYPE.Lobby: 'LOB';
        case ACTION_TYPE.ProposeBill: 'PB';
        case ACTION_TYPE.SellCompany: 'SC';
        case ACTION_TYPE.SellToTheForeignMarket: 'SFM';
        case ACTION_TYPE.SpecialAction: 'SA';
        case ACTION_TYPE.Strike: 'STR';
    }
}

function getPolicyTypeName(policytypeid) {
    switch (policytypeid) {
        case POLICY_TYPE.FiscalPolicy: 'Fiscal Policy';
        case POLICY_TYPE.LaborMarket: 'Labor Market';
        case POLICY_TYPE.Taxation: 'Taxation';
        case POLICY_TYPE.HealthcareAndBenefits: 'Healthcare and Benefits';
        case POLICY_TYPE.Education: 'Education';
        case POLICY_TYPE.ForeignTrade: 'Foreign Trade';
        case POLICY_TYPE.Immigration: 'Immigration';
    }
}

class ActionType {
    id;
    acronym;
    constructor(id, name, acronym) {
        this.id = id;
        this.name = getActionTypeName(id);
        this.acronym = getActionTypeAcronym(id);
    }
}

const ActionTypes = [
    new ActionType(AUTOMA_TYPE.AssignWorkers),
    new ActionType(AUTOMA_TYPE.BuildCompany),
    new ActionType(AUTOMA_TYPE.BuyGoodsAndServices),
    new ActionType(AUTOMA_TYPE.Demonstration),
    new ActionType(AUTOMA_TYPE.Lobby),
    new ActionType(AUTOMA_TYPE.ProposeBill),
    new ActionType(AUTOMA_TYPE.SellCompany),
    new ActionType(AUTOMA_TYPE.SellToTheForeignMarket),
    new ActionType(AUTOMA_TYPE.SpecialAction),
    new ActionType(AUTOMA_TYPE.Strike)
]

function getActionTypeById(actiontypeid) {
    return _.find(ActionTypes, function(a) { return a.id === actiontypeid; });
}

class PolicyType {
    id;
    name;
    isWelfareState;
    constructor(id, isWelfareState) {
        this.id = id;
        this.name = getPolicyTypeName(id);
        this.isWelfareState = isWelfareState;
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
    return _.find(PolicyTypes, function(p) { return p.id === policytypeid; });
}

class PriorityGrid {
    actions = [];
    policies = [];
    constructor(actions, policies) {
        this.actions = actions;
        this.policies = policies;
    }
}

class Automa {
    automatype;
    prioritygrid;
    constructor(automatype, prioritygrid) {
        this.automatype = automatype;
        this.prioritygrid = prioritygrid;
    }
}

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

// app
createApp({
    data() { return {
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
        saveGameState: function() {
            let gameState = {};

            localStorage.setItem(LOCALSTORAGENAME, JSON.stringify(gameState));

            this.computedUpdater++;
        }
    }
}).mount("#hg");