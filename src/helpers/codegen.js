let _ = require('lodash');
const { generateTsType } = require('./utils')

let normalizeName = function (id) {
  return id.replace(/\.|\-|\{|\}|\s/g, '_');
};

let getPathToMethodName = function (m, path) {
  if (path === '/' || path === '') {
    return m;
  }

  // 去掉请求路径末尾的 '/'
  let cleanPath = path.replace(/\/$/, '');

  let segments = cleanPath.split('/').slice(1);
  segments = _.transform(segments, function (result, segment) {
    if (segment[0] === '{' && segment[segment.length - 1] === '}') {
      segment =
        'by' +
        segment[1].toUpperCase() +
        segment.substring(2, segment.length - 1);
    }

    result.push(segment);
  });
  let result = _.camelCase(segments.join('-'));
  return m.toLowerCase() + result[0].toUpperCase() + result.substring(1);
};

const getViewForSwagger = function (swaggerJson, opts = {}) {
  let methods = [];
  let paramsDefinitions = []; // 当前需要的 params 定义
  let authorizedMethods = [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'PATCH',
    'COPY',
    'HEAD',
    'OPTIONS',
    'LINK',
    'UNLIK',
    'PURGE',
    'LOCK',
    'UNLOCK',
    'PROPFIND',
  ];
  let data = {
    title: swaggerJson.info.title,
    description: swaggerJson.info.description,
    imports: opts.imports,
    methods: [],
    definitions: [],
    domain: swaggerJson.host,
  };



  _.forEach(swaggerJson.paths, function (api, path) {
    let globalParams = [];

    /**
     * @param {Object} op - meta data for the request
     * @param {string} m - HTTP method name - eg: 'get', 'post', 'put', 'delete'
     */
    _.forEach(api, function (op, m) {
      if (m.toLowerCase() === 'parameters') {
        globalParams = op;
      }
    });

    _.forEach(api, function (op, m) {
      let M = m.toUpperCase();
      if (M === '' || authorizedMethods.indexOf(M) === -1) {
        return;
      }

      let methodName = op.operationId
        ? normalizeName(op.operationId)
        : getPathToMethodName( m, path);

      methods.push(methodName);

      let method = {
        path: path,
        methodName: methodName,
        method: M,
        isGET: M === 'GET',
        isPOST: M === 'POST',
        isGraphql: _.endsWith(path, 'graphql'),
        graphqlMethodName: '',
        summary: op.summary || op.description,
        parameters: [],
        headers: [],
      };

      let params = [];
      if (_.isArray(op.parameters)) {
        params = op.parameters;
      }

      params = params.concat(globalParams);
      _.forEach(params, function (parameter) {
        if (_.has(parameter, 'schema')) {
          if (_.has(parameter.schema, '$ref') && parameter.in !== 'query') {
            let segments = parameter.schema.$ref.split('/');
            paramsDefinitions.push(segments[2]);
            console.log(segments)
          }
        }

        if (method.isGraphql) {
          if (parameter.name === 'query') {
            let graphqlQueryFieldsArr = parameter.description.split('{');
            if (graphqlQueryFieldsArr.length > 0) {
              method.graphqlMethodName = graphqlQueryFieldsArr[1].split('(')[0];
            }
          }
        }

        parameter.camelCaseName = _.camelCase(parameter.name);
        if (parameter.enum && parameter.enum.length === 1) {
          parameter.isSingleton = true;
          parameter.singleton = parameter.enum[0];
        }

        if (parameter.in === 'body') {
          parameter.isBodyParameter = true;
        } else if (parameter.in === 'path') {
          parameter.isPathParameter = true;
        } else if (parameter.in === 'query') {
          parameter.isQueryParameter = true;
        } else if (parameter.in === 'header') {
          parameter.isHeaderParameter = true;
        } else if (parameter.in === 'formData') {
          parameter.isFormParameter = true;
        }

        parameter.tsType = generateTsType(parameter);
        parameter.required = parameter.required ? '' : '?';
        if (!parameter.isHeaderParameter) {
          method.parameters.push(parameter);
        }
      });

      data.methods.push(method);
    });
  });

  _.forEach(swaggerJson.definitions, function (definition, name) {
    _.forEach(definition.properties, function (prop) {
      if (_.has(prop, 'items') && _.has(prop.items, '$ref')) {
        let segs = prop.items.$ref.split('/');
        paramsDefinitions.push(segs[2]);
      } else if (_.has(prop, '$ref')) {
        let segs = prop.$ref.split('/');
        paramsDefinitions.push(segs[2]);
      }
    });

    if (paramsDefinitions.includes(name)) {
      data.definitions.push({
        name: name,
        description: definition.description,
        tsType: generateTsType(definition, swagger),
      });
    }
  });

  console.log(data)
  return data;
};

module.exports = getViewForSwagger;
