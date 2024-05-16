import { HttpClient } from "@/httpClient";
import { useAppDispatch } from "@/redux/hooks/useRedux";
import { loadComment, saveSelectecPost } from "@/redux/reducers/comment";
import { Post } from "@/types/Post";
import { User } from "@/types/User";
import { Box, Typography } from "@mui/material";

type Props = {
  post: Post;
  user?: User;
  httpClient: HttpClient;
};

export const PostItem = ({ post, user, httpClient }: Props) => {
  const dispatch = useAppDispatch();

  const handleLoadComments = async (postId: number) => {
    const commentsLoaded = httpClient.get(`/posts/${postId}/comments`);
    dispatch(loadComment({ comments: commentsLoaded }));
    dispatch(saveSelectecPost(post));
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
