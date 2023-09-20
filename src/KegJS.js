import Collection from "./Collection.js";

class KegJS {
    constructor() {
        this.checkDependencies();
        this.data = {};
        this.data.collections = [];


    }
    checkDependencies() {
        var dependencyNames = ["LZUTF8"];
        dependencyNames.forEach((d) => {
            if (this.dependencyAvailable(d) === false) {
                console.warn(`Dependency '${d}' could not be found.`);
            }
        });
    }
    dependencyAvailable(dependencyName) {
        return (typeof window[dependencyName] === "undefined") ? false : true;
    }


    createCollection(name) {
        if (this.collectionExists(name)) {
            return false; //Collection with this name already exists
        }
        var collection = {};
        collection.name = name;
        collection.nextId = 0;
        collection.entries = [];
        collection.defaultColumnValues = {};
        this.data.collections.push(collection);
        return new Collection(collection);

    }

    getCollection(name) {
        var cols = this.data.collections;
        for (let i = 0; i < cols.length; i++) {
            if (cols[i].name === name) {
                return new Collection(cols[i]);
            }
        }
        return false;
    }

    toJSON() {
        return JSON.stringify(this.data);
    }

    fromJSON(json) {
        var data = JSON.parse(json);
        if (typeof data.collections !== "undefined") {
            this.data = data;
            return true;
        } else {
            return false;
        }
    }

    toCompressedString() {
        try {
            return LZUTF8.compress(this.toJSON(), {
                "outputEncoding": "Base64"
            });
        } catch {
            console.error("Unable to compress string, dependency 'LZUTF8' may not be loaded.");
            return false;
        }
    }

    fromCompressedString(string) {
        try {
            var json = LZUTF8.decompress(string, {
                "inputEncoding": "Base64"
            });
            return this.fromJSON(json);
        } catch {
            console.error("Unable to decompress string, dependency 'LZUTF8' may not be loaded.");
            return false;
        }

    }

    toLocalStorage(key, compress = true) {
        //default to JSON if compression library unavailable
        compress = (this.dependencyAvailable("LZUTF8")) ? compress : false;

        var string = (compress) ? this.toCompressedString() : this.toJSON();
        localStorage.setItem(key, string);
    }

    fromLocalStorage(key, compress = true) {
        //default to JSON if compression library unavailable
        compress = (this.dependencyAvailable("LZUTF8")) ? compress : false;

        if (compress) {
            return this.fromCompressedString(localStorage.getItem(key));
        } else {
            return this.fromJSON(localStorage.getItem(key));
        }
    }

    collectionExists(name) {
        var cols = this.data.collections;
        for (let i = 0; i < cols.length; i++) {
            if (cols[i].name === name) {
                return true;
            }
        }
        return false;
    }

    removeCollection(name) {
        var cols = this.data.collections;
        for (let i = 0; i < cols.length; i++) {
            if (cols[i].name === name) {
                cols.splice(i, 1);
                return true;
            }
        }
        return false;
    }
}



export default KegJS;
