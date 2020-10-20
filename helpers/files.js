const { promisify } = require("util");
const { resolve } = require("path");
const fs = require("fs");

const reslovePath = (path) => resolve(__dirname, path);

const readFile = promisify(fs.readFile);

const writeFile = promisify(fs.writeFile);

module.exports = {
  reslovePath,
  readFile,
  writeFile,
};
