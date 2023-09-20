class csvInput {
    constructor(csvText) {
        this.csv = csvText;
        this.collection = null;
        this.separator = ",";
        this.columnNames = [];
    }
    setCollection(col) {
        this.collection = col;
        return this;
    }
    setColumnNames(arr) {
        this.columnNames = arr;
        return this;
    }
    setSeparator(s) {
        this.separator = s;
        return this;
    }
    //count how many csv rows there are
    rowCount() {
        var lines = this.csv.split("\n");
        return lines.length;
    }
    //check each row has equal number of separators and matches no. of columns
    validateCSV() {
        var itemCounts = [];
        var lines = this.csv.split("\n");
        for (let i = 0; i < lines.length; i++) {
            var line = lines[i];
            var items = line.split(this.separator);
            if (!itemCounts.includes(items.length)) {
                itemCounts.push(items.length);
            }
        }
        if (itemCounts.length !== 1) {
            return false;
        } else if (itemCounts[0] !== this.columnNames.length) {
            return false;
        } else {
            return true;
        }

    }

    getRowAsArray(row) {
        var lines = this.csv.split("\n");
        var row = lines[row];
        return row.split(this.separator);
    }

    toEntries() {
        if (!this.validateCSV()) {
            console.error("CSV not formatted correctly.");
            return false; // invalid input
        }
        var collection = this.collection;

        //Loop through rows
        for (let i = 0; i < this.rowCount(); i++) {
            var entry = collection.createEntry();
            var items = this.getRowAsArray(i);
            //Loop through columns
            for (let k = 0; k < this.columnNames.length; k++) {
                entry.set(this.columnNames[k], items[k]);
            }
        }
    }

}
export default csvInput;
