import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./details.css";
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, getClasses, getTests, getSubjects } from '../../../stores/reducers/courseReducer';
import Header from '../../../components/user/Header';
import Footer from '../../../components/user/Footer';

export default function Details() {
  const { courseId } = useParams();
  const dispatch = useDispatch();
  const courseState = useSelector((state: any) => state.course.courses);
  const classState = useSelector((state: any) => state.course.classes);
  const testState = useSelector((state: any) => state.course.tests);
  const subjectState = useSelector((state: any) => state.course.subjects);
  const course = courseState.find((course: any) => course.id === parseInt(courseId));
  const navigate = useNavigate();
  console.log(testState);
  
  useEffect(() => {
    dispatch(getCourses());
    if (course?.id) {
      dispatch(getClasses(course.id));
      dispatch(getTests(course.id));
      dispatch(getSubjects(course.id));
    }
  }, [dispatch, course]);

  return (
    <div>
      <Header />
      <div>
        <label htmlFor="class-select">Chọn class</label>
        <select id="class-select">
          {classState.filter((item: any) => item.courseId === course?.id).map((item: any) => (
            <option key={item.id} value={item.id}>{item.nameClass}</option>
          ))}
        </select>
      </div>
      <div className='flex flex-col gap-[20px] mt-[100px] mb-[100px] justify-center items-center'>
        {testState.filter((test: any) => classState.some((classes: any) => classes.courseId === course?.id && classes.id === test.subjectId)).map((test: any,index:any) => (
          <div key={test.id} className='feature w-[400px] flex flex-col p-[10px] justify-center items-center'>
            <h2>{index} {test.nameTest} {course?.nameCourse} {subjectState.find((subject: any) => subject.id === test.subjectId)?.nameSubject} môn {classState.find((classes: any) => classes.id === test.subjectId)?.nameClass}</h2>
            <button onClick={() => navigate(`/exam/${test.id}`)} className='text-white bg-yellow-300 p-[5px] rounded-[10px]'>Bắt đầu thi</button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
