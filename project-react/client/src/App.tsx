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
import History from './pages/user/History';
import Admin from './pages/admin/Admin';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={<Admin></Admin>}>
          <Route path="adminManagement" element={<AdminManagement />} />
          <Route path="userManagement" element={<UserManagement />} />
          <Route path="courseManagement" element={<CourseManagement />} />

        </Route>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/infor" element={<Infor />} />
        <Route path="/details/:courseId" element={<Details />} />
        <Route path="/history" element={<History></History>}></Route>
      </Routes>
    </div>
  );
}
