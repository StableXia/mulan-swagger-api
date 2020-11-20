const { isString, isObject, isArray, isFunction } = require('../helpers/utils');
const { parsePath, scanDir, joinPath } = require('../helpers/files');

const TPL_LOCAL_MODE = 'local';
const TPL_REMOTE_MODE = 'remote';

function getUserConfig() {
  const url = joinPath(process.cwd(), 'api-gen.config');
  return require(url);
}

function getPathParse(filePath, { filename }) {
  const parseObj = parsePath(filePath);

  return {
    ...parseObj,
    name: isFunction(filename)
      ? filename(parseObj.name, parseObj.ext)
      : parseObj.name,
    path: filePath,
    sourceName: parseObj.name,
  };
}

async function getTplConfig(config) {
  const { tpl: tplOpts } = config;
  const filename = config.output.filename;

  if (!isObject(tplOpts)) {
    return [];
  }

  const { mode = TPL_LOCAL_MODE, path, dir } = tplOpts;

  // 模板路径解析优先级：path > dir
  if (mode === TPL_LOCAL_MODE) {
    if (isString(path)) {
      const parseObj = getPathParse(path, { filename });

      return [parseObj];
    }

    if (isArray(path)) {
      return path.map((v) => getPathParse(v.path, { filename }));
    }

    if (isString(dir)) {
      const fileList = await scanDir(dir);
      return fileList.map((v) => getPathParse(v.path, { filename }));
    }
  }

  if (mode === TPL_REMOTE_MODE) {
    return [];
  }

  return [];
}

module.exports = {
  getTplConfig,
  getUserConfig,
};
