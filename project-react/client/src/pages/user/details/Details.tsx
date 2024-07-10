import React, { useEffect } from 'react';
import "./details.css";
import { useDispatch, useSelector } from 'react-redux';
import { getClasses, getCourses, getTest, getTests } from '../../../stores/reducers/courseReducer';
import Header from '../../../components/user/Header';
import Footer from '../../../components/user/Footer';

export default function Details() {
  const dispatch = useDispatch();
  const courseState = useSelector((state: any) => state.course.courses);
  const classState = useSelector((state: any) => state.course.classes);
  const testState = useSelector((state:any)=> state.course.tests);
  const course = useSelector((state: any) => state.course.selectedCourse);

  useEffect(() => {
    dispatch(getCourses());
    if (course && course.id) {
      dispatch(getClasses(course.id));
    }
    dispatch(getTest());
  }, [dispatch, course]);

  console.log(courseState);
  console.log(classState);
  console.log(testState);
  
  return (
    <div>
      <Header></Header>
      <div className='flex flex-col gap-[20px] mt-[100px] mb-[100px] justify-center items-center'>
        {testState.map((test: any) => (
          <div key={test.id} className='feature w-[400px] flex flex-col p-[10px] justify-center items-center'>
            <h2>Đề thi {courseState.nameCourse} lớp {classState.nameClass}</h2>
            <button className='text-white bg-yellow-300 p-[5px] rounded-[10px]'>Bắt đầu thi</button>
          </div>
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
}
