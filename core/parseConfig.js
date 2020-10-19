const { isString, pickFields } = require("../helpers/utils");
const path = require("path");

function pathParse(filePath) {
  const parseObj = path.parse(filePath);

  return {
    name: parseObj.name,
    path: filePath,
  };
}

function getTplConfig(tplOpts) {
  if (isString(tplOpts)) {
    return [pathParse(tplOpts)];
  }

  return tplOpts.map((v) => {
    const parseObj = pathParse(v.path);

    return {
      ...parseObj,
      name: v.name || parseObj.name,
    };
  });
}

module.exports = {
  getTplConfig,
};
