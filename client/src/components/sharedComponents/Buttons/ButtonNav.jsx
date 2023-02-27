function ButtonNav({ text }) {
  return (
    <button className='bg-button-bg-light dark:bg-button-bg-dark dark:hover:bg-button-nav-bg-hover-dark hover:bg-button-nav-bg-hover-light text-nav-text-light dark:text-nav-text-dark font-bold py-2 px-4 rounded'>
      {text}
    </button>
  )
}

export default ButtonNav
