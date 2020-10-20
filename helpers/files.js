const { promisify } = require("util");
const { resolve, parse, join } = require("path");
const fs = require("fs");

const parsePath = (filePath) => parse(filePath);

const reslovePath = (path) => resolve(__dirname, path);

const joinPath = (...paths) => join(...paths);

const readFile = promisify(fs.readFile);

const writeFile = promisify(fs.writeFile);

const fsMkdir = promisify(fs.mkdir);

const fsStat = promisify(fs.stat);

const readdir = promisify(fs.readdir);

function createDir(dirPath) {
  return fsMkdir(dirPath).then(
    () => true,
    () => false
  );
}

function getFileStat(filePath) {
  return fsStat(filePath)
    .then((res) => res)
    .catch((err) => err);
}

async function scanDir(dirPath, deep) {
  const temp = [];

  async function loopDir(dir) {
    const files = await readdir(dir);
    const promiseList = [];

    for (let i = 0; i < files.length; i++) {
      const filePath = joinPath(dir, files[i]);

      promiseList.push(
        (async () => {
          const fileStat = await getFileStat(filePath);

          if (fileStat.isFile()) {
            temp.push({
              dir: dir,
              path: filePath,
            });
          } else if (fileStat.isDirectory() && deep) {
            await loopDir(filePath);
          }
        })()
      );

      await Promise.all(promiseList);
    }
  }

  await loopDir(dirPath);

  return temp;
}

module.exports = {
  parsePath,
  reslovePath,
  readFile,
  writeFile,
  createDir,
  getFileStat,
  scanDir,
};
