const express = require("express");
const router = express.Router();

const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

// Easy and short
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

// Another way to set up routes
// router.get("/", getAllTasks);
// router.post("/", createTask);
// router.get("/:id", getTask);
// router.patch("/:id", updateTask);
// router.delete("/:id", deleteTask);

module.exports = router;
