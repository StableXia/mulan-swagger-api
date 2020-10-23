/* eslint-disable */

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

module.exports = {
  isString,
  isObject,
  forEach,
  pickFields,
  sleep,
  isArray,
  isFunction,
};
