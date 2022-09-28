'use strict';

/**
 * Employee Create Api Param checker.
 */
exports.checkEmployeeCreateApiParams = (payload) => {
  return checkApiParamsOrPayload(payload, {
    'email': '',
    'name': '',
    'role': ''
  }, 3);
}
/**
 * Employee Update Api Payload checker.
 */
exports.checkEmployeeUpdateApiPayload = (payload) => {
  return checkApiParamsOrPayload(payload, {
    'email': '',
    'name': '',
    'role': ''
  }, 3, 'or', true);
}

/**
 * Specific Employee get Api Param checker.
 */
exports.checkEmployeeGetOrDeleteApiParams = (query) => {
  return checkApiParamsOrPayload(query, {
    'id': '',
    'email': ''
  }, 1, 'or');
}

/**
 * Check APi params.
 */
const checkApiParamsOrPayload = (data_to_check, allowed_params, param_length_limit, check_type = 'and', min_and_maximum_check = false) => {
  let param_check = {
    is_error: false,
    checked_data: data_to_check
  };
  let allow_check = false;
  if (!min_and_maximum_check) {
    if (param_length_limit && (Object.keys(data_to_check).length == param_length_limit)) {
      allow_check = true;
    }
    else {
      // Error message if the main param lengths are not matched.
      param_check = {
        is_error: true,
        error_msg: {
          statusCode: 'INVALID_PARAMETERS',
          message: `Invalid parameters. The parameters that must be send ${(check_type == 'and') ? 'are' : 'is'} '${Object.keys(allowed_params).join(`' ${check_type} '`)}'.`
        }
      };
    }
  }
  else {
    if (Object.keys(data_to_check).length && (Object.keys(data_to_check).length <= param_length_limit)) {
      allow_check = true;
    }
    else {
      // Error message if the main param lengths are not matched.
      param_check = {
        is_error: true,
        error_msg: {
          statusCode: 'INVALID_PARAMETERS',
          message: `Invalid parameters. The allowed parameters that can be send individually or alltogether are '${Object.keys(allowed_params).join(`' ${check_type} '`)}'.`
        }
      };
    }
  }
  /* if (Object.keys(data_to_check).length != param_length_limit) {
    param_check = {
      is_error: true,
      error_msg: {
        statusCode: 'INVALID_PARAMETERS',
        message: `Invalid parameters. The parameters that must be send ${(check_type == 'and') ? 'are' : 'is'} '${Object.keys(allowed_params).join(`' ${check_type} '`)}'.`
      }
    };
  }
  else { */
  if (allow_check) {
    Object.entries(data_to_check).every(([key, value]) => {
      if (!(key in allowed_params)) {
        param_check = {
          is_error: true,
          error_msg: {
            statusCode: 'INVALID_PARAMETERS',
            message: `Parameter '${key}' is not allowed`
          }
        };
        return false;
      }
      return true;
    });
  }
  return param_check;
};

