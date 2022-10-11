# Hapi Js Api POC
> A POC to explore the hapi js framework and apis. The version1 supports usage of hapijs plugins, modules, routings, database interaction and crud operations via api endpoints. This POC is showcasing a simple example of Employee Management System where you can view list of all employees, create new employee record, update employee record, get specific employe record and delete sployee record.

__Table of contents__

  - [System Requirements](#system-requirements)
  - [Application Installation](#application-installation)
  - [Setting Up Application](#setting-up-application)
  - [Initiating Application](#initiating-application)
  - [Site Basic Authentication](#site-basic-authentication)
  - [Api V1 Details](#api-v1-details)
  - [Introductory Hapi Lab Tests](#introductory-hapi-lab-tests)

## System Requirements

 - Please follow the MySQL Installation Guide and install MySQL in your system and it must be active and running
 - Your system must have node v16 or above installed in it

## Application Installation

 - Download/Clone the code from https://github.com/nathmonoj2014/hapijs_api_poc
 - Go to the project folder "hapijs_api_poc"
 - ```bash run command "npm install" ```
 - You will see the "node_modules" folder got generated and the project is ready now

## Setting Up Application

 - Go to the project folder "hapijs_api_poc" and run command "node serversetup"
 - The final console log will be "Server setup Completed..." and your application environment is now setup and configured

## Initiating Application

 - Go to the project folder "hapijs_api_poc" and run command "node app"
 - The final console log will be "Connection Pool initialised..." and your application is now initiated
 - For a quick check you may visit "http://localhost:3000/"

## Site Basic Authentication

Your application is protected with a basic authentication with username/ & password as ::

username: hapijsapipocv1
password: J&jHapiJs@Poc2022

## Api V1 Details

## Get All Employee Detailed List
Description : Returns the list of all user profile.

Endpoint URL:  {hostDomain}/employee/create
```endpoint
http://localhost:3000/employee/list
```
Method :
```method
GET
```
Response :
```success
Sample Success response
{
    "statusCode": "OK",
    "message": "All employee data retrieved",
    "data": [
        {
            "id": 1,
            "email": "test@test.com",
            "name": "Test User",
            "role": "Test Role",
            "created": "2022-09-28T10:00:45.000Z",
            "updated": null
        },
        {
            "id": 2,
            "email": "test@test2.com",
            "name": "Test User2",
            "role": "Test Role2",
            "created": "2022-10-28T10:00:45.000Z",
            "updated": null
        },
        .......
        .......
        .......
        {
            "id": 25,
            "email": "test@test25.com",
            "name": "Test User25",
            "role": "Test Role25",
            "created": "2022-12-28T10:00:45.000Z",
            "updated": null
        }
    ]
}
```

```errors
Errors
For no user record exists
{
    "statusCode": "NO_USER_FOUND",
    "message": "No employee records have been created yet.",
    "data": []
}
```

## Create Employee Record
Description : Creates an employee record.

Endpoint URL:  {hostDomain}/employee/create
```endpoint
http://localhost:3000/employee/create
```

Method :
```method
POST
```

Request Headers :
```header
Content-Type multipart/form-data
```

Authentication :
```authentication
Basic Auth with username  as hapijsapipocv1 and password as J&jHapiJs@Poc2022
```

Request body(all keys are required) :
| Key           | Value         |
| ------------- |:-------------:|
| email         | Employee Email|
| name          | Employee Name |
| role          | Employee Role |

Response :
```success
Success
{
    "statusCode": "OK",
    "message": "Employee record created successfully with employee id '1'.",
    "data": {
        "id": 1,
        "email": "testuser@test.com",
        "name": "Test User",
        "role": "Test Role"
    }
}
```

```errors
Errors
For duplicate entry
{
    "statusCode": "DUPLICATE_ENTRY",
    "message": "Duplicate entry 'test@test.comd' for key 'email'"
}
Or
If any required parameter is missed
{
    "statusCode": "INVALID_PARAMETERS",
    "message": "Invalid parameters. The parameters that must be send are 'email' and 'name' and 'role'."
}
Or
For not sending the required parameters ::
{
    "statusCode": "INVALID_PARAMETERS",
    "message": "Invalid parameters. The parameters that must be send are 'email' and 'name' and 'role'."
}
For non allowed parameters ::
{
    "statusCode": "INVALID_PARAMETERS",
    "message": "Parameter 'emails' is not allowed"
}
```

## Update Employee Record
Description : Creates an employee record.

Endpoint URL:  {hostDomain}/employee/create
```endpoint
http://localhost:3000/employee/update/{id}
```

Method :
```method
PUT
```

Request Headers :
```header
Content-Type application/json
```

Authentication :
```authentication
Basic Auth with username  as hapijsapipocv1 and password as J&jHapiJs@Poc2022
```

Request body(minimum 1 or all keys can be send in json format) :
| Key           | Value         |
| ------------- |:-------------:|
| email         | Employee Email|
| name          | Employee Name |
| role          | Employee Role |
```sample
Sample body
{
    "name":"Monoj",
    "email":"test@test.coms"
}
```

Response :
```success
Success
{
    "statusCode": "OK",
    "message": "Employee record updated successfully."
}
```

```errors
Errors
For No user found
{
    "statusCode": "OK",
    "message": "No such Employee record was found with 'id = 1'."
}
```

## Get Employee Record
Description : Creates an employee record.

Endpoint URL:  {hostDomain}/employee/get
```endpoint
http://localhost:3000/employee/get
```

Method :
```method
GET
```

Authentication :
```authentication
Basic Auth with username  as hapijsapipocv1 and password as J&jHapiJs@Poc2022
```

Request params(any one of the below keys are allowed) :
| Key           | Value         |
| ------------- |:-------------:|
| id            | Employee Id|
| email         | Employee Email|

Response :
```success
Success
{
    "statusCode": "OK",
    "message": "Employee record created successfully with employee id '4'."
}
```

```errors
Errors
For No user found
{
    "statusCode": "USER_NOT_FOUND",
    "message": "No such Employee record was found with 'email = test@test.com'."
}
Or
{
    "statusCode": "USER_NOT_FOUND",
    "message": "No such Employee record was found with 'id = 4'."
}
Or
For not sending the required parameters ::
{
    "statusCode": "INVALID_PARAMETERS",
    "message": "Invalid parameters. The parameters that must be send is 'id' or 'email'."
}
Or
For non allowed parameters ::
{
    "statusCode": "INVALID_PARAMETERS",
    "message": "Parameter 'ids' is not allowed"
}
```

## Delete Employee Record
Description : Creates an employee record.

Endpoint URL:  {hostDomain}/employee/get
```endpoint
http://localhost:3000/employee/get
```

Method :
```method
DELETE
```

Authentication :
```authentication
Basic Auth with username  as hapijsapipocv1 and password as J&jHapiJs@Poc2022
```

Request params(any one of the below keys are allowed) :
| Key           | Value         |
| ------------- |:-------------:|
| id            | Employee Id|
| email         | Employee Email|

Response :
```success
Success
{
    "statusCode": "OK",
    "message": "Employee record created successfully with employee id '4'."
}
```

```errors
Errors
For No user found
{
    "statusCode": "USER_NOT_FOUND",
    "message": "No such Employee record was found with 'email = test@test.com'."
}
Or
{
    "statusCode": "USER_NOT_FOUND",
    "message": "No such Employee record was found with 'id = 4'."
}
Or
For not sending the required parameters ::
{
    "statusCode": "INVALID_PARAMETERS",
    "message": "Invalid parameters. The parameters that must be send is 'id' or 'email'."
}
Or
For non allowed parameters ::
{
    "statusCode": "INVALID_PARAMETERS",
    "message": "Parameter 'ids' is not allowed"
}
```

## Introductory Hapi Lab Tests
 - Go to the project folder "hapijs_api_poc"
 - ```bash run command "npm test" ```
 - You will see the a html file has been generated as "lab-test-report.html" inside the "test" folder
 - Open the html report file in browser and check the lab test report and code coverage generated. You may now play through the lab tests
 - For reference please go through https://hapi.dev/module/lab/ & https://hapi.dev/module/code/
