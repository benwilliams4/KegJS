import EntrySet from "./EntrySet.js";
import Entry from "./Entry.js";
import csvInput from "./csvInput.js";

class Collection extends EntrySet {
    constructor(data) {
        //Create entry set, designate "this" as the collection.
        super(data, null);
        this.collection = this;
    }

    createEntry() {
        var entry = {};
        entry.id = this.data.nextId;
        this.data.nextId++;
        this.data.entries.push(entry);
        entry = new Entry(entry, this);
        entry.copyPropertiesFromObject(this.data.defaultColumnValues);
        return entry;
    }

    /*Create a function that can be used to createEntries, example:
    var addUser = buildCreateFunction(["username","password"]);
    var user = addUser(["Ben","Secret"]);
    */
    buildCreateFunction(columnNames) {
        var collection = this;
        return function (data) {
            var e = collection.createEntry();
            if (columnNames.length !== data.length) {
                console.error("Invalid data for creating collection entry.");
                return false;
            }
            for (let i = 0; i < columnNames.length; i++) {
                e.set(columnNames[i], data[i]);
            }
            return e;
        }
    }

    loadCSV(csvText, columns) {
        var csv = new csvInput(csvText);
        csv.setCollection(this);
        csv.setColumnNames(columns);
        csv.toEntries();
    }

    //Converts string column to number, useful after loading CSV data
    toNumber(column) {
        var entries = this.entries();
        for (let i = 0; i < entries.length; i++) {
            var value = entries[i].get(column);
            entries[i].set(column, Number(value));
        }
    }

    //Converts string column to boolean, useful after loading CSV data
    toBoolean(column) {
        var entries = this.entries();
        var truthy = ["1", "true"];
        for (let i = 0; i < entries.length; i++) {
            var value = entries[i].get(column) ?? "";
            if (truthy.includes(value.toLowerCase())) {
                var set = true;
            } else {
                var set = false;
            }

            entries[i].set(column, set);
        }
    }

    loadJSON(input) {
        console.log(typeof input);
        switch (typeof input) {
            case 'string':
                try {
                    var p = json.parse(json);
                    this.loadJSON(input);
                } catch {
                    return false; // failed to parse json
                }
                break;

            case 'object':
                if (Array.isArray(input)) {
                    for (let i = 0; i < input.length; i++) {
                        var e = this.createEntry();
                        e.copyPropertiesFromObject(input[i]);
                    }
                } else {
                    var arr = [];
                    arr.push(input);
                    this.loadJSON(arr);
                }
                break;
        }
    }

    setDefaultColumnValue(column, value) {
        this.data.defaultColumnValues[column] = value;
    }
    getDefaultColumnValue(column) {
        return this.data.defaultColumnValues[column] ?? null;
    }

}


export default Collection;
