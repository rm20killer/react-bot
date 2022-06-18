const unidecode = require("unidecode");

module.exports = {
    async covertText(text) {
        try {
            var name = text;
            if (name) {
                try {
                    var combining = /[\u0300-\u036F]/gu;
                    name2 = name.normalize("NFKD").replace(combining, "");
                } catch {
                    name2 = "Change your name";
                }
            }
            var name2 = unidecode(name2);
            if (name2 == "") {
                name2 = "Change your name";
            }
            if (name != name2) {
                //if name2 is more then 32 characters long, it will be cut off
                if (name2.length > 32) {
                    name2 = name2.slice(0, 32);
                }
            }
            return name2;
        } catch {
            console.log("Error in uniecode function");
        }
    }
};