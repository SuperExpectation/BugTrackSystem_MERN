var express = require('express'),
 router = express.Router(),

module.exports = function(app) {
 router.get('/', home.index);
 router.get('/bugs/:id', bug._id);
 router.post('/images', image.create);

 app.use(router);
};