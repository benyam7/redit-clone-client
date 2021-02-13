import Head from "next/head";
import Axios from "axios";
import { useState, useEffect, Fragment } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Post } from "../types";
import Link from "next/link";
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
            <div key={post.identitfier} className="flex mb-4 bg-white rounded">
              {/* vote */}
              <div className="w-10 text-center bg-gray-200 rounded-l">
                <p>V</p>
              </div>
              {/* data */}
              <div className="w-full p-2">
                <div className="flex items-center">
                  <Link href={`/r/${post.subName}`}>
                    <Fragment>
                      <img
                        className="w-6 h-6 mr-1 rounded-full cursor-pointer"
                        src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                      />
                      <a className="text-xs font-bold cursor-pointer hover:underline">
                        /r/{post.subName}
                      </a>
                    </Fragment>
                  </Link>

                  <p className="text-xs text-gray-500">
                    <span className="mx-1">•</span>Posted by
                    <Link href={`/u/${post.username}`}>
                      <a className="mx-1 hover:underline">/u/{post.username}</a>
                    </Link>
                    <Link href={post.url}>
                      <a className="mx-1 hover:underline">
                        {dayjs(post.createdAt).fromNow()}
                      </a>
                    </Link>
                  </p>
                </div>
                <Link href={post.url}>
                  <a className="my-1 text-lg font-medium">{post.title}</a>
                </Link>

                {post.body && <p className="my-1 text-sm ">{post.body}</p>}

                <div className="flex">
                  <Link href={post.url}>
                    <a>
                      <div className="px-1 py-1 mr-0.5 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                        <i className="fas fa-comment-alt fa-xs">
                          <span className="ml-1 font-bold">20 comments</span>
                        </i>
                      </div>
                    </a>
                  </Link>

                  <div className="px-1 py-1 mr-0.5 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                    <i className="fas fa-share fa-xs">
                      <span className="ml-1 font-bold">Share </span>
                    </i>
                  </div>

                  <div className="px-1 py-1 mr-0.5 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
                    <i className="fas fa-bookmark fa-xs">
                      <span className="ml-1 font-bold">Save</span>
                    </i>
                  </div>
                </div>
              </div>
            </div>
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
