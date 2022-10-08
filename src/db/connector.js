'use strict';

// Requiring the mysql module.
const mysql = require('mysql2');

// Connection pool vars.
const db_name = 'employee_management';
const table_name = 'employee_details';
const connection_settings = {
  host: 'localhost',
  user: 'root',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};
const pooling_connection_settings = Object.assign({}, connection_settings, { database: db_name });
// Declaring the db connecion pool.
let promise_pool;

// Creating connector methods and exporting it as a module.
module.exports = {
  setup: async (server) => {
    try {
      const connection = await mysql.createConnection(connection_settings);
      connection.connect(function (error) {
        // Checking and throwing if connection connect error.
        if (error) throw error;
        console.log(`Init Connection connected...`);
        // Creating the table for the poc project.
        connection.query(`CREATE DATABASE IF NOT EXISTS ${db_name}`, function (error, result) {
          // Checking and throwing if connection query error.
          if (error) throw error;
          console.log(`Database "${db_name}" checked/created...`);
          // Creating the database for the poc project.
          connection.query(`CREATE TABLE IF NOT EXISTS ${db_name}.${table_name}(id int unsigned auto_increment primary key, email varchar(50) UNIQUE, name varchar(50) NOT NULL, role varchar(10) NOT NULL, created timestamp NOT NULL, updated timestamp NULL DEFAULT NULL);`, function (error, result) {
            // Checking and throwing if connection query error.
            if (error) throw error;
            console.log(`Table "${table_name}" checked/created...`);
            connection.destroy();
            // Once started log the server initiation.
            console.log(`Server setup done at: ${server.info.uri}...`);
          });
        });
      });
    }
    catch (err) {
      // Catching and logging the error.
      throw err;
    }
  },
  init: async () => {
    try {
      // Initialising the db connecion pool.
      promise_pool = await mysql.createPool(pooling_connection_settings).promise();
      console.log(`Connection Pool initialised...`);
    }
    catch (err) {
      // Catching and logging the error.
      throw err;
    }
  },
  getPromisePool: () => {
    try {
      return promise_pool;
    }
    catch (err) {
      // Catching and logging the error.
      throw err;
    }
  },

  // Get allthe eployee list.
  getEployeeList: async () => {
    try {
      promise_pool.getConnection()
        .then(conn => {
          const result = conn.query(`select * from ${table_name};`);
          conn.release();
          return result;
        }).then(([rows, fields]) => {
          return rows;
        }).catch(err => {
          console.log(err); // any of connection time or query time errors from above
          throw err;
        });


      /* pool.getConnection(function (connection_error, connection) {
        // Checking and throwing if pool getconnection error.
        if (connection_error) throw connection_error;
        connection.query(`select * from ${table_name} limit 10;`, function (error, results, fields) {
          // Checking and throwing if connection query error.
          if (error) throw error;
          // Else proceeding with the query;
          console.log('The query result is: ', results);
          // Releasing the connection.
          pool.releaseConnection(connection);
        });
      }); */
    }
    catch (err) {
      // Catching and logging the error.
      throw err;
    }
  }
}
