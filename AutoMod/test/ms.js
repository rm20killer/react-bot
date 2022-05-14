const ms = require('ms');

console.log(ms('1d'));
console.log(ms('1h'));
console.log(ms('1m'));
console.log(ms('1s'));
console.log(ms('1w'));
console.log(ms('1y'));
console.log(ms('1M')); 
console.log(ms('5m'));
console.log(ms("1s"));
//covert ms to days
console.log(ms('1d') / 86400000);

console.log(ms('3ews') / 1000);