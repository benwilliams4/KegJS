class EntryColumnHandler {
    constructor(entry, column) {
        this.entry = entry;
        this.column = column;
    }
    value() {
        return this.entry.get(this.column);
    }
    set(value) {
        this.entry.set(this.column, value);
    }
    equals(value) {
        var actual = this.entry.get(this.column);
        return (actual === value);
    }
    lessThan(value) {
        var actual = this.entry.get(this.column);
        return (actual < value);
    }
    greaterThan(value) {
        var actual = this.entry.get(this.column);
        return (actual > value);
    }

    //equivalent to: column = column + number
    adjust(number) {
        var current = this.entry.get(this.column);
        if (isNaN(current)) {
            return false;
        }

        this.entry.set(this.column, current + number);
    }

    //equivalent to: column = column * number
    scale(number) {
        var current = this.entry.get(this.column);
        if (isNaN(current)) {
            return false;
        }
        this.entry.set(this.column, current * number);
    }

    // If column is array then push value
    addItem(value) {
        var current = this.entry.get(this.column);
        if (Array.isArray(current)) {
            current.push(value);
            this.entry.set(this.column, current);
            return this;
        }
        return false;
    }

    //If column is array then remove value
    removeItem(value) {
        var current = this.entry.get(this.column);
        if (Array.isArray(current)) {
            while (current.indexOf(value) !== -1) {
                var index = current.indexOf(value);
                current.splice(index, 1);
            }
            this.entry.set(this.column, current);
            return this;
        }
        return false;
    }
}
export default EntryColumnHandler;
