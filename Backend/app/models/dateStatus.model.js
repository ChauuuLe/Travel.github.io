const mongoose = require("mongoose");

const DateStatus = mongoose.model(
  "DateStatus",
  new mongoose.Schema({  
    username: { 
      type: String, 
      require: true 
    },
    dates: { 
      type: Map,
      of: String,
      default: {}
    },
  })
);

module.exports = DateStatus;
