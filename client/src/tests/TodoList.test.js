import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import TodoList from '../components/Todos/TodoList'

const server = setupServer(
  rest.get('http://localhost:3000/todos', (req, res, ctx) => {
    return res(
      ctx.json({
        todos: [
          {
            _id: '1',
            todo_description: 'Learn Jest',
          },
          {
            _id: '2',
            todo_description: 'Write tests',
          },
        ],
        totalPages: 1,
      }),
    )
  }),

  rest.post('http://localhost:3000/todos/add', (req, res, ctx) => {
    return res(
      ctx.json({
        _id: '3',
        todo_description: req.body.todo_description,
      }),
    )
  }),

  rest.delete('http://localhost:3000/todos/:id', (req, res, ctx) => {
    return res(ctx.status(204))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('TodoList', () => {
  test('renders todo list', async () => {
    render(<TodoList />)

    expect(await screen.findByText(/list of your Todo's/i)).toBeInTheDocument()

    expect(await screen.findByText(/Learn Jest/i)).toBeInTheDocument()
    expect(await screen.findByText(/Write tests/i)).toBeInTheDocument()
  })

  test('adds new todo', async () => {
    render(<TodoList />)

    userEvent.type(screen.getByRole('textbox'), 'Write a new test')
    userEvent.click(screen.getByRole('button', { name: /add todo/i }))

    expect(await screen.findByText(/Write a new test/i)).toBeInTheDocument()
  })

  test('deletes todo', async () => {
    render(<TodoList />)

    userEvent.click(screen.getByRole('button', { name: /delete/i }))

    expect(await screen.queryByText(/Learn Jest/i)).not.toBeInTheDocument()
  })
})
