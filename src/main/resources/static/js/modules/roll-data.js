class RollData {

    constructor(values, total, numberOfDice) {
        this.values = values;
        this.total = total;
        this.numberOfDice = numberOfDice;
    }

    static makeRollData(values) {
        let sum = 0;
        for (let value of values) {
            sum += value;
        }
        return new RollData(values, sum, values.length);
    }
}

export {RollData}
