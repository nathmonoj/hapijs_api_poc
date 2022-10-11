'use strict';

/**
 * Home page Controller
 */
exports.home = (req, res) => {
  // Retruning view from the index html template.
  return res.view('index');
}
