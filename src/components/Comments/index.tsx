import { useAppSelector } from "@/redux/hooks/useRedux";
import { Comment } from "@/types/Comment";
import { Reply } from "./Reply";
import { Tags } from "./Tag";
import { Box, Grid, Paper, Typography } from "@mui/material";

export const Comments = () => {
  const { comments, replies, tags, filteredTags, selectedPost } =
    useAppSelector((state) => state.comment);
  const commentsReplies = (commentId: number) =>
    replies.filter((reply) => reply.commentId === commentId);

  const savedTags = (commentId: number) =>
    tags.filter((tag) => tag.commentId === commentId);

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
        <Grid container key={comment.id} marginBottom={"2rem"}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">{comment.body}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="overline">Replies</Typography>
            {commentsReplies(comment.id).map((reply) => (
              <Typography
                key={reply.body}
                variant="inherit"
                style={{
                  margin: "0.25rem 0",
                  padding: "0 0.15rem",
                }}
              >
                {reply.body}
              </Typography>
            ))}
          </Grid>
          <Grid item xs={6} justifyContent={"center"} padding={"0 0.25rem"}>
            <Typography variant="overline">Tags</Typography>
            {savedTags(comment.id).map((tag) => (
              <Typography variant="inherit" key={tag.body}>
                {tag.body}
              </Typography>
            ))}
          </Grid>
          <Grid
            item
            xs={6}
            display={"flex"}
            flexDirection={"column"}
            flexGrow={1}
          >
            <Reply comment={comment} />
          </Grid>
          <Grid
            item
            xs={6}
            display={"flex"}
            flexDirection={"column"}
            flexGrow={1}
          >
            <Box>
              {filteredTags.map((tag) => (
                <Typography key={tag.body}>{tag.body}</Typography>
              ))}

              <Tags comment={comment} />
            </Box>
          </Grid>
        </Grid>
      ))}
    </div>
  );
};
