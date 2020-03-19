const _ = require('lodash');


const arr = [1, 2, 3];
const obj = {
  a: 1,
  b: 2,
  c: 3
};
const fn = (val) => val + 1;

const test1 = _.map(arr, fn);

const test2 = _.map(obj, fn);

const test3 = _.map([1, 2, 3], fn);

const test4 = _.map({ a: 1, b: 2 }, fn);

const test5 = _.map(arr, fn); // здесь должно сработать

_ = { map: () => [] };

const test6 = _.map(arr, fn); // здесь НЕ должно сработать