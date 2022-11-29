import isObject from 'lodash/isObject';
import { createArrayOfValues } from '../../utils';

/**
 * Changes all the conditions leaf when the properties are all falsy
 * @param {object} obj the modifiedData state
 * @returns {object} the mutated modifiedData
 */
const updateConditionsToFalse = (obj) => {
  return Object.keys(obj).reduce((acc, current) => {
    const currentValue = obj[current];

    if (isObject(currentValue) && !currentValue?.conditions) {
      return { ...acc, [current]: updateConditionsToFalse(currentValue) };
    }

    if (isObject(currentValue) && currentValue?.conditions) {
      const { conditions, ...values } = currentValue;
      const isActionEnabled = createArrayOfValues(values).some((val) => val);

      if (!isActionEnabled) {
        const updatedConditions = Object.keys(currentValue.conditions).reduce((acc1, current) => {
          acc1[current] = false;

          return acc1;
        }, {});

        return { ...acc, [current]: { ...currentValue, conditions: updatedConditions } };
      }
    }

    acc[current] = currentValue;

    return acc;
  }, {});
};

export default updateConditionsToFalse;
