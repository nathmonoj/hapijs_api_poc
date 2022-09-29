'use strict';

// Requiring the controller modules.
const generic_controller = require('../controllers/generic_controller.js');
const api_controller = require('../controllers/api_controller.js');

// Basic Authentication variables.

const basic_auth_users = {
  hapijsapipocv1: {
    username: 'hapijsapipocv1',
    password: 'J&jHapiJs@Poc2022',
    name: 'hapijsapipocv1user',
    id: '1'
  }
};
const validate = async (request, username, password) => {
  if (basic_auth_users[username] && (basic_auth_users[username].password == password)) {
    return { isValid: true, credentials: { id: basic_auth_users[username].id, name: basic_auth_users[username].name } };
  }
  else {
    return { isValid: false, credentials: null };
  }
};

// Requiring the mysql module.
//const mysql = require('mysql2');
// Creating the route plugin to register the api routes.
exports.plugin = {
  name: 'pocRouting',
  version: '1.0.0',
  register: async function (server, options) {

    await server.register([
      // Registering the hapi basic auth plugin.
      {
        plugin: require('@hapi/basic')
      },
      // Registering the hapi vision plugin.
      {
        plugin: require('@hapi/vision')
      },

    ]);
    // Defining the basic authentication strategy.
    server.auth.strategy('basicAuthentication', 'basic', { validate: validate });
    // Defining the basic authentication strategy.
    server.auth.default('basicAuthentication');
    server.views({
      engines: {
        html: require('handlebars')
      },
      relativeTo: __dirname,
      path: '../templates'
    });

    // Create home routes.
    server.route({
      method: 'GET',
      path: '/',
      handler: generic_controller.home
    });
    server.route({
      method: 'GET',
      path: '/index',
      handler: generic_controller.home
    });
    server.route({
      method: 'GET',
      path: '/home',
      handler: generic_controller.home
    });
    // Create the api routes.
    // Get all employee route.
    server.route({
      method: 'GET',
      path: '/employee/list',
      handler: api_controller.employeeList
    });
    // Create employee route.
    server.route({
      method: 'POST',
      path: '/employee/create',
      config: {
        payload: {
          multipart: true
        },
        handler: api_controller.employeeCreate
      }
    });
    // Delete specific employee route.
    server.route({
      method: 'PUT',
      path: '/employee/update/{id}',
      config: {
        payload: {
          output: 'data',
          parse: true,
          allow: 'application/json'
        }
      },
      handler: api_controller.employeeUpdate
      /* config: {
        payload: {
          output: 'stream',
          parse: false
        },
        handler: api_controller.employeeUpdate
      } */
    });
    // Get specific employee route.
    server.route({
      method: 'GET',
      path: '/employee/get',
      handler: api_controller.employeeGet
    });
    // Delete specific employee route.
    server.route({
      method: 'DELETE',
      path: '/employee/delete',
      handler: api_controller.employeeDelete
    });
  }
};
