const mongoose = require('mongoose');


// schema
const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    domain:String,
    department:String,
    year:String,
    college:String,
    contact:String,
    password:String
})


// model
module.exports = mongoose.model('Users',userSchema);