const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
app.use(cors());
app.use(express.json());

require("./models/models");

app.use(require("./routes/auth"));


const port = 5000; // You can change this port number to any port you prefer

// MongoDB connection URL
const mongoUrl=require("./keys");
mongoose.connect(mongoUrl);


// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!'); // Send a simple text response
});

// Connect to MongoDB
MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');
    
    // Define additional routes or perform database operations here

    // Start the server and listen on the specified port
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
