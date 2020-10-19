const ora = require("ora");
const { getTargetJsonFromSwaggerJson, compileTpl } = require("../core/codeGen");
const { convertYmlToJson } = require("../core/convertYmlToJson");
const { readFile, writeFile, reslovePath } = require("../helpers/files");
const APIGenConfig = require("../api-gen.config");

const spinner = ora({ color: "yellow" }).start();

async function main() {
  spinner.text = "代码生成中...";

  const swaggerData = getTargetJsonFromSwaggerJson(
    convertYmlToJson(await readFile(APIGenConfig.tpl, "utf8"))
  );
  const ejsTeml = await readFile(reslovePath("../template/ts.ejs"));
  const res = compileTpl(ejsTeml.toString(), swaggerData);

  writeFile(`${APIGenConfig.output}/index.ts`, res, () => {});
  spinner.stop();
}

module.exports = {
  main,
};
