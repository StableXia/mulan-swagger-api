const yaml = require('js-yaml');

const convertYmlToJson = (content) => {
  try {
    return yaml.safeLoad(content);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  convertYmlToJson,
};
