const ora = require("ora");
const { genCode } = require("../core/codeGen");
const { getTplConfig } = require("../core/parseConfig");
const APIGenConfig = require("../api-gen.config");

const spinner = ora({ color: "yellow" }).start();

async function main() {
  spinner.text = "代码生成中...";

  const tplConfigArr = getTplConfig(APIGenConfig.tpl);

  tplConfigArr.forEach((v) => {
    genCode(v.path, v.name, APIGenConfig.output);
  });

  spinner.stop();
}

main();
