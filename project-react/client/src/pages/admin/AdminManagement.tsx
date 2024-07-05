import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSortDown, faSortUp, faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import { getAdmin, updateAdminStatus } from '../../stores/reducers/managementReducer';

export default function AdminManagement() {
  const dispatch = useDispatch();
  const admins = useSelector((state: any) => state.account.admins);
  
  
  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  const handleChangeStatus = (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus; 
    dispatch(updateAdminStatus({ id, statusAdmin: newStatus }));
  };

  return (
    <div>
      <div className="flex">
        <SidebarAdmin />
        <div className="ml-6">
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
              {admins.map((item: any, index: number) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    <img src={item.imageAdmin} alt={item.name} className="h-10 w-10 rounded-full" />
                  </td>
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.email}</td>
                  <td className="py-2 px-4">{item.numberPhone}</td>
                  <td className="py-2 px-4">
                    <button onClick={() => handleChangeStatus(item.id, item.statusAdmin)}>
                      {item.statusAdmin ? "Active" : "Inactive"}
                    </button>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button className="mr-2">
                      <FontAwesomeIcon icon={faWrench} />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <div className="text-sm text-gray-500">Hiển thị 5 đối tượng trên 25 đối tượng</div>
            <div className="flex gap-2">
              <button className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <button className="text-gray-500 hover:text-gray-700">...</button>
              <button className="text-gray-500 hover:text-gray-700">
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
