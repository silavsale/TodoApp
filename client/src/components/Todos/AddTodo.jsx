import React, { useState } from 'react'
import ButtonNav from '../sharedComponents/Buttons/ButtonNav'

function AddTodo({ handleAddTodo }) {
  const [todo, setTodo] = useState({
    todo_description: '',
    todo_responsible: '',
    todo_priority: '',
    todo_completed: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target

    setTodo({
      ...todo,
      [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await handleAddTodo(todo)

    setTodo({
      todo_description: '',
      todo_responsible: '',
      todo_priority: '',
      todo_completed: false,
    })
  }

  return (
    <div className='max-w-md mx-auto mt-4 px-4 py-6 dark:bg-nav-bg-dark bg-nav-bg-light  text-nav-text-light dark:text-nav-text-dark shadow-lg rounded-lg'>
      <h2 className='text-2xl font-bold mb-4 text-nav-text-light dark:text-nav-text-dark'>
        Add New Todo
      </h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4 #EEE9DA'>
          <label
            className='block font-bold mb-2 text-nav-text-light dark:text-nav-text-dark'
            htmlFor='todo_description'
          >
            Description
          </label>
          <input
            className='w-full border text-input-text-light dark:text-input-text-dark border-button-bg-light dark:border-button-bg-dark rounded py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-button-bg-hover-light'
            type='text'
            name='todo_description'
            value={todo.todo_description}
            onChange={handleChange}
          />
        </div>
        <div>
          <ButtonNav text='Add TODO' type='submit' />
        </div>
      </form>
    </div>
  )
}

export default AddTodo
