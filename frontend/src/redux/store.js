import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/User";
import CartReducer from "./reducers/Cart";
import WishListReducer from "./reducers/WishList";
import OrderReducers from "./reducers/Orders";
import SellerReducer from "./reducers/Seller";
import ProductReducer from "./reducers/Product";
import ShopEventsReducer from "./reducers/ShopEvents";

const Store = configureStore({
  reducer: {
    user: UserReducer,
    seller: SellerReducer,
    products: ProductReducer,
    cart: CartReducer,
    wishList: WishListReducer,
    orders: OrderReducers,
    shopEvents: ShopEventsReducer,
  },
});

export default Store;
