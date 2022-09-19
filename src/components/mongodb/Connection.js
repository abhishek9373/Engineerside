const mongoose = require('mongoose');

// database connectivity
let db =await mongoose.connect("mongodb://localhost:27017/EngineersideDb");

module.exports = db;
// 