require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use('/', router)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once('open', function() {
  console.log('Connected to the Database.');
});

mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
});

app.listen(PORT, function() { console.log(`Server listening on port ${PORT}`) });