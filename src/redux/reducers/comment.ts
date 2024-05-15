import { Comment } from "@/types/Comment";
import { createSlice } from "@reduxjs/toolkit";

type Reply = {
  body: string;
  postId: number;
  commentId: number;
};
type Tag = {
  body: string;
  postId: number;
  commentId: number;
};

const comments: Array<Comment> = [];
const tags: Array<Tag> = [];
const replies: Array<Reply> = [];

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments,
    replies,
    tags,
  },
  reducers: {
    addReply: (state, action: { type: string; payload: Reply }) => {
      const newReply = action.payload;
      state.replies.push({ ...newReply });
    },
    addTag: (state, action: { type: string; payload: Tag }) => {
      const newTag = action.payload;
      state.tags.push({ ...newTag });
    },
    filterTag: (state, action) => {
      console.log("comment/filterTag reducer");
    },
    loadComment: (state, action) => {
      state.comments = action.payload?.comments as Comment[];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addReply, loadComment, addTag } = commentSlice.actions;

export default commentSlice.reducer;
