import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SidebarAdmin from '../../components/admin/SidebarAdmin';
import { RootState } from '../../stores/store';
import { getCourses, getClasses, getSubjects, getTests, getQuestions, deleteCourse, deleteClass, deleteSubject, deleteTest, deleteQuestion } from '../../stores/reducers/courseReducer';

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

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const handleViewCourse = (course: any) => {
    setSelectedCourse(course);
    dispatch(getClasses(course.id));
    setSelectedClass(null);
    setSelectedSubject(null);
    setSelectedTest(null);
  };

  const handleViewClass = (classItem: any) => {
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

  const handleViewTest = (testItem: any) => {
    setSelectedTest(testItem);
    dispatch(getQuestions(testItem.id));
  };

  const handleDeleteCourse = (item: any) => {
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

  return (
    <div className="flex">
      <SidebarAdmin />
      <div className="flex-grow p-6">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-2 px-4">STT</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course: any, index: any) => (
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
              {classes && classes.map((classItem: any) => (
                <li key={classItem.id} className="flex items-center">
                  {classItem.nameClass}
                  <button className="ml-2" onClick={() => handleViewClass(classItem)}>
                    <i className="fa-solid fa-eye"></i>
                  </button>
                  <button onClick={() => handleDeleteCourse({ id: classItem.id, type: 'class' })}>
                    <i className="fa-solid fa-trash"></i>
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
                  {subjects && subjects.map((subjectItem: any) => (
                    <li key={subjectItem.id} className="flex items-center">
                      {subjectItem.nameSubject}
                      <button className="ml-2" onClick={() => handleViewSubject(subjectItem)}>
                        <i className="fa-solid fa-eye"></i>
                      </button>
                      <button onClick={() => handleDeleteCourse({ id: subjectItem.id, type: 'subject' })}>
                        <i className="fa-solid fa-trash"></i>
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
                      {tests && tests.map((testItem: any) => (
                        <li key={testItem.id} className="flex items-center">
                          {testItem.nameTest}
                          <button className="ml-2" onClick={() => handleViewTest(testItem)}>
                            <i className="fa-solid fa-eye"></i>
                          </button>
                          <button onClick={() => handleDeleteCourse({ id: testItem.id, type: 'test' })}>
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </li>
                      ))}
                    </ul>
                    {selectedTest && (
                      <div className="mt-4 p-4 bg-gray-400 rounded shadow">
                        <h4 className="text-lg font-semibold">Test Details</h4>
                        <h4 className="text-lg font-semibold mt-4">Questions</h4>
                        <ul>
                          {questions && questions.map((questionItem: any, index: any) => (
                            <li key={questionItem.id} className="mt-2 flex justify-between">
                              <div>
                                <p>{index + 1}) {questionItem.question}</p>
                              <ul>
                                {questionItem.option.map((option: string, index: number) => (
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
      {/* modal add*/}
      {/* <div>
        <select name="" id="">
          <option  value=""></option>
          <option value=""></option>
          <option value=""></option>
          <option value=""></option>
        </select>
      </div> */}
    </div>
  );
}
