
/*
 * GET home page.
 */

var contador = require('../public/javascripts/count');
exports.index = function(req, res){
  res.render('index', { visitas: ('' + contador.getCount()) });
};