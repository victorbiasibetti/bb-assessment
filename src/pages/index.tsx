import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import Post from "@/components/Post";
import { Post as PostType } from "@/types/Post";

import { GetServerSideProps } from "next";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  posts: PostType[];
};

export default function Home({ posts }: Props) {
  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Create Next App</title>
        <meta
          name="description"
          content="BrandBastion Assessment by Victor Biasibetti"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <aside className={styles.posts}>
        <Post posts={posts} />
      </aside>
      <main className={styles.main}>Comment posts</main>
    </div>
  );
}

export const getServerSideProps = (async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response) {
    return {
      notFound: true,
    };
  }
  const posts = await response.json();
  return {
    props: {
      posts,
    },
  };
}) satisfies GetServerSideProps<{ posts: PostType[] }>;
