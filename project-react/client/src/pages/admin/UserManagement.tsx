import React, { useEffect } from 'react';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown, faWrench, faTrash, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Account } from '../../interface/interface';
import { getUsers, updateUserStatus } from '../../stores/reducers/managementReducer';
import { AppDispatch, RootState } from '../../stores/store';

const UserManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users: Account[] = useSelector((state: RootState) => state.account.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);
  
  const handleChangeStatus = (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus; 
    dispatch(updateUserStatus({ id, status: newStatus }));
  };

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="ml-6 flex-grow">
        <div className="flex items-center mb-4">
          <input className="border-2 px-2 py-1 mr-2" type="text" placeholder="Nhập tên" />
          <button className="bg-blue-500 text-white px-4 py-1 rounded-md">Thêm User</button>
        </div>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">STT</th>
              <th className="py-2 px-4">Images</th>
              <th className="py-2 px-4 flex items-center">
                <span className="mr-1">Name</span>
                <div className="flex flex-col">
                  <FontAwesomeIcon icon={faSortUp} className="text-gray-300 cursor-pointer" />
                  <FontAwesomeIcon icon={faSortDown} className="text-gray-300 cursor-pointer" />
                </div>
              </th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone Number</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4"><img src={item.image} alt="User" className="h-10 w-10 rounded-full" /></td>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4">{item.numberPhone}</td>
                <td className="py-2 px-4">
                  <button onClick={() => handleChangeStatus(item.id, item.status)}>
                    {item.status ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="py-2 px-4 text-center">
                  <button className="mr-2"><FontAwesomeIcon icon={faWrench} /></button>
                  <button><FontAwesomeIcon icon={faTrash} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <div className="text-sm text-gray-500">Hiển thị 5 đối tượng trên 25 đối tượng</div>
          <div className="flex gap-2">
            <button className="text-gray-500 hover:text-gray-700"><FontAwesomeIcon icon={faArrowLeft} /></button>
            <button className="text-gray-500 hover:text-gray-700">...</button>
            <button className="text-gray-500 hover:text-gray-700"><FontAwesomeIcon icon={faArrowRight} /></button>
          </div>
        </div>
      </div>
      {/* modal */}
      <div></div>
    </div>
  );
};

export default UserManagement;
