import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const auth = getAuth()
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
    } catch (error) {
      setError(error.message)
    }
  }

  const handleToggleRegister = () => {
    setIsRegistering((prevIsRegistering) => !prevIsRegistering)
    setError('')
  }

  return (
    <div className='flex flex-col items-center justify-center py-48 '>
      <h2 className='text-2xl font-bold mb-6 text-text-light dark:text-text-dark'>
        {isRegistering ? 'Register' : 'Login'}
      </h2>
      <form className='w-72' onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='email'
            className='block font-medium mb-2 text-text-light dark:text-text-dark'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            className='w-full border border-button-bg-light dark:border-button-bg-dark rounded py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-button-bg-hover-light'
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='password'
            className='block font-medium mb-2 text-text-light dark:text-text-dark'
          >
            Password
          </label>
          <input
            type='password'
            id='password'
            className='w-full border text-input-text-light dark:text-input-text-dark border-button-bg-light dark:border-button-bg-dark rounded py-2 px-3 leading-tight focus:outline-none focus:ring-2 focus:ring-button-bg-hover-light dark:focus:ring-button-bg-hover-dark'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button
          type='submit'
          className='bg-button-bg-light dark:bg-button-bg-dark hover:bg-button-bg-hover-light text-button-text-light dark:text-button-text-dark font-bold py-2 px-4 rounded'
          // onClick={() => handleLogin()}
        >
          {isRegistering ? 'Register' : 'Login'}
        </button>
        {error && <p className='text-red-500 mt-2'>{error}</p>}
      </form>
      <div className='mt-4'>
        <button
          type='button'
          className='underline  hover:text-text-hover-light dark:hover:text-text-hover-dark text-text-light dark:text-text-dark'
          onClick={handleToggleRegister}
        >
          {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  )
}
