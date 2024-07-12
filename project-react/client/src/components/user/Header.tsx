import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  getUsers,
  updateUserStatus,
} from "../../stores/reducers/managementReducer";
import { getCourses } from "../../stores/reducers/courseReducer";

export default function Header() {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const stateUsers = useSelector((state: any) => state.account.users || []);
  const courseState = useSelector((state: any) => state.course.courses || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getCourses());
  }, [dispatch]);

  const handleLogOut = () => {
    const userToLogout = stateUsers.find(
      (user: any) => user.loginStatus === true
    );
    if (userToLogout) {
      dispatch(updateUserStatus({ ...userToLogout, loginStatus: false }));
      navigate("/logIn");
    }
  };

  const handleClick = () => {
    setShowUserInfo(!showUserInfo);
  };

  const handleCourseClick = (courseId: number) => {
    navigate(`/details/${courseId}`);
  };

  const loggedInUser = stateUsers.find(
    (item: any) => item.loginStatus === true
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
        {courseState.map((item: any) => (
          <button key={item.id} onClick={() => handleCourseClick(item.id)}>
            {item.nameCourse}
          </button>
        ))}
      </div>

      {loggedInUser ? (
        <div>
          <ul>
            <li
              className="bg-blue-300 p-[10px] h-[50px] rounded-[8px] flex justify-center items-center cursor-pointer"
              onClick={handleClick}
            >
              Hi {loggedInUser.name}{" "}
              <img
                className="bg-blue-600 rounded-[50%]"
                width="30px"
                src="https://th.bing.com/th/id/OIP.ry0FnYNVVc6OOFGJhoPRKAHaI0?rs=1&pid=ImgDetMain"
                alt="Login"
              />
            </li>
            {showUserInfo && (
              <div className="mt-2">
                <li>
                  <Link to="/infor">Thông tin cá nhân</Link>
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
