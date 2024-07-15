import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2"; // import SweetAlert
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTask,
} from "firebase/storage";
import { storage } from "../../config/firebase";
import { Account } from "../../interface/interface";
import CryptoJS from "crypto-js";
import {
  getUsers,
  updateCurrentUserAvatar,
} from "../../service/management.service";
import Header from "../../components/user/Header";
import Footer from "../../components/user/Footer";

export default function Infor() {
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [showPasswordReset, setShowPasswordReset] = useState(false);
  const [userName, setUserName] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const users = useSelector((state: any) => state.account.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImg(event.target.files[0]);
      setImgUrl(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleUploadAvatar = async (currentUser: Account) => {
    if (!img) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Vui lòng chọn một tập tin hình ảnh",
      });
      return;
    }

    const storageRef = ref(storage, `avatars/${currentUser.id}`);
    const uploadTask: UploadTask = uploadBytesResumable(storageRef, img);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.error("Lỗi tải hình đại diện lên:", error);
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Lỗi tải lên hình đại diện",
        });
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          const updatedUser: Account = {
            ...currentUser,
            image: downloadURL,
          };

          await axios.put(
            `http://localhost:8080/account/${currentUser.id}`,
            updatedUser
          );

          console.log("Updated user information:", updatedUser);
          console.log("Avatar URL:", downloadURL);

          dispatch(updateCurrentUserAvatar(updatedUser));
          setImgUrl(downloadURL);
          Swal.fire({
            icon: "success",
            title: "Thành công",
            text: "Cập nhật ảnh đại diện thành công",
          });
        } catch (error) {
          console.error("Error updating user:", error);
          Swal.fire({
            icon: "error",
            title: "Lỗi",
            text: "Lỗi cập nhật ảnh đại diện",
          });
        }
      }
    );
  };

  const verifyOldPassword = async (
    currentUser: Account,
    oldPassword: string
  ) => {
    const decryptedPassword = CryptoJS.AES.decrypt(
      currentUser.password,
      "secret key 123"
    ).toString(CryptoJS.enc.Utf8);
    return decryptedPassword === oldPassword;
  };

  const handleSaveInfo = async (currentUser: Account) => {
    if (newPassword && newPassword !== confirmNewPassword) {
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Mật khẩu mới và xác nhận không khớp",
      });
      return;
    }

    if (newPassword) {
      const isOldPasswordCorrect = await verifyOldPassword(
        currentUser,
        oldPassword
      );
      if (!isOldPasswordCorrect) {
        Swal.fire({
          icon: "error",
          title: "Lỗi",
          text: "Mật khẩu cũ không đúng",
        });
        return;
      }
    }

    const updatedUser: Account = {
      ...currentUser,
      name: userName || currentUser.name,
    };

    if (newPassword) {
      updatedUser.password = CryptoJS.AES.encrypt(
        newPassword,
        "secret key 123"
      ).toString();
    }

    try {
      await axios.put(
        `http://localhost:8080/account/${currentUser.id}`,
        updatedUser
      );
      dispatch(updateCurrentUserAvatar(updatedUser));
      Swal.fire({
        icon: "success",
        title: "Thành công",
        text: "Cập nhật thông tin thành công",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "Lỗi",
        text: "Lỗi cập nhật thông tin",
      });
    }
  };

  return (
    <>
      <Header></Header>
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        {users
          .filter((user: any) => user.loginStatus)
          .map((user: any) => (
            <div
              className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
              key={user.id}
            >
              {!showPasswordReset ? (
                <>
                  <div className="mb-4">
                    <input
                      className="w-full px-3 py-2 border rounded-lg"
                      onChange={handleFileChange}
                      type="file"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Tên:</label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg"
                      type="text"
                      value={userName || user.name}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg"
                      type="text"
                      value={user.email}
                      readOnly
                    />
                  </div>
                  {(imgUrl || user.avtUrl) && (
                    <div className="mb-4">
                      <img
                        className="rounded-full w-20 h-20 object-cover"
                        src={imgUrl || user.avtUrl}
                        alt="User"
                      />
                    </div>
                  )}
                  <button
                    onClick={() => handleUploadAvatar(user)}
                    className="w-full px-3 py-2 text-white bg-green-600 rounded-lg hover:bg-green-500"
                  >
                    Thay Đổi Ảnh Đại Diện
                  </button>
                  <button
                    onClick={() => setShowPasswordReset(true)}
                    className="w-full px-3 py-2 mt-4 text-blue-600"
                  >
                    Đổi Mật Khẩu
                  </button>
                  <button
                    onClick={() => handleSaveInfo(user)}
                    className="w-full px-3 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-green-500"
                  >
                    Lưu Thông Tin
                  </button>
                </>
              ) : (
                <div>
                  <button
                    onClick={() => setShowPasswordReset(false)}
                    className="mb-4 p-[10px] bg-gray-300 rounded"
                  >
                    Quay Lại
                  </button>
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Nhập Mật Khẩu Cũ:
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Nhập Mật Khẩu Mới:
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">
                      Nhập Lại Mật Khẩu Mới:
                    </label>
                    <input
                      className="w-full px-3 py-2 border rounded-lg"
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                  </div>
                  <button
                    onClick={() => handleSaveInfo(user)}
                    className="w-full px-3 py-2 text-white bg-green-600 rounded-lg hover:bg-green-500"
                  >
                    Lưu Mật Khẩu
                  </button>
                </div>
              )}
            </div>
          ))}
      </div>
      <Footer></Footer>
    </>
  );
}
