import { useAppDispatch } from "@/redux/hooks/useRedux";
import { addTag, filterTag } from "@/redux/reducers/comment";
import { Comment } from "@/types/Comment";
import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

type Props = {
  comment: Comment;
};

export const Tags = ({ comment }: Props) => {
  const [tag, setTag] = useState<string>();
  const dispatch = useAppDispatch();

  const handleFilterTags = (tag: string) => {
    dispatch(filterTag(tag));
  };

  const handleSaveTag = (comment: Comment) => {
    if (tag) {
      dispatch(
        addTag({
          commentId: comment.id,
          body: tag,
          postId: comment.postId,
        })
      );
      setTag("");
    }
  };

  return (
    <Box display={"flex"} gap={"0.5rem"}>
      <TextField
        size="small"
        variant="outlined"
        value={tag}
        onChange={(e) => {
          const { value } = e.target;
          setTag(value);
          handleFilterTags(value);
        }}
      />
      <Button variant="contained" onClick={() => handleSaveTag(comment)}>
        Add Tag
      </Button>
    </Box>
  );
};
