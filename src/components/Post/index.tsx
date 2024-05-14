import { Post as PostType } from "@/types/Post";
import { PostItem } from "./PostItem";

type Props = { posts: PostType[] };

const Post = ({ posts }: Props) => {
  return (
    <div>
      {posts && posts.map((post) => <PostItem key={post.id} {...post} />)}
    </div>
  );
};

export default Post;
