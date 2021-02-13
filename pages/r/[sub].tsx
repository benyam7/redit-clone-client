import { route } from "next/dist/next-server/server/router";
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Image from "next/image";
import useSWR from "swr";
import PostCard from "../../componets/PostCard";
import { Sub } from "../../types";

export default function SubPage() {
  const router = useRouter();

  const subName = router.query.sub;

  const { data: sub, error } = useSWR<Sub>(subName ? `/subs/${subName}` : null);

  let postsMarkup;
  if (!sub) {
    postsMarkup = <p className="text-lg text-center">Loadding...</p>;
  } else if (sub.posts.length === 0) {
    postsMarkup = (
      <p className="text-lg text-center"> No posts submitted yet</p>
    );
  } else {
    postsMarkup = sub?.posts.map((post) => (
      <PostCard post={post} key={post.identitfier} />
    ));
  }

  if (error) router.push("/");
  return (
    <div>
      <Head>
        <title>{sub?.title}</title>
      </Head>

      {sub && (
        <Fragment>
          {/* sub and images */}
          <div>
            {/* banner img */}
            <div className="bg-blue-500">
              {sub.bannerUrl ? (
                <div
                  className="h-56 bg-blue-500"
                  style={{
                    backgroundImage: `url(${sub.bannerUrl})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              ) : (
                <div className="h-20 bg-blue-500"></div>
              )}
            </div>
            {/* sub meta data */}
            <div className="h-20 bg-white">
              <div className="container relative flex w-full mx-auto">
                <div className="absolute" style={{ top: -15 }}>
                  <Image
                    src={sub.imageUrl}
                    alt="Sub "
                    className="rounded-full"
                    width={70}
                    height={70}
                  />
                </div>

                <div className="pt-1 pl-24">
                  <div className="flex items-center">
                    <h1 className="mb-1 text-3xl font-bold">/r/{sub.title}</h1>
                  </div>
                  <p className="text-sm font-bold text-gray-500">
                    /r/{sub.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* posts and side bar */}
          <div className="container flex w-full pt-4 mx-auto">
            <div className="container flex">
              <div className="w-3/5">{postsMarkup}</div>
            </div>
          </div>
        </Fragment>
      )}
    </div>
  );
}
