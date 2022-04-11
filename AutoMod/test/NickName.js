var combining = /[\u0300-\u036F]/g;
var str = "! 𝒦𝒾𝓃𝑔 𝒜𝓇𝓉𝒽𝓊𝓇";
console.log(str)
console.log(str.normalize('NFKD').replace(combining, ''));

var unidecode = require('unidecode');
//console.log(unidecode(str));

var name = str
if (name) {
    var combining = /[\u0300-\u036F]/g;
    name2 = name.normalize('NFKD').replace(combining, '');
}
var name2 = unidecode(name2)
if (name != name2) {
    //if name2 is more then 32 characters long, it will be cut off
    if (name2.length > 32) {
        name2 = name2.slice(0, 32)
    }
    console.log(name2)
}