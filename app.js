const express = require('express');
const app = express();
const cors = require('cors');
const { MongoClient } = require('mongodb');
const mongoose = require('mongoose');
const path = require('path');
app.use(cors());
app.use(express.json());

require("./models/models");
require("./models/post");

app.use(require("./routes/auth"));

app.use(require("./routes/createPost"));


const port = process.env.port||5000; // You can change this port number to any port you prefer

// MongoDB connection URL
const {mongoUrl}=require("./keys");
mongoose.connect(mongoUrl);


// Define a route for the root URL


// Connect to MongoDB
MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to MongoDB');

    //serving the frontend
    app.use(express.static(path.join(__dirname,"./frontend/build" )))

    app.get("*",(req,res)=>{
      res.sendFile(path.join(__dirname,"./frontend/build/index.html"),
        function(err){
          res.status(500).send(err)
        })
    })
    
    // Define additional routes or perform database operations here

    // Start the server and listen on the specified port
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });
