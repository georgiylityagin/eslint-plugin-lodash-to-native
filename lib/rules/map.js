/**
 * @fileoverview replace lodash map function to the native one if possible
 * @author Georgiy
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description: "replace lodash map function to the native one if possible",
      category: "Fill me in",
      recommended: false
    },
    fixable: "code",  // or "code" or "whitespace"
    schema: []
  },

  create: function (context) {

    let sourceCode = context.getSourceCode();

    return {

      "MemberExpression[object.name='_'][property.name='map']": function (node) {
        const callExpression = node.parent;
        const [firstArg, secondArg] = callExpression.arguments;

        if (firstArg.type === "ArrayExpression") {
          context.report({
            node,
            message: "Use native map method",
            fix: function (fixer) {
              const replaceCode = sourceCode.getText(firstArg) + '.map(' + sourceCode.getText(secondArg) + ')';
              return fixer.replaceText(node.parent, replaceCode);
            }
          });
        } else if (firstArg.type !== "ObjectExpression" && callExpression.parent.type !== 'ConditionalExpression') {
          context.report({
            node,
            message: "Use native map method",
            fix: function (fixer) {
              const firstArgStr = sourceCode.getText(firstArg);
              const secondArgStr = sourceCode.getText(secondArg);
              const replaceCode = `Array.isArray(${firstArgStr}) ? 
    ${firstArgStr}.map(${secondArgStr}) : 
    ${sourceCode.getText(callExpression)} `;
              return fixer.replaceText(callExpression, replaceCode);
            }
          });

        }

      }

    };
  }
};
