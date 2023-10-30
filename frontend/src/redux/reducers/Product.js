import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SERVER_PRODUCTS_URL } from "../../constants/data";
import { toast } from "react-hot-toast";

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

export const getProducts = createAsyncThunk(
  "products/get-products",
  async () => {
    return axios
      .get(`${SERVER_PRODUCTS_URL}/get-all-products`)
      .then((res) => res.data.data);
  }
);

export const deleteProduct = createAsyncThunk(
  "products/delete-product",
  async (id) => {
    return axios
      .delete(`${SERVER_PRODUCTS_URL}/delete-shop-product/${id}`, {
        withCredentials: true,
      })
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
        toast.error("Faild to load all products!");
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
        toast.success("Product deleted successfully!");
        state.error = "";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        toast.error("Faild to delete product!");
        state.error = action.error.message;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = "";
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.products = [];
        toast.error("Faild to get all products!");
        state.error = action.error.message;
      });
  },
});

export default ProductSlice.reducer;
