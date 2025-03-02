import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./reducers/User";
import AdminSlice from "./reducers/Admin";
import CartSlice from "./reducers/Cart"
const makeStore = ()=> {
  return configureStore({
    reducer: {
      user: UserSlice,
      admin: AdminSlice,
      cart:CartSlice,
    },
  });
}

const Store = makeStore();
export default Store;
