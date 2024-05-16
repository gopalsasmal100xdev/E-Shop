import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SERVER_URL_API } from "../../constants/data";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const initialState = {
  loading: false,
  cartItems: [],
  error: "",
};

function getUserName() {
  const cookie = Cookies.get("userId");
  console.log("User Name -> ", cookie);

  return cookie;
}

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async () => {
    const userId = "66445601dcb5f9f82fa5bb3f";
    return axios
      .get(`${SERVER_URL_API}/user-cart/all-items/${userId}`, {
        withCredentials: true,
      })
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
    resetCart: (state, _action) => {
      state.cartItems = [];
    },
    refetchCartItems: (state, action) => {
      state.cartItems = localStorage.getItem(getUserName())
        ? JSON.parse(localStorage.getItem(getUserName()))
        : [];
    },
    addItemsToCart: (state, action) => {
      const newItem = action.payload;
      const isItemExists = state.cartItems?.find(
        (item) => item._id === newItem._id
      );
      if (!isItemExists) {
        state.cartItems = [...state.cartItems, newItem];
        localStorage.setItem(getUserName(), JSON.stringify(state.cartItems));
        toast.success("Item added successfully🎉");
      } else {
        toast.success("Item already in cart!");
      }
    },
    removeItemFromCart: (state, action) => {
      const _id = action.payload;
      state.cartItems = state.cartItems?.filter((item) => item._id !== _id);
      localStorage.setItem(getUserName(), JSON.stringify(state.cartItems));
      toast.success("Item removed 🚮");
    },
    incrementItemQuantity: (state, action) => {
      const { _id, qty } = action.payload;
      state.cartItems = state.cartItems?.map((ele) => {
        if (ele._id === _id) {
          return { ...ele, qty: qty + 1 };
        } else return ele;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrementItemQuantity: (state, action) => {
      const { _id } = action.payload;
      state.cartItems = state.cartItems?.map((ele) => {
        if (ele._id === _id) {
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

export const addToCart = (dispatch, userId, data) => {
  const { qty, stock } = data;
  if (qty > stock) {
    toast.error(`Quantity available ${stock}`);
  } else dispatch(addItemsToCart(data));
};

export const removeFromCart = (dispatch, id) => {
  dispatch(removeItemFromCart(id));
};

export const refetchUserCartItems = (dispatch) => {
  console.log("Refetch call");
  dispatch(refetchCartItems());
};

export const resetCartItems = (dispatch) => {
  dispatch(resetCart());
};

export default CartSlice.reducer;
export const {
  resetCart,
  refetchCartItems,
  addItemsToCart,
  removeItemFromCart,
  incrementItemQuantity,
  decrementItemQuantity,
} = CartSlice.actions;
