import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/User";
import CartReducer from "./reducers/Cart";
import WishListReducer from "./reducers/WishList";

const Store = configureStore({
  reducer: {
    user: UserReducer,
    cart: CartReducer,
    wishList: WishListReducer,
  },
});

export default Store;
