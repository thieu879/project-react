import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../../components/admin/SidebarAdmin'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Admin() {
    // const [currentUserId, setCurrentUserId] = useState<number | undefined>(
    //   () => {
    //     const userId = localStorage.getItem("userId");
    //     if (userId) return JSON.parse(userId);
    //   }
    // );

    // const navigate = useNavigate();

    // useEffect(() => {
    //   if (!currentUserId) {
    //     navigate("/login");
    //   }
    // }, []);
  return (
    <div>
        <div className='flex'>
            <SidebarAdmin></SidebarAdmin>
            <Outlet></Outlet>
        </div>
        
    </div>
  )
}
