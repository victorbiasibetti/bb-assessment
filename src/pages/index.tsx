import Head from "next/head";
import { GetServerSideProps } from "next";
import styles from "@/styles/Home.module.css";
import Post from "@/components/Post";
import { Post as PostType } from "@/types/Post";
import { User } from "@/types/User";
import { Comments } from "@/components/Comments";
import { HttpClient } from "@/httpClient";

type Props = {
  posts: PostType[];
  users: User[];
};

export default function Home({ posts, users }: Props) {
  const httpClient = new HttpClient();
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
        <Post posts={posts} users={users} httpClient={httpClient} />
      </aside>
      <main className={styles.main}>
        <Comments />
      </main>
    </div>
  );
}

export const getServerSideProps = (async () => {
  const httpClient = new HttpClient();
  const [posts, users] = await Promise.all([
    httpClient.get("/posts"),
    httpClient.get("/users"),
  ]);

  if (posts.error || users.error) {
    console.log(posts.error);
    console.log(users.error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      posts: posts.data,
      users: users.data,
    },
  };
}) satisfies GetServerSideProps<{ posts: PostType[]; users: User[] }>;
