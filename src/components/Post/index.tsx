import { Post as PostType } from "@/types/Post";
import { PostItem } from "./PostItem";
import { User } from "@/types/User";
import { useState } from "react";

type Props = { posts: PostType[]; users: User[] };

const Post = ({ posts, users }: Props) => {
  const [filterPost, setFilterPost] = useState<string>("");

  const postsWithUsersInfo = posts.map((post) => ({
    ...post,
    user: users.find((user) => user.id == post.userId),
  }));

  return (
    <div>
      <div>
        <h4>Filter post:</h4>
        <input
          value={filterPost}
          onChange={(e) => setFilterPost(e.target.value)}
        />
      </div>
      {postsWithUsersInfo &&
        postsWithUsersInfo
          .filter(
            (post) =>
              post.userId.toString() === filterPost ||
              post.body
                .toLocaleLowerCase()
                .includes(filterPost.toLocaleLowerCase()) ||
              post.user?.username
                .toLocaleLowerCase()
                .startsWith(filterPost.toLocaleLowerCase())
          )
          .map((post) => (
            <PostItem key={post.id} post={post} user={post.user} />
          ))}
    </div>
  );
};

export default Post;
