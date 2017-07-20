'use strict';
const assert = require('assert');
const addon = require(`../build/Debug/am2315.node`);
let am2315 = new addon.AM2315();
console.log(am2315.temperature());
console.log(am2315.humidity());
