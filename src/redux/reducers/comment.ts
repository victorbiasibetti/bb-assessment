import { Comment } from "@/types/Comment";
import { createSlice } from "@reduxjs/toolkit";

type Reply = { userId: number; body: string };
type Tag = string;
type CommentSlice = Comment & Reply[] & Tag[];

const comments: Array<CommentSlice> = [];
const tags: Array<Tag> = [];

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments,
    tags,
  },
  reducers: {
    addReply: () => {
      console.log("comment/addReply reducer");
    },
    addTagToComment: () => {
      console.log("comment/addTagToComment reducer");
    },
    getTags: () => {
      console.log("comment/getTags reducer");
    },
    loadComment: (state, action) => {
      state.comments = action.payload?.comments as CommentSlice[];
    },
  },
});

// Action creators are generated for each case reducer function
export const { loadComment } = commentSlice.actions;

export default commentSlice.reducer;
