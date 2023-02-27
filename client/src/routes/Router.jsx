import { Routes, Route, Navigate } from 'react-router-dom'
import { About } from '../components/About/About'
import { Login } from '../components/Login/Login'

import { useState } from 'react'
import { auth } from '../middleware/firebase'
import TodoList from '../components/Todos/TodoList'

export function Router() {
  const [user, setUser] = useState(null)

  auth.onAuthStateChanged((user) => {
    setUser(user)
  })

  return (
    <Routes>
      {user ? (
        <>
          <Route path='/' element={<TodoList />} />
          <Route path='/about' element={<About />} />
        </>
      ) : (
        <Route path='/' element={<Login />} />
      )}
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}
