# Hapi Js Api POC
> A POC to explore the hapi js framework and apis. The version1 supports usage of hapijs plugins, modules, routings, database interaction and crud operations via api endpoints.

__Table of contents__

  - [System Requirements](#system-requirements)
  - [Application Installation](#application-installation)
  - [Initiating Application](#initiating-application)
  - [Site Basic Authentication](#site-basic-authentication)
  - [Api V1 Details](#api-v1-details)

## System Requirements

 - Please follow the MySQL Installation Guide and install MySQL in your system and it must be active and running
 - Your system must have node v16 or above installed in it

## Application Installation

 - Download/Clone the code from https://github.com/nathmonoj2014/hapijs_api_poc
 - Go to the project folder "hapijs_api_poc"
 - ```bash run command "npm install" ```
 - You will see the "node_modules" folder got generated and the project is ready now

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
            "id": 4,
            "email": "test@test.com",
            "name": "Test User",
            "role": "Test Role",
            "created": "2022-09-28T10:00:45.000Z",
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
    "message": "Employee record created successfully with employee id '4'."
}
```

```errors
Errors
For duplocate entry
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
For non allowed parameters ::
{
    "statusCode": "INVALID_PARAMETERS",
    "message": "Parameter 'emails' is not allowed"
}
```
