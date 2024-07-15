import React, { useEffect, useState } from "react";
import SidebarAdmin from "../../components/admin/SidebarAdmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortUp,
  faSortDown,
  faWrench,
  faTrash,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Account } from "../../interface/interface";
import { AppDispatch, RootState } from "../../stores/store";
import { getUsers, updateUserLoginStatus } from "../../service/management.service";

const UserManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const users: Account[] = useSelector((state: RootState) => state.account.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 2;

  const logined = localStorage.getItem("userId");
  console.log(users);

  const checkLogin = users.find((user: any) => user.id === logined);
  console.log(checkLogin);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);



  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleChangeStatus = (id: number, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    dispatch(updateUserLoginStatus({ id, status: newStatus }));
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    if (sortOrder === "asc") {
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    } else {
      return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
    }
  });

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <>
      {/* <SidebarAdmin /> */}
      <div className="ml-6 flex-grow">
        <div className="flex items-center mb-4">
          <input
            className="border-2 px-2 py-1 mr-2"
            type="text"
            placeholder="Nhập tên"
            value={searchTerm}
            onChange={handleSearch}
          />
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
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentUsers.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-100">
                <td className="py-2 px-4">{indexOfFirstUser + index + 1}</td>
                <td className="py-2 px-4">
                  <img
                    src={item.image}
                    alt="User"
                    className="h-10 w-10 rounded-full"
                  />
                </td>
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.email}</td>
                <td className="py-2 px-4">{item.numberPhone}</td>
                <td className="py-2 px-4 flex justify-center items-center mt-[10px]">
                  <button
                    onClick={() => handleChangeStatus(item.id, item.status)}
                  >
                    {item.status ? (
                      <i className="fa-solid fa-lock-open"></i>
                    ) : (
                      <i className="fa-solid fa-lock"></i>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <div className="text-sm text-gray-500">
            Hiển thị {currentUsers.length} đối tượng trên {sortedUsers.length}{" "}
            đối tượng
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
      <div></div>
    </>
  );
};

export default UserManagement;
