const addCustomer = document.getElementById("addCustomer");
const datawrap = document.getElementById("datawrap");
const addTransaction = document.getElementById("addTransaction");
const deleteCustomer = document.getElementById("deleteCustomer");

const createMyOwnElement = (elementObject) => {
  try {
    let myElement = document.createElement(elementObject.element);
    elementObject.parent.appendChild(myElement);
    if (elementObject.textContent)
      myElement.textContent = elementObject.textContent;
    if (elementObject.classes) myElement.classList = elementObject.classes;
    elementObject.attributes.forEach((attribute) => {
      myElement.setAttribute(attribute.key, attribute.value);
    });
    return myElement;
  } catch (error) {
    console.log(error);
  }
};

const elementObjCreator = (
  element,
  parent,
  textContent,
  classes,
  attributes
) => {
  return { element, parent, textContent, classes, attributes };
};

const readFromStorage = (storageItem) => {
  let customers;
  try {
    customers = JSON.parse(localStorage.getItem(storageItem));
    if (!Array.isArray(customers)) throw new Error("Customers is not an array");
  } catch {
    customers = [];
  }
  return customers;
};

const writeDataToStorage = (storageItem, customersData) => {
  localStorage.setItem(storageItem, JSON.stringify(customersData));
};

const drawTransactionTypes = (transactionTypes) => {
  transactionTypes.forEach((transType) => {
    createMyOwnElement(
      elementObjCreator(
        "option",
        document.getElementById("transactionType"),
        transType,
        null,
        [{ key: "value", value: transType }]
      )
    );
  });
};

getIndexOfCustomer = () => {};

if (addCustomer) {
  addCustomer.addEventListener("submit", (event) => {
    event.preventDefault();
    const newCustomer = {
      accNumber: Date.now(),
      name: addCustomer.elements["customerName"].value,
      balance: 0,
      transactions: [{}],
    };
    const customers = readFromStorage("customers");
    customers.push(newCustomer);
    writeDataToStorage("customers", customers);
    addCustomer.reset();
  });
}

const dataEmptyRow = (colSpan) => {
  const tr = createMyOwnElement(
    elementObjCreator("tr", datawrap, null, "alert alert-danger", [])
  );
  createMyOwnElement(
    elementObjCreator("td", tr, "no customers yet", "text-center", [
      { key: "colspan", value: colSpan },
    ])
  );
};

const drawCustomer = (customer, index) => {
  const tr = createMyOwnElement(
    elementObjCreator("tr", datawrap, null, null, [])
  );
  createMyOwnElement(elementObjCreator("td", tr, customer.accNumber, null, []));
  createMyOwnElement(elementObjCreator("td", tr, customer.name, null, []));
  createMyOwnElement(elementObjCreator("td", tr, customer.balance, null, []));
  let str = "";
  customer.transactions.forEach((transaction) => {
    if (transaction.transactionType) {
      console.log(transaction);
      str += `${transaction.transactionType}: ${transaction.value}, `;
    }
  });
  createMyOwnElement(elementObjCreator("td", tr, str, null, []));
};

const drawAllCustomers = (customers) => {
  datawrap.textContent = "";
  if (customers.length === 0) {
    dataEmptyRow(6);
  }
  customers.forEach((customer, i) => drawCustomer(customer, i));
};

if (datawrap) {
  drawAllCustomers(readFromStorage("customers"));
  const deleteAll = document.getElementById("deleteAll");
  deleteAll.addEventListener("click", () => {
    writeDataToStorage("customers", []);
    drawAllCustomers([]);
  });
}

if (addTransaction) {
  const transactionTypes = ["withdraw", "deposit"];
  drawTransactionTypes(transactionTypes);
  addTransaction.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const customerAccNum =
        addTransaction.elements["customerAccountNum"].value;
      const value = addTransaction.elements["value"].value;
      const transactionType = addTransaction.elements["transactionType"].value;
      if (!(customerAccNum && value && transactionType !== "Transaction Type"))
        throw new Error("You must complete the from before submession");
      if (isNaN(value)) throw new Error("The value must to be a number");
      if (isNaN(customerAccNum))
        throw new Error("The account number must be a number");
      const allCustomers = readFromStorage("customers");
      const customerIndex = allCustomers.findIndex(
        (customer) => customer.accNumber == customerAccNum
      );
      if (customerIndex == -1)
        throw new Error("There is no customer with this account number");
      if (transactionType == "withdraw") {
        if (Number(allCustomers[customerIndex].balance) < Number(value))
          throw new Error("You don't have enough money");
        allCustomers[customerIndex].balance =
          Number(allCustomers[customerIndex].balance) - Number(value);
        allCustomers[customerIndex].transactions.push({
          transactionType,
          value,
        });
      } else {
        console.log(allCustomers[customerIndex].balance);
        allCustomers[customerIndex].balance =
          Number(allCustomers[customerIndex].balance) + Number(value);
        console.log(allCustomers[customerIndex].balance);
        allCustomers[customerIndex].transactions.push({
          transactionType,
          value,
        });
      }
      writeDataToStorage("customers", allCustomers);
      window.location.href = "index.html";
    } catch (error) {
      alert(error.message);
    }
  });
}

if (deleteCustomer) {
  deleteCustomer.addEventListener("submit", (event) => {
    event.preventDefault();
    try {
      const allCustomers = readFromStorage("customers");
      const customerNumber = deleteCustomer.elements["customerNumber"].value;
      // console.log(customerId);
      // allCustomers.forEach((customer) => console.log(customer));
      const customerIndex = allCustomers.findIndex(
        (customer) => customer.accNumber == customerNumber
      );
      console.log(customerIndex);
      if (customerIndex == -1)
        throw new Error("There is no customer with this id");
      allCustomers.splice(customerIndex, 1);
      writeDataToStorage("customers", allCustomers);
      window.location.href = "index.html";
    } catch (err) {
      alert(err);
    }
  });
}
