import { useAppDispatch } from "@/redux/hooks/useRedux";
import { loadComment } from "@/redux/reducers/comment";
import { Post } from "@/types/Post";
import { User } from "@/types/User";

type Props = {
  post: Post;
  user?: User;
};

export const PostItem = ({ post, user }: Props) => {
  const dispatch = useAppDispatch();

  const handleLoadComments = async (postId: number) => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    const commentsLoaded = await response.json();
    dispatch(loadComment({ comments: commentsLoaded }));
  };

  return (
    <div
      style={{
        marginBottom: "1rem",
        cursor: "pointer",
      }}
      onClick={() => {
        handleLoadComments(post.id);
      }}
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
