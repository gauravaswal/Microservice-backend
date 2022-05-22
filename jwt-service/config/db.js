var mongoose = require('mongoose');

//Set up default mongoose connection
console.log(process.env.MONGO_URL)
//Get the default connection
var db = mongoose.connect('mongodb://localhost:27017/logintoken', { useNewUrlParser: true, useUnifiedTopology: true })
    .then((db) => { console.log(`connected`); })
    .catch(error => console.log(error));

module.exports = db