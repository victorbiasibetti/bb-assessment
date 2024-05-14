import { Post } from "./types";

export const PostItem = (post: Post) => {
  return (
    <div>
      <p>{post.title}</p>
      <span>{post.body}</span>
    </div>
  );
};
