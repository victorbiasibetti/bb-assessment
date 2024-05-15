import { useAppSelector } from "@/redux/hooks/useRedux";
import { Comment } from "@/types/Comment";

export const Comments = () => {
  const { comments } = useAppSelector((state) => state.comment);
  return (
    <div>
      {comments.map((c: Comment) => (
        <li key={c.id}>{c.body}</li>
      ))}
    </div>
  );
};
