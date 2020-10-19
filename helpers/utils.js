const isString = (v) => Object.prototype.toString.call(v) === "[object String]";

const isObject = (v) => Object.prototype.toString.call(v) === "[object Object]";

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

module.exports = {
  isString,
  isObject,
  forEach,
  pickFields,
};
