import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsChecked: false,
    loginStatus: false,
    image: '',
    status: true,
    role: 1
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    const val = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!formData.termsChecked) {
        alert('Bạn phải đồng ý với điều khoản trước khi đăng ký.');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert('Mật khẩu không khớp. Vui lòng kiểm tra lại.');
        return;
      }
      const response = await axios.post('http://localhost:8080/account', {
        nameUser: formData.username,
        numberPhone: formData.phone,
        email: formData.email,
        password: formData.password,
        loginStatus: formData.loginStatus,
        image: formData.image,
        status: formData.status,
        role: formData.role
      });

      console.log('Registration successful:', response.data);
      alert('Đăng ký thành công!');
      navigate('/logIn');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Đăng ký thất bại. Vui lòng thử lại.');
    }
  };

  return (
    <div className='bg-[url("https://img.freepik.com/premium-photo/illustration-albert-einstein_1022967-4858.jpg")] bg-cover bg-no-repeat bg-center min-h-screen flex items-center justify-center'>
      <div className="max-w-lg mx-auto p-8 bg-white bg-opacity-90 shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Đăng Ký</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="username">Tên đăng nhập:</label>
            <input
              className="border w-[400px] border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="phone">Số điện thoại:</label>
            <input
              className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="email">Email:</label>
            <input
              className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="password">Mật Khẩu:</label>
            <input
              className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-800 mb-2" htmlFor="confirmPassword">Nhập Lại Mật Khẩu:</label>
            <input      
              className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6 flex items-center">
            <input
              className="mr-2"
              type="checkbox"
              id="termsChecked"
              name="termsChecked"
              checked={formData.termsChecked}
              onChange={handleChange}
            />
            <label className="text-gray-800" htmlFor="termsChecked">Đồng ý với điều khoản</label>
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
