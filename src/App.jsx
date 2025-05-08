import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Form from './components/Form'
import AllUser from './pages/allUser'
import Purchase from './pages/Purchase'
import Convert from './pages/Calendar'
import DashBoardTable from './pages/dashBoardTable'
// import SettingsPage from './pages/Settings'
import Help from './pages/Help'
function App() {
  const [isLoggedIn, setLoggedIn] = useState(true)
  return (
    <section className='w-full h-screen pt-4 bg-gray-900 flex overflow-hidden'>
      
      {/* <main className='w-full h-screen   '>
        <Dashboard />
      </main> */}
      <Router>
      {/* <Navbar /> */}
        <Routes>
          <Route path='/Dashboard' element={<Dashboard loggedIn={isLoggedIn}/>} />
          <Route path='/Users' element={<AllUser loggedIn={isLoggedIn}/>} />
          {/* <Route path='/Convert' element={<Convert loggedIn={isLoggedIn}/>} /> */}
          <Route path='/' element={<Form loggedIn={isLoggedIn}/>}/>
          {/* <Route path='/Settings' element={<SettingsPage loggedIn={isLoggedIn}/>} /> */}
          <Route path='/Help' element={<Help loggedIn={isLoggedIn}/>} />
          <Route path='/Purchase' element={<Purchase loggedIn={isLoggedIn}/>} />
        </Routes>
      </Router>
    </section>
  )
}

export default App
