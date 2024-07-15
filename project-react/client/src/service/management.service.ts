import { createAsyncThunk } from "@reduxjs/toolkit";
import { Account, LoginPayload, RoleType } from "../interface/interface";
import axios from "axios";

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
    console.log(password);
    console.log(email);
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

export const updateUserLoginStatus:any = createAsyncThunk(
  "admin/updateUserStatus",
  async ({ id, status }: { id: number, status: boolean }) => {
    const response = await axios.patch<Account>(`http://localhost:8080/account/${id}`, { status });
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

export const updateCurrentUserAvatar:any = createAsyncThunk(
  "admin/updateCurrentUserAvatar",
  async (updatedUser: Account) => {
    const response = await axios.put<Account>(`http://localhost:8080/account/${updatedUser.id}`, updatedUser);
    return response.data;
  }
);