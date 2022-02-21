const async = require("hbs/lib/async");
const { findById } = require("../models/bank.model");
const bankModel = require("../models/bank.model");

const allCustomers = async (req, res) => {
  try {
    const allCustomers = await bankModel.find();
    res.render("all", {
      pageTitle: "All customers",
      allCustomers,
      isEmpty: allCustomers.length == 0 ? true : false,
    });
  } catch (err) {
    res.send(err);
  }
};

const addCustomer = (req, res) => {
  res.render("addCustomer", { pageTitle: "Add Customer" });
};

const addCustomerLogic = async (req, res) => {
  try {
    const customer = new bankModel({ ...req.body });
    await customer.save();
    res.redirect("/");
  } catch (err) {
    const msg = err.message;
    res.render("addCustomer", {
      pageTitle: "add customer",
      msg,
    });
  }
};

const addTransaction = (req, res) => {
  res.render("addTransaction", { pageTitle: "Add Transaction" });
};

const addTransactionLogic = async (req, res) => {
  try {
    const type = req.body.transactionType;
    const value = Number(req.body.value);
    const customer = await bankModel.findById(req.params.id);
    if (type === "deposit") {
      customer.balance += value;
    } else if (type === "withdraw" && customer.balance < value)
      throw new Error("You don't have enough money!");
    else {
      customer.balance -= value;
    }
    customer.transactions.push({
      type,
      value,
    });
    await customer.save();
    res.render("addTransaction", { pageTitle: "Add Transaction" });
  } catch (err) {
    const msg = err.message;
    res.render("addTransaction", {
      pageTitle: "Add Transaction",
      msg,
    });
  }
};

const showTransactions = async (req, res) => {
  try {
    const customer = await bankModel.findById(req.params.id);
    res.render("showTransactions", {
      pageTitle: "Show Transactions",
      transactions: customer.transactions,
      isEmpty: customer.transactions.length == 0 ? true : false,
    });
  } catch (err) {
    res.send(err.message);
  }
};

const delAll = async (req, res) => {
  try {
    await bankModel.deleteMany();
    res.redirect("/");
  } catch (err) {
    res.send(err.message);
  }
};

const deleteCustomer = async (req, res) => {
  try {
    await bankModel.findOneAndDelete(req.params.id);
    res.redirect("/");
  } catch (err) {
    res.send(err.message);
  }
};

const editCustoemr = async (req, res) => {
  try {
    const customer = await bankModel.findById(req.params.id);
    res.render("edit", { pageTitle: "Edit customer", customer });
  } catch (err) {
    res.send(err.message);
  }
};

const editCustoemrLogic = async (req, res) => {
  try {
    await bankModel.findByIdAndUpdate(req.params.id, req.body, {
      runValidators: true,
    });
    res.redirect("/");
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  allCustomers,
  addCustomer,
  addCustomerLogic,
  addTransaction,
  addTransactionLogic,
  showTransactions,
  delAll,
  deleteCustomer,
  editCustoemr,
  editCustoemrLogic,
};
