const path = require("path");
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

        // Apsolutni path radi samo na mašini koja je radila build (lokalno dev mode).
        // Repo-relativni path radi uvijek, jer je izveden iz cwd-a build procesa
        // (npr. na Vercelu je to repo root) — koristimo ga za GitHub API fallback
        // kad file ne postoji na disku osobe koja gleda panel (remote mode).
        const repoRelativePath = path
          .relative(process.cwd(), filename)
          .split(path.sep)
          .join("/");

        nodePath.node.attributes.push(
          t.jsxAttribute(t.jsxIdentifier("data-source-file"), t.stringLiteral(filename)),
          t.jsxAttribute(t.jsxIdentifier("data-source-line"), t.stringLiteral(String(line))),
          t.jsxAttribute(t.jsxIdentifier("data-component-name"), t.stringLiteral(componentName)),
          t.jsxAttribute(t.jsxIdentifier("data-tag-name"), t.stringLiteral(tagName)),
          t.jsxAttribute(
            t.jsxIdentifier("data-repo-relative-path"),
            t.stringLiteral(repoRelativePath)
          )
        );
      },
    },
  };
};
