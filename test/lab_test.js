'use strict'

const Lab = require('@hapi/lab');
const Code = require('@hapi/code');

// Exporting the lab script.
const lab = exports.lab = Lab.script();

// Shortcuts from Lab.
const experiment = lab.experiment
const before = lab.before
const test = lab.test
// Shortcuts from Code.
const { expect } = Code;
// Basic Auth vars.
const auth_user_name = 'hapijsapipocv1';
const auth_user_pwd = 'J&jHapiJs@Poc2022';
const lab_test_user_email = 'labtestuser@test.com';
let lab_test_user_id;
let options = {
  method: 'GET',
  url: '',
  auth: {
    strategy: 'basicAuthentication',
    credentials: {
      username: auth_user_name,
      password: auth_user_pwd
    }
  }
};

let server = require('../src/server/server.js');
experiment('Server Setup Hapi Lab Testing,', () => {
  // Lab testing the environment setup.
  test('Check the server setup', async () => {
    await server.setup();
  });
});

experiment('Index Page Hapi Lab Testing,', () => {
  // Initiating the server before.
  before(async () => {
    await server.init();
  });
  // Lab testing the index page.
  test('Index Page Check', async () => {
    // Preparing the options for server inject.
    options.url = '/index';
    // Executing server inject for getting all employee profile list api.
    const response = await server.server_obj.inject(options);
    expect(response.statusCode).to.equal(200);
  });
});

experiment('Api Routes Hapi Lab Testing,', () => {
  // Lab testing the get all employee profile list api.
  test('Get All Employee Profile List Api Check', async () => {
    // Preparing the options for server inject.
    options.method = 'GET';
    options.url = '/employee/list';
    // Executing server inject for getting all employee profile list api.
    const response = await server.server_obj.inject(options);
    const payload = JSON.parse(response.payload);
    expect(payload.statusCode).to.equal('OK');
  });
  // Lab testing the create employee profile list api.
  test('Create Employee Api Check', async () => {
    // Preparing the options for server inject.
    options.method = 'POST';
    options.url = '/employee/create';
    // Executing server inject for creating employee profile api(success).
    options.payload = {
      email: lab_test_user_email,
      name: 'Lab Test User',
      role: 'Lab Test Role'
    }
    let response = await server.server_obj.inject(options);
    let payload = JSON.parse(response.payload);
    lab_test_user_id = payload.data.id;
    expect(payload.statusCode).to.equal('OK');
    // Executing server inject for creating employee profile api(duplicate entry).
    response = await server.server_obj.inject(options);
    payload = JSON.parse(response.payload);
    expect(payload.statusCode).to.equal('DUPLICATE_ENTRY');
    // Executing server inject for creating employee profile api(invalid parameters).
    options.payload = {
      name: 'Lab Test User2',
      role: 'Lab Test Role2'
    }
    response = await server.server_obj.inject(options);
    payload = JSON.parse(response.payload);
    expect(payload.statusCode).to.equal('INVALID_PARAMETERS');
    // Executing server inject for creating employee profile api(invalid parameters min & max length).
    options.payload = {
      email: lab_test_user_email,
      name: 'Lab Test User2',
      role: 'Lab Test Role2',
      extraparam: 'extraval'
    }
    response = await server.server_obj.inject(options);
    payload = JSON.parse(response.payload);
    expect(payload.statusCode).to.equal('INVALID_PARAMETERS');
  });
  // Lab testing the update employee profile list api.
  test('Update Employee Api Check', async () => {
    // Preparing the options for server inject.
    options.method = 'PUT';
    options.url = `/employee/update/${lab_test_user_id}`;
    options.payload = {
      name: 'Lab Test User Updated',
      role: 'Lab Test Role Updated'
    };
    // Executing server inject for updating employee profile api.
    const response = await server.server_obj.inject(options);
    const payload = JSON.parse(response.payload);
    expect(payload.statusCode).to.equal('OK');
  });
  // Lab testing the get employee profile api.
  test('Get Employee Api Check', async () => {
    // Preparing the options for server inject.
    options.method = 'GET';
    options.url = `/employee/get?email=${lab_test_user_email}`;
    // Executing server inject for getting employee profile api.
    const response = await server.server_obj.inject(options);
    const payload = JSON.parse(response.payload);
    expect(payload.statusCode).to.equal('OK');
  });
  // Lab testing the delete employee profile api.
  test('Delete Employee Api Check', async () => {
    // Preparing the options for server inject.
    options.method = 'DELETE';
    options.url = `/employee/delete?email=${lab_test_user_email}`;
    // Executing server inject for deleting employee profile api.
    const response = await server.server_obj.inject(options);
    const payload = JSON.parse(response.payload);
    expect(payload.statusCode).to.equal('OK');
  });
});
