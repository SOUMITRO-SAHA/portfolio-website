import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import UserReducer from "./slice/userSlice";

const RootReducer = combineReducers({
  user: UserReducer,
});

const store = configureStore({
  reducer: RootReducer,
});

export const StoreProvider = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);
