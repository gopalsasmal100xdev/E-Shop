import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL_API } from "../../constants/data";

const initialState = {
  loading: false,
  isAuthenticated: false,
  user: {},
  error: "",
};

export const fetchUser = createAsyncThunk("user/get-user", async () => {
  return axios
    .get(`${SERVER_URL_API}/user/getUser`, {
      withCredentials: true,
    })
    .then((res) => res.data)
    .catch((err) => err.message || "Error in fetching user data!");
});

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.isAuthenticated = false;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data;
        state.error = "";
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthenticated = false;
      });
  },
});

export default UserSlice.reducer;
