import { Post } from "@/types/Post";

export const PostItem = (post: Post) => {
  return (
    <div
      style={{
        marginBottom: "1rem",
        cursor: "pointer",
      }}
      onClick={() => console.log("postId - " + post.id)}
    >
      <p
        style={{
          textTransform: "uppercase",
          fontWeight: 700,
          paddingBottom: "0.5rem",
        }}
      >
        {post.title}
      </p>
      <span>{post.body}</span>
    </div>
  );
};
