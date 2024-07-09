import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../stores/reducers/managementReducer';
import { Link } from 'react-router-dom';

export default function Infor() {
    const users = useSelector((state: any) => state.account.users);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div>
            {users.map((user: any) => (
                <div key={user.id}>
                    <div><input type="file" /></div>
                    <div>
                        name: 
                        <input 
                            type="text" 
                            value={user.name}
                            readOnly
                        />
                    </div>
                    <div>
                        email: 
                        <input 
                            width=""
                            type="text" 
                            value={user.email}
                            readOnly
                        />
                    </div>
                </div>
            ))}
            <Link to="/change-password">Thay đổi mật khẩu</Link>
        </div>
    );
}
