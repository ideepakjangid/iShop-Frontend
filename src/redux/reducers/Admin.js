import { createSlice } from "@reduxjs/toolkit";
import { login } from "./User";
const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    data: null,
    token:null
  },
  reducers: {
    register: (state, action) => {
      state.data = action.payload.admin;
    },
    loginAdmin: (state, action) => {
      state.data = action.payload.admin;
      state.token = action.payload.token
    },
    logoutAdmin: (state) => {
      state.data = null;
      localStorage.removeItem("admin");
      localStorage.removeItem("admin-token")
    },
    lsToAdmin: (state) => {
      const admin = localStorage.getItem("admin");
      const token = localStorage.getItem("admin-token")
      if (admin) {
        state.data = JSON.parse(admin);
      }
      if(token){
        state.token =  JSON.parse(token)
      }
    },
  },
});

export const { register, loginAdmin, logoutAdmin, lsToAdmin } = AdminSlice.actions;
export default AdminSlice.reducer;
