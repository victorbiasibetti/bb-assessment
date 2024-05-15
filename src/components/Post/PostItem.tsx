import { useAppDispatch } from "@/redux/hooks/useRedux";
import { loadComment } from "@/redux/reducers/comment";
import { Post } from "@/types/Post";
import { User } from "@/types/User";
import { Box, Typography } from "@mui/material";

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
    <Box
      style={{
        margin: "1rem 0",
        cursor: "pointer",
        padding: "1rem",
        border: "1px solid black",
      }}
      borderRadius={"12px"}
      onClick={() => {
        handleLoadComments(post.id);
      }}
    >
      {user && (
        <Typography variant="subtitle1">{"@" + user.username}</Typography>
      )}
      <Typography
        variant="body1"
        style={{
          textTransform: "uppercase",
          fontWeight: 700,
          paddingBottom: "0.5rem",
        }}
      >
        {`${post.title}`}
      </Typography>
      <Typography variant="body2">{post.body}</Typography>
    </Box>
  );
};
