import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import CryptoJS from 'crypto-js';
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
    const admin = response.data.find((admin) => {
      const decryptedPassword = CryptoJS.AES.decrypt(admin.password, 'secret key 123').toString(CryptoJS.enc.Utf8);
      return admin.email === email && decryptedPassword === password && admin.role === RoleType.Admin;
    });
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
    const user = response.data.find((user) => {
      const decryptedPassword = CryptoJS.AES.decrypt(user.password, 'secret key 123').toString(CryptoJS.enc.Utf8);
      return user.email === email && decryptedPassword === password && user.role === RoleType.User;
    });
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

export const addAdmin:any = createAsyncThunk(
  "admin/addAdmin",
  async (newAdmin: Account) => {
    const encryptedPassword = CryptoJS.AES.encrypt(newAdmin.password, 'secret key 123').toString();
    const response = await axios.post<Account>("http://localhost:8080/account", { ...newAdmin, password: encryptedPassword });
    return response.data;
  }
);

export const updateAdmin:any = createAsyncThunk(
  "admin/updateAdmin",
  async (updatedAdmin: Account) => {
    const encryptedPassword = CryptoJS.AES.encrypt(updatedAdmin.password, 'secret key 123').toString();
    const response = await axios.put<Account>(`http://localhost:8080/account/${updatedAdmin.id}`, { ...updatedAdmin, password: encryptedPassword });
    return response.data;
  }
);

export const deleteAdmin:any = createAsyncThunk(
  "admin/deleteAdmin",
  async (id: number) => {
    await axios.delete(`http://localhost:8080/account/${id}`);
    return id;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAdmin.fulfilled, (state, action) => {
      state.admins = action.payload;
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(loginAdmin.fulfilled, (state, action) => {
      state.loggedInAdmin = action.payload;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
      if (userIndex !== -1) {
        state.users[userIndex] = action.payload;
      }
    });
    builder.addCase(updateAdminStatus.fulfilled, (state, action) => {
      const adminIndex = state.admins.findIndex((admin) => admin.id === action.payload.id);
      if (adminIndex !== -1) {
        state.admins[adminIndex].loginStatus = action.payload.loginStatus;
      }
    });
    builder.addCase(updateUserStatus.fulfilled, (state, action) => {
      const userIndex = state.users.findIndex((user) => user.id === action.payload.id);
      if (userIndex !== -1) {
        state.users[userIndex].loginStatus = action.payload.loginStatus;
      }
    });
    builder.addCase(addAdmin.fulfilled, (state, action) => {
      state.admins.push(action.payload);
    });
    builder.addCase(updateAdmin.fulfilled, (state, action) => {
      const index = state.admins.findIndex((admin) => admin.id === action.payload.id);
      if (index !== -1) {
        state.admins[index] = action.payload;
      }
    });
    builder.addCase(deleteAdmin.fulfilled, (state, action) => {
      state.admins = state.admins.filter((admin) => admin.id !== action.payload);
    });
  },
});

export default adminSlice.reducer;
