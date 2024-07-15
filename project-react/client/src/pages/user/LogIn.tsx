import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  loginAdmin,
  loginUser,
  updateAdminStatus,
  updateUserStatus,
} from "../../stores/reducers/managementReducer";

export default function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (isAdmin) {
        const admin = await dispatch(loginAdmin({ email, password }));
        if (admin.payload) {
          await dispatch(
            updateAdminStatus({ id: admin.payload.id, loginStatus: true })
          );
          navigate("/admin");
        } else {
          showErrorAlert("Email hoặc mật khẩu không hợp lệ");
        }
      } else {
        const user = await dispatch(loginUser({ email, password }));
        if (user.payload) {
          localStorage.setItem("userId", user.payload.id);
          localStorage.setItem("userStatus", user.payload.status);
          await dispatch(
            updateUserStatus({ id: user.payload.id, loginStatus: true })
          );
          navigate("/home");
        } else {
          showErrorAlert("Email hoặc mật khẩu không hợp lệ");
        }
      }
    } catch (error) {
      console.error("Login failed", error);
      showErrorAlert("Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  const showErrorAlert = (message: any) => {
    Swal.fire({
      icon: "error",
      title: "Ôi Không...",
      text: message,
    });
  };

  return (
    <div className='bg-[url("https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/R.jpg?alt=media&token=62aae0f9-4d60-4854-bee2-cb08b60a0620")] bg-cover bg-no-repeat bg-center min-h-screen flex items-center justify-center'>
      <div className="max-w-lg mx-auto p-8 bg-white bg-opacity-90 shadow-md rounded-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Đăng Nhập
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800 mb-2" htmlFor="email">
              Email:
            </label>
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
            <label className="block text-gray-800 mb-2" htmlFor="password">
              Mật Khẩu:
            </label>
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
            <label className="block text-gray-800 mb-2" htmlFor="role">
              Vai Trò:
            </label>
            <select
              className="border border-gray-300 px-4 py-2 rounded w-full focus:outline-none focus:border-blue-500"
              id="role"
              value={isAdmin ? "admin" : "user"}
              onChange={(e) => setIsAdmin(e.target.value === "admin")}
              required
            >
              <option value="user">Người Dùng</option>
              <option value="admin">Quản Trị Viên</option>
            </select>
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-300 ease-in-out">
            Đăng Nhập
          </button>
        </form>
        <div className="text-center mt-4">
          <p>
            Nếu Bạn Chưa Có tài Khoản?{" "}
            <Link className="text-blue-400" to="/register">
              Đăng Ký Ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
