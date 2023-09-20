import EntryColumnHandler from "./EntryColumnHandler.js";

class Entry {
    constructor(data, collection) {
        this.data = data;
        this.collection = collection;
    }
    id() {
        return this.get("id");
    }

    //Set column to value
    set(column, value) {
        this.data[column] = value;
    }

    //Get value of column
    get(column) {
        return this.data[column] ?? null;
    }

    //Get Column Handler
    column(name) {
        return new EntryColumnHandler(this, name);
    }
    //remove entry from collection
    drop() {
        var index = this.collection.data.entries.indexOf(this.data);
        this.collection.data.entries.splice(index, 1);
    }

    copyPropertiesFromObject(obj){
    for(let prop in obj){
        this.set(prop,obj[prop]);
    }
    }
}

export default Entry;
