import React from 'react';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown, faWrench, faTrash, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function UserManagement() {
  return (
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
                <div className="flex flex-col ">
                  <FontAwesomeIcon icon={faSortUp} className="text-gray-300 cursor-pointer" />
                  <FontAwesomeIcon icon={faSortDown} className="text-gray-300 cursor-pointer" />
                </div>
              </th>
              <th className="py-2 px-4">Birthday</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Phone Number</th>
              <th className="py-2 px-4">Address</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-4">1</td>
              <td className="py-2 px-4"><img src="image_url_1" alt="User 1" className="h-10 w-10 rounded-full" /></td>
              <td className="py-2 px-4">Thiều</td>
              <td className="py-2 px-4">01/01/1980</td>
              <td className="py-2 px-4">jill.smith@example.com</td> 
              <td className="py-2 px-4">123-456-7890</td>
              <td className="py-2 px-4">123 Main St</td>
              <td className="py-2 px-4">Active</td>
              <td className="py-2 px-4 text-center">
                <button className="mr-2"><FontAwesomeIcon icon={faWrench} /></button>
                <button><FontAwesomeIcon icon={faTrash} /></button>
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-4">2</td>
              <td className="py-2 px-4"><img src="image_url_2" alt="User 2" className="h-10 w-10 rounded-full" /></td>
              <td className="py-2 px-4">Eve Jackson</td>
              <td className="py-2 px-4">02/02/1985</td>
              <td className="py-2 px-4">eve.jackson@example.com</td>
              <td className="py-2 px-4">234-567-8901</td>
              <td className="py-2 px-4">456 Elm St</td>
              <td className="py-2 px-4">Inactive</td>
              <td className="py-2 px-4 text-center">
                <button className="mr-2"><FontAwesomeIcon icon={faWrench} /></button>
                <button><FontAwesomeIcon icon={faTrash} /></button>
              </td>
            </tr>
            <tr className="hover:bg-gray-100">
              <td className="py-2 px-4">3</td>
              <td className="py-2 px-4"><img src="image_url_3" alt="User 3" className="h-10 w-10 rounded-full" /></td>
              <td className="py-2 px-4">John Doe</td>
              <td className="py-2 px-4">03/03/1990</td>
              <td className="py-2 px-4">john.doe@example.com</td>
              <td className="py-2 px-4">345-678-9012</td>
              <td className="py-2 px-4">789 Pine St</td>
              <td className="py-2 px-4">Active</td>
              <td className="py-2 px-4 text-center">
                <button className="mr-2"><FontAwesomeIcon icon={faWrench} /></button>
                <button><FontAwesomeIcon icon={faTrash} /></button>
              </td>
            </tr>
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
  );
}
