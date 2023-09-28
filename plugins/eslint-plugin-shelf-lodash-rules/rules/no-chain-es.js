module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Forbid the usage of lodash-es chain method',
      category: 'Best Practices',
      recommended: true,
    },
  },
  create: function (context) {
    return {
      ImportDeclaration: function (node) {
        const {
          specifiers,
          source: {value: sourceValue},
        } = node;
        let nodeToReport;

        if (sourceValue === 'lodash-es') {
          const chainSpecifier = specifiers.find(
            (specifier) => specifier.imported && specifier.imported.name === 'chain',
          );

          if (chainSpecifier) {
            nodeToReport = chainSpecifier;
          }
        } else if (sourceValue === 'lodash-es/chain') {
          nodeToReport = specifiers[0];
        }

        if (nodeToReport) {
          context.report({
            node: nodeToReport,
            message: 'Avoid importing lodash-es chain method',
          });
        }
      },
    };
  },
};
