function isStringType(v) {
    return v === 'string'
}

function isNumberType(v) {
    return v === 'number'
}

function generateTsType(swaggerParameter, swaggerJson) {
    const tempType = {
      description: swaggerParameter.description,
      isEnum: false
    };
  
    if (swaggerParameter.schema) {
      return generateTsType(swaggerParameter.schema);
    }
  
    if (swaggerParameter.$ref) {
      tempType.tsType = "ref";
      tempType.target = swaggerParameter.$ref.substring(swaggerParameter.$ref.lastIndexOf("/") + 1);
    } else if (swaggerParameter.hasOwnProperty("enum")) {
      tempType.tsType = swaggerParameter.enum
        .map(function(str) {
          return JSON.stringify(str);
        })
        .join(" | ");
      tempType.isAtomic = true;
      tempType.isEnum = true;
    } else if (swaggerParameter.type === "string") {
      tempType.tsType = "string";
    } else if (swaggerParameter.type === "number" || swaggerParameter.type === "integer") {
      tempType.tsType = "number";
    } else if (swaggerParameter.type === "boolean") {
      tempType.tsType = "boolean";
    } else if (swaggerParameter.type === "array") {
      tempType.tsType = "array";
      tempType.elementType = generateTsType(swaggerParameter.items);
    } else if (swaggerParameter.type === "object") {
      tempType.tsType = "object";
      tempType.properties = [];
      if (swaggerParameter.allOf) {
        swaggerParameter.allOf.forEach(function(ref) {
          if (ref.$ref) {
            var refSegments = ref.$ref.split("/");
            var name = refSegments[refSegments.length - 1];
            swaggerJson.definitions.forEach(function(definition, definitionName) {
              if (definitionName === name) {
                var property = generateTsType(definition, swaggerJson);
                Array.prototype.push.apply(
                  tempType.properties,
                  property.properties
                );
              }
            });
          } else {
            var property = generateTsType(ref);
            Array.prototype.push.apply(tempType.properties, property.properties);
          }
        });
      }
  
      swaggerParameter.properties.forEach( function(propertyType, propertyName) {
        var property = generateTsType(propertyType);
        property.name = propertyName;
  
        property.optional = true;
        if (
          swaggerParameter.required &&
          swaggerParameter.required.indexOf(propertyName) !== -1
        ) {
          property.optional = false;
        }
  
        tempType.properties.push(property);
      });
    } else {
      tempType.tsType = "any";
    }
  
    tempType.isRef = tempType.tsType === "ref";
    tempType.isObject = tempType.tsType === "object";
    tempType.isArray = tempType.tsType === "array";
    tempType.isAtomic =
      tempType.isAtomic || ["string", "number", "boolean", "any"].includes(tempType.tsType);
  
    return tempType;
}


module.exports = {
    generateTsType
}