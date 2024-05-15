import { useAppDispatch, useAppSelector } from "@/redux/hooks/useRedux";
import { addReply } from "@/redux/reducers/comment";
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
      <button onClick={() => handleSaveReply(comment)}>Save</button>
    </>
  );
};

export const Comments = () => {
  const { comments, replies } = useAppSelector((state) => state.comment);
  const commentsReplies = (commentId: number) =>
    replies.filter((reply) => reply.commentId === commentId);
  return (
    <div>
      {comments.map((comment: Comment) => (
        <div key={comment.id}>
          {comment.body}
          {commentsReplies(comment.id).map((reply) => (
            <div key={reply.body}>{reply.body} </div>
          ))}
          <Reply comment={comment} />
        </div>
      ))}
    </div>
  );
};
