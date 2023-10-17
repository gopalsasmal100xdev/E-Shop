import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  orders: [],
  error: "",
};

const OrderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: () => {},
});

export default OrderSlice.reducer;
