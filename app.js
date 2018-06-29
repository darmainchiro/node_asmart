const createError   = require('http-errors');
const express       = require('express');
const app           = express();
const path          = require('path');
const cookieParser  = require('cookie-parser');
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
const mongoose      = require('mongoose');

const productRoutes     = require('./api/routes/products');
const orderRoutes       = require('./api/routes/orders');
const conditionRoutes   = require('./api/routes/conditions');
const historykuRouter   = require('./api/routes/history');
const relayRoutes       = require('./api/routes/relay');
const userRoutes        = require('./api/routes/user');
const indexRouter       = require('./routes/index');
const loginRouter       = require('./routes/login');
const controllerRouter  = require('./routes/controller');
const historyRouter     = require('./routes/history');
const usersRouter       = require('./routes/users');
const cobaRouter        = require('./routes/coba');
const ajiku             = require('./routes/api');

const server  = require('http').Server(app);
const io    = require('socket.io')(server);

require('./socket/socket')(io);

//mongoose.connect(
//    "mongodb://aji:ajiganteng@asmart-shard-00-00-zef5d.mongodb.net:27017,asmart-shard-00-01-zef5d.mongodb.net:27017,asmart-shard-00-02-zef5d.mongodb.net:27017/test?ssl=true&replicaSet=Asmart-shard-0&authSource=admin").then(
//        () => {
//            console.log("sukses");
//        },err => {
//            console.log("Failed");
//        }
//    );

//database connect
var db = require('./config/db');
mongoose.connect(db.url, (err) =>{
    console.log('Connect');
});
mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method == 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routes
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/controller',controllerRouter);
app.use('/history', historyRouter);
app.use('/users', usersRouter);
app.use('/products', [productRoutes]);
app.use('/orders', [orderRoutes]);
app.use('/conditions', [conditionRoutes]);
app.use('/historyku',[historykuRouter]);
app.use('/relay', [relayRoutes]);
app.use('/user', [userRoutes]);
app.use('/coba', cobaRouter);
app.use('/api', ajiku);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

app.use((req, res, next) => {
    const error = new Error ('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = {app: app, server: server};