import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "@/redux/reducers/comment";

const store = configureStore({
  reducer: {
    comment: commentReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
