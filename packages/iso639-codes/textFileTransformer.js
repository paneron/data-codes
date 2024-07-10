
export default {
  process(sourceText, sourcePath, options) {
    const stringifiedText = JSON.stringify(sourceText);
    return {
      code: `const text = ${stringifiedText};` + `export default text;`,
    };
  },
};
