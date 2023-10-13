import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL_API } from "../../constants/data";

const initialState = {
  loading: false,
  cartItems: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
  error: "",
};

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    return axios
      .get(`${SERVER_URL_API}/fetchCartItems`, { withCredentials: true })
      .then((res) => res.data);
  }
);

export const addItemsToCartAPI = createAsyncThunk(
  "cart/addItemsToCart",
  async () => {
    return axios
      .get(`${SERVER_URL_API}/`, { withCredentials: true })
      .then((res) => res.data);
  }
);

const CartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemsToCart: (state, action) => {
      const newItem = action.payload;
      const isItemExists = state.cartItems.find(
        (item) => item._id === newItem._id
      );
      if (!isItemExists) {
        state.cartItems = [...state.cartItems, newItem];
      }
    },
    removeItemFromCart: (state, action) => {
      const remvedItem = action.payload;
      state.cartItems = state.cartItems.map(
        (item) => item._id !== remvedItem._id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartItems.pending, () => {})
      .addCase(fetchCartItems.fulfilled, () => {})
      .addCase(fetchCartItems.rejected, () => {});
    builder
      .addCase(addItemsToCartAPI.pending, () => {})
      .addCase(addItemsToCartAPI.fulfilled, () => {})
      .addCase(addItemsToCartAPI.rejected, () => {});
  },
});

export default CartSlice.reducer;
export const { addItemsToCart, removeItemFromCart } = CartSlice.actions;
