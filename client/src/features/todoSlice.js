import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { auth, db, firebase } from '../middleware/firebase'
// import firebase from 'firebase/app'
import 'firebase/database'

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (newTodo) => {
  const user = auth.currentUser
  if (user) {
    const todosRef = firebase.database().ref(`users/${user.uid}/todos`)
    const newTodoRef = todosRef.push()
    await newTodoRef.set(newTodo)
    return { id: newTodoRef.key, ...newTodo }
  } else {
    throw new Error('User not authenticated')
  }
})

export const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload)
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload)
    },
    setTodos: (state, action) => {
      state.todos = action.payload
    },
    completeTodo: (state, action) => {
      const todoId = action.payload
      const todoIndex = state.todos.findIndex((todo) => todo.id === todoId)
      if (todoIndex !== -1) {
        state.todos[todoIndex].completed = true
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTodoAsync.fulfilled, (state, action) => {
      state.todos.push(action.payload)
    })
  },
})

export const { addTodo, removeTodo, setTodos, completeTodo } = todoSlice.actions

export const fetchTodos = () => async (dispatch) => {
  const user = auth.currentUser
  // if (user) {
  //   const todosRef = firebase.database().ref(`users/${user.uid}/todos`)
  //   todosRef.on('value', (snapshot) => {
  //     const todos = []
  //     snapshot.forEach((childSnapshot) => {
  //       const todo = {
  //         id: childSnapshot.key,
  //         ...childSnapshot.val(),
  //       }
  //       todos.push(todo)
  //     })
  //     dispatch(setTodos(todos))
  //   })
  // } else {
  //   dispatch(setTodos([]))
  // }
}

export default todoSlice.reducer
