import Entry from "./Entry.js";
import Filter from "./Filter.js";
import EntrySetColumnHandler from "./EntrySetColumnHandler.js";

class EntrySet {
    constructor(data, collection) {
        this.data = data;
        this.collection = collection; //Root collection object for entries
    }

    createEntryObject(entryData) {
        return new Entry(entryData, this.collection);
    }

    //Get all Entries in set
    entries() {
        var entries = this.data.entries;
        var arr = [];
        for (let i = 0; i < entries.length; i++) {
            arr.push(this.createEntryObject(entries[i]));
        }
        return arr;
    }

    // Set column to value for all entries in set
    set(column,value) {
        var entries = this.entries();
        for (let i = 0; i < entries.length; i++) {
            entries[i].set(column, value);

        }
    }

    //Inverts selection from collection
    invert(){
    var entryIds = this.column("id").toArray();
        console.log(entryIds);
    return this.collection.filter("id").notInArray(entryIds);
    }

    //perform function on each entry object (param1 = instance of Entry)
    forEach(func) {
        var entries = this.entries();
        entries.forEach(func);
    }

    //Create Column Handler
    column(name) {
        return new EntrySetColumnHandler(this, name);
    }


    // Get nth entry in set
    index(i) {
        var entries = this.data.entries;
        var entry = entries[i];
        return this.createEntryObject(entry);
    }
    // Retrieve entry by id field
    id(id) {
        var entries = this.entries();
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].get("id") === id) {
                return entries[i];
            }
        }
        return false;
    }
    // number of entries in set
    length() {
        return this.data.entries.length;
    }

    //first entry in set
    first() {
        var entries = this.data.entries;
        var entry = entries[0];
        return this.createEntryObject(entry);
    }

    //last entry in set
    last() {
        var entries = this.data.entries;
        var lastIndex = this.length() - 1;
        var entry = entries[lastIndex];
        return this.createEntryObject(entry);
    }


    //Returns Filter Object
    filter(column) {
        var filter = new Filter();
        filter.setInput(this);
        filter.setCollection(this.collection);
        filter.setColumn(column);
        return filter;
    }

    // Drop all entries in set from the collection
    drop() {
        var entries = this.entries();
        for (let i = 0; i < entries.length; i++) {
            entries[i].drop();
        }
    }

    // Sort set by Column ASC
    sortAsc(column) {
        this.data.entries.sort((a, b) => {
            return (a[column] > b[column]) ? 1 : -1;
        });
        return this;
    }

    // Sort set by Column DESC
    sortDesc(column) {
        this.data.entries.sort((a, b) => {
            return (a[column] < b[column]) ? 1 : -1;
        });
        return this;
    }

}

export default EntrySet;
