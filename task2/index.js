const { array } = require("yargs");
const yargs = require("yargs");
const customers = require("./utils/customers");

yargs.command({
  command: "addCustomer",
  desciption: "add new customer",
  builder: {
    customerName: {
      demandOption: true,
      desciption: "customer name",
    },
    customerEmail: {
      demandOption: true,
      desciption: "customer email",
    },
  },
  handler: (argv) => {
    customers.addCustomer(argv);
  },
});

yargs.command({
  command: "addTransaction",
  desciption: "add new transaction",
  builder: {
    customerId: {
      demandOption: true,
      desciption: "id of the user",
    },
    transactionType: {
      demandOption: true,
      desciption: "transaction type",
    },
    value: {
      demandOption: true,
      desciption: "value of transaction",
    },
  },
  handler: (argv) => {
    customers.addTransaction(argv);
  },
});

yargs.command({
  command: "showAll",
  desciption: "show all customers",
  handler: (argv) => {
    customers.showAllCustomers();
  },
});

yargs.command({
  command: "deleteAll",
  desciption: "delete all customers",
  handler: (argv) => {
    customers.deleteAllCustomers();
  },
});

yargs.command({
  command: "delete",
  desciption: "delete a cutomer",
  builder: {
    id: {
      demandOption: true,
      desciption: "customer id",
    },
  },
  handler(argv) {
    customers.deleteCustomer(argv.id);
  },
});

yargs.command({
  command: "show",
  desciption: "show a customer",
  builder: {
    id: {
      demandOption: true,
      desciption: "customer id",
    },
  },
  handler(argv) {
    customers.showCustomer(argv.id);
  },
});

yargs.argv;
