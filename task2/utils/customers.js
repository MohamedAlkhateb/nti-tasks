const chalk = require("chalk");
const {
  readDataFromFile,
  writeDataToFile,
  printError,
} = require("./dealWithData");
const customerData = require("./validation");

const addCustomer = (args) => {
  try {
    let customer = {};
    customerData.forEach((data) => {
      const isInvalid = data.invalid(args[data.ele]);
      if (isInvalid) throw new Error(isInvalid);
      if (!data.default) customer[data.ele] = args[data.ele];
      else customer.date = data.default;
    });

    const allCustomers = readDataFromFile("./db/data.json");
    if (allCustomers.length != 0)
      customer.id = allCustomers[allCustomers.length - 1].id + 1;
    else customer.id = 0;
    customer.balance = 0;
    customer.transaction = [];
    allCustomers.push(customer);
    writeDataToFile("./db/data.json", allCustomers);
  } catch (err) {
    printError(err.message);
  }
};

const addTransaction = ({ transactionType, value, customerId }) => {
  try {
    value = Number(value);
    if (value <= 0) throw new Error("The value must be greater than zero");
    const allCustomers = readDataFromFile("./db/data.json");
    if (allCustomers.length == 0)
      throw new Error("There is no customers to make transaction");
    const customerIndex = allCustomers.findIndex(
      (customer) => customerId == customer.id
    );
    if (customerIndex == -1) throw new Error("There is no user with thid id");
    const balance = Number(allCustomers[customerIndex].balance);
    if (transactionType == "deposit")
      allCustomers[customerIndex].balance = balance + value;
    else if (transactionType == "withdraw") {
      if (balance < value) throw new Error("You don't have enough money");
      allCustomers[customerIndex].balance = balance - value;
    } else throw new Error("Invalid transaction type");
    allCustomers[customerIndex].transaction.push({ transactionType, value });
    writeDataToFile("./db/data.json", allCustomers);
  } catch (err) {
    printError(err);
  }
};

const showAllCustomers = () => {
  try {
    const allCustomers = readDataFromFile("./db/data.json");
    allCustomers.forEach((customer) => {
      console.log(
        chalk.green(
          `Customer ${customer.id}:\nName:${customer.customerName} - email:${customer.customerEmail} - customer added at:${customer.date} - balance:${customer.balance}]\n`
        )
      );
      console.log(chalk.green(`Transactions:`));
      customer.transaction.forEach((transaction) => {
        console.log(
          chalk.green(`${transaction.transactionType} - ${transaction.value}, `)
        );
      });
      console.log("------------------------------");
    });
  } catch (err) {
    printError(err.message);
  }
};

const deleteAllCustomers = () => {
  writeDataToFile("./db/data.json", []);
};

const deleteCustomer = (id) => {
  try {
    const allCustomers = readDataFromFile("./db/data.json");
    if (allCustomers.length == 0)
      throw new Error("There is no customers to delete");
    customerIndex = allCustomers.findIndex((customer) => customer.id == id);
    if (customerIndex == -1)
      throw new Error("There is no customer with this id");
    allCustomers.splice(customerIndex, 1);
    writeDataToFile("./db/data.json", allCustomers);
  } catch (err) {
    printError(err);
  }
};

const showCustomer = (id) => {
  try {
    const allCustomers = readDataFromFile("./db/data.json");
    if (allCustomers.length == 0)
      throw new Error("There is no customers to show");
    customerIndex = allCustomers.findIndex((customer) => customer.id == id);
    if (customerIndex == -1)
      throw new Error("There is no customer with this id");
    console.log(
      chalk.green(
        `Customer ${allCustomers[customerIndex].id}:\nName:${allCustomers[customerIndex].customerName} - email:${allCustomers[customerIndex].customerEmail} - customer added at:${allCustomers[customerIndex].date} - balance:${allCustomers[customerIndex].balance}]\n`
      )
    );
    console.log(chalk.green(`Transactions:`));
    allCustomers[customerIndex].transaction.forEach((transaction) => {
      console.log(
        chalk.green(`${transaction.transactionType} - ${transaction.value}, `)
      );
    });
  } catch (err) {
    printError(err);
  }
};

module.exports = {
  addCustomer,
  addTransaction,
  showAllCustomers,
  deleteAllCustomers,
  deleteCustomer,
  showCustomer,
};
