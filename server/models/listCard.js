const mongoose = require("mongoose");

const ListCardSchema = new mongoose.Schema({
  listName: {
    type: String,
    required: true,
  },
  // cards: {
  //   type: String,
  //   required: true,
  // },
});

module.exports = mongoose.model("listCard", ListCardSchema);
