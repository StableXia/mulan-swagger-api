const { promisify } = require('util')
const { resolve } = require('path')
const fs = require('fs')
const yaml = require('js-yaml')

const reslovePath = (path) => resolve(__dirname, path)

const readFile = promisify(fs.readFile)

const writeFile = promisify(fs.writeFile)

const convertYmlToJson = (content) => {
    try {
        return yaml.safeLoad(content);
    } catch(error) {
        throw error
    }
}

module.exports = {
    reslovePath,
    readFile,
    writeFile,
    convertYmlToJson
}