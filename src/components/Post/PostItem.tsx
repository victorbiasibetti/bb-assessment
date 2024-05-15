import { useAppDispatch, useAppSelector } from "@/redux/hooks/useRedux";
import { Post } from "@/types/Post";
import { User } from "@/types/User";

type Props = {
  post: Post;
  user?: User;
};

export const PostItem = ({ post, user }: Props) => {
  const comment = useAppSelector((state) => state.comment);
  const dispatch = useAppDispatch();

  return (
    <div
      style={{
        marginBottom: "1rem",
        cursor: "pointer",
      }}
      onClick={() => console.log("postId - " + post.id)}
    >
      {user && <span>{"@" + user.username}</span>}
      <p
        style={{
          textTransform: "uppercase",
          fontWeight: 700,
          paddingBottom: "0.5rem",
        }}
      >
        {`${post.title}`}
      </p>
      <span>{post.body}</span>
    </div>
  );
};
