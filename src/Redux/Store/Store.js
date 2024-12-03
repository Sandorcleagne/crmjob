import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "../RootReducer/RootReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
const persistconfig = {
  key: "root",
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: RootReducer,
});
// export const persistor = persistStore(store);
export default store;
