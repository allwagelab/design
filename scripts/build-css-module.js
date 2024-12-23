import * as theme from "../dist/index.js";
import fs from "fs";

const toCssCasting = (str) => {
  // First handle the special case for class names like t5_rg
  if (str.match(/^[a-z]\d+_[a-z]{2}$/)) {
    return str; // Keep the original format for these patterns
  }

  // For other cases, maintain the original hyphenation logic
  return str
    .replace(/([a-z])(\d)/, "$1-$2")
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase();
};

const generateThemeCss = () => {
  const cssClasses = [];
  const cssVariables = [];

  const processColorVariables = (colorObj) => {
    Object.entries(colorObj).forEach(([colorKey, colorValue]) => {
      Object.entries(colorValue).forEach(([shade, hexValue]) => {
        cssVariables.push(
          `--${toCssCasting(colorKey)}-${toCssCasting(shade)}: ${hexValue};`
        );
      });
    });
  };

  Object.entries(theme.vars).forEach(([key, value]) => {
    if (key === "colors") {
      processColorVariables(value.seed);
    } else {
      Object.entries(value).forEach(([mainKey, mainValue]) => {
        Object.entries(mainValue).forEach(([subKey, subValue]) => {
          cssVariables.push(
            `--${toCssCasting(mainKey)}-${toCssCasting(subKey)}: ${subValue};`
          );
        });
      });
    }
  });

  Object.entries(theme.classes).forEach(([, value]) => {
    const classes = Object.entries(value)
      .map(([mainKey, mainValue]) =>
        Object.entries(mainValue)
          .map(([subKey, subValue]) => {
            // Create class name without extra hyphens for the specific pattern
            const className = `.${toCssCasting(mainKey)}-${subKey}`;

            const styleProperties = Object.entries(subValue)
              .map(
                ([styleKey, styleValue]) =>
                  `  ${toCssCasting(styleKey)}: ${styleValue};`
              )
              .join("\n");

            return `${className} {\n${styleProperties}\n}`;
          })
          .join("\n")
      )
      .join("\n");

    cssClasses.push(classes);
  });

  const rootContent = `:root {\n${cssVariables.join("\n")}\n}`;
  const classesContent = cssClasses.join("\n\n");
  const cssContent = `${rootContent}\n\n${classesContent}`;

  fs.writeFileSync("dist/themes.css", cssContent);
};

generateThemeCss();
