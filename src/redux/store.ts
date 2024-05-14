import { configureStore } from "@reduxjs/toolkit";
import commentReducer from "@/redux/reducers/comment";

export default configureStore({
  reducer: {
    comment: commentReducer,
  },
});
