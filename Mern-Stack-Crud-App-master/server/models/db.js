const mongoose = require('mongoose');
// Allow Promises
mongoose.Promise = global.Promise;
// Connection
// mongodb+srv://aherrahul1995@gmail.com:Rah@4567@cluster0.z8lyk.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect('mongodb://localhost:27017/db_test', { useNewUrlParser: true, useUnifiedTopology: true });
// Validation
mongoose.connection
  .once('open', () => console.log('Connected to the database!'))
  .on('error', err => console.log('Error with the database!', err));
