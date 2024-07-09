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
  addQuestion // Add this import from your courseReducer
} from '../../stores/reducers/courseReducer';

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
  
  // State for the new question modal
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

  const handleViewSubject = (subjectItem:any) => {
    setSelectedSubject(subjectItem);
    dispatch(getTests(subjectItem.id));
    setSelectedTest(null);
  };

  const handleViewTest = (testItem:any) => {
    setSelectedTest(testItem);
    dispatch(getQuestions(testItem.id));
  };

  const handleDeleteCourse = (item:any) => {
    if (item.type === 'course') {
      dispatch(deleteCourse(item.id));
    } else if (item.type === 'class') {
      dispatch(deleteClass(item.id));
    } else if (item.type === 'subject') {
      dispatch(deleteSubject(item.id));
    } else if (item.type === 'test') {
      dispatch(deleteTest(item.id));
    } else if (item.type === 'question') {
      dispatch(deleteQuestion(item.id));
    }
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

  // Modal for adding a new question
  const handleOpenModalQuestion = () => {
    setIsModalQuestionOpen(true);
  };

  const handleCloseModalQuestion = () => {
    setIsModalQuestionOpen(false);
    // Reset state for inputs
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
        <button onClick={handleOpenModalCourse} className="mb-4 bg-blue-500 text-white px-4 py-2 rounded">Add New Course</button>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">STT</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course:any, index:any) => (
              <tr key={course.id} className="border-b border-gray-200">
                <td className="py-2 px-4 text-center">{index + 1}</td>
                <td className="py-2 px-4 text-center">{course.nameCourse}</td>
                <td className="py-2 px-4 text-center">
                  <button onClick={() => handleViewCourse(course)}>
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button onClick={() => handleDeleteCourse({ id: course.id, type: 'course' })}>
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
            <h2 className="text-xl font-bold">Course Details</h2>
            <p><strong>Name:</strong> {selectedCourse.nameCourse}</p>
            <h3 className="text-lg font-semibold mt-4">Classes</h3>
            <ul>
              {classes && classes.map((classItem:any) => (
                <li key={classItem.id} className="flex items-center">
                  {classItem.nameClass}
                  <button className="ml-2" onClick={() => handleViewClass(classItem)}>
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button onClick={() => handleDeleteCourse({ id: classItem.id, type: 'class' })}>
                    <i className="fa-solid fa-trash"></i>
                  </button>
                  <button onClick={handleOpenModalSubject}>
                    <i className="fa-solid fa-circle-plus"></i>
                  </button>
                </li>
              ))}
            </ul>
            {selectedClass && (
              <div className="mt-4 p-4 bg-gray-200 rounded shadow">
                <h3 className="text-lg font-semibold">Class Details</h3>
                <p><strong>Name:</strong> {selectedClass.nameClass}</p>
                <h3 className="text-lg font-semibold mt-4">Subjects</h3>
                <ul>
                  {subjects && subjects.map((subjectItem:any) => (
                    <li key={subjectItem.id} className="flex items-center">
                      {subjectItem.nameSubject}
                      <button className="ml-2" onClick={() => handleViewSubject(subjectItem)}>
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button onClick={() => handleDeleteCourse({ id: subjectItem.id, type: 'subject' })}>
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
                    <h4 className="text-lg font-semibold">Subject Details</h4>
                    <p><strong>Name:</strong> {selectedSubject.nameSubject}</p>
                    <h4 className="text-lg font-semibold mt-4">Tests</h4>
                    <ul>
                      {tests && tests.map((testItem:any) => (
                        <li key={testItem.id} className="flex items-center">
                          {testItem.nameTest}
                          <button className="ml-2" onClick={() => handleViewTest(testItem)}>
                            <i className="fa-solid fa-eye"></i>
                          </button>
                          <button onClick={() => handleDeleteCourse({ id: testItem.id, type: 'test' })}>
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
                        <h4 className="text-lg font-semibold">Test Details</h4>
                        <h4 className="text-lg font-semibold mt-4">Questions</h4>
                        <ul>
                          {questions && questions.map((questionItem:any, index:any) => (
                            <li key={questionItem.id} className="mt-2 flex justify-between">
                              <div>
                                <p>{index + 1}) {questionItem.question}</p>
                                <ul>
                                  {questionItem.option.map((option:any, index:any) => (
                                    <li key={index} className={questionItem.answer === option ? 'text-green-600 font-bold' : ''}>
                                      {option}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              <button onClick={() => handleDeleteCourse({ id: questionItem.id, type: 'question' })}>
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
            <h2 className="text-xl font-bold mb-4">Add New Course</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Course Name</label>
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
                Cancel
              </button>
              <button
                onClick={handleAddCourse}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Add Class */}
      {isModalClassOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Class</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Class Name</label>
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
                Cancel
              </button>
              <button
                onClick={handleAddClass}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Add Subject */}
      {isModalSubjectOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Subject</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Subject Name</label>
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
                Cancel
              </button>
              <button
                onClick={handleAddSubject}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Add Test */}
      {isModalTestOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Test</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Test Name</label>
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
                Cancel
              </button>
              <button
                onClick={handleAddTest}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Modal Add Question */}
      {isModalQuestionOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add New Question</h2>
            <div className="mb-4">
              <label className="block text-gray-700">Question</label>
              <input
                type="text"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Option 1</label>
              <input
                type="text"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Option 2</label>
              <input
                type="text"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Option 3</label>
              <input
                type="text"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Option 4</label>
              <input
                type="text"
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Answer</label>
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
                Cancel
              </button>
              <button
                onClick={handleAddQuestion}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

