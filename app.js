const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./db/connect");
require("dotenv").config();
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// static assets
app.use(express.static("./public"));

// json data
app.use(express.json());

app.use("/api/v1/tasks", tasks);

// Not Found - 404
app.use(notFound);

// Internal Server Error - 500
app.use(errorHandlerMiddleware);

// routes
// app.get("/api/v1/tasks");         - get all the tasks
// app.post("/api/v1/tasks");        - create a new task
// app.get("/api/v1/tasks/:id");     - get single task
// app.patch("/api/v1/tasks/:id");   - update task
// app.delete("/api/v1/tasks/:id");  - delete task

// Server stands
const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
