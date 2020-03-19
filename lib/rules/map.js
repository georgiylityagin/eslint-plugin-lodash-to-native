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
    docs: {
      description: "replace lodash map function to the native one if possible",
      category: "Fill me in",
      recommended: false
    },
    fixable: "code",
    schema: []
  },

  create: function (context) {

    let isUnderscoreRedefined = false;

    return {

      "AssignmentExpression:matches([left.name='_'], [left.object.name=/window|global/])": function (node) {
        if (isUnderscoreRedefined) return;
        else isUnderscoreRedefined = true;
      },

      "VariableDeclaration[declarations.0.id.name='_']": function (node) {
        if (isUnderscoreRedefined) return;

        if (node.declarations[0].init.type !== "CallExpression") {
          isUnderscoreRedefined = true;
        }
      },

      "MemberExpression[object.name='_'][property.name='map']": function (node) {
        if (isUnderscoreRedefined) return;

        const sourceCode = context.getSourceCode();
        const callExpression = node.parent;
        const [firstArg, secondArg] = callExpression.arguments;
        const firstArgStr = sourceCode.getText(firstArg);
        const secondArgStr = sourceCode.getText(secondArg);

        if (firstArg.type === "ObjectExpression") return;

        if (callExpression.parent.type === 'ConditionalExpression') return;

        if (firstArg.type === "ArrayExpression") {
          context.report({
            node,
            message: "Use native map method instead lodash",
            fix: function (fixer) {
              const replaceCode = `${firstArgStr}.map(${secondArgStr})`;

              return fixer.replaceText(node.parent, replaceCode);
            }
          });
        } else {
          context.report({
            node,
            message: "Use native map method instead lodash",
            fix: function (fixer) {
              const replaceCode = `Array.isArray(${firstArgStr}) ? 
                ${firstArgStr}.map(${secondArgStr}) : 
                ${sourceCode.getText(callExpression)}`;

              return fixer.replaceText(callExpression, replaceCode);
            }
          });
        }
      }
    };
  }
};
