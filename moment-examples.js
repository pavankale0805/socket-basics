var moment = require('moment');
var now = moment();

console.log(now.format());
//now.subtract(1, 'year');
//console.log(now.format());
//console.log(now.format('MMM Do YYYY, h:mma'));
console.log(now.format('X'));
console.log(now.format('x'));
console.log(now.valueOf());

var timestamp = 1489211335159;
var timestampMoment = moment.utc(timestamp);
console.log(timestampMoment.local().format());
console.log(timestampMoment.local().format('h:mm a'));
