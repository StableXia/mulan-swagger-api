/* eslint-disable */

const { isString, isObject, isArray, isFunction } = require('../helpers/utils');
const { parsePath, scanDir, joinPath } = require('../helpers/files');

const TPL_LOCAL_MODE = 'local';
const TPL_REMOTE_MODE = 'remote';

function getUserConfig() {
  const url = joinPath(process.cwd(), 'api-gen.config');
  return require(url);
}

function getPathParse(filePath) {
  const parseObj = parsePath(filePath);

  return {
    ...parseObj,
    name: parseObj.name,
    path: filePath,
  };
}

function normalizeTplLocalPath(tplPath, tplOpts) {
  const { name } = tplOpts;

  if (isString(tplPath)) {
    const parseObj = getPathParse(tplPath);

    return [
      {
        ...parseObj,
        name: name
          ? isFunction(name)
            ? name(parseObj.name, parseObj.ext)
            : name
          : parseObj.name,
      },
    ];
  }

  if (isArray(tplPath)) {
    return tplPath.map((v) => {
      const parseObj = getPathParse(v.path);

      return {
        ...parseObj,
        name: v.name
          ? isFunction(v.name)
            ? v.name(parseObj.name, parseObj.ext)
            : v.name
          : name
          ? isFunction(name)
            ? name(parseObj.name, parseObj.ext)
            : name
          : parseObj.name,
      };
    });
  }

  return [];
}

async function getTplConfig(tplOpts) {
  if (!isObject(tplOpts)) {
    return [];
  }

  const { mode = TPL_LOCAL_MODE, name, path, dir } = tplOpts;

  // 模板路径解析优先级：path > dir
  if (mode === TPL_LOCAL_MODE) {
    if (path) {
      return normalizeTplLocalPath(path, tplOpts);
    }

    if (dir) {
      const fileList = await scanDir(dir);

      return fileList.map((v) => {
        const parseObj = getPathParse(v.path);

        return {
          ...parseObj,
          name: isFunction(name)
            ? name(parseObj.name, parseObj.ext)
            : parseObj.name,
        };
      });
    }
  }

  return [];
}

module.exports = {
  getTplConfig,
  getUserConfig,
};
