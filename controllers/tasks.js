const Task = require("../models/Tasks");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // res.status(200).json({tasks, amount: tasks.length});
  // res.status(200).json({status: "success", data: { tasks, amount: tasks.length });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    // Using error class to create an error and response

    // goes direct error handler middlaware
    return next(createCustomError(`No task with id ${taskID}`, 404));

    // goes first asycn wrapper catch's block, than goes error handler middlaware
    // throw createCustomError(`No task with id ${taskID}`, 404);

    // error response in controller - manuel
    // return res.status(404).json({ msg: `No task with id ${taskID}` });
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findByIdAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id ${taskID}`, 404));
  }
  res.status(200).json({ task });
  // res.status(200).send();
  // res.status(200).json({ task: null, status: "success" });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
