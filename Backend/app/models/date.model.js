const mongoose = require("mongoose");

const Date = mongoose.model(
  "Date",
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

module.exports = Date;
