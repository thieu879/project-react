import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { RootState } from '../../stores/store';
import {
  getCourses,
  getClasses,
  getSubjects,
  getTests,
  getQuestions,
  deleteCourse,
  deleteClass,
  deleteSubject,
  deleteTest,
  deleteQuestion,
  addCourse,
  addClass,
  addSubject,
  addTest,
  addQuestion 
} from '../../stores/reducers/courseReducer';
import Swal from "sweetalert2";

export default function CourseManagement() {
  const dispatch = useDispatch();
  const courses = useSelector((state: RootState) => state.course.courses);
  const classes = useSelector((state: RootState) => state.course.classes);
  const subjects = useSelector((state: RootState) => state.course.subjects);
  const tests = useSelector((state: RootState) => state.course.tests);
  
  const questions = useSelector((state: RootState) => state.course.questions);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  const [isModalCourseOpen, setIsModalCourseOpen] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [isModalClassOpen, setIsModalClassOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [isModalSubjectOpen, setIsModalSubjectOpen] = useState(false);
  const [newSubjectName, setNewSubjectName] = useState('');
  const [isModalTestOpen, setIsModalTestOpen] = useState(false);
  const [newTestName, setNewTestName] = useState('');
  
  const [isModalQuestionOpen, setIsModalQuestionOpen] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleViewCourse = (course:any) => {
    setSelectedCourse(course);
    dispatch(getClasses(course.id));
    setSelectedClass(null);
    setSelectedSubject(null);
    setSelectedTest(null);
  };

  const handleViewClass = (classItem:any) => {
    setSelectedClass(classItem);
    dispatch(getSubjects(classItem.id));
    setSelectedSubject(null);
    setSelectedTest(null);
  };

  const handleViewSubject = (subjectItem: any) => {
    setSelectedSubject(subjectItem);
    dispatch(getTests(subjectItem.id));
    setSelectedTest(null);
    

  };

  const handleViewTest = (testItem:any) => {
    setSelectedTest(testItem);
    dispatch(getQuestions(testItem.id));

  };

  const handleDeleteCourse = (item: any) => {
    Swal.fire({
      title: `Bạn có chắc chắn xóa cái này không?`,
      text: `Bạn sẽ không thể hoàn nguyên điều này!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Có!",
      cancelButtonText: "Không",
    }).then((result) => {
      if (result.isConfirmed) {
        if (item.type === "course") {
          dispatch(deleteCourse(item.id));
        } else if (item.type === "class") {
          dispatch(deleteClass(item.id));
        } else if (item.type === "subject") {
          dispatch(deleteSubject(item.id));
        } else if (item.type === "test") {
          dispatch(deleteTest(item.id));
        } else if (item.type === "question") {
          dispatch(deleteQuestion(item.id));
        }
        Swal.fire("Đã xóa Thành Công!");
      }
    });
    
  };

  const handleOpenModalCourse = () => {
    setIsModalCourseOpen(true);
  };

  const handleCloseModalCourse = () => {
    setIsModalCourseOpen(false);
    setNewCourseName('');
  };

  const handleAddCourse = () => {
    if (newCourseName.trim() !== '') {
      dispatch(addCourse({ nameCourse: newCourseName }));
      handleCloseModalCourse();
    }
  };

  const handleOpenModalClass = () => {
    setIsModalClassOpen(true);
  };

  const handleCloseModalClass = () => {
    setIsModalClassOpen(false);
    setNewClassName('');
  };

  const handleAddClass = () => {
    if (newClassName.trim() !== '' && selectedCourse) {
      dispatch(addClass({ nameClass: newClassName, courseId: selectedCourse.id }));
      handleCloseModalClass();
    }
  };

  const handleOpenModalSubject = () => {
    setIsModalSubjectOpen(true);
  };

  const handleCloseModalSubject = () => {
    setIsModalSubjectOpen(false);
    setNewSubjectName('');
  };

  const handleAddSubject = () => {
    if (newSubjectName.trim() !== '' && selectedClass) {
      dispatch(addSubject({ nameSubject: newSubjectName, classId: selectedClass.id }));
      handleCloseModalSubject();
    }
  };

  const handleOpenModalTest = () => {
    setIsModalTestOpen(true);
  };

  const handleCloseModalTest = () => {
    setIsModalTestOpen(false);
    setNewTestName('');
  };

  const handleAddTest = () => {
    if (newTestName.trim() !== '' && selectedSubject) {
      dispatch(addTest({ nameTest: newTestName, subjectId: selectedSubject.id }));
      handleCloseModalTest();
    }
  };

  const handleOpenModalQuestion = () => {
    setIsModalQuestionOpen(true);
  };

  const handleCloseModalQuestion = () => {
    setIsModalQuestionOpen(false);
    setNewQuestion('');
    setOption1('');
    setOption2('');
    setOption3('');
    setOption4('');
    setAnswer('');
  };

  const handleAddQuestion = () => {
    if (
      newQuestion.trim() !== '' &&
      option1.trim() !== '' &&
      option2.trim() !== '' &&
      option3.trim() !== '' &&
      option4.trim() !== '' &&
      answer.trim() !== ''
    ) {
      dispatch(addQuestion({
        question: newQuestion,
        option: [option1, option2, option3, option4],
        answer: answer,
        testId: selectedTest.id
      }));
      handleCloseModalQuestion();
    }
  };

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-grow p-6">
        <button
          onClick={handleOpenModalCourse}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Thêm Khoá Học Mới
        </button>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">STT</th>
              <th className="py-2 px-4">Tên</th>
              <th className="py-2 px-4">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course: any, index: any) => (
              <tr key={course.id} className="border-b border-gray-200">
                <td className="py-2 px-4 text-center">{index + 1}</td>
                <td className="py-2 px-4 text-center">{course.nameCourse}</td>
                <td className="py-2 px-4 text-center flex gap-[10px] justify-center items-center">
                  <button onClick={() => handleViewCourse(course)}>
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteCourse({ id: course.id, type: "course" })
                    }
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button onClick={handleOpenModalClass}>
                    <i className="fa-solid fa-circle-plus"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {selectedCourse && (
          <div className="mt-4 p-4 bg-gray-100 rounded shadow">
            <h2 className="text-xl font-bold">Chi tiết khóa học</h2>
            <p>
              <strong>Name:</strong> {selectedCourse.nameCourse}
            </p>
            <h3 className="text-lg font-semibold mt-4">Classes</h3>
            <tr>
              {classes &&
                classes.map((classItem: any) => (
                  <td
                    key={classItem.id}
                    className="flex items-center gap-[10px]"
                  >
                    {classItem.nameClass}
                    <button
                      className="ml-2"
                      onClick={() => handleViewClass(classItem)}
                    >
                      <i className="fa-solid fa-eye"></i>
                    </button>
                    <button
                      onClick={() =>
                        handleDeleteCourse({ id: classItem.id, type: "class" })
                      }
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <button onClick={handleOpenModalSubject}>
                      <i className="fa-solid fa-circle-plus"></i>
                    </button>
                  </td>
                ))}
            </tr>
            {selectedClass && (
              <div className="mt-4 p-4 bg-gray-200 rounded shadow">
                <h3 className="text-lg font-semibold">Chi tiết lớp học</h3>
                <p>
                  <strong>Tên:</strong> {selectedClass.nameClass}
                </p>
                <h3 className="text-lg font-semibold mt-4">Môn Học</h3>
                <ul>
                  {subjects &&
                    subjects.map((subjectItem: any) => (
                      <li
                        key={subjectItem.id}
                        className="flex items-center gap-[10px]"
                      >
                        {subjectItem.nameSubject}
                        <button
                          className="ml-2"
                          onClick={() => handleViewSubject(subjectItem)}
                        >
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteCourse({
                              id: subjectItem.id,
                              type: "subject",
                            })
                          }
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                        <button onClick={handleOpenModalTest}>
                          <i className="fa-solid fa-circle-plus"></i>
                        </button>
                      </li>
                    ))}
                </ul>
                {selectedSubject && (
                  <div className="mt-4 p-4 bg-gray-300 rounded shadow">
                    <h4 className="text-lg font-semibold">Chi tiết chủ đề</h4>
                    <p>
                      <strong>Tên:</strong> {selectedSubject.nameSubject}
                    </p>
                    <h4 className="text-lg font-semibold mt-4">Bài Kiểm Tra</h4>
                    <ul>
                      {tests &&
                        tests.map((testItem: any) => (
                          <li
                            key={testItem.id}
                            className="flex items-center gap-[10px]"
                          >
                            {testItem.nameTest}
                            <button
                              className="ml-2"
                              onClick={() => handleViewTest(testItem)}
                            >
                              <i className="fa-solid fa-eye"></i>
                            </button>
                            <button
                              onClick={() =>
                                handleDeleteCourse({
                                  id: testItem.id,
                                  type: "test",
                                })
                              }
                            >
                              <i className="fa-solid fa-trash"></i>
                            </button>
                            <button onClick={handleOpenModalQuestion}>
                              <i className="fa-solid fa-circle-plus"></i>
                            </button>
                          </li>
                        ))}
                    </ul>
                    {selectedTest && (
                      <div className="mt-4 p-4 bg-gray-400 rounded shadow">
                        <h4 className="text-lg font-semibold">
                          Chi tiết kiểm tra
                        </h4>
                        <h4 className="text-lg font-semibold mt-4">Câu Hỏi:</h4>
                        <ul>
                          {questions &&
                            questions.map((questionItem: any, index: any) => (
                              <li
                                key={questionItem.id}
                                className="mt-2 flex justify-between"
                              >
                                <div>
                                  <p>
                                    {index + 1}) {questionItem.question}
                                  </p>
                                  <ul>
                                    {questionItem.option.map(
                                      (option: any, index: any) => (
                                        <li
                                          key={index}
                                          className={
                                            questionItem.answer === option
                                              ? "text-green-600 font-bold"
                                              : ""
                                          }
                                        >
                                          {option}
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                                <button
                                  onClick={() =>
                                    handleDeleteCourse({
                                      id: questionItem.id,
                                      type: "question",
                                    })
                                  }
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      {/* Modal Add Course */}
      {isModalCourseOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Thêm khóa học mới</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Tên khóa học</label>
              <input
                type="text"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModalCourse}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Huỷ Bỏ
              </button>
              <button
                onClick={handleAddCourse}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Add Class */}
      {isModalClassOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Thêm lớp mới</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Tên Lớp</label>
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModalClass}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Huỷ Bỏ
              </button>
              <button
                onClick={handleAddClass}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Add Subject */}
      {isModalSubjectOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Thêm Môn mới</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Tên Môn</label>
              <input
                type="text"
                value={newSubjectName}
                onChange={(e) => setNewSubjectName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModalSubject}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Huỷ Bỏ
              </button>
              <button
                onClick={handleAddSubject}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Add Test */}
      {isModalTestOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Thêm Đề Thi Mới</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Tên Đề Thi</label>
              <input
                type="text"
                value={newTestName}
                onChange={(e) => setNewTestName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModalTest}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Huỷ Bỏ
              </button>
              <button
                onClick={handleAddTest}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Add Question */}
      {isModalQuestionOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Thêm Câu Hỏi Mới</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Câu Hỏi</label>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Lựa chọn 1</label>
              <input
                type="text"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Lựa chọn 2</label>
              <input
                type="text"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Lựa chọn 3</label>
              <input
                type="text"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Lựa chọn 4</label>
              <input
                type="text"
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Đáp Án</label>
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleCloseModalQuestion}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Huỷ
              </button>
              <button
                onClick={handleAddQuestion}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

