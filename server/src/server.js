import cors from "cors"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import express from "express"
import * as dotenv from "dotenv"

dotenv.config()

const todoRoutes = express.Router()
import Todo from "./models/todo.model.js"

const db = process.env.MONGODB_URL
const PORT = process.env.PORT || "3000"
const app = express()
app.use(cors())
app.use(bodyParser.json())

mongoose.set("strictQuery", true)
mongoose.connect(db, { useNewUrlParser: true })
const connection = mongoose.connection

connection.once("open", function () {
  console.log("MongoDB database connection established successfully")
})

todoRoutes.route("/").get(async function (req, res) {
  const filter = {}
  if (req.query.email) {
    filter.todo_responsible = req.query.email
  }

  const page = parseInt(req.query.page) || 1
  const limit = parseInt(req.query.limit) || 10
  const skipIndex = (page - 1) * limit

  const count = await Todo.countDocuments(filter)
  const totalPages = Math.ceil(count / limit)

  const todos = await Todo.find(filter)
    .sort([["_id", -1]])
    .skip(skipIndex)
    .limit(limit)
  // const todos = await Todo.find(filter).limit(limit).skip(skipIndex)

  res.send({
    todos: todos,
    totalPages: totalPages,
    currentPage: page,
  })
})

todoRoutes.route("/:id").get(async function (req, res) {
  let id = req.params.id
  await Todo.findById(id, function (err, todo) {
    res.json(todo)
  })
})

todoRoutes.route("/update/:id").post(async function (req, res) {
  await Todo.findById(req.params.id, function (err, todo) {
    if (!todo) res.status(404).send("data is not found")
    else todo.todo_description = req.body.todo_description
    todo.todo_responsible = req.body.todo_responsible
    todo.todo_priority = req.body.todo_priority
    todo.todo_completed = req.body.todo_completed

    todo
      .save()
      .then((todo) => {
        res.json("Todo updated!")
      })
      .catch((err) => {
        res.status(400).send("Update not possible")
      })
  })
})

todoRoutes.route("/add").post(async function (req, res) {
  let todo = new Todo(req.body)
  await todo
    .save()
    .then((todo) => {
      res.status(200).json({ todo: "todo added successfully" })
    })
    .catch((err) => {
      res.status(400).send("adding new todo failed")
    })
})

todoRoutes.route("/:id").delete(function (req, res) {
  Todo.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err)
      res.status(500).json({ error: "Failed to delete todo" })
    } else {
      res.json({ message: "Todo successfully deleted" })
    }
  })
})

app.use("/todos", todoRoutes)

app.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT)
})
