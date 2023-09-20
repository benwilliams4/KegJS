class EntrySetColumnHandler {
    constructor(EntrySet, column) {
        this.entrySet = EntrySet;
        this.column = column;
    }
    // Set column to value for all entries in set
    set(value) {
        this.entrySet.set(this.column, value);
    }
    // Add 'number' to column for all entries in set
    adjust(number) {
        var entries = this.entrySet.entries();
        for (let i = 0; i < entries.length; i++) {
            entries[i].column(this.column).adjust(number);

        }
    }
    // Multiply column by 'number' for all entries in set
    scale(number) {
        var entries = this.entrySet.entries();
        for (let i = 0; i < entries.length; i++) {
            entries[i].column(this.column).scale(number);

        }
    }
    //Returns an array of unique values in 'Column'
    uniqueValues() {
        var values = [];
        var entries = this.entrySet.entries();
        for (let i = 0; i < entries.length; i++) {
            var v = entries[i].get(this.column);
            if (!values.includes(v)) {
                values.push(v);
            }
        }
        return values;
    }
    //Returns object of {Value=>no Occurences} in 'Column'
    valueCounts() {
        var values = {};
        var entries = this.entrySet.entries();
        for (let i = 0; i < entries.length; i++) {
            var v = entries[i].get(this.column);
            if (typeof values[v] === 'undefined') {
                values[v] = 1;
            } else {
                values[v]++;
            }
        }
        return values;
    }

    // Sum of column in set
    sum() {
        var entries = this.entrySet.entries();
        var sum = 0;
        for (let i = 0; i < entries.length; i++) {
            var val = entries[i].get(this.column);
            if (!isNaN(val)) {
                sum += val;
            }
        }
        return sum;
    }

    // Mean of column in set
    mean() {
        var entries = this.entrySet.entries();
        var sum = 0;
        var count = 0;
        for (let i = 0; i < entries.length; i++) {
            var val = entries[i].get(this.column);
            if (!isNaN(val)) {
                sum += val;
                count++;
            }
        }
        return sum / count;
    }

    //Minimum of column in set
    min() {
        var entries = this.entrySet.entries();
        var min = null;
        for (let i = 0; i < entries.length; i++) {
            var val = entries[i].get(this.column);
            if (!isNaN(val) && (min === null || val < min)) {
                min = val;
            }
        }
        return min;
    }

    // Maximum of column in set
    max() {
        var entries = this.entrySet.entries();
        var max = null;
        for (let i = 0; i < entries.length; i++) {
            var val = entries[i].get(this.column);
            if (!isNaN(val) && (max === null || val > max)) {
                max = val;
            }
        }
        return max;
    }
    // Create an array of column values
    toArray() {
        var entries = this.entrySet.entries();
        var array = [];
        for (let i = 0; i < entries.length; i++) {
            array.push(entries[i].get(this.column));
        }
        return array;
    }

}
export default EntrySetColumnHandler;
