async function main ()  {
    const ora = require('ora')
    const { getTargetJsonFromSwaggerJson,compileTpl  } = require('../helpers/codeGen');
    const { readFile, writeFile, convertYmlToJson, reslovePath } = require('../helpers/files')
    const APIGenConfig = require('../api-gen.config')

    const spinner = ora({
        color: 'yellow',
        text: '模板加载中...'
    }).start()

    const swaggerData = getTargetJsonFromSwaggerJson(convertYmlToJson(await readFile(APIGenConfig.tplPath, 'utf8')))
    const ejsTeml = await readFile(reslovePath('../template/ts.ejs'));
    const res = compileTpl(ejsTeml.toString(), swaggerData);
    
    writeFile(`${APIGenConfig.output}/index.ts`, res, () => { })
    spinner.stop()
}

module.exports = {
    main
}