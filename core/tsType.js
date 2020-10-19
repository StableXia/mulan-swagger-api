const { ATOMIC_TYPE } = require("../helpers/constants");
const { forEach } = require("../helpers/utils");

const isStringType = (v) => v === "string";
const isNumberType = (v) => v === "number" || v === "integer";
const isArrayType = (v) => v === "array";
const isObjectType = (v) => v === "object";
const isBooleanType = (v) => v === "boolean";
const isRefType = (v) => v === "ref";
const isAtomicType = (v) => ATOMIC_TYPE.includes(v);

function generateTsType(swaggerParameter, swaggerJson) {
  const tempType = {
    description: swaggerParameter.description,
    isEnum: false,
  };

  if (swaggerParameter.schema) {
    return generateTsType(swaggerParameter.schema);
  }

  if (swaggerParameter.$ref) {
    tempType.tsType = "ref";
    tempType.target = swaggerParameter.$ref.substring(
      swaggerParameter.$ref.lastIndexOf("/") + 1
    );
  } else if (isStringType(swaggerParameter.type)) {
    tempType.tsType = "string";
  } else if (isNumberType(swaggerParameter.type)) {
    tempType.tsType = "number";
  } else if (isBooleanType(swaggerParameter.type)) {
    tempType.tsType = "boolean";
  } else if (isArrayType(swaggerParameter.type)) {
    tempType.tsType = "array";
    tempType.elementType = generateTsType(swaggerParameter.items);
  } else if (isObjectType(swaggerParameter.type)) {
    tempType.tsType = "object";
    tempType.properties = [];
    if (swaggerParameter.allOf) {
      swaggerParameter.allOf.forEach((ref) => {
        if (ref.$ref) {
          const refSegments = ref.$ref.split("/");
          const name = refSegments[refSegments.length - 1];
          forEach(swaggerJson.definitions, (definition, definitionName) => {
            if (definitionName === name) {
              const property = generateTsType(definition, swaggerJson);
              tempType.properties.push(property.properties);
            }
          });
        } else {
          const property = generateTsType(ref);
          tempType.properties.push(property.properties);
        }
      });
    }

    forEach(swaggerParameter.properties, (propertyType, propertyName) => {
      const property = generateTsType(propertyType);

      property.name = propertyName;
      property.optional =
        !swaggerParameter.required ||
        !swaggerParameter.required.includes(propertyName);

      tempType.properties.push(property);
    });
  } else {
    tempType.tsType = "any";
  }

  tempType.isRef = isRefType(tempType.tsType);
  tempType.isObject = isObjectType(tempType.tsType);
  tempType.isArray = isArrayType(tempType.tsType);
  tempType.isAtomic = tempType.isAtomic || isAtomicType(tempType.tsType);

  return tempType;
}

module.exports = {
  generateTsType,
};
