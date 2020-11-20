const isString = (v) => Object.prototype.toString.call(v) === '[object String]';

const isObject = (v) => Object.prototype.toString.call(v) === '[object Object]';

const isFunction = (v) =>
  Object.prototype.toString.call(v) === '[object Function]';

const isArray = (v) => Array.isArray(v);

function forEach(obj, fn) {
  if (!obj) return;
  const keys = Object.keys(obj);

  keys.forEach((key) => {
    fn(obj[key], key);
  });
}

function pickFields(obj, ...fields) {
  const temp = {};

  fields.forEach((field) => {
    temp[field] = obj[field];
  });

  return temp;
}

function sleep(s) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(), s * 1000);
  });
}

function isDef(v) {
  return v !== undefined && v !== null;
}

function safeReaper(obj, path, defaultVal) {
  if (!isDef(obj) || !isDef(path)) {
    return defaultVal;
  }

  try {
    const val = new Function(
      'obj',
      `return obj${path.startsWith('[') ? '' : '.'}${path};`,
    )(obj);

    if (isDef(val)) {
      return val;
    }

    return defaultVal;
  } catch (err) {
    return defaultVal;
  }
}

module.exports = {
  isString,
  isObject,
  forEach,
  pickFields,
  sleep,
  isArray,
  isFunction,
  safeReaper,
};
