import Head from "next/head";
import Axios from "axios";
import { useState, useEffect, Fragment } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Post, Sub } from "../types";
import PostCard from "../componets/PostCard";
import useSWR, { useSWRInfinite } from "swr";
import Image from "next/image";
import Link from "next/link";
import { useAuthState } from "../context/auth";

// import { GetServerSideProps } from "next";

dayjs.extend(relativeTime);

export default function Home(/* { posts } */) {
  // const [posts, setPosts] = useState<Post[]>([]);
  // useEffect(() => {
  //   Axios.get("/posts")
  //     .then((res) => setPosts(res.data))
  //     .catch((err) => console.log(err));
  // }, []);

  const [observedPost, setObservedPost] = useState("");

  // const { data: posts } = useSWR<Post[]>("/posts");
  const { data: topSubs } = useSWR<Sub[]>("/misc/top-subs");

  const { authenticated } = useAuthState();

  const observeElement = (element: HTMLElement) => {
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting === true) {
          console.log("Reached bottom of post");
          setPage(page + 1);
          observer.unobserve(element);
        }
      },
      { threshold: 1 }
    );

    observer.observe(element);
  };

  const {
    data,
    error,
    mutate,
    size: page,
    setSize: setPage,
    isValidating,
    revalidate,
  } = useSWRInfinite<Post[]>((index) => `/posts?page=${index}`);

  const posts: Post[] = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;

  useEffect(() => {
    if (!posts || posts.length === 0) return;

    const id = posts[posts.length - 1].identitfier;

    if (id !== observedPost) {
      setObservedPost(id);
      observeElement(document.getElementById(id));
    }
  }, [posts]);

  return (
    <Fragment>
      <Head>
        <title>reddit: the front page of the internet</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container flex w-full pt-4 mx-auto ">
        {/* posts */}
        <div className="w-full px-4 md:w-3/5 md:p-0">
          {isValidating && <p className="text-lg text-center">Loading..</p>}
          {posts?.map((post) => (
            <PostCard
              post={post}
              key={post.identitfier}
              revalidate={revalidate}
            />
          ))}

          {isValidating && postMessage.length > 0 && (
            <p className="text-lg text-center">Loading More..</p>
          )}
        </div>
        {/* sidebar */}
        <div className="hidden ml-6 md:block w-80">
          <div className="bg-white rounded">
            <div className="p-4 border-b-2">
              <p className="text-lg font-semibold text-center">
                Top Communities
              </p>
            </div>
            <div>
              {topSubs?.map((sub) => {
                return (
                  <div
                    key={sub.name}
                    className="flex items-center px-4 py-2 text-xs border-b"
                  >
                    <Link href={`/r/${sub.name}`}>
                      <a>
                        <Image
                          src={sub.imageUrl}
                          alt="Sub"
                          className="rounded-full cursor-pointer"
                          width={(6 * 16) / 4}
                          height={(6 * 16) / 4}
                        />
                      </a>
                    </Link>
                    <Link href={`/r/${sub.name}`}>
                      <a className="ml-2 font-bold hover:cursor-pointer">
                        /r/{sub.name}
                      </a>
                    </Link>
                    <p className="ml-auto font-medium">{sub.postCount}</p>
                  </div>
                );
              })}
            </div>
            {authenticated && (
              <div className="p-4 border-t-2">
                <Link href="/subs/create">
                  <a className="w-full px-2 py-1 blue button">
                    Create Community
                  </a>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
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
