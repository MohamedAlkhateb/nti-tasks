const router = require("express").Router();
const bankController = require("../controller/bank.controllers");

router.get("", bankController.allCustomers);
router.get("/addCustomer", bankController.addCustomer);
router.post("/addCustomer", bankController.addCustomerLogic);
router.get("/addTransaction/:id", bankController.addTransaction);
router.post("/addTransaction/:id", bankController.addTransactionLogic);
router.get("/showTransactions/:id", bankController.showTransactions);
router.get("/edit/:id", bankController.editCustoemr);
router.post("/edit/:id", bankController.editCustoemrLogic);
router.get("/del/:id", bankController.deleteCustomer);
router.post("/delAll", bankController.delAll);

module.exports = router;
