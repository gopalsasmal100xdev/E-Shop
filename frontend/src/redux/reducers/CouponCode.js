import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_SHOP_COUPON_URL_API } from "../../constants/data";

const initialState = {
  loading: false,
  coupons: [],
  error: "",
};

export const getAllCoupons = createAsyncThunk(
  "couponCode/getAllCoupons",
  async (id) => {
    return axios
      .get(`${SERVER_SHOP_COUPON_URL_API}/get-shop-coupon-codes/${id}`)
      .then((res) => res.data);
  }
);

const CouponCodeSlice = createSlice({
  name: "couponCode",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
        state.error = "";
      })
      .addCase(getAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.coupons = [];
        state.error = action.error.message || "Failed to load coupons!";
      });
  },
});

export default CouponCodeSlice.reducer;
