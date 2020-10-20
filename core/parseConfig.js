const { isString, isObject } = require("../helpers/utils");
const { parsePath, scanDir } = require("../helpers/files");

function getPathParse(filePath) {
  const parseObj = parsePath(filePath);

  return {
    ...parseObj,
    name: parseObj.name,
    path: filePath,
  };
}

async function getTplConfig(tplOpts) {
  if (isString(tplOpts)) {
    return [getPathParse(tplOpts)];
  }

  if (isObject(tplOpts)) {
    const fileList = await scanDir(tplOpts.dir);

    return fileList.map((v) => {
      const parseObj = getPathParse(v.path);

      return {
        ...parseObj,
        name: tplOpts.setFileName
          ? tplOpts.setFileName(parseObj.name, parseObj.ext) || parseObj.name
          : parseObj.name,
      };
    });
  }

  return tplOpts.map((v) => {
    const parseObj = getPathParse(v.path);

    return {
      ...parseObj,
      name: v.name || parseObj.name,
    };
  });
}

module.exports = {
  getTplConfig,
};
