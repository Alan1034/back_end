var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/', function (req, res, next) {
  res.writeHead(200, { 'Content-Type': "image/png;charset=UTF8", 'Access-Control-Allow-Origin': '*' });
});

module.exports = router;
