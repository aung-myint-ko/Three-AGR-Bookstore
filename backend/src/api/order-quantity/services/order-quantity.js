'use strict';

/**
 * order-quantity service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::order-quantity.order-quantity');
