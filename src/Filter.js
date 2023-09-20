import EntrySet from "./EntrySet.js";
class Filter {

    setInput(EntrySet) {
        this.input = EntrySet;
    }
    setCollection(Collection) {
        this.collection = Collection;
    }
    setColumn(name) {
        this.column = name;
    }

    createEntrySet(entries) {
        var data = {};
        data.entries = [];

        for (let i = 0; i < entries.length; i++) {
            data.entries.push(entries[i].data);
        }
        return new EntrySet(data, this.collection);
    }

    equals(value) {
        var filtered = [];
        var entries = this.input.entries();
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].get(this.column) === value) {
                filtered.push(entries[i]);
            }
        }
        return this.createEntrySet(filtered);
    }
    not(value) {
        var filtered = [];
        var entries = this.input.entries();
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].get(this.column) !== value) {
                filtered.push(entries[i]);
            }
        }
        return this.createEntrySet(filtered);
    }

    greaterThan(value) {
        var filtered = [];
        var entries = this.input.entries();
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].get(this.column) > value) {
                filtered.push(entries[i]);
            }
        }
        return this.createEntrySet(filtered);
    }
    lessThan(value) {
        var filtered = [];
        var entries = this.input.entries();
        for (let i = 0; i < entries.length; i++) {
            if (entries[i].get(this.column) < value) {
                filtered.push(entries[i]);
            }
        }
        return this.createEntrySet(filtered);
    }

    arrayIncludes(value) {
        var filtered = [];
        var entries = this.input.entries();
        for (let i = 0; i < entries.length; i++) {
            try {
                if (entries[i].get(this.column).includes(value)) {
                    filtered.push(entries[i]);
                }
            } catch {}
        }
        return this.createEntrySet(filtered);
    }
    arrayExcludes(value) {
        var filtered = [];
        var entries = this.input.entries();
        for (let i = 0; i < entries.length; i++) {
            try {
                if (!entries[i].get(this.column).includes(value)) {
                    filtered.push(entries[i]);
                }
            } catch {}
        }
        return this.createEntrySet(filtered);
    }
    inArray(array) {
        var filtered = [];
        var entries = this.input.entries();
        for (let i = 0; i < entries.length; i++) {
            if (array.includes(entries[i].get(this.column))) {
                filtered.push(entries[i]);
            }
        }
        return this.createEntrySet(filtered);
    }
    notInArray(array) {
        var filtered = [];
        var entries = this.input.entries();
        for (let i = 0; i < entries.length; i++) {
            if (array.includes(entries[i].get(this.column)) === false) {
                filtered.push(entries[i]);
            }
        }
        return this.createEntrySet(filtered);
    }

    includesText(text) {
        var filtered = [];
        var entries = this.input.entries();
        for (let i = 0; i < entries.length; i++) {
            try {
                if (entries[i].get(this.column).indexOf(text) !== -1) {
                    filtered.push(entries[i]);
                }
            } catch {}
        }
        return this.createEntrySet(filtered);
    }

    excludesText(text) {
        var filtered = [];
        var entries = this.input.entries();
        for (let i = 0; i < entries.length; i++) {
            try {
                if (entries[i].get(this.column).indexOf(text) === -1) {
                    filtered.push(entries[i]);

                }
            } catch {}
        }
        return this.createEntrySet(filtered);
    }


}

export default Filter;
