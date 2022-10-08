'use strict';

// Requiring the hapi module.
const Hapi = require('@hapi/hapi');
// Requiring the db connector module.
const connector = require('../db/connector.js');

// Creating a server.
const server = new Hapi.Server({
  port: 3000,
  host: 'localhost'
});

// Creating Server initiating method and exporting it as a module.
module.exports = {
  server_obj: server,
  init: async () => {
    try {
      // Load the routing plugin to register the api routes.
      await server.register([
        // Registering the Route plugin.
        {
          plugin: require('../plugins/routing.js'),
          options: {}
        }
      ]);
      // Starting the server.
      await server.start();
      // Initialising the db connector.
      await connector.init();
      // Once started log the server initiation.
      console.log(`Server running at: ${server.info.uri}...`);
    }
    catch (err) {
      // Catching and logging the error.
      console.log(err)
    }
  },
  setup: async () => {
    try {
      // Setting up the db environment.
      connector.setup(server);
    }
    catch (err) {
      // Catching and logging the error.
      console.log(err)
    }
  }
}
