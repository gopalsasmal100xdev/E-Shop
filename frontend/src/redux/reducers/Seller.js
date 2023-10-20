import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_SHOP_URL_API } from "../../constants/data";

const initialState = {
  loading: false,
  isSelllerAuthenticated: false,
  seller: {},
  error: "",
};

export const fetchSeller = createAsyncThunk("seller/get-seller", async () => {
  return axios
    .get(`${SERVER_SHOP_URL_API}/getSeller`, {
      withCredentials: true,
    })
    .then((res) => res.data.data);
});

const SellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeller.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSeller.fulfilled, (state, action) => {
        state.loading = false;
        state.seller = action.payload;
        state.isSelllerAuthenticated = true;
      })
      .addCase(fetchSeller.rejected, (state, action) => {
        state.loading = false;
        state.isSelllerAuthenticated = false;
        state.error = action.error.message;
      });
  },
});

export default SellerSlice.reducer;
