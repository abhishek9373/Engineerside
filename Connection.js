const mongoose = require('mongoose');

// database connectivity
let db = mongoose.connect("mongodb://localhost:27017/EngineersideDb");

module.exports = db;
// 