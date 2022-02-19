const router = require("express").Router();
const tasksController = require("../controller/tasks.controller");

router.get("/", tasksController.allTasks);
router.get("/addTask", tasksController.addTask);
router.post("/addTask", tasksController.addTaskLogic);
router.get("/single/:title", tasksController.showSingle);
router.get("/edit/:title", tasksController.edit);
router.post("/edit/:title", tasksController.editLogic);
router.get("/del/:title", tasksController.deleteSingle);
router.post("/delAll", tasksController.deleteAll);
module.exports = router;
