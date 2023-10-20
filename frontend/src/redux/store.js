import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/User";
import CartReducer from "./reducers/Cart";
import WishListReducer from "./reducers/WishList";
import OrderReducers from "./reducers/Orders";
import SellerReducer from "./reducers/Seller";

const Store = configureStore({
  reducer: {
    user: UserReducer,
    seller: SellerReducer,
    cart: CartReducer,
    wishList: WishListReducer,
    orders: OrderReducers,
  },
});

export default Store;
