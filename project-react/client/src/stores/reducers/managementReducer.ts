import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { LoginPayload, Account, RoleType } from "../../interface/interface";

interface AdminState {
  admins: Account[];
  loggedInAdmin: Account | null;
  users: Account[];
}

const initialState: AdminState = {
  admins: [],
  loggedInAdmin: null,
  users: [],
};

export const getAdmin:any = createAsyncThunk(
  "admin/getAdmin",
  async () => {
    const response = await axios.get<Account[]>("http://localhost:8080/account");
    return response.data.filter((admin) => admin.role === RoleType.Admin);
  }
);

export const getUsers:any = createAsyncThunk(
  "admin/getUsers",
  async () => {
    const response = await axios.get<Account[]>("http://localhost:8080/account");
    return response.data.filter((user) => user.role === RoleType.User);
  }
);

export const loginAdmin:any = createAsyncThunk(
  "admin/loginAdmin",
  async ({ email, password }: LoginPayload) => {
    const response = await axios.get<Account[]>("http://localhost:8080/account");
    const admin = response.data.find((admin) => admin.email === email && admin.password === password && admin.role === RoleType.Admin);
    if (admin) {
      return admin;
    } else {
      throw new Error("Invalid email or password");
    }
  }
);

export const loginUser:any = createAsyncThunk(
  "admin/loginUser",
  async ({ email, password }: LoginPayload) => {
    const response = await axios.get<Account[]>("http://localhost:8080/account");
    const user = response.data.find((user) => user.email === email && user.password === password && user.role === RoleType.User);
    if (user) {
      return user;
    } else {
      throw new Error("Invalid email or password");
    }
  }
);

export const updateAdminStatus:any = createAsyncThunk(
  "admin/updateAdminStatus",
  async ({ id, loginStatus }: { id: number, loginStatus: boolean }) => {
    const response = await axios.patch<Account>(`http://localhost:8080/account/${id}`, { loginStatus });
    return response.data;
  }
);

export const updateUserStatus:any = createAsyncThunk(
  "admin/updateUserStatus",
  async ({ id, loginStatus }: { id: number, loginStatus: boolean }) => {
    const response = await axios.patch<Account>(`http://localhost:8080/account/${id}`, { loginStatus });
    return response.data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdmin.fulfilled, (state, action) => {
        state.admins = action.payload;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.loggedInAdmin = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loggedInAdmin = action.payload; 
      })
      .addCase(updateAdminStatus.fulfilled, (state, action) => {
        const index = state.admins.findIndex((admin) => admin.id === action.payload.id);
        if (index !== -1) {
          state.admins[index] = action.payload;
        }
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      });
  },
});

export default adminSlice.reducer;
