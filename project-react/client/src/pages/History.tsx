import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuestions, getUserAnswers } from "../stores/reducers/courseReducer";
import { UserAnswer } from "../interface/interface";
import Header from "../components/user/Header";
import Footer from "../components/user/Footer";

export default function History() {
  const dispatch = useDispatch();
  const userAnswers = useSelector((state: any) => state.course.userAnswers);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      dispatch(getUserAnswers(parseInt(userId, 10)));
    }
  }, [dispatch, userId]);

  return (
    <div>
      <Header></Header>
      <h1 className="text-[50px] mt-[50px] flex justify-center">Lịch Sử Thi</h1>
      <table className=" w-full bg-white shadow-md rounded-lg overflow-hidden mt-[100px] mb-[100px]">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-2 px-4">STT</th>
            <th className="py-2 px-4 flex items-center cursor-pointer">
              <span className="mr-1">Tên Đề</span>
            </th>
            <th className="py-2 px-4">Số điểm</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {userAnswers.map((answer: UserAnswer, index: number) => (
            <tr key={index}>
              <td className="py-2 px-4 flex justify-center items-center">{index + 1}</td>
              <td className="py-2 px-4">Đề {answer.examId}</td>
              <td className="py-2 px-4 flex justify-center items-center ">{answer.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer></Footer>
    </div>
  );
}
