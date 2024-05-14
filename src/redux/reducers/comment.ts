import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    value: 0,
  },
  reducers: {
    add: () => {
      console.log("comment/add reducer");
    },
  },
});

// Action creators are generated for each case reducer function
export const { add } = commentSlice.actions;

export default commentSlice.reducer;
