import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { Admin, LoginPayload } from "../../interface/interface";

const initialState: { admins: Admin[]; loggedInAdmin: Admin | null } = {
    admins: [],
    loggedInAdmin: null,
};

export const getAdmin:any = createAsyncThunk(
  "admin/getAdmin",
  async () => {
    const response = await axios.get("http://localhost:8080/admin");
    return response.data;
  }
);

export const loginAdmin:any = createAsyncThunk(
  "admin/loginAdmin",
  async ({ email, password }: LoginPayload) => {
    const response = await axios.get("http://localhost:8080/admin");
    const admins: Admin[] = response.data;
    const admin = admins.find(
      admin => admin.email === email && admin.password === password
    );
    if (admin) {
      return admin;
    } else {
      throw new Error("Invalid email or password");
    }
  }
);

const adminReducer = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.admins = action.payload;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loggedInAdmin = action.payload;
      });
  },
});

export default adminReducer.reducer;
