const { ATOMIC_TYPE } = require('../helpers/constants');
const { forEach, isString } = require('../helpers/utils');

const isStringType = (v) => v === 'string';
const isEnumType = (v) => v === 'enum';
const isNumberType = (v) => v === 'number' || v === 'integer';
const isArrayType = (v) => v === 'array';
const isObjectType = (v) => v === 'object';
const isBooleanType = (v) => v === 'boolean';
const isRefType = (v) => v === 'ref';
const isAtomicType = (v) => ATOMIC_TYPE.includes(v);

function generateTsType(swaggerParameter) {
  const tempType = {
    description: swaggerParameter.description,
  };

  if (swaggerParameter.schema) {
    return generateTsType(swaggerParameter.schema);
  }

  if (swaggerParameter.$ref) {
    tempType.tsType = 'ref';
    const pathArr = swaggerParameter.$ref.split('/').slice(3);

    if (pathArr.length > 0) {
      const sTarget = pathArr.shift();
      const eTarget = pathArr.pop();
      tempType.target = eTarget ? `${sTarget}['${eTarget}']` : sTarget;
    } else {
      tempType.target = 'any';
    }
  } else if (isEnumType(swaggerParameter.type) || swaggerParameter.enum) {
    tempType.tsType = swaggerParameter.enum
      .map((str) => (isString(str) ? `'${str.split('-')[0]}'` : str))
      .join(' | ');
    tempType.isAtomic = true;
    tempType.isEnum = true;
  } else if (isStringType(swaggerParameter.type)) {
    tempType.tsType = 'string';
  } else if (isNumberType(swaggerParameter.type)) {
    tempType.tsType = 'number';
  } else if (isBooleanType(swaggerParameter.type)) {
    tempType.tsType = 'boolean';
  } else if (isArrayType(swaggerParameter.type)) {
    tempType.tsType = 'array';
    tempType.elementType = generateTsType(swaggerParameter.items);
  } else if (isObjectType(swaggerParameter.type)) {
    tempType.tsType = 'object';
    tempType.properties = [];

    forEach(swaggerParameter.properties, (propertyType, propertyName) => {
      const property = generateTsType(propertyType);

      property.name = propertyName;
      property.isRequired = swaggerParameter.required;

      tempType.properties.push(property);
    });
  } else {
    tempType.tsType = 'any';
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
