(async () => {
    const ejs = require('ejs');
    const getViewForSwagger = require('./codegen');
    const { readFile, writeFile, convertYmlToJson } = require('./utils')

    // writeFile('./resolved.json', JSON.stringify(convertYmlToJson(await readFile('./resolved.yml', 'utf8')),null,"\t"), () => {})

    const swaggerData = getViewForSwagger(convertYmlToJson(await readFile('./resolved.yml', 'utf8')))

    const ejsTeml = await readFile('./src/template/ts.ejs');

    const res = ejs.render(ejsTeml.toString(), swaggerData);

    writeFile('./resolved.ts', res, () => { })


})()



