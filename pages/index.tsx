import Head from "next/head";
import Axios from "axios";
import { useState, useEffect, Fragment } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Post } from "../types";
import Link from "next/link";
import PostCard from "../componets/PostCard";
// import { GetServerSideProps } from "next";

dayjs.extend(relativeTime);

export default function Home(/* { posts } */) {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    Axios.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="pt-12">
      <Head>
        <title>reddit: the front page of the internet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container flex w-full pt-4 mx-auto">
        {/* posts */}
        <div className="w-3/5">
          {posts.map((post) => (
            <PostCard post={post} key={post.identitfier} />
          ))}
        </div>
        {/* sidebar */}
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   try {
//     const res = await Axios.get("/posts");

//     return { props: { posts: res.data } };
//   } catch (err) {
//     return { props: { error: "Something went wrong" } };
//   }
// };
