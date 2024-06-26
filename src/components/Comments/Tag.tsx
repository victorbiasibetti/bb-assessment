import { useAppDispatch, useAppSelector } from "@/redux/hooks/useRedux";
import { addTag } from "@/redux/reducers/comment";
import { Comment } from "@/types/Comment";
import { Autocomplete, Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { isEnterKey } from "@/utils";
import { Tag } from "@/types/Tag";

type Props = {
  comment: Comment;
};

export const Tags = ({ comment }: Props) => {
  const [tag, setTag] = useState<string>();

  const dispatch = useAppDispatch();
  const { tags } = useAppSelector((state) => state.comment);

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

  const loadedTags = tags.filter((tag) => tag.commentId == comment.id);

  return (
    <Box display={"flex"} gap={"0.5rem"}>
      <Autocomplete
        multiple
        freeSolo
        defaultValue={loadedTags.map((tag) => [tag.body])}
        options={tags.map((t) => [t.body])}
        limitTags={2}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            variant="outlined"
            value={tag}
            onChange={(e) => {
              const { value } = e.target;
              setTag(value);
            }}
            onKeyDown={(e) => {
              if (isEnterKey(e.code)) {
                handleSaveTag(comment);
              }
            }}
          />
        )}
      />
    </Box>
  );
};
