const ejs = require('ejs');
const { generateTsType } = require('./tsType');
const { API_METHODS } = require('../helpers/constants');
const { convertYmlToJson } = require('./convertYmlToJson');
const {
  readFile,
  writeFile,
  reslovePath,
  isExistsPath,
  createDir,
  scanDir,
  parsePath,
} = require('../helpers/files');
const { forEach, safeReaper } = require('../helpers/utils');
const { askCheckbox, askOverride } = require('./inquire');

const isPathParameter = (v) => v === 'path';

function normalizeName(id) {
  return id.replace(/\.|\-|\{|\}|\s/g, '_');
}

function normalizeTypeName(id) {
  return id.replace(/«|»/g, '');
}

function getTargetJsonFromSwaggerJson(swaggerJson) {
  const data = {
    title: swaggerJson.info.title,
    description: swaggerJson.info.description,
    version: swaggerJson.info.version,
    methods: [],
    components: [],
  };

  forEach(swaggerJson.components.schemas, function (component, name) {
    const componentName = normalizeTypeName(name);
    const temp = {
      name: componentName,
      description: component.description,
      tsType: generateTsType(component),
    };
    data.components.push(temp);
  });

  forEach(swaggerJson.paths, (pathOpts, path) => {
    forEach(pathOpts, (pathOptsVal, pathOptionsKey) => {
      const pathOptionsKeyUpper = pathOptionsKey.toUpperCase();
      // 过滤无效的方法
      if (
        pathOptionsKeyUpper === '' ||
        !API_METHODS.includes(pathOptionsKeyUpper)
      ) {
        return;
      }

      const methodName = normalizeName(pathOptsVal.operationId);

      const method = {
        path,
        methodName,
        method: pathOptionsKeyUpper,
        parameters: null,
        requestBody: null,
        response: null,
        description: pathOptsVal.description,
      };

      const response = pathOptsVal.responses;

      // TODO: 获取 response
      const responseSchema =
        safeReaper(response, `['200'].content['*/*'].schema`) ||
        safeReaper(response, `['200'].content['application/json'].schema`);
      if (responseSchema) {
        method.response = generateTsType(responseSchema);
      }

      if (pathOptsVal.parameters) {
        method.parameters = [];
        forEach(pathOptsVal.parameters, (parameter) => {
          if (isPathParameter(parameter.in)) {
            parameter.isPathParameter = true;
          }

          parameter = { ...parameter, ...generateTsType(parameter) };
          parameter.isRequired = parameter.required;
          method.parameters.push(parameter);
        });
      }

      if (pathOptsVal.requestBody) {
        const res = pathOptsVal.requestBody.content['application/json'];
        method.requestBody = generateTsType(
          res && res.schema ? res.schema : res || {},
        );
      }

      data.methods.push(method);
    });
  });

  return data;
}

function compileTpl(tplString, swaggerData) {
  return ejs.render(tplString, swaggerData);
}

async function getSwaggerData(tplPath) {
  const yml = await readFile(tplPath, 'utf8');
  return getTargetJsonFromSwaggerJson(convertYmlToJson(yml));
}

async function genTsCode({ swaggerData, name, output }) {
  const ejsTeml = await readFile(reslovePath('../template/api.ts.ejs'));

  const isExist = await isExistsPath(`${output}/${name}.ts`);

  if (isExist) {
    const isOverride = await askOverride({
      message: `api文件 ${name}.ts 已经存在，是否覆盖？`,
    });

    if (isOverride) {
      const res = compileTpl(ejsTeml.toString(), swaggerData);
      await writeFile(`${output}/${name}.ts`, res);
    }
  } else {
    const res = compileTpl(ejsTeml.toString(), swaggerData);
    await writeFile(`${output}/${name}.ts`, res);
  }
}

async function genMockCode({ swaggerData, output, sourceName }) {
  const dir = `${output}/${sourceName}-gen`;
  const isExistDir = await isExistsPath(dir);
  if (!isExistDir) {
    await createDir(dir);
  }

  const apiEjsTeml = await readFile(
    reslovePath('../template/mock/api.mock.ejs'),
  );
  const indexEjsTeml = await readFile(
    reslovePath('../template/mock/index.mock.ejs'),
  );
  const methods = swaggerData.methods || [];
  const existFileMap = {};
  for (let i = 0; i < methods.length; i++) {
    const method = methods[i];
    const isExistFile = await isExistsPath(`${dir}/${method.methodName}.js`);

    if (isExistFile) {
      existFileMap[method.methodName] = method;
    } else {
      const res = compileTpl(apiEjsTeml.toString(), { method });
      await writeFile(`${dir}/${method.methodName}.js`, res);
    }
  }

  const existFileList = Object.keys(existFileMap);
  let overrideFileList = [];
  if (existFileList.length > 0) {
    const res = await askCheckbox({
      message: '以下 mock 文件已经存在，请选择需要覆盖的文件',
      choices: existFileList.map((v) => ({ name: v })),
    });

    overrideFileList = res.includes('全选') ? existFileList : res;
  }
  for (let i = 0; i < overrideFileList.length; i++) {
    if (existFileMap[overrideFileList[i]]) {
      const res = compileTpl(apiEjsTeml.toString(), {
        method: existFileMap[overrideFileList[i]],
      });
      await writeFile(
        `${dir}/${existFileMap[overrideFileList[i]].methodName}.js`,
        res,
      );
    }
  }

  const fileList = await scanDir(dir);
  const filenameList = fileList
    .map((v) => parsePath(v.path).name)
    .filter((v) => v !== 'index');
  const res = compileTpl(indexEjsTeml.toString(), { filenameList });
  await writeFile(`${dir}/index.js`, res);
}

module.exports = {
  getTargetJsonFromSwaggerJson,
  compileTpl,
  genTsCode,
  genMockCode,
  getSwaggerData,
};
