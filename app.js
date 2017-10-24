var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    exphbs  = require('express-handlebars'),
    http = require('http'),
    socketIO = require('socket.io');

var routes = require('./routes/index');

var app = express(),
    port = process.env.PORT || 3000,
    server = http.Server(app),
    io = socketIO.listen(server);

var allUsers = [];

// view engine setup
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    partialsDir: ['views/partials/']
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

// client-side setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Make socket io available through req
app.use(function(req, res, next){
    req.io = io;
    next();
});

// routes
for (var x in routes) {
    app.use(x, routes[x]);
}

/// catch 404 and forward to error handler
app.use(function(req, res) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
    });
});


// Start socket
io.on('connection', function(client){
    // New user
    client.on('new user', function(name, callback){
        if(isUniqueUser(name)){
            io.username = name;
            allUsers.push({name:io.username, id: client.id});
            callback(true);

            updateUsers(io,{name:io.username,id:client.id},'has joined the party');
        }
    });


    // Message submit
    client.on('send message', function(message){
        var id = this.id;
        var sender = checkCurrentUser(id);
        io.emit('new message', message, sender[0], id);
    });


    // Whenever a user shuts down the browser
    client.on('disconnect', function(){
        // Get the data of the current leaving user and update the list of users
        var leavingUser = checkCurrentUser(client.id);
        if (leavingUser) {
            updateUsers(io,leavingUser[0],'has left the party');
            // Remove leavingUser from list
            allUsers.pop(leavingUser);
        }
    });

});

function checkCurrentUser(id){
    var users = allUsers.filter(function(user){
        if(user.id == id){
            return user;
        }
    });
    return users;
}

function isUniqueUser(name){
    // src: https://github.com/eltongonc/real-time_web/issues/4
    return !allUsers.some(function (user) {
        return user.name === name;
    });
}

function updateUsers(io, user, message){
    io.emit('get users', user, allUsers, message);
}


// Start app
server.listen(port, function() {
    console.log('Express server listening on port ' + port);
});
