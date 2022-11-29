'use strict';

const mergeWith = require('lodash/mergeWith');

const admin = require('./server');

const mergeRoutes = (a, b, key) => {
  return Array.isArray(a) && Array.isArray(b) && key === 'routes' ? a.concat(b) : undefined;
};

if (process.env.STRAPI_DISABLE_EE !== 'true' && strapi.EE) {
  const eeAdmin = require('./ee/strapi-server');

  module.exports = mergeWith({}, admin, eeAdmin, mergeRoutes);
} else {
  module.exports = admin;
}
