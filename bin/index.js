(async () => {
    const { getTargetJsonFromSwaggerJson,compileTpl  } = require('../helpers/codeGen');
    const { readFile, writeFile, convertYmlToJson, reslovePath } = require('../helpers/files')
    const APIGenConfig = require('../api-gen.config')


    console.log(APIGenConfig)

    const swaggerData = getTargetJsonFromSwaggerJson(convertYmlToJson(await readFile(APIGenConfig.tplPath, 'utf8')))

    const ejsTeml = await readFile(reslovePath('../template/ts.ejs'));

    const res = compileTpl(ejsTeml.toString(), swaggerData);

    writeFile(`${APIGenConfig.output}/index.ts`, res, () => { })
})()