const dealWithData = require("./helpers/dealWithData");

const allTasks = (req, res) => {
  const allTasks = dealWithData.readDataFromJSON("./models/data.json");
  res.render("all", {
    pageTitle: "All Tasks",
    allTasks,
    isEmpty: allTasks.length == 0 ? true : false,
  });
};

const addTask = (req, res) => {
  res.render("addTask", {
    pageTitle: "Add new task",
  });
};

const addTaskLogic = (req, res) => {
  const { title, content } = req.body;
  if (title && content) {
    const allTasks = dealWithData.readDataFromJSON("./models/data.json");
    if (allTasks.length == 0) {
      allTasks.push({
        title: title,
        content: content,
      });
    } else {
      const index = allTasks.findIndex((task) => task.title == title);
      if (index == -1) {
        allTasks.push({
          title: title,
          content: content,
        });
      }
    }
    dealWithData.writeDataToFile("./models/data.json", allTasks);
    res.redirect("/");
  }
  res.render("addTask", {
    pageTitle: "Add new task",
  });
};

const showSingle = (req, res) => {
  const allTasks = dealWithData.readDataFromJSON("./models/data.json");
  const task = allTasks.find((task) => task.title == req.params.title);
  res.render("single", {
    task,
  });
};

const edit = (req, res) => {
  const allTasks = dealWithData.readDataFromJSON("./models/data.json");
  const task = allTasks.find((task) => task.title == req.params.title);
  res.render("edit", {
    task,
  });
};

const editLogic = (req, res) => {
  const allTasks = dealWithData.readDataFromJSON("./models/data.json");
  const taskIndex = allTasks.findIndex(
    (task) => task.title == req.params.title
  );
  allTasks[taskIndex].content = req.body.content;
  dealWithData.writeDataToFile("./models/data.json", allTasks);
  res.redirect("/");
};

const deleteSingle = (req, res) => {
  let allTasks = dealWithData.readDataFromJSON("./models/data.json");
  allTasks = allTasks.filter((task) => task.title != req.params.title);
  dealWithData.writeDataToFile("./models/data.json", allTasks);
  res.redirect("/");
};

const deleteAll = (req, res) => {
  dealWithData.writeDataToFile("./models/data.json", []);
  res.redirect("/");
};

module.exports = {
  allTasks,
  addTask,
  addTaskLogic,
  showSingle,
  edit,
  editLogic,
  deleteSingle,
  deleteAll,
};
