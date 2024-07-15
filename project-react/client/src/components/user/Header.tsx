import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { RootState } from "../../stores/store";
import { Account, Course } from "../../interface/interface";
import { getUsers, updateUserStatus } from "../../service/management.service";
import { getCourses } from "../../service/course.service";

export default function Header() {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const stateUsers = useSelector(
    (state: RootState) => state.account.users || []
  );
  const courseState = useSelector(
    (state: RootState) => state.course.courses || []
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCourses());
  }, [dispatch]);

  const handleLogOut = () => {
    Swal.fire({
      title: 'Bạn có chắc muốn đăng xuất?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy bỏ',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("userId");
        localStorage.removeItem("userStatus");
        const userToLogout = stateUsers.find(
          (user: Account) => user.loginStatus === true
        );
        if (userToLogout) {
          dispatch(updateUserStatus({ ...userToLogout, loginStatus: false }));
          navigate("/logIn");
        }
      }
    });
  };

  const handleClick = () => {
    setShowUserInfo(!showUserInfo);
  };

  const handleCourseClick = (courseId: number) => {
    navigate(`/details/${courseId}`);
  };

  const loggedInUser = stateUsers.find(
    (user: Account) => user.loginStatus === true
  );

  return (
    <div className="flex justify-around items-center">
      <div className="flex gap-[100px] items-center">
        <Link to="/home">
          <img
            width="150px"
            src="https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/Online_Academy-removebg-preview.png?alt=media&token=baa36f34-e6af-4771-b020-f383fb840ba5"
            alt="Online Academy"
          />
        </Link>
        {courseState.map((course: Course) => (
          <button key={course.id} onClick={() => handleCourseClick(course.id)}>
            {course.nameCourse}
          </button>
        ))}
      </div>

      {loggedInUser ? (
        <div className="relative">
          <ul>
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={handleClick}
            >
              <span className="font-medium">Chào {loggedInUser.name}</span>
              <img
                className="w-8 h-8 rounded-full"
                src={loggedInUser.image}
                alt="User Avatar"
              />
            </div>
            {showUserInfo && (
              <div className="mt-2 absolute z-50">
                <li>
                  <Link to="/infor">Thông tin cá nhân</Link>
                </li>
                <li>
                  <Link to="/history">Lịch Sử Thi</Link>
                </li>
                <li>
                  <button onClick={handleLogOut}>Đăng Xuất</button>
                </li>
              </div>
            )}
          </ul>
        </div>
      ) : (
        <Link
          className="bg-blue-300 w-[120px] h-[50px] rounded-[8px] flex justify-center items-center"
          to="/logIn"
        >
          <p>Đăng Nhập</p>
        </Link>
      )}
    </div>
  );
}
