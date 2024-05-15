import { Post as PostType } from "@/types/Post";
import { PostItem } from "./PostItem";
import { User } from "@/types/User";

type Props = { posts: PostType[]; users: User[] };

const Post = ({ posts, users }: Props) => {
  return (
    <div>
      {posts &&
        posts.map((post) => (
          <PostItem
            key={post.id}
            post={post}
            user={users.find((user) => user.id == post.userId)}
          />
        ))}
    </div>
  );
};

export default Post;
