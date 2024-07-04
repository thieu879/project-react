import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../stores/store';
import { loginAdmin } from '../../stores/reducers/adminReducer';

export default function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loggedInAdmin = useSelector((state: RootState) => state.admin.loggedInAdmin);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginAdmin({ email, password }));
  };

  if (loggedInAdmin) {
    navigate('/admin');
  }

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
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out">Đăng Nhập</button>
        </form>
        <div className="text-center mt-4">
          <p>Nếu Bạn Chưa Có tài Khoản? <Link className='text-blue-400' to="/register">Đăng Ký Ngay</Link></p>
        </div>
      </div>
    </div>
  );
}
