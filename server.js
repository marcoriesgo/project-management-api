const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require('path')

const users = require("./routes/api/users");
const todos = require("./routes/api/todos");
const projects = require("./routes/api/projects");

const app = express();

const port = process.env.PORT // process.env.port is Heroku's port if you choose to deploy the app there

// DB Config
const db = require("./config/keys").mongoURI;

const MONGODB_URI = process.env.MONGODB_URI || db

// Connect to MongoDB
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const connected = mongoose.connection;

// Error / success
connected.on('error', (err) => console.log(err.message + ' is Mongodb not running?'));
connected.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
connected.on('disconnected', () => console.log('mongo disconnected'));


// open the connection to mongo
connected.on('open' , ()=>{});

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use("/api/todos", todos);
app.use("/api/projects", projects);

//Server static assts if in production:
if (process.env.NODE_ENV === 'production') { 
  //set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}


app.listen(port, () => console.log("Server running on port:", port));