import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import {LoginPayload } from "../../interface/interface";

const initialState = {
  user: [],
  loggedInUser: null,
};

export const getUser:any = createAsyncThunk(
  "users/getUsers",
  async () => {
    const response = await axios.get("http://localhost:8080/users");
    return response.data;
  }
);

export const loginUser:any = createAsyncThunk(
  "users/loginUsers",
  async ({ email, password }: LoginPayload) => {
    const response = await axios.get("http://localhost:8080/users");
    const users = response.data;
    const user = users.find((user:any) => user.email === email && user.password === password);
    if (user) {
      return user;
    } else {
      throw new Error("Invalid email or password");
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggedInUser = action.payload;
      });
  },
});

export default userSlice.reducer;
