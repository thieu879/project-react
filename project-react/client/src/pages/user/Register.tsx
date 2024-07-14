import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import CryptoJS from "crypto-js";
import Swal from 'sweetalert2';

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsChecked: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: val });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!formData.termsChecked) {
        Swal.fire({
          icon: 'error',
          text: 'Bạn phải đồng ý với điều khoản trước khi đăng ký.'
        });
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        Swal.fire({
          icon: 'error',
          text: 'Mật khẩu không khớp. Vui lòng kiểm tra lại.'
        });
        return;
      }

      if (!validatePhone(formData.phone)) {
        Swal.fire({
          icon: 'error',
          text: 'Số điện thoại không hợp lệ.'
        });
        return;
      }

      if (!validateEmail(formData.email)) {
        Swal.fire({
          icon: 'error',
          text: 'Email không hợp lệ.'
        });
        return;
      }

      const encryptedPassword = CryptoJS.AES.encrypt(
        formData.password,
        "secret key 123"
      ).toString();

      const response = await axios.post("http://localhost:8080/account", {
        name: formData.name,
        numberPhone: formData.phone,
        email: formData.email,
        password: encryptedPassword,
        loginStatus: false,
        image: "",
        status: true,
        role: 1,
      });

      console.log("Registration successful:", response.data);
      Swal.fire({
        icon: 'success',
        text: 'Đăng ký thành công!'
      }).then(() => {
        navigate("/logIn");
      });
    } catch (error) {
      console.error("Registration failed:", error);
      Swal.fire({
        icon: 'error',
        text: 'Đăng ký thất bại. Vui lòng thử lại.'
      });
    }
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10,11}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className='bg-[url("https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/R.jpg?alt=media&token=62aae0f9-4d60-4854-bee2-cb08b60a0620")] bg-cover bg-no-repeat bg-center min-h-screen flex items-center justify-center'>
      <div className="max-w-lg mx-auto p-8 bg-white bg-opacity-90 shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Đăng Ký
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="name">
              Tên đăng nhập:
            </label>
            <input
              className="border w-[400px] border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-blue-500"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="phone">
              Số điện thoại:
            </label>
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
            <label className="block text-gray-800 mb-2" htmlFor="email">
              Email:
            </label>
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
            <label className="block text-gray-800 mb-2" htmlFor="password">
              Mật Khẩu:
            </label>
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
            <label
              className="block text-gray-800 mb-2"
              htmlFor="confirmPassword"
            >
              Nhập Lại Mật Khẩu:
            </label>
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
            <label className="text-gray-800" htmlFor="termsChecked">
              Đồng ý với điều khoản
            </label>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out">
            Đăng Ký
          </button>
        </form>
        <div className="text-center mt-4">
          <Link className="text-blue-400" to="/logIn">
            Đăng Nhập Ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
