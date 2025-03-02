import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    data: null,
    token:null
  },
  reducers: {
    lsToUser(state) {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("token")
      if (user) {
        state.data = JSON.parse(user);
      }
      if(token){
        state.token = JSON.parse(token)
      }
    },
    updateUser(state, actions) {
      state.data = actions.payload.user;
    },
    login(state, actions) {
      state.token = actions.payload.token;
      state.data = actions.payload.user;
    },
    logout(state) {
      state.data = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem('token')
    },
  },
});

export const { login, lsToUser, logout,updateUser } = UserSlice.actions;
export default UserSlice.reducer;
