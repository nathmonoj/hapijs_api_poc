'use strict';

/**
 * Home page Controller
 */
exports.home = (req, res) => {
  // Retruning view from the index html template.
  return res.view('index');
}

/**
 * Help page Controller
 */
exports.help = (req, res) => {
  // Retruning view from the help html template.
  return res.view('help');
}
