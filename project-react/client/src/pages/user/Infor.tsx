import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../stores/reducers/managementReducer";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../config/firebase";

export default function Infor() {
  const [img, setImg] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const users = useSelector((state: any) => state.account.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImg(file);
    }
  };

  const handleUpload = async () => {
    if (!img) return;

    const imgRef = ref(storage, `images/${img.name}`);
    try {
      const snapshot = await uploadBytes(imgRef, img);
      const url = await getDownloadURL(snapshot.ref);
      setImgUrl(url);
    } catch (error) {
      console.error("Error uploading image: ", error);
    } finally {
      setImg(null);
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      {users
        .filter((user: any) => user.loginStatus)
        .map((user: any) => (
          <div
            className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
            key={user.id}
          >
            <div className="mb-4">
              <input
                className="w-full px-3 py-2 border rounded-lg"
                onChange={handleChangeImg}
                type="file"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Name:</label>
              <input
                className="w-full px-3 py-2 border rounded-lg"
                type="text"
                value={user.name}
                readOnly
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
            {(imgUrl || user.profileImageUrl) && (
              <div className="mb-4">
                <img
                  className="rounded-full w-20 h-20 object-cover"
                  src={imgUrl || user.profileImageUrl}
                  alt="User"
                />
              </div>
            )}
            <button
              className="w-full px-3 py-2 mb-2 text-white bg-blue-600 rounded-lg hover:bg-blue-500"
              onClick={handleUpload}
            >
              Upload Image
            </button>
            <button className="w-full px-3 py-2 text-white bg-green-600 rounded-lg hover:bg-green-500">
              Change Info
            </button>
          </div>
        ))}
    </div>
  );
}
