import { useAppSelector } from "@/redux/hooks/useRedux";
import { Comment } from "@/types/Comment";
import { Reply } from "./Reply";
import { Tags } from "./Tag";
import { Box, Grid, Typography } from "@mui/material";

export const Comments = () => {
  const { comments, replies, selectedPost } = useAppSelector(
    (state) => state.comment
  );
  const commentsReplies = (commentId: number) =>
    replies.filter((reply) => reply.commentId === commentId);

  return (
    <div
      style={{
        padding: "0.5rem",
      }}
    >
      {!selectedPost.id && (
        <Typography variant="h5">Select a Post to show own comments</Typography>
      )}
      {!!selectedPost.id && (
        <Typography variant="h5" paddingBottom={"1rem"}>
          {selectedPost.title.toUpperCase()}
        </Typography>
      )}
      {comments.map((comment: Comment) => (
        <Box
          key={comment.id}
          marginBottom={"2rem"}
          display={"flex"}
          flex={1}
          flexDirection={"column"}
        >
          <Box>
            <Typography variant="subtitle1">{comment.body}</Typography>
          </Box>
          <Box>
            <Grid container>
              <Box marginRight={"0.25rem"}>
                <Typography variant="overline">Replies</Typography>
                {commentsReplies(comment.id).map((reply) => (
                  <Typography
                    key={reply.body}
                    style={{
                      margin: "0.25rem 0",
                      padding: "0 0.15rem",
                    }}
                  >
                    {reply.body}
                  </Typography>
                ))}
                <Reply comment={comment} />
              </Box>
              <Box>
                <Typography variant="overline">Tags</Typography>
                <Tags comment={comment} />
              </Box>
            </Grid>
          </Box>
        </Box>
      ))}
    </div>
  );
};
