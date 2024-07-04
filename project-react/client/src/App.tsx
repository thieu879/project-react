import React from 'react'
import SidebarAdmin from './components/admin/SidebarAdmin'
import UserManagement from './pages/admin/UserManagement'
import { Route, Routes } from 'react-router-dom'
import AdminManagement from './pages/admin/AdminManagement'
import Register from './pages/user/Register'
import LogIn from './pages/user/LogIn'
import Header from './components/user/Header'
import Footer from './components/user/Footer'
import Home from './pages/user/Home/Home'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/admin' element={<UserManagement></UserManagement>}></Route>
        <Route path='/adminManagement' element={<AdminManagement></AdminManagement>}></Route>
      </Routes>
      <Routes>
        <Route path='' element={<Home></Home>}></Route>
        <Route path='/logIn' element={<LogIn></LogIn>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
      </Routes>
    </div>
  )
}
