import {RollData} from "./roll-data.js";

const key = "dice-values"
function save(rollData){
    localStorage[key] = JSON.stringify(rollData.values);
}

function load(){
    let values = JSON.parse(localStorage[key]);
    return RollData.makeRollData(values);
}

function isSaved(){
    return localStorage.getItem(key) != null;
}
export {save, load, isSaved}
