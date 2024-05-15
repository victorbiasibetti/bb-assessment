import { Comment } from "@/types/Comment";
import { Post } from "@/types/Post";
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
const filteredTags: Array<Tag> = [];
const selectedPost: Post = {
  body: "",
  id: 0,
  title: "",
  userId: 0,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState: {
    comments,
    replies,
    filteredTags,
    tags,
    selectedPost,
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
    filterTag: (state, action: { type: string; payload: string }) => {
      !action.payload.length
        ? (state.filteredTags = [])
        : (state.filteredTags = state.tags.filter((tag) =>
            tag.body
              .toLowerCase()
              .startsWith(action.payload.toLocaleLowerCase())
          ));
    },
    loadComment: (state, action) => {
      state.comments = action.payload?.comments as Comment[];
    },
    saveSelectecPost: (state, action: { type: string; payload: Post }) => {
      if (action.payload.id) state.selectedPost = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addReply, loadComment, addTag, filterTag, saveSelectecPost } =
  commentSlice.actions;

export default commentSlice.reducer;
