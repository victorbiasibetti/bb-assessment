import { useAppDispatch, useAppSelector } from "@/redux/hooks/useRedux";
import { addReply, addTag } from "@/redux/reducers/comment";
import { Comment } from "@/types/Comment";
import { useState } from "react";

type Props = {
  comment: Comment;
};

const Reply = ({ comment }: Props) => {
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
    <>
      <input value={reply} onChange={(e) => setReply(e.target.value)} />
      <button onClick={() => handleSaveReply(comment)}>Save Comment</button>
    </>
  );
};

const Tags = ({ comment }: Props) => {
  const [tag, setTag] = useState<string>();
  const dispatch = useAppDispatch();

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
    <>
      <input value={tag} onChange={(e) => setTag(e.target.value)} />
      <button onClick={() => handleSaveTag(comment)}>Save Tag</button>
    </>
  );
};

export const Comments = () => {
  const { comments, replies, tags } = useAppSelector((state) => state.comment);
  const commentsReplies = (commentId: number) =>
    replies.filter((reply) => reply.commentId === commentId);

  const savedTags = (commentId: number) =>
    tags.filter((tag) => tag.commentId === commentId);

  return (
    <div>
      {comments.map((comment: Comment) => (
        <div key={comment.id}>
          {comment.body}
          <p>Tags</p>
          {savedTags(comment.id).map((tag) => (
            <div key={tag.body}>{tag.body} </div>
          ))}
          <p>Repleis</p>
          {commentsReplies(comment.id).map((reply) => (
            <div key={reply.body}>{reply.body} </div>
          ))}
          <Tags comment={comment} />
          <Reply comment={comment} />
        </div>
      ))}
    </div>
  );
};
