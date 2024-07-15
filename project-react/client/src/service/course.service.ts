import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserAnswer } from "../interface/interface";

export const getCourses:any = createAsyncThunk(
  "course/getCourses",
  async () => {
    const response = await axios.get("http://localhost:8080/course");
    return response.data;
  }
);

export const getClasses:any = createAsyncThunk(
  "course/getClasses",
  async (courseId: number) => {
    const response = await axios.get(`http://localhost:8080/class?courseId=${courseId}`);
    return response.data;
  }
);

export const getTests:any = createAsyncThunk(
  "course/getTests",
  async (subjectId: number) => {
    const response = await axios.get(`http://localhost:8080/test?subjectId=${subjectId}`);    
    return response.data;
  }
);

export const getSubjects:any = createAsyncThunk(
  "course/getSubjects",
  async (classId: number) => {
    const response = await axios.get(`http://localhost:8080/subject?classId=${classId}`);
    return response.data;
  }
);

export const getQuestions:any = createAsyncThunk(
  "course/getQuestions",
  async (testId: number) => {
    const response = await axios.get(`http://localhost:8080/question?testId=${testId}`);
    return response.data;
  }
);

export const deleteCourse:any = createAsyncThunk(
  "course/deleteCourse",
  async (courseId: number) => {
    await axios.delete(`http://localhost:8080/course/${courseId}`);
    return courseId;
  }
);

export const deleteClass:any = createAsyncThunk(
  "course/deleteClass",
  async (classId: number) => {
    await axios.delete(`http://localhost:8080/class/${classId}`);
    return classId;
  }
);

export const deleteSubject:any = createAsyncThunk(
  "course/deleteSubject",
  async (subjectId: number) => {
    await axios.delete(`http://localhost:8080/subject/${subjectId}`);
    return subjectId;
  }
);

export const deleteTest:any = createAsyncThunk(
  "course/deleteTest",
  async (testId: number) => {
    await axios.delete(`http://localhost:8080/test/${testId}`);
    return testId;
  }
);

export const deleteQuestion:any = createAsyncThunk(
  "course/deleteQuestion",
  async (questionId: number) => {
    await axios.delete(`http://localhost:8080/question/${questionId}`);
    return questionId;
  }
);

export const addCourse:any = createAsyncThunk(
  "course/addCourse",
  async (course) => {
    const response = await axios.post("http://localhost:8080/course", course);
    return response.data;
  }
);

export const addClass:any = createAsyncThunk(
  "class/addClass",
  async (classItem) => {
    const response = await axios.post("http://localhost:8080/class", classItem);
    return response.data;
  }
);
export const addSubject:any = createAsyncThunk(
  "subject/addSubject",
  async (subject) => {
    const response = await axios.post("http://localhost:8080/subject", subject);
    return response.data;
  }
);
export const addTest:any = createAsyncThunk(
  "test/addTest",
  async (test) => {
    const response = await axios.post("http://localhost:8080/test", test);
    return response.data;
  }
);
export const addQuestion:any = createAsyncThunk(
  "question/addQuestion",
  async (question) => {
    const response = await axios.post("http://localhost:8080/question", question);
    return response.data;
  }
);
export const saveUserAnswers: any = createAsyncThunk(
  "course/saveUserAnswers",
  async (userAnswer: UserAnswer) => {
    const response = await axios.post("http://localhost:8080/userAnswer", userAnswer);
    return response.data;
  }
);
export const getUserAnswers: any = createAsyncThunk(
  "course/getUserAnswers",
  async (userId: number) => { const response = await axios.get(`http://localhost:8080/userAnswer?userId=${userId}`);
  return response.data;
});