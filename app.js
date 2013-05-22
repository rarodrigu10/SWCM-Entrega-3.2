
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , informacion = require('./routes/info')
  , path = require('path');

var postController = require('./routes/post_controller.js');
var partials = require('express-partials');
var contador = require('./public/javascripts/count');

var app = express();
app.use(partials());
app.use(contador.count_mw);

// all environments
app.configure(function(){
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
});


app.configure('development', function(){
  app.use(express.errorHandler());
});


// Helper estatico:
app.locals.escapeText = function(text) {
   return String(text)
          .replace(/&(?!\w+;)/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/\n/g, '<br>');
};

// Routes
app.get('/', contador.count_mw, routes.index);
app.get('/users', user.list);
app.get('/info', informacion.ver);

// ---------------------------------------------
app.get('/posts.:format?', postController.index);
app.get('/posts/new', postController.new);
app.get('/posts/:postid([0-9]+).:format?', postController.show);
app.post('/posts', postController.create);
app.get('/posts/:postid([0-9]+)/edit', postController.edit);
app.put('/posts/:postid([0-9]+)', postController.update);
app.delete('/posts/:postid([0-9]+)', postController.destroy);
app.get('/posts/search', postController.search);





http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
