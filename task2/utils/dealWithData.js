const fs = require("fs");
const chalk = require("chalk");

const printError = (err) => {
  console.log(chalk.bgRed.white(err));
};

const printSuccess = (msg) => {
  console.log(chalk.bgGreen.white(msg));
};

const writeDataToFile = (fileName, data) => {
  try {
    if (!Array.isArray(data)) throw new Error("data must to be array");
    fs.writeFileSync(fileName, JSON.stringify(data));
    printSuccess("New data added");
  } catch (err) {
    printError(err.message);
  }
};

const readDataFromFile = (fileName) => {
  let data;
  try {
    data = JSON.parse(fs.readFileSync(fileName));
  } catch (err) {
    printError("Data reset");
    data = [];
  }
  return data;
};

module.exports = {
  writeDataToFile,
  readDataFromFile,
  printError,
  printSuccess,
};
