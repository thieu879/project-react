import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, updateUserStatus } from '../../stores/reducers/managementReducer';

export default function Header() {
  const stateUsers = useSelector((state:any) => state.account.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (stateUsers.length !== 0) {
      let loggedInUser = stateUsers.find((item: any) => item.loginStatus === true);
      if (!loggedInUser) {
        navigate('/logIn');
      }
    }
  }, [stateUsers, navigate]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  
  const handleLogOut = () => {
    let updatedUsers = JSON.parse(JSON.stringify(stateUsers));
    let userToLogout = updatedUsers.find((user: any) => user.loginStatus === true);
    if (userToLogout) {
      userToLogout.loginStatus = false;
      dispatch(updateUserStatus(userToLogout));
      navigate('/logIn');
    }
  };

  const loggedInUser = stateUsers.find((item: any) => item.loginStatus === true);

  return (
    <div className='flex justify-around items-center'>
      <div className='flex gap-[100px] items-center'>
        <Link to="/home">
          <img width="150px" src="https://firebasestorage.googleapis.com/v0/b/test-e7b59.appspot.com/o/Online_Academy-removebg-preview.png?alt=media&token=baa36f34-e6af-4771-b020-f383fb840ba5" alt="Online Academy" />
        </Link>
        <Link to="">Đề thi tiểu học</Link>
        <Link to="">Đề thi THCS</Link>
        <Link to="">Đề Thi THPT</Link>
      </div>
      
      {loggedInUser ? (
        <div>
          <ul>
            <li>Hi {loggedInUser.name}</li>
            <li><button onClick={handleLogOut}>Đăng Xuất</button></li>
          </ul>
        </div>
      ) : (
        <Link className='bg-blue-300 w-[120px] h-[50px] rounded-[8px] flex justify-center items-center' to="/logIn">
          <p>Đăng Nhập</p>
          <div className='ml-[3px]'><img className='bg-blue-600 rounded-[50%]' width="30px" src="https://th.bing.com/th/id/OIP.ry0FnYNVVc6OOFGJhoPRKAHaI0?rs=1&pid=ImgDetMain" alt="Login" /></div>
        </Link>
      )}
    </div>
  );
}
