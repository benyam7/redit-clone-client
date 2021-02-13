import { route } from "next/dist/next-server/server/router";
import Head from "next/head";
import { useRouter } from "next/router";
import { createRef, Fragment, useEffect, useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import classNames from "classnames";
import PostCard from "../../componets/PostCard";
import { Sub } from "../../types";
import { useAuthState } from "../../context/auth";

export default function SubPage() {
  // local state
  const [ownSub, setOwnSub] = useState(false);

  // golobal state
  const { authenticated, user } = useAuthState();
  // utils
  const fileInputRef = createRef<HTMLInputElement>();
  const router = useRouter();

  const subName = router.query.sub;

  const { data: sub, error } = useSWR<Sub>(subName ? `/subs/${subName}` : null);

  useEffect(() => {
    if (!sub) return;
    setOwnSub(authenticated && user.username === sub.username);
  }, [sub]);

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
          <input type="file" hidden={true} ref={fileInputRef} />
          {/* sub and images */}
          <div>
            {/* banner img */}
            <div
              className={classNames("bg-blue-500", {
                "cursor-pointer": ownSub,
              })}
            >
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
                    className={classNames("rounded-full", {
                      "cursor-pointer": ownSub,
                    })}
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
