const { promisify } = require('util')
const { reslove } = require('path')
const fs = require('fs')
const yaml = require('js-yaml')

const reslovePath = (path) => reslove(__dirname, path)

const readFile = promisify(fs.readFile)

const writeFile = promisify(fs.writeFile)

const convertYmlToJson = (content) => {
    try {
        return yaml.safeLoad(content);
    } catch(error) {
        throw error
    }
}

const isString = v => Object.prototype.toString.call(v)  === '[object String]'

const isObject = v => Object.prototype.toString.call(v)  === '[object Object]'

const generateTsType = (swaggerType, swagger) => {
  var typespec = {
    description: swaggerType.description,
    isEnum: false
  };

  if (swaggerType.hasOwnProperty("schema")) {
    return generateTsType(swaggerType.schema);
  }

  if (isString(swaggerType.$ref)) {
    typespec.tsType = "ref";
    typespec.target = swaggerType.$ref.substring(
      swaggerType.$ref.lastIndexOf("/") + 1
    );
  } else if (swaggerType.hasOwnProperty("enum")) {
    typespec.tsType = swaggerType.enum
      .map(function(str) {
        return JSON.stringify(str);
      })
      .join(" | ");
    typespec.isAtomic = true;
    typespec.isEnum = true;
  } else if (swaggerType.type === "string") {
    typespec.tsType = "string";
  } else if (swaggerType.type === "number" || swaggerType.type === "integer") {
    typespec.tsType = "number";
  } else if (swaggerType.type === "boolean") {
    typespec.tsType = "boolean";
  } else if (swaggerType.type === "array") {
    typespec.tsType = "array";
    typespec.elementType = generateTsType(swaggerType.items);
  }
  else if (swaggerType.type === "object") {
    typespec.tsType = "object";
    typespec.properties = [];
    if (swaggerType.allOf) {
      swaggerType.allOf.forEach(function(ref) {
        if (ref.$ref) {
          var refSegments = ref.$ref.split("/");
          var name = refSegments[refSegments.length - 1];
          swagger.definitions.forEach(function(definition, definitionName) {
            if (definitionName === name) {
              var property = generateTsType(definition, swagger);
              Array.prototype.push.apply(
                typespec.properties,
                property.properties
              );
            }
          });
        } else {
          var property = generateTsType(ref);
          Array.prototype.push.apply(typespec.properties, property.properties);
        }
      });
    }

    swaggerType.properties.forEach( function(propertyType, propertyName) {
      var property = generateTsType(propertyType);
      property.name = propertyName;

      property.optional = true;
      if (
        swaggerType.required &&
        swaggerType.required.indexOf(propertyName) !== -1
      ) {
        property.optional = false;
      }

      typespec.properties.push(property);
    });
  } else {
    typespec.tsType = "any";
  }

  typespec.isRef = typespec.tsType === "ref";
  typespec.isObject = typespec.tsType === "object";
  typespec.isArray = typespec.tsType === "array";
  typespec.isAtomic =
    typespec.isAtomic || ["string", "number", "boolean", "any"].includes(typespec.tsType);

  return typespec;
}

const forEach = (obj, fn) => {
  if (!obj) return
  const keys = Object.keys(obj)

  keys.forEach(key => {
    fn(obj[key], key)
  })
}

module.exports = {
    isString,
    isObject,
    reslovePath,
    readFile,
    writeFile,
    convertYmlToJson,
    generateTsType,
    forEach
}
