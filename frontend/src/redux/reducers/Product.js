import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_PRODUCTS_URL } from "../../constants/data";

const initialState = {
  loading: false,
  products: [],
  error: "",
};

export const createProduct = createAsyncThunk(
  "product/create-product",
  async (data) => {
    return axios
      .post(`${SERVER_PRODUCTS_URL}/create-product`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => res.data);
  }
);
export const getAllProducts = createAsyncThunk(
  "products/get-all-products",
  async (id) => {
    return axios
      .get(`${SERVER_PRODUCTS_URL}/get-all-products/${id}`)
      .then((res) => res.data);
  }
);

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: () => {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = "";
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        state.error = action.error.message;
      });
  },
});

export default ProductSlice.reducer;
