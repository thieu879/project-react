import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./details.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getCourses,
  getClasses,
  getSubjects,
  getTests,
  getQuestions,
} from "../../../stores/reducers/courseReducer";
import Header from "../../../components/user/Header";
import Footer from "../../../components/user/Footer";
import { RootState } from "../../../stores/store";
import {
  Class,
  Course,
  Question,
  Subject,
  Test,
} from "../../../interface/interface";

export default function Details() {
  const { courseId } = useParams<{ courseId: string }>();
  const dispatch = useDispatch();
  const courseState = useSelector((state: RootState) => state.course.courses);
  const classState = useSelector((state: RootState) => state.course.classes);
  const subjectState = useSelector((state: RootState) => state.course.subjects);
  const testState = useSelector((state: RootState) => state.course.tests);
  const questionState = useSelector(
    (state: RootState) => state.course.questions
  );
  const course = courseState.find(
    (course: Course) => course.id === parseInt(courseId || "0")
  );
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null
  );
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  useEffect(() => {
    if (course && course.id) {
      dispatch(getClasses(course.id));
    }
  }, [dispatch, course]);

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
      dispatch(getQuestions(selectedTestId));
    }
  }, [dispatch, selectedTestId]);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <div>
      <Header />
      <div>time</div>
      <div className="mt-[50px] flex flex-col items-center">
        {selectedClassId === null &&
        selectedSubjectId === null &&
        selectedTestId === null ? (
          <>
            <h1 className="text-3xl font-bold mb-[20px]">
              {course.nameCourse}
            </h1>
            <div className="flex flex-col gap-[20px] mb-[100px]">
              {classState
                .filter((item: Class) => item.courseId === course.id)
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
              Back to Course
            </button>
            <div className="flex flex-col gap-[20px] mb-[100px]">
              <h2 className="text-2xl font-bold">Subjects:</h2>
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
              Back to Subjects
            </button>
            <div className="flex flex-col gap-[20px] mb-[100px]">
              <h2 className="text-2xl font-bold">Tests:</h2>
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
            <button
              className="mb-[20px] p-[10px] bg-gray-300 rounded"
              onClick={() => setSelectedTestId(null)}
            >
              Back to Tests
            </button>
            <div className="flex flex-col gap-[20px] mb-[100px]">
              <h2 className="text-2xl font-bold">Questions:</h2>
              {questionState && questionState.length > 0 ? (
                questionState
                  .filter(
                    (question: Question) => question.testId === selectedTestId
                  )
                  .map((question: Question,index:any) => (
                    <div
                      key={question.id}
                      className="question w-[400px] flex flex-col p-[10px] justify-center items-center"
                    >
                      <h3 className="text-xl font-bold">{index+1}) {question.question}</h3>
                      <ul className="list-disc ml-[20px]">
                        {question.option.map((option: any, index: any) => (
                          <li key={index}>
                            <label>
                              <input
                                type="radio"
                                name={`question-${question.id}`}
                              />{" "}
                              {option}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))
              ) : (
                <div>No questions found</div>
              )}
            </div>
          </>
        )}
      </div>
      <button>nộp bài</button>
      <Footer />
    </div>
  );
}
