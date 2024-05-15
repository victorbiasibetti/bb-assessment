import { useAppDispatch } from "@/redux/hooks/useRedux";
import { addReply } from "@/redux/reducers/comment";
import { Comment } from "@/types/Comment";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
  comment: Comment;
};

export const Reply = ({ comment }: Props) => {
  const [reply, setReply] = useState<string>();
  const dispatch = useAppDispatch();

  const handleSaveReply = (comment: Comment) => {
    if (reply) {
      dispatch(
        addReply({
          commentId: comment.id,
          body: reply,
          postId: comment.postId,
        })
      );
      setReply("");
    }
  };

  return (
    <Box display={"flex"} gap={"0.5rem"}>
      <TextField
        size="small"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
      />
      <Button variant="contained" onClick={() => handleSaveReply(comment)}>
        Reply
      </Button>
    </Box>
  );
};
