import '../../style/index.css'

import React from 'react'

export function About() {
  return (
    <div className='container mx-auto p-4 text-text-light dark:text-text-dark'>
      <h1 className='text-2xl font-bold mb-4 text-text-light dark:text-text-dark'>
        About Todo App
      </h1>
      <p className='mb-4'>
        This is a simple todo app built with React and Redux. It uses Firebase for authentication
        and Node.js with MongoDB to store TODO's.
      </p>
      <h2 className='text-lg font-bold mb-2'>Technologies Used:</h2>
      <ul className='list-disc ml-8 mb-4'>
        <li>React</li>
        <li>Redux</li>
        <li>Tailwind CSS</li>
        <li>Firebase</li>
        <li>Node</li>
        <li>Express</li>
        <li>MongoDB</li>
      </ul>
      <h2 className='text-lg font-bold mb-2'>Features:</h2>
      <ul className='list-disc ml-8 mb-4'>
        <li>Add new todo items</li>
        <li>Remove existing todo items</li>
        <li>Mark todo items as completed</li>
        <li>User authentication with Firebase</li>
        <li>Data storage with Firebase Cloud Firestore</li>
      </ul>
      <p>
        For more information, check out the source code on{' '}
        <a href='https://gitlab.com/me6171208/todoapp'>GitLab</a>.
      </p>
    </div>
  )
}
