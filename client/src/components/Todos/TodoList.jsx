import React, { useState, useEffect } from 'react'
import { Logout } from '../Logout/Logout'
import AddTodo from './AddTodo'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../middleware/firebase'
import ButtonDelete from '../sharedComponents/Buttons/ButtonDelete'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [user] = useAuthState(auth)
  const [currentPage, setCurrentPage] = useState({ page: 1 })
  const [totalPages, setTotalPages] = useState(0)

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/todos?email=${user.email}&page=${currentPage.page}&limit=10`,
        )
        const data = await response.json()
        setTodos(data.todos)
        setTotalPages(data.totalPages)
      } catch (error) {
        console.error(error)
      }
    }
    fetchTodos()
  }, [currentPage])

  const handleAddTodo = async (newTodo) => {
    try {
      newTodo.todo_responsible = user.email
      await fetch('http://localhost:3000/todos/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      })
      setCurrentPage({ page: currentPage.page })
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: 'DELETE',
      })

      if (todos.length === 1 && currentPage.page > 1) {
        setCurrentPage({ page: currentPage.page - 1 })
      } else {
        setCurrentPage({ page: currentPage.page })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handlePrevPage = () => {
    console.log('currentPage', currentPage)
    setCurrentPage({ page: currentPage.page - 1 })
  }

  const handleNextPage = () => {
    setCurrentPage({ page: currentPage.page + 1 })
  }

  return (
    <div className='p-4'>
      <AddTodo handleAddTodo={handleAddTodo} />
      <h2 className='text-2xl font-bold my-4 text-center text-text-light dark:text-text-dark'>
        Hi <span className='italic'>{user?.email}</span>, list of your Todo's :
      </h2>
      <ul className='dark:bg-todoUl-bg-dark bg-todoUl-bg-light p-1 rounded'>
        {todos.map((todo) => (
          <div key={todo._id}>
            <li className='p-1 my-2 mx-2 dark:text-todoLi-text-dark text-todoLi-text-light dark:bg-todoLi-bg-dark bg-todoLi-bg-light w-auto rounded text-center flex justify-between'>
              {todo.todo_description} &nbsp;
              <ButtonDelete text='Delete' onClick={() => handleDeleteTodo(todo._id)} />
            </li>
          </div>
        ))}
      </ul>
      <div className='flex flex-col'>
        <div className='flex justify-center'>
          <p className='bg-blue-500 rounded p-1 m-2 dark:text-text-dark text-text-light'>
            Page:{' '}
            <span className='font-bold text-button-text-light dark:bg-button-bg-dark bg-button-bg-light rounded p-2'>
              {currentPage.page}
            </span>{' '}
            of{' '}
            <span className='font-bold text-button-text-light dark:bg-button-bg-dark bg-button-bg-light rounded p-2'>
              {totalPages}
            </span>
          </p>
        </div>
        <div className='flex justify-center space-x-3'>
          <button
            className='bg-button-bg-light dark:bg-button-bg-dark hover:bg-button-bg-hover-light
            dark:hover:bg-button-nav-bg-hover-dark text-button-text-light dark:text-button-text-dark font-bold py-1 px-2 rounded'
            disabled={currentPage.page === 1}
            onClick={handlePrevPage}
          >
            Prev
          </button>
          <button
            className='bg-button-bg-light dark:bg-button-bg-dark hover:bg-button-bg-hover-light
            dark:hover:bg-button-nav-bg-hover-dark text-button-text-light dark:text-button-text-dark font-bold py-1 px-2 rounded'
            disabled={currentPage.page === totalPages}
            onClick={handleNextPage}
          >
            {' '}
            Next
          </button>
        </div>
      </div>
      <Logout />
    </div>
  )
}

export default TodoList
