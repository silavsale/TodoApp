import mongoose, { Schema } from "mongoose"

const TodoSchema = new Schema({
  todo_description: {
    type: String,
  },
  todo_responsible: {
    type: String,
  },
  todo_priority: {
    type: String,
  },
  todo_completed: {
    type: Boolean,
  },
})

export default mongoose.model("Todo", TodoSchema)
