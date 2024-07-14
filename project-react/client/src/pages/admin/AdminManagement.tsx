import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faSortDown,
  faSortUp,
  faTrash,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import {
  getAdmin,
  updateAdminStatus,
  addAdmin,
  updateAdmin,
  deleteAdmin,
} from "../../stores/reducers/managementReducer";
import { Account } from "../../interface/interface";
import Swal from "sweetalert2";

export default function AdminManagement() {
  const dispatch = useDispatch();
  const admins = useSelector((state: any) => state.account.admins);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentAdminId, setCurrentAdminId] = useState<number | null>(null);
  const [newAdmin, setNewAdmin] = useState<Account>({
    id: 0,
    name: "",
    email: "",
    numberPhone: "",
    status: true,
    image: "",
    role: 0,
    password: "",
    loginStatus: false,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getAdmin());
  }, [dispatch]);

  const handleChangeAdminStatus = (id: number, currentStatus: boolean) => {
    dispatch(updateAdminStatus({ id, loginStatus: !currentStatus }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAdmin({ ...newAdmin, [name]: value });
  };

  const handleEditAdmin = (admin: Account) => {
    setNewAdmin(admin);
    setIsEditMode(true);
    setIsModalOpen(true);
    setCurrentAdminId(admin.id);
  };

  const handleDeleteAdmin = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this admin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAdmin(id));
        Swal.fire("Deleted!", "The admin has been deleted.", "success");
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditMode && currentAdminId !== null) {
      dispatch(updateAdmin({ ...newAdmin, id: currentAdminId }));
    } else {
      dispatch(addAdmin(newAdmin));
    }
    setIsModalOpen(false);
    setIsEditMode(false);
    setNewAdmin({
      id: 0,
      name: "",
      email: "",
      numberPhone: "",
      status: true,
      image: "",
      role: 0,
      password: "",
      loginStatus: false,
    });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const filteredAdmins = admins.filter((admin: Account) =>
    admin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedAdmins = filteredAdmins.sort((a: Account, b: Account) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (sortOrder === "asc") {
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    } else {
      return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
    }
  });

  const totalPages = Math.ceil(sortedAdmins.length / itemsPerPage);
  const paginatedAdmins = sortedAdmins.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="flex">
        <SidebarAdmin />
        <div className="ml-6 flex-grow">
          <div className="flex items-center mb-4">
            <input
              className="border-2 px-2 py-1 mr-2"
              type="text"
              placeholder="Nhập tên"
              value={searchTerm}
              onChange={handleSearch}
            />
            <button
              className="bg-blue-500 text-white px-4 py-1 rounded-md"
              onClick={() => setIsModalOpen(true)}
            >
              Thêm Admin
            </button>
          </div>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">STT</th>
                <th className="py-2 px-4">Ảnh</th>
                <th
                  className="py-2 px-4 flex items-center cursor-pointer"
                  onClick={handleSort}
                >
                  <span className="mr-1">Tên</span>
                  <div className="flex flex-col">
                    <FontAwesomeIcon
                      icon={faSortUp}
                      className={`text-gray-300 ${
                        sortOrder === "asc" && "text-black"
                      }`}
                    />
                    <FontAwesomeIcon
                      icon={faSortDown}
                      className={`text-gray-300 ${
                        sortOrder === "desc" && "text-black"
                      }`}
                    />
                  </div>
                </th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Số Điện Thoại</th>
                <th className="py-2 px-4">Trạng Thái</th>
                <th className="py-2 px-4">Hành Động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedAdmins.map((item: Account, index: number) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="py-2 px-4">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </td>
                  <td className="py-2 px-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 rounded-full"
                    />
                  </td>
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.email}</td>
                  <td className="py-2 px-4">{item.numberPhone}</td>
                  <td className="py-2 px-4 flex justify-center items-center mt-[10px]">
                    <button
                      onClick={() =>
                        handleChangeAdminStatus(item.id, item.loginStatus)
                      }
                    >
                      {item.loginStatus ? (
                        <i className="fa-solid fa-lock-open"></i>
                      ) : (
                        <i className="fa-solid fa-lock"></i>
                      )}
                    </button>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <button
                      className="mr-2"
                      onClick={() => handleEditAdmin(item)}
                    >
                      <FontAwesomeIcon icon={faWrench} />
                    </button>
                    <button onClick={() => handleDeleteAdmin(item.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-4">
            <div className="text-sm text-gray-500">
              Hiển thị {paginatedAdmins.length} trên {sortedAdmins.length} đối
              tượng
            </div>
            <div className="flex gap-2">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-[400px]">
            <h2 className="text-2xl mb-4">
              {isEditMode ? "Chỉnh sửa Admin" : "Thêm Admin"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Tên</label>
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
                <label className="block mb-2">Số Điện Thoại</label>
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
                <label className="block mb-2">Mật Khẩu</label>
                <input
                  className="border-2 px-2 py-1 w-full"
                  type="password"
                  name="password"
                  value={newAdmin.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-2">Trạng Thái</label>
                <input
                  type="checkbox"
                  name="status"
                  checked={newAdmin.status}
                  onChange={() =>
                    setNewAdmin({ ...newAdmin, status: !newAdmin.status })
                  }
                />{" "}
                Hành Động
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                  onClick={() => setIsModalOpen(false)}
                >
                  Huỷ Bỏ
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
