// AdminManagement.tsx

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faSortDown, faSortUp, faTrash, faWrench } from '@fortawesome/free-solid-svg-icons';
import { getAdmin, updateAdminStatus, updateUserStatus } from '../../stores/reducers/managementReducer';
import { Account } from '../../interface/interface';

export default function AdminManagement() {
  const dispatch = useDispatch();
  const admins = useSelector((state: any) => state.account.admins); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: '', email: '', numberPhone: '', status: true, image: '', role: 0, password: '', loginStatus: false });

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  const handleChangeAdminStatus = (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    dispatch(updateAdminStatus({ id, loginStatus: newStatus }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="flex">
        <SidebarAdmin />
        <div className="ml-6 flex-grow">
          <div className="flex items-center mb-4">
            <input className="border-2 px-2 py-1 mr-2" type="text" placeholder="Nhập tên" />
            <button className="bg-blue-500 text-white px-4 py-1 rounded-md" onClick={() => setIsModalOpen(true)}>
              Thêm Admin
            </button>
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
              {admins.map((item: Account, index: number) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">
                    <img src={item.image} alt={item.name} className="h-10 w-10 rounded-full" />
                  </td>
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.email}</td>
                  <td className="py-2 px-4">{item.numberPhone}</td>
                  <td className="py-2 px-4">
                    <button onClick={() => handleChangeAdminStatus(item.id, item.loginStatus)}>
                      {item.loginStatus ? "Active" : "Inactive"}
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-2xl mb-4">Thêm Admin</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Name</label>
                <input
                  className="border-2 px-2 py-1 w-full"
                  type="text"
                  name="name"
                  value={newAdmin.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Email</label>
                <input
                  className="border-2 px-2 py-1 w-full"
                  type="email"
                  name="email"
                  value={newAdmin.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Phone Number</label>
                <input
                  className="border-2 px-2 py-1 w-full"
                  type="text"
                  name="numberPhone"
                  value={newAdmin.numberPhone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Image URL</label>
                <input
                  className="border-2 px-2 py-1 w-full"
                  type="text"
                  name="image"
                  value={newAdmin.image}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Status</label>
                <input
                  type="checkbox"
                  name="status"
                  checked={newAdmin.status}
                  onChange={() => setNewAdmin({ ...newAdmin, status: !newAdmin.status })}
                /> Active
              </div>
              <div className="flex justify-end">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded mr-2" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
