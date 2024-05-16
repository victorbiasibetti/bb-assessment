import { Post as PostType } from "@/types/Post";
import { PostItem } from "./PostItem";
import { User } from "@/types/User";
import { useState } from "react";
import { Box, Paper, TextField, Typography } from "@mui/material";
import { HttpClient } from "@/httpClient";

type Props = { posts: PostType[]; users: User[]; httpClient: HttpClient };

const Post = ({ posts, users, httpClient }: Props) => {
  const [filterPost, setFilterPost] = useState<string>("");

  const postsWithUsersInfo = posts.map((post) => ({
    ...post,
    user: users.find((user) => user.id == post.userId),
  }));

  return (
    <Paper
      style={{
        boxShadow: "none",
      }}
    >
      <Box
        flex={1}
        display={"flex"}
        flexDirection={"column"}
        padding={"0 0.5rem"}
      >
        <Typography variant="h6">Filter</Typography>
        <TextField
          placeholder="Can filter by username, userId or content"
          variant="outlined"
          value={filterPost}
          onChange={(e) => setFilterPost(e.target.value)}
        />
      </Box>
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
            <PostItem
              key={post.id}
              post={post}
              user={post.user}
              httpClient={httpClient}
            />
          ))}
    </Paper>
  );
};

export default Post;
