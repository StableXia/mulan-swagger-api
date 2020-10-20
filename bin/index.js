const ora = require("ora");
const inquirer = require("inquirer");
const { genCode } = require("../core/codeGen");
const { getTplConfig } = require("../core/parseConfig");
const APIGenConfig = require("../api-gen.config");
const { isExistsPath } = require("../helpers/files");

const spinner = ora({ color: "yellow", text: "代码生成中..." });
const YML = ".yml";

async function main() {
  const tplConfigArr = await getTplConfig(APIGenConfig.tpl);

  for (let i = 0; i < tplConfigArr.length; i++) {
    if (tplConfigArr[i].ext === YML) {
      const isExist = await isExistsPath(
        `${APIGenConfig.output}/${tplConfigArr[i].name}.ts`
      );

      if (isExist) {
        const { override } = await inquirer.prompt({
          type: "confirm",
          name: "override",
          message: `${tplConfigArr[i].name}.ts 文件已经存在，是否覆盖？`,
        });

        if (override) {
          genCode(
            tplConfigArr[i].path,
            tplConfigArr[i].name,
            APIGenConfig.output
          );
        }
      } else {
        genCode(
          tplConfigArr[i].path,
          tplConfigArr[i].name,
          APIGenConfig.output
        );
      }
    }
  }
}

main();
