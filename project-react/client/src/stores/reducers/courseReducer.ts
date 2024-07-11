import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { Class, Course, Subject, Test, Question } from "../../interface/interface";

interface CourseState {
  courses: Course[];
  classes: Class[];
  subjects: Subject[];
  tests: Test[];
  questions: Question[];
}

const initialState: CourseState = {
  courses: [],
  classes: [],
  subjects: [],
  tests: [],
  questions: [],
};

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
  async (courseId: number) => {
    const response = await axios.get(`http://localhost:8080/test?courseId=${courseId}`);
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
  },
});

export default courseSlice.reducer;
