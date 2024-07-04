import React from 'react';
import { Link } from 'react-router-dom';

export default function Register() {
  return (
    <div className='bg-[url("https://img.freepik.com/premium-photo/illustration-albert-einstein_1022967-4858.jpg")] bg-cover bg-no-repeat bg-center min-h-screen flex items-center justify-center'>
      <div className="max-w-lg mx-auto p-8 bg-white bg-opacity-90 shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Đăng Ký</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="username">Tên đăng nhập:</label>
            <input className="border border-gray-300 px-4 py-2 rounded w-[400px] focus:outline-none focus:border-blue-500" type="text" id="username" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="phone">Số điện thoại:</label>
            <input className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:border-blue-500" type="text" id="phone" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="email">Email:</label>
            <input className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:border-blue-500" type="email" id="email" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="password">Mật Khẩu:</label>
            <input className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:border-blue-500" type="password" id="password" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 mb-2" htmlFor="confirm-password">Nhập Lại Mật Khẩu:</label>
            <input className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:border-blue-500" type="password" id="confirm-password" />
          </div>
          <div className="mb-6 flex items-center">
            <input className="mr-2" type="checkbox" id="terms" />
            <label className="text-gray-800" htmlFor="terms">Đồng ý với điều khoản</label>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out">Đăng Ký</button>
        </form>
        <div className="text-center mt-4">
          <Link className='text-blue-400' to="/logIn">Đăng Nhập Ngay</Link>
        </div>
      </div>
    </div>
  );
}
