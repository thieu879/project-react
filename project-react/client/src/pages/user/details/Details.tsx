import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./details.css";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/user/Header";
import Footer from "../../../components/user/Footer";
import { RootState } from "../../../stores/store";
import {
  Class,
  Course,
  Question,
  Subject,
  Test,
  UserAnswer,
} from "../../../interface/interface";
import { getClasses, getCourses, getQuestions, getSubjects, getTests, saveUserAnswers } from "../../../service/course.service";

export default function Details() {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courseState = useSelector((state: RootState) => state.course.courses);
  const classState = useSelector((state: RootState) => state.course.classes);
  const subjectState = useSelector((state: RootState) => state.course.subjects);
  const testState = useSelector((state: RootState) => state.course.tests);
  const questionState = useSelector(
    (state: RootState) => state.course.questions
  );

  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null
  );
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [num, setNum] = useState(100);

  const intervalRef = useRef<NodeJS.Timeout>();

  const decreaseNum = () => setNum((prev) => prev - 1);

  const startTimer = () => {
    intervalRef.current = setInterval(decreaseNum, 1000);
  };

  const stopTimer = () => {
    clearInterval(intervalRef.current!);
  };

  const resetTimer = () => {
    stopTimer();
    setNum(100);
  };

  useEffect(() => {
    if (num <= 0) {
      stopTimer();
      Swal.fire({
        icon: "warning",
        title: "Hết giờ rồi!",
        text: "Bài kiểm tra bây giờ sẽ được gửi.",
        confirmButtonText: "OK",
      }).then(() => {
        handleSubmit();
      });
    }
  }, [num]);

  useEffect(() => {
    return () => {
      stopTimer();
    };
  }, []);

  useEffect(() => {
    const userStatus = localStorage.getItem("userStatus") === "true";
    if (!userStatus) {
      Swal.fire({
        icon: "error",
        title: "Truy Cập Bị Từ Chối",
        text: "Bạn cần phải đăng nhập để truy cập trang này.",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/login");
      });
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  useEffect(() => {
    if (courseId && courseState.length > 0) {
      const course = courseState.find(
        (course: Course) => course.id === parseInt(courseId, 10)
      );
      if (course) {
        dispatch(getClasses(course.id));
      }
    }
  }, [dispatch, courseId, courseState]);

  useEffect(() => {
    if (selectedClassId !== null) {
      dispatch(getSubjects(selectedClassId));
    }
  }, [dispatch, selectedClassId]);

  useEffect(() => {
    if (selectedSubjectId !== null) {
      dispatch(getTests(selectedSubjectId));
    }
  }, [dispatch, selectedSubjectId]);

  useEffect(() => {
    if (selectedTestId !== null) {
      resetTimer();
      startTimer();
      dispatch(getQuestions(selectedTestId));
    } else {
      stopTimer();
    }
  }, [dispatch, selectedTestId]);

  const handleOptionChange = (questionId: number, option: string) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: option,
    }));
  };

  const handleSubmit = () => {
    stopTimer();
    Swal.fire({
      icon: "question",
      title: "Gửi bài kiểm tra",
      text: "Bạn có chắc chắn muốn gửi sớm không?",
      showCancelButton: true,
      confirmButtonText: "Có",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        const correctAnswers = questionState.filter(
          (question: Question) => userAnswers[question.id] === question.answer
        ).length;
        const score = ((correctAnswers / questionState.length) * 100).toFixed(
          2
        );
        const userId = localStorage.getItem("userId");
        const userAnswer: UserAnswer = {
          id: 0,
          userId: userId,
          examId: selectedTestId!,
          score: score,
        };

        dispatch(saveUserAnswers(userAnswer, testState.id)).then(() => {
          navigate("/home");
          Swal.fire({
            icon: "success",
            title: "Đã gửi bài kiểm tra",
            text: `Số câu đúng của bạn là: ${correctAnswers}/${questionState.length}. Điểm của bạn là: ${score}`,
            confirmButtonText: "OK",
          });
        });
      } else {
        startTimer();
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="mt-[50px] flex flex-col items-center">
        {selectedClassId === null &&
        selectedSubjectId === null &&
        selectedTestId === null ? (
          <>
            <h1 className="text-3xl font-bold mb-[20px]">
              {courseState.length > 0 &&
                courseState.find(
                  (course: Course) => course.id === parseInt(courseId || "0")
                )?.nameCourse}
            </h1>
            <div className="flex flex-col gap-[20px] mb-[100px]">
              {classState
                .filter(
                  (item: Class) => item.courseId === parseInt(courseId || "0")
                )
                .map((item: Class) => (
                  <button
                    key={item.id}
                    className="h-[40px] feature w-[400px] flex flex-col p-[10px] justify-center items-center"
                    onClick={() => setSelectedClassId(item.id)}
                  >
                    <h2 className="text-2xl font-bold">{item.nameClass}</h2>
                  </button>
                ))}
            </div>
          </>
        ) : selectedClassId !== null &&
          selectedSubjectId === null &&
          selectedTestId === null ? (
          <>
            <button
              className="mb-[20px] p-[10px] bg-gray-300 rounded"
              onClick={() => setSelectedClassId(null)}
            >
              Quay lại khóa học
            </button>
            <div className="flex flex-col gap-[20px] mb-[100px]">
              <h2 className="text-2xl font-bold">Môn Học:</h2>
              {subjectState
                .filter(
                  (subject: Subject) => subject.classId === selectedClassId
                )
                .map((subject: Subject) => (
                  <div
                    key={subject.id}
                    className="subject w-[400px] flex flex-col p-[10px] justify-center items-center"
                  >
                    <button
                      className="text-xl font-bold"
                      onClick={() => setSelectedSubjectId(subject.id)}
                    >
                      {subject.nameSubject}
                    </button>
                  </div>
                ))}
            </div>
          </>
        ) : selectedClassId !== null &&
          selectedSubjectId !== null &&
          selectedTestId === null ? (
          <>
            <button
              className="mb-[20px] p-[10px] bg-gray-300 rounded"
              onClick={() => setSelectedSubjectId(null)}
            >
              Quay lại chủ đề
            </button>
            <div className="flex flex-col gap-[20px] mb-[100px]">
              <h2 className="text-2xl font-bold">Đề Thi:</h2>
              {testState
                .filter((test: Test) => test.subjectId === selectedSubjectId)
                .map((test: Test) => (
                  <div
                    key={test.id}
                    className="test w-[400px] flex flex-col p-[10px] justify-center items-center"
                  >
                    <button
                      className="text-xl font-bold"
                      onClick={() => setSelectedTestId(test.id)}
                    >
                      {test.nameTest}
                    </button>
                  </div>
                ))}
            </div>
          </>
        ) : (
          <>
            {questionState && questionState.length > 0 ? (
              <div>
                <div className="text-[70px]">Thời Gian: {num}</div>
              </div>
            ) : (
              <div>Không tìm thấy câu hỏi nào</div>
            )}
            <button
              className="mb-[20px] p-[10px] bg-gray-300 rounded"
              onClick={() => setSelectedTestId(null)}
            >
              Quay lại bài kiểm tra
            </button>
            <div className="flex flex-col gap-[20px] mb-[100px]">
              <h2 className="text-2xl font-bold">Câu Hỏi:</h2>
              {questionState && questionState.length > 0 ? (
                questionState
                  .filter(
                    (question: Question) => question.testId === selectedTestId
                  )
                  .map((question: Question, index: number) => (
                    <div
                      key={question.id}
                      className="question w-[400px] flex flex-col p-[10px] justify-center items-center"
                    >
                      <h3 className="text-xl font-bold">
                        {index + 1}) {question.question}
                      </h3>
                      <ul className="list-disc ml-[20px]">
                        {question.option.map(
                          (option: string, optionIndex: number) => (
                            <li key={optionIndex}>
                              <label>
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  onChange={() =>
                                    handleOptionChange(question.id, option)
                                  }
                                />{" "}
                                {option}
                              </label>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  ))
              ) : (
                <div>Không tìm thấy câu hỏi nào</div>
              )}
            </div>
          </>
        )}
      </div>
      {selectedTestId !== null && questionState && questionState.length > 0 && (
        <div className="flex justify-center mb-[100px]">
          <button
            className="p-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            onClick={handleSubmit}
          >
            Hoàn Thành Bài Thi
          </button>
        </div>
      )}
      <Footer />
    </div>
  );
}
