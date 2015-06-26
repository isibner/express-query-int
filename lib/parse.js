'use strict';

/**
 * Attempts to convert object properties recursively to numbers.
 * @param  {Object}    obj             - Object to iterate over.
 * @param  {Object}    options         - Options.
 * @param  {Function}  options.parser  - Parser to process string with. Should return NaN if not a valid number. Defaults to parseInt.
 * @param  {Function}  options.protect - Should return true if the key should not be parsed. If not provided, all keys will be parsed.
 * @return {Object}    Returns new object with same properties (shallow copy).
*/
function parseNums(obj, options) {
  var result = {},
      key,
      value,
      parsedValue;

  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      value = obj[key];
      parsedValue = options.parser.call(null, value, 10);

      if (typeof value === 'string' && !options.protect(key) && !isNaN(parsedValue)) {
        result[key] = parsedValue;
      }
      else if (value.constructor === Object) {
        result[key] = parseNums(value, options);
      }
      else {
        result[key] = value;
      }
    }
  }

  return result;
}

module.exports = parseNums;
