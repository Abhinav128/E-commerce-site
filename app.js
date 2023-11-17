const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const dbURI = "mongodb+srv://abhinav_vv:VeNoM_2456@cluster0.3hdcwzh.mongodb.net/?retryWrites=true&w=majority";
const port = 4000;

app.use(cors());
app.use(express.static(`${__dirname}/public`)); // Serve static assets like CSS and JavaScript

app.use(bodyParser.json()); // Parse JSON
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

app.get('/signup', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

app.get('/home', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/home/product', (req, res, next) => {
    res.sendFile(path.join(__dirname, 'public', 'product.html'));
});
// Create a connection to the MongoDB database
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// Get the default connection
const db = mongoose.connection;

// Event listeners to handle connection events
db.on('connected', () => {
    console.log('Connected to the database');
  });
  
db.on('error', (err) => {
  console.error(`Database connection error: ${err}`);
});
  
db.on('disconnected', () => {
  console.log('Database connection disconnected');
});
  

// Require the routes file
const routes = require('./routes');

// Use the routes in your application
app.use('/', routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
