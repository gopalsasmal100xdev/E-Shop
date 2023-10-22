import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/User";
import CartReducer from "./reducers/Cart";
import WishListReducer from "./reducers/WishList";
import OrderReducers from "./reducers/Orders";
import SellerReducer from "./reducers/Seller";
import ProductReducer from "./reducers/Product";

const Store = configureStore({
  reducer: {
    user: UserReducer,
    seller: SellerReducer,
    products: ProductReducer,
    cart: CartReducer,
    wishList: WishListReducer,
    orders: OrderReducers,
  },
});

export default Store;
