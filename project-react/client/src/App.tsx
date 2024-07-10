import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserManagement from './pages/admin/UserManagement';
import AdminManagement from './pages/admin/AdminManagement';
import Register from './pages/user/Register';
import LogIn from './pages/user/LogIn';
import Home from './pages/user/Home/Home';
import Infor from './pages/user/Infor';
import CourseManagement from './pages/admin/CourseManagement';
import Details from './pages/user/details/Details';
// const isAdmin = ;p
export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/admin' element={<UserManagement />} />
        <Route path='/adminManagement' element={<AdminManagement />} />
        <Route path='/home' element={<Home />} />
        <Route path='/' element={<Home />} />
        <Route path='/logIn' element={<LogIn />} />
        <Route path='/register' element={<Register />} />
        <Route path='/infor' element={<Infor></Infor>}></Route>
        <Route path='/courseManagement' element={<CourseManagement></CourseManagement>}></Route>
        <Route path='/details' element={<Details></Details>}></Route>
      </Routes>
    </div>
  );
}
