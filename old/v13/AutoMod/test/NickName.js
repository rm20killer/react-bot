var combining = /[\u0300-\u036F]/gu;
var str = "🅴🆄🆉🅸";
console.log(str);
console.log(str.normalize("NFKD").replace(combining, ""));

var unidecode = require("unidecode");
//console.log(unidecode(str));

var name = str;
if (name) {
  var combining = /[\u0300-\u036F]/gu;
  name2 = name.normalize("NFKD").replace(combining, "");
}
var name2 = unidecode(name2);
if (name2 == "") {
  name2 = "Change your name";
}
if (name != name2) {
  //console.log(name2)
  //if name2 is more then 32 characters long, it will be cut off
  if (name2.length > 32) {
    name2 = name2.slice(0, 32);
  }
  console.log(name2);
}
