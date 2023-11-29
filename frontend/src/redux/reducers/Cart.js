import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL_API } from "../../constants/data";
import toast from "react-hot-toast";

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
      const isItemExists = state.cartItems?.find(
        (item) => item._id === newItem._id
      );
      if (!isItemExists) {
        state.cartItems = [...state.cartItems, newItem];
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        toast.success("Item added successfully🎉");
      } else {
        toast.success("Item already in cart!");
      }
    },
    removeItemFromCart: (state, action) => {
      const _id = action.payload;
      state.cartItems = state.cartItems?.filter((item) => item._id !== _id);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.success("Item removed 🚮");
    },
    incrementItemQuantity: (state, action) => {
      const { _id, qty } = action.payload;
      state.cartItems = state.cartItems?.map((ele) => {
        if (ele._id == _id) {
          return { ...ele, qty: qty + 1 };
        } else return ele;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrementItemQuantity: (state, action) => {
      const { _id } = action.payload;
      state.cartItems = state.cartItems?.map((ele) => {
        if (ele._id == _id) {
          return { ...ele, qty: ele.qty - 1 };
        } else return ele;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
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

export const addToCart = (dispatch, cart, data) => {
  const { qty, stock } = data;
  if (qty > stock) {
    toast.error(`Quantity available ${stock}`);
  } else dispatch(addItemsToCart(data));
};

export const removeFromCart = (dispatch, id) => {
  dispatch(removeItemFromCart(id));
};

export default CartSlice.reducer;
export const {
  addItemsToCart,
  removeItemFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
} = CartSlice.actions;
