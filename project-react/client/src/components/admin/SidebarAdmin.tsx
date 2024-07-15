import React, { useState } from 'react';
import { Menu, MenuItem, Sidebar } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';

export default function SidebarAdmin() {
  const [sidebar, setSidebar] = useState<boolean>(true);

  const handleSidebar = () => {
    setSidebar(!sidebar);
  };

  return (
    <Sidebar className='h-screen bg-slate-300' collapsed={!sidebar}>
      <Menu className='bg-transparent'>
        <div className='flex mx-4'>
          <button className='ml-[15px]' onClick={handleSidebar}><i className="fa-solid fa-bars"></i></button>
          {sidebar ? (
            <img className='mx-4' width="100px" src="https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/Online_Academy-removebg-preview.png?alt=media&token=baa36f34-e6af-4771-b020-f383fb840ba5" alt="Logo" />
          ) : null}
        </div>
        
        <MenuItem component={<Link to="userManagement" />} icon={<i className="fa-solid fa-user"></i>}>Quản Lý Người Dùng</MenuItem>
        <MenuItem component={<Link to="adminManagement" />} icon={<i className="fa-solid fa-users-gear"></i>}>Quản Lý Admin</MenuItem>
        <MenuItem component={<Link to="courseManagement" />} icon={<i className="fa-solid fa-book-open"></i>}>Quản Lý Khoá Học</MenuItem>
        <MenuItem component={<Link to="/logIn" />} icon={<i className="fa-solid fa-arrow-right-from-bracket"></i>}>Đăng Xuất</MenuItem>
      </Menu>
    </Sidebar>
  );
}
