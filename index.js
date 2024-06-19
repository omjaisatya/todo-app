const { timeStamp } = require("console");
const express = require("express");
const mongoose = require("mongoose");
const { type } = require("os");
const path = require("path");

const PORT = 3000;

// init app
const app = express();

const connectionUrl = "mongodb://localhost:27017/todoDb";

mongoose
  .connect(connectionUrl)
  .then(() => console.log("Database connection succesfully"))
  .catch((error) => console.log(error.message));

const todoSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    desc: String,
  },
  { timestamp: true }
);

const Todo = mongoose.model("todo", todoSchema);

// view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res, next) => {
  try {
    res.render("index", { title: "List todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/add-todo", (req, res, next) => {
  try {
    res.render("newTodo", { title: "New todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/update-todo", (req, res, next) => {
  try {
    res.render("updateTodo", { title: "Update Todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/delete-todo", (req, res, next) => {
  try {
    res.render("deleteTodo", { title: "Delete Todo" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// listen
app.listen(PORT, () => {
  console.log(`Server is runnig on port ${PORT}`);
});
