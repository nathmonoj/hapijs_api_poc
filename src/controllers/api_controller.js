'use strict';

// Requiring the custom modules.
const connector = require('../db/connector.js');
const api_helper = require('../helper/api_helper.js');
// Initialising the required variables.
const table_name = 'employee_details';

/**
 * Employee List Api Controller
 * to list out all the employee resources.
 */
exports.employeeList = (req, res) => {
  const promise_pool = connector.getPromisePool();
  try {
    return promise_pool.getConnection()
      .then(conn => {
        let sql = `select * from ${table_name};`;
        const result = conn.query(sql);
        conn.release();
        return result;
      }).then(([rows, fields]) => {
        // Returning the json employee list.
        let response = {
          statusCode: 'NO_USER_FOUND',
          message: 'No employee records have been created yet.',
          data: []
        };
        if (rows && rows.length > 0) {
          response = {
            statusCode: 'OK',
            message: 'All employee data retrieved',
            data: rows
          };
        }
        return response;
      }).catch(err => {
        // Any of connection time or query time errors from above
        throw err;
      });
  }
  catch (err) {
    // Catching and logging the error.
    throw err;
  }
}

/**
 * Create new Employee Api Controller.
 */
exports.employeeCreate = (req, res) => {
  let param_check = api_helper.checkEmployeeCreateApiParams(req.payload);
  if (param_check.is_error) return param_check.error_msg;
  // Proceeding with query run.
  const promise_pool = connector.getPromisePool();
  try {
    return promise_pool.getConnection()
      .then(conn => {
        let sql = `INSERT INTO ${table_name} (email, name, role) VALUES ?;`;
        let values = [
          [
            param_check.checked_data.email,
            param_check.checked_data.name,
            param_check.checked_data.role
          ]
        ];
        const result = conn.query(sql, [values]);
        conn.release();
        return result;
      }).then(([row, fields]) => {
        // Returning the record creation success response.
        let response = {
          statusCode: 'OK',
          message: `Employee record created successfully with employee id '${row.insertId}'.`,
          data: Object.assign({ 'id': row.insertId }, param_check.checked_data)
        };
        return response;
      }).catch(err => {
        // Returning the pool error.
        if (err && err.code == 'ER_DUP_ENTRY') {
          return {
            statusCode: 'DUPLICATE_ENTRY',
            message: err.sqlMessage
          };
        }
        else {
          console.log(err);
          throw err;
        }
      });
  }
  catch (err) {
    // Catching and logging the error.
    throw err;
  }
}

/**
 * Update Employee Api Controller.
 */
exports.employeeUpdate = (req, res) => {
  let payload_check = api_helper.checkEmployeeUpdateApiPayload(req.payload);
  if (payload_check.is_error) return payload_check.error_msg;
  // Proceeding with query run.
  const promise_pool = connector.getPromisePool();
  try {
    return promise_pool.getConnection()
      .then(conn => {
        let sql = `UPDATE ${table_name} SET `;
        let values = [];
        Object.entries(payload_check.checked_data).every(([key, value]) => {
          sql += `${key} = ?,`;
          values.push(value);
          return true;
        });
        sql += `updated = CURRENT_TIMESTAMP,`;
        sql = sql.slice(0, -1);
        sql += ` WHERE id = ?;`;
        values.push(req.params.id);
        const result = conn.query(sql, values);
        conn.release();
        return result;
      }).then(([row, fields]) => {
        // Returning the record updation success response.
        let response = {
          statusCode: 'OK',
          message: `No such Employee record was found with 'id = ${req.params.id}'.`
        };
        if (row && row.affectedRows == 1) {
          response = {
            statusCode: 'OK',
            message: 'Employee record updated successfully.'
          };
        }
        return response;
      }).catch(err => {
        // Returning the pool error.
        if (err && err.code == 'ER_DUP_ENTRY') {
          return {
            statusCode: 'DUPLICATE_ENTRY',
            message: err.sqlMessage
          };
        }
        else {
          console.log(err);
          throw err;
        }
      });
  }
  catch (err) {
    // Catching and logging the error.
    throw err;
  }
}

/**
 * Get specific Employee Api Controller.
 */
exports.employeeGet = (req, res) => {
  let param_check = api_helper.checkEmployeeGetOrDeleteApiParams(req.query);
  if (param_check.is_error) return param_check.error_msg;
  const check_id = Object.keys(param_check.checked_data)[0];
  const check_val = Object.values(param_check.checked_data)[0];
  // Proceeding with query run.
  const promise_pool = connector.getPromisePool();
  try {
    return promise_pool.getConnection()
      .then(conn => {
        let sql = `SELECT * from ${table_name} WHERE ${check_id} = '${check_val}';`;
        const result = conn.query(sql);
        conn.release();
        return result;
      }).then(([row, fields]) => {
        // Returning the record creation success response.
        let response = {
          statusCode: 'USER_NOT_FOUND',
          message: `No such Employee record was found with '${check_id} = ${check_val}'.`
        };
        if (row && row.length == 1) {
          response = {
            statusCode: 'OK',
            message: `Employee data retrieved with '${check_id} = ${check_val}'.`,
            data: row
          };
        }
        return response;
      }).catch(err => {
        // Returning the pool error.
        console.log(err);
        throw err;
      });
  }
  catch (err) {
    // Catching and logging the error.
    throw err;
  }
}

/**
 * Delete specific Employee Api Controller.
 */
exports.employeeDelete = (req, res) => {
  let param_check = api_helper.checkEmployeeGetOrDeleteApiParams(req.query);
  if (param_check.is_error) return param_check.error_msg;
  const check_id = Object.keys(param_check.checked_data)[0];
  const check_val = Object.values(param_check.checked_data)[0];
  // Proceeding with query run.
  const promise_pool = connector.getPromisePool();
  try {
    return promise_pool.getConnection()
      .then(conn => {
        let sql = `DELETE FROM ${table_name} WHERE ${check_id} = '${check_val}';`;
        const result = conn.query(sql);
        conn.release();
        return result;
      }).then(([row, fields]) => {
        // Returning the record deletion success response.
        let response = {
          statusCode: 'USER_NOT_FOUND',
          message: `No such Employee record was found with '${check_id} = ${check_val}'.`
        };
        if (row && row.affectedRows == 1) {
          response = {
            statusCode: 'OK',
            message: `Employee data deleted successfully with '${check_id} = ${check_val} '.`
          };
        }
        return response;
      }).catch(err => {
        // Returning the pool error.
        console.log(err);
        throw err;
      });
  }
  catch (err) {
    // Catching and logging the error.
    throw err;
  }
}
