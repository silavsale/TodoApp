import { auth } from '../../middleware/firebase'

export function Logout(user) {
  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    // <div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 m-5'>
    // <div className='absolute inset-x-0 bottom-0 left-1/2 -translate-x-1/2 m-5 '>
    <div className='flex  items-center justify-center p-10'>
      {user ? (
        <>
          <button
            // className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
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
