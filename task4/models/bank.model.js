const mongoose = require("mongoose");

const bank = mongoose.model("Bank", {
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 30,
  },
  balance: {
    type: Number,
    default: 0,
  },
  transactions: [
    {
      type: {
        type: String,
        required: true,
      },
      value: {
        type: Number,
        required: true,
        min: 1,
        max: 10000,
      },
    },
  ],
});

module.exports = bank;
