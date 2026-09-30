// Hoda prema gore kroz AST dok ne nađe najbližu funkciju/komponentu koja renderira element
module.exports = function getEnclosingComponentName(nodePath, t) {
  let current = nodePath;

  while (current) {
    const isNamedFunction =
      (current.isFunctionDeclaration() ||
        current.isFunctionExpression() ||
        current.isArrowFunctionExpression()) &&
      current.node.id;

    if (isNamedFunction) {
      return current.node.id.name;
    }

    // Arrow funkcija dodijeljena varijabli: const Button = () => {...}
    if (current.isVariableDeclarator() && current.node.id && t.isIdentifier(current.node.id)) {
      return current.node.id.name;
    }

    current = current.parentPath;
  }

  return "unknown";
};
