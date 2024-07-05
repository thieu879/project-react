import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginAdmin, loginUser, updateAdminStatus, updateUserStatus } from '../../stores/reducers/managementReducer';

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (isAdmin) {
        const admin = await dispatch(loginAdmin({ email, password }));
        if (admin.payload) {
          dispatch(updateAdminStatus({ id: admin.payload.id, loginStatus: true }));
          navigate('/adminManagement');
        } else {
          alert("Invalid email or password");
        }
      } else {
        const user = await dispatch(loginUser({ email, password }));
        if (user.payload) {
          dispatch(updateUserStatus({ id: user.payload.id, loginStatus: true }));
          navigate('/home');
        } else {
          alert("Invalid email or password");
        }
      }
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    }
  };

  return (
    <div className='bg-[url("https://img.freepik.com/premium-photo/illustration-albert-einstein_1022967-4858.jpg")] bg-cover bg-no-repeat bg-center min-h-screen flex items-center justify-center'>
      <div className="max-w-lg mx-auto p-8 bg-white bg-opacity-90 shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Đăng Nhập</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="email">Email:</label>
            <input
              className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="password">Mật Khẩu:</label>
            <input
              className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="role">Vai Trò:</label>
            <select
              className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              id="role"
              value={isAdmin ? 'admin' : 'user'}
              onChange={(e) => setIsAdmin(e.target.value === 'admin')}
              required
            >
              <option value="user">Người Dùng</option>
              <option value="admin">Quản Trị Viên</option>
            </select>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out">Đăng Nhập</button>
        </form>
        <div className="text-center mt-4">
          <p>Nếu Bạn Chưa Có tài Khoản? <Link className='text-blue-400' to="/register">Đăng Ký Ngay</Link></p>
        </div>
      </div>
    </div>
  );
}
