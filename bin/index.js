const { genTsCode, genMockCode, getSwaggerData } = require('../core/codeGen');
const { getTplConfig, getUserConfig } = require('../core/parseConfig');

const APIGenConfig = getUserConfig();
const YML = ['.yml', '.yaml'];

// TODO: 配置合法校验
async function main() {
  const tplConfigArr = await getTplConfig(APIGenConfig);

  for (let i = 0; i < tplConfigArr.length; i++) {
    if (YML.includes(tplConfigArr[i].ext)) {
      // 获取格式化后的 openapi 文档
      const swaggerData = await getSwaggerData(tplConfigArr[i].path);

      /******************** api 文件生成 *********************************************/
      await genTsCode({
        swaggerData,
        name: tplConfigArr[i].name,
        output: APIGenConfig.output.path,
      });

      /******************** mock 文件生成 *********************************************/
      if (APIGenConfig.mock.open) {
        await genMockCode({
          swaggerData,
          name: tplConfigArr[i].name,
          output: APIGenConfig.mock.path,
          sourceName: tplConfigArr[i].sourceName,
        });
      }
    }
  }
}

main();
