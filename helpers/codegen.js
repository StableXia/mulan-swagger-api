const { generateTsType ,forEach, isString} = require('./utils')

let normalizeName = function (id) {
  return id.replace(/\.|\-|\{|\}|\s/g, '_');
};

var normalizeTypeName = function (id) {
  return id.replace(/«|»/g,"");
};

const getTargetJsonFromSwaggerJson =  (swaggerJson, opts = {}) => {
  const authorizedMethods = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
  ];

  const data = {
    definitions: [],
    methods: [],
  }

  forEach(swaggerJson.paths, (pathOpts, path) => {
    forEach(pathOpts, (pathOptsVal, pathOptionsKey) => {
      const pathOptionsKeyUpper = pathOptionsKey.toUpperCase();
      // 过滤无效的方法
      if (pathOptionsKeyUpper === '' || authorizedMethods.indexOf(pathOptionsKeyUpper) === -1) {
        return;
      }

      const methodName = normalizeName(pathOptsVal.operationId);

      const method = {
        path,
        methodName,
        method: pathOptionsKeyUpper,
        parameters: [],
        response: null
      }

      const response = pathOptsVal.responses

      if (response && response['200']) {
        const responseSchema = response['200']['content']['*/*'].schema

        if (responseSchema && isString(responseSchema.$ref)) {
          const segments = responseSchema.$ref.split('/');
          method.response = normalizeTypeName(segments.pop());
        }
      }

      const parameters = pathOptsVal.parameters
      forEach(parameters, (parameter) => {
        if (isString(parameter.$ref)) {
          const segments = parameter.$ref.split('/');
          parameter =
            swagger.parameters[segments.length === 1 ? segments[0] : segments[2]];
        }

        parameter.tsType = generateTsType(parameter);
        parameter.required = parameter.required ? '' : '?';
        method.parameters.push(parameter);
      })

      console.log(method.parameters)
      data.methods.push(method);
    })
  })

  forEach(swaggerJson.definitions, function (definition, name) {
    data.definitions.push({
      name: normalizeTypeName(name),
      description: definition.description,
      tsType: ts.convertType(definition, swaggerJson)
    });
  });

  return data
};

module.exports = getTargetJsonFromSwaggerJson;
