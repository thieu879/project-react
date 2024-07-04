import React, { useEffect } from 'react';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { getAdmin } from '../../stores/reducers/adminReducer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';

export default function AdminManagement() {
  const admins = useSelector((state:any) => state.admin.admins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);


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
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Birthday</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Phone Number</th>
                <th className="py-2 px-4">Address</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {admins.map((item:any, index:any) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    <img src={item.imageAdmin} alt={item.name} className="h-10 w-10 rounded-full" />
                  </td>
                  <td className="py-2 px-4">{item.nameAdmin}</td>
                  <td className="py-2 px-4">{item.birthday}</td>
                  <td className="py-2 px-4">{item.email}</td>
                  <td className="py-2 px-4">{item.numberPhone}</td>
                  <td className="py-2 px-4">{item.address}</td>
                  <td className="py-2 px-4">{item.statusAdmin}</td>
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
            <button className="text-gray-500 hover:text-gray-700"><FontAwesomeIcon icon={faArrowLeft} /></button>
            <button className="text-gray-500 hover:text-gray-700">...</button>
            <button className="text-gray-500 hover:text-gray-700"><FontAwesomeIcon icon={faArrowRight} /></button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
