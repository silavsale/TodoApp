import { auth } from '../../middleware/firebase'

export function Logout(user) {
  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div className='flex  items-center justify-center p-10'>
      {user ? (
        <>
          <button
            className='bg-button-bg-light dark:bg-button-bg-dark hover:bg-button-bg-hover-light
            dark:hover:bg-button-nav-bg-hover-dark text-button-text-light dark:text-button-text-dark font-bold py-2 px-4 rounded'
            onClick={handleLogout}
          >
            Logout
          </button>
        </>
      ) : (
        <Login />
      )}
    </div>
  )
}
