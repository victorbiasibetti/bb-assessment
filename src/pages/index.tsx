import Head from "next/head";
import { GetServerSideProps } from "next";
import styles from "@/styles/Home.module.css";
import Post from "@/components/Post";
import { Post as PostType } from "@/types/Post";
import { User } from "@/types/User";
import { Comments } from "@/components/Comments";
import { HttpClient } from "@/httpClient";
import Script from "next/script";

type Props = {
  posts: PostType[];
  users: User[];
};

/** Claro NET
 * 1716297682562.9UgBzr
 * "address": "189.103.103.74",
        "geolocation": {
          "accuracyRadius": 20,
          "latitude": -29.6064,
          "longitude": -52.1919,
          "timezone": "America/Sao_Paulo",
          "city": {
            "name": "Venancio Aires"
          },
 * 
HI MARTE
1716295668445.S1KZwg
    "address": "186.251.165.98",
        "geolocation": {
          "accuracyRadius": 100,
          "latitude": -29.7249,
          "longitude": -52.4059,
          "timezone": "America/Sao_Paulo",
          "city": {
            "name": "Santa Cruz do Sul"
          },

  Claro 4g
  1716297997803.bstVk4
  "address": "191.39.14.244",
        "geolocation": {
          "accuracyRadius": 100,
          "latitude": -30.1169,
          "longitude": -51.2658,
          "postalCode": "90000",
          "timezone": "America/Sao_Paulo",
          "city": {
            "name": "Porto Alegre"
          },
 */
export default function Home({ posts, users }: Props) {
  const httpClient = new HttpClient();

  return (
    <div className={styles.wrapper}>
      <Script
        src="/static/fingerprint.js"
        onLoad={() => console.log("loading script")}
        onError={() => console.error("failure to load script")}
      />
      <Head>
        <title>Brand Bastion Assessment</title>
        <meta
          name="description"
          content="BrandBastion Assessment by Victor Biasibetti"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      teste
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
