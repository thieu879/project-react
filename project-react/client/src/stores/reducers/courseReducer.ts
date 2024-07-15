import { createSlice } from "@reduxjs/toolkit";
import { Class, Course, Subject, Test, Question, UserAnswer } from "../../interface/interface";
import { addClass, addCourse, addQuestion, addSubject, addTest, deleteClass, deleteCourse, deleteQuestion, deleteSubject, deleteTest, getClasses, getCourses, getQuestions, getSubjects, getTests, getUserAnswers, saveUserAnswers } from "../../service/course.service";

interface CourseState {
  courses: Course[];
  classes: Class[];
  subjects: Subject[];
  tests: Test[];
  questions: Question[];
  userAnswers: UserAnswer[];
}

const initialState: CourseState = {
  courses: [],
  classes: [],
  subjects: [],
  tests: [],
  questions: [],
  userAnswers: [],
};


const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCourses.fulfilled, (state, action) => {
      state.courses = action.payload;
    });
    builder.addCase(getClasses.fulfilled, (state, action) => {
      state.classes = action.payload;
    });
    builder.addCase(getTests.fulfilled, (state, action) => {
      state.tests = action.payload;
    });
    builder.addCase(getSubjects.fulfilled, (state, action) => {
      state.subjects = action.payload;
    });
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.questions = action.payload;
    });
    builder.addCase(deleteCourse.fulfilled, (state, action) => {
      state.courses = state.courses.filter((course) => course.id !== action.payload);
    });
    builder.addCase(deleteClass.fulfilled, (state, action) => {
      state.classes = state.classes.filter((classItem) => classItem.id !== action.payload);
    });
    builder.addCase(deleteSubject.fulfilled, (state, action) => {
      state.subjects = state.subjects.filter((subject) => subject.id !== action.payload);
    });
    builder.addCase(deleteTest.fulfilled, (state, action) => {
      state.tests = state.tests.filter((testItem) => testItem.id !== action.payload);
    });
    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.questions = state.questions.filter((question) => question.id !== action.payload);
    });
    builder.addCase(addCourse.fulfilled, (state, action) => {
      state.courses.push(action.payload);
    });
    builder.addCase(addClass.fulfilled, (state, action) => {
      state.classes.push(action.payload);
    });
    builder.addCase(addSubject.fulfilled, (state, action) => {
      state.subjects.push(action.payload);
    });
    builder.addCase(addTest.fulfilled, (state, action) => {
      state.tests.push(action.payload);
    });
    builder.addCase(addQuestion.fulfilled, (state, action) => {
      state.questions.push(action.payload);
    });
    builder.addCase(saveUserAnswers.fulfilled, (state, action) => {
      state.userAnswers.push(action.payload);
    });
    builder.addCase(getUserAnswers.fulfilled, (state, action) => {
      state.userAnswers = action.payload;
    });
  },
});

export default courseSlice.reducer;
