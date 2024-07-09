import React from 'react'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar'
// import "./sidebarAdmin.css"
import { Link } from 'react-router-dom'
export default function SidebarAdmin() {
  return (
    <div>
      <Sidebar className='h-[100vh] bg-slate-300'>
        <Menu className='bg-transparent'>
          <div className='flex mx-[20px]'>
            <button><i className="fa-solid fa-bars"></i></button>
            <img className='mx-[20px]' width="100px" src="https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/Online_Academy-removebg-preview.png?alt=media&token=baa36f34-e6af-4771-b020-f383fb840ba5" alt="" />
          </div>
          <MenuItem component={<Link to="/admin" />}><i className="fa-solid fa-user"></i> User Management </MenuItem>
          <MenuItem component={<Link to="/adminManagement" />}><i className="fa-solid fa-users-gear"></i> admin Management </MenuItem>
          <MenuItem component={<Link to="/courseManagement" />}><i className="fa-solid fa-book-open"></i> course Management </MenuItem>
          <MenuItem component={<Link to="/logIn" />}><i className="fa-solid fa-arrow-right-from-bracket"></i> log out </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  )
}
