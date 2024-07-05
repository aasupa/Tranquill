// // globalSlice.js
// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   mode: "dark",
//   userId: null,
//   isLoggedIn: false,
//   user: null,
//   accessToken: null,
// };

// export const globalSlice = createSlice({
//   name: "global",
//   initialState,
//   reducers: {
//     setMode: (state) => {
//       state.mode = state.mode === "light" ? "dark" : "light";
//     },
//     login: (state, action) => {
//       state.user = action.payload.user;
//       state.accessToken = action.payload.accessToken;
//       state.isLoggedIn = true;
//     },
//     logout: (state) => {
//       state.user = null;
//       state.accessToken = null;
//       state.isLoggedIn = false;
//     },
//   },
// });

// export const { setMode, login, logout } = globalSlice.actions;

// export default globalSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light", // Set the initial mode to light
  userId: null,
  isLoggedIn: false,
  user: null,
  accessToken: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    login: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setMode, login, logout } = globalSlice.actions;

export default globalSlice.reducer;
