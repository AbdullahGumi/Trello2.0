const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema(
  {
    listName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", CardSchema);
