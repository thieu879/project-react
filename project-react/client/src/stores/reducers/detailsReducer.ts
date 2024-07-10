// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from 'axios';
// import { Class, Course, Subject, Test, Question } from "../../interface/interface";

// interface CourseState {
//   courses: Course[];
//   classes: Class[];
//   subjects: Subject[];
//   tests: Test[];
//   questions: Question[];
// }

// const initialState: CourseState = {
//   courses: [],
//   classes: [],
//   subjects: [],
//   tests: [],
//   questions: [],
// };

// export const getCourses:any = createAsyncThunk(
//   "course/getCourses",
//   async () => {
//     const response = await axios.get("http://localhost:8080/course");
//     return response.data;
//   }
// );

// const detailsSlice = createSlice({
//   name: "course",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(getCourses.fulfilled, (state, action) => {
//       state.courses = action.payload;
//     })
//   },
// });

// export default detailsSlice.reducer;
