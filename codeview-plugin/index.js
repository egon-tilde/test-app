const isNativeElement = require("./lib/isNativeElement");
const getEnclosingComponentName = require("./lib/getEnclosingComponentName");

module.exports = function codeviewBabelPlugin({ types: t }) {
  return {
    name: "codeview-source-tagger",
    visitor: {
      JSXOpeningElement(nodePath, state) {
        if (!nodePath.node.loc) return;

        const nameNode = nodePath.node.name;
        if (!t.isJSXIdentifier(nameNode)) return;

        const tagName = nameNode.name;

        // Tagiramo samo native elemente — custom komponente svoje propove ne prosljeđuju pouzdano
        if (!isNativeElement(tagName)) return;

        const alreadyTagged = nodePath.node.attributes.some(
          (attr) =>
            t.isJSXAttribute(attr) &&
            t.isJSXIdentifier(attr.name) &&
            attr.name.name === "data-source-file"
        );
        if (alreadyTagged) return;

        const filename = state.file.opts.filename || "unknown";
        const line = nodePath.node.loc.start.line;
        const componentName = getEnclosingComponentName(nodePath, t);

        nodePath.node.attributes.push(
          t.jsxAttribute(t.jsxIdentifier("data-source-file"), t.stringLiteral(filename)),
          t.jsxAttribute(t.jsxIdentifier("data-source-line"), t.stringLiteral(String(line))),
          t.jsxAttribute(t.jsxIdentifier("data-component-name"), t.stringLiteral(componentName)),
          t.jsxAttribute(t.jsxIdentifier("data-tag-name"), t.stringLiteral(tagName))
        );
      },
    },
  };
};
