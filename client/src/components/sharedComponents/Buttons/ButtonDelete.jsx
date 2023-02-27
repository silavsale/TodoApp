function ButtonDelete(props) {
  const text = props.text
  return (
    <button
      onClick={props.onClick}
      className='bg-button-delete-bg-light dark:bg-button-delete-bg-dark dark:hover:bg-button-delete-hover-dark hover:bg-button-delete-hover-light text-button-text-light dark:text-button-text-dark font-bold py-2 px-4 rounded h-10 mx-4 my-auto'
    >
      {text}
    </button>
  )
}

export default ButtonDelete
