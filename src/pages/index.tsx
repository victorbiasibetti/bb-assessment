import Head from "next/head";
import { GetServerSideProps } from "next";
import styles from "@/styles/Home.module.css";
import Post from "@/components/Post";
import { Post as PostType } from "@/types/Post";
import { User } from "@/types/User";
import { Comments } from "@/components/Comments";

type Props = {
  posts: PostType[];
  users: User[];
};

export default function Home({ posts, users }: Props) {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Brand Bastion Assessment</title>
        <meta
          name="description"
          content="BrandBastion Assessment by Victor Biasibetti"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <aside className={styles.posts}>
        <Post posts={posts} users={users} />
      </aside>
      <main className={styles.main}>
        <h3>Comment Posts</h3>
        <Comments />
      </main>
    </div>
  );
}

export const getServerSideProps = (async () => {
  const [postsResponse, usersResponse] = await Promise.all([
    fetch("https://jsonplaceholder.typicode.com/posts"),
    fetch("https://jsonplaceholder.typicode.com/users"),
  ]);

  if (!postsResponse || !usersResponse) {
    return {
      notFound: true,
    };
  }

  const [posts, users] = await Promise.all([
    postsResponse.json(),
    usersResponse.json(),
  ]);

  return {
    props: {
      posts,
      users,
    },
  };
}) satisfies GetServerSideProps<{ posts: PostType[]; users: User[] }>;
