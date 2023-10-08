import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./reducers/User";

const Store = configureStore({
  reducer: {
    user: UserReducer,
  },
});

export default Store;
