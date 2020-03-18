/**
 * @fileoverview replace lodash map function to the native one if possible
 * @author Georgiy
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/map"),

  RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
let errorObject = {
  message: 'This is construction _.map can be replaced by Array.map',
  type: 'MemberExpression',
};

ruleTester.run("map", rule, {

  valid: [
    {
      code: '[1, 2, 3].map(fn)'
    },
    {
      code: '_.map({a: 1, b: 2, c: 3}, fn)'
    },
    {
      code: 'Array.isArray(arr) ? arr.map(fn) : _.map(arr, fn);'
    }
  ],

  invalid: [
    {
      code: '_.map(arr, fn)',
      errors: [errorObject],
    },
    {
      code: '_.map(bar, fn)',
      errors: [errorObject]
    }
  ]
});
