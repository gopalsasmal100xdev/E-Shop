import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  wishListItems: localStorage.getItem("wishList")
    ? JSON.parse(localStorage.getItem("wishList"))
    : [],
  error: "",
};

const WishListReducer = createSlice({
  name: "wishList",
  initialState,
  reducers: {
    addItemsToWishList: (state, action) => {
      state.wishListItems = [...state.wishListItems, action.payload];
    },
    removeItemsFromWishList: (state, action) => {
      const removedItem = action.payload;
      state.wishListItems = state.wishListItems.map(
        (item) => item._id !== removedItem._id
      );
    },
  },
  extraReducers: () => {},
});

export default WishListReducer.reducer;

export const { addItemsToWishList, removeItemsFromWishList } =
  WishListReducer.actions;
