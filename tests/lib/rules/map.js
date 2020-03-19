/**
 * @fileoverview replace lodash map function to the native one if possible
 * @author Georgiy
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/map.js"),

  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

const error = {
  message: "Use native array map method",
  type: "MemberExpression",
};

ruleTester.run('lodash-to-native', rule, {

  valid: [
    {
      code: '[1, 2, 3].map(fn)'
    },
    {
      code: 'arr.map(fn)'
    },
    {
      code: '_.map({a: 1, b: 2, c: 3}, fn)'
    }
  ],

  invalid: [
    {
      code: `
        var _ = require('lodash');
        var arr = [1,2,3,4,5];
        var t1 = _.map(arr, fn)

      `,
      errors: [error]
    },
    {
      code: `
        var t1 = _.map([1, 2, 3], fn)

      `,
      errors: [error]
    },
    {
      code: `
        var obj = {a: 1, b: 2};
        var t1 = _.map(obj, fn)

      `,
      errors: [error]
    },
  ]
});
