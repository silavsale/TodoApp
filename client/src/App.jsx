import Navbar from './components/sharedComponents/Navbar/Navbar'
import { Router } from './routes/Router'
import './style/App.css'

function App() {
  return (
    <div className=' min-h-screen dark:bg-bg-dark bg-bg-light'>
      <Navbar />
      <Router />
    </div>
  )
}

export default App
