const validator = require("validator");

const dateFormat = (date) => {
  return `${date.getDate()}-${date.getMonth()}-${date.getYear()}`;
};

const customerData = [
  {
    ele: "customerName",
    default: false,
    invalid: (data) => (data.length > 0 ? false : "customer name is empty"),
  },
  {
    ele: "customerEmail",
    default: false,
    invalid: (data) =>
      validator.isEmail(data) ? false : "Email doesn't correct",
  },
  {
    ele: "addedAt",
    default: dateFormat(new Date()),
    invalid: (data) => false,
  },
];


module.exports = customerData;
