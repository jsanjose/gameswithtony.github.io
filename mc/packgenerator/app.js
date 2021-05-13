let tempdata;
let tempheroes = [];
let tempvillains = [];
let tempmainschemes = [];
let tempsideschemes = [];
let tempminions = [];
let tempallies = [];

let heroes = [];
let villains = [];
let main_schemes = [];
let side_schemes = [];
let minions = [];
let allies = [];

let jsonfiles = [
    'ant_encounter',
    'ant',
    'bkw_encounter',
    'bkw',
    'cap_encounter',
    'cap',
    'core',
    'core_encounter',
    'drs_encounter',
    'drs',
    'gmw',
    'gob_encounter',
    'hlk_encounter',
    'hlk',
    'msm_encounter',
    'msm',
    'qsv_encounter',
    'qsv',
    'ron_encounter',
    'scw_encounter',
    'scw',
    'thor_encounter',
    'thor',
    'toafk_encounter',
    'trors_encounter',
    'trors',
    'twc_encounter',
    'wsp_encounter',
    'wsp'
];

function appenddata(data) {
    tempdata = _.filter(data, { "type_code": "hero" });
    tempheroes = _.uniqBy(_.concat(tempdata, tempheroes), "name");

    tempdata = _.filter(data, { "type_code": "villain" });
    tempvillains = _.uniqBy(_.concat(tempdata, tempvillains), "name");

    tempdata = _.filter(data, { "type_code": "main_scheme" });
    tempmainschemes = _.uniqBy(_.concat(tempdata, tempmainschemes), "name");

    tempdata = _.filter(data, { "type_code": "side_scheme" });
    tempsideschemes = _.uniqBy(_.concat(tempdata, tempsideschemes), "name");

    tempdata = _.filter(data, { "type_code": "minion" });
    tempminions = _.uniqBy(_.concat(tempdata, tempminions), "name");

    tempdata = _.filter(data, { "type_code": "ally" });
    tempallies = _.uniqBy(_.concat(tempdata, tempallies), "name");    
}

async function getdata() {
    let response;

    for (let i=0;i<jsonfiles.length;i++) {
        response = await fetch(jsonfiles[i] + ".json");
        data = await response.json();
        appenddata(data);
    }

    _.forEach(tempheroes, function (d) {
        heroes.push({
            name: d.name,
            isSelected: false,
            type: 'hero',
            hitpoints: d.health
        });
    });
    heroes = _.sortBy(heroes, "name");

    _.forEach(tempvillains, function (d) {
        villains.push({
            name: d.name,
            isSelected: false,
            type: 'villain',
            hitpoints: d.health
        });
    });
    villains = _.sortBy(villains, "name");

    _.forEach(tempmainschemes, function (d) {
        main_schemes.push({
            name: d.name,
            isSelected: false,
            type: 'main_scheme',
            threat: d.threat,
            basethreat: d.base_threat,
            basethreatfixed: d.base_threat_fixed
        });
    });
    main_schemes = _.sortBy(main_schemes, "name");

    _.forEach(tempsideschemes, function (d) {
        side_schemes.push({
            name: d.name,
            isSelected: false,
            type: 'side_scheme',
            threat: d.base_threat,
            basethreat: d.base_threat,
            basethreatfixed: d.base_threat_fixed
        });
    });
    side_schemes = _.sortBy(side_schemes, "name");

    _.forEach(tempminions, function (d) {
        minions.push({
            name: d.name,
            isSelected: false,
            type: 'minion',
            hitpoints: d.health
        });
    });
    minions = _.sortBy(minions, "name");

    _.forEach(tempallies, function (d) {
        allies.push({
            name: d.name,
            isSelected: false,
            type: 'ally',
            hitpoints: d.health
        });
    });
    allies = _.sortBy(allies, "name");

    console.log(heroes);
    console.log(villains);
    console.log(main_schemes);
    console.log(side_schemes);
    console.log(minions);
    console.log(allies);
}

getdata();