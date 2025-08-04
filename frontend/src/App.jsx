import { useState } from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import UpgradePlan from './components/UpgradePlan'

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Homepage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
      <Route path='/upgradeplan' element={<UpgradePlan/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
