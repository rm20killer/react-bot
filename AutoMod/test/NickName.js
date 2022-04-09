var combining = /[\u0300-\u036F]/g; 
var str = "! Rånades på Skyttis i Ö-vik 21312 Маяковая звезда#3076";
console.log(str)
console.log(str.normalize('NFKD').replace(combining, ''));

var unidecode = require('unidecode');
console.log(unidecode(str));