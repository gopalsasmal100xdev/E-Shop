import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/User";
import CartReducer from "./reducers/Cart";
import WishListReducer from "./reducers/WishList";
import OrderReducers from "./reducers/Orders";

const Store = configureStore({
  reducer: {
    user: UserReducer,
    cart: CartReducer,
    wishList: WishListReducer,
    orders: OrderReducers,
  },
});

export default Store;
