import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import Axios from "axios";

import { useRouter } from "next/router";
import useSWR from "swr";
import Sidebar from "../../../../componets/Sidebar";
import { Post } from "../../../../types";
import { useAuthState } from "../../../../context/auth";
import React from "react";
import ActionButton from "../../../../componets/ActionButton";

dayjs.extend(relativeTime);

export default function PostPage() {
  // local state
  // global state
  const { authenticated } = useAuthState();

  // utils
  const router = useRouter();
  const { identitfier, sub, slug } = router.query;

  const { data: post, error } = useSWR<Post>(
    identitfier && slug ? `/posts/${identitfier}/${slug}` : null
  );

  if (error) router.push("/");

  const vote = async (value: number) => {
    if (!authenticated) router.push("/login");
    // reset vote
    if (value === post?.userVote) {
      value = 0;
    }
    try {
      const res = await Axios.post("/misc/vote/", {
        identitfier,
        slug,
        value,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>

      <Link href={`/r/${sub}`}>
        <a>
          <div className="flex w-full h-20 p-8 bg-blue-500 item-center">
            <div className="container flex w-full mx-auto">
              {post && (
                <div className="w-8 h-8 mr-2 overflow-hidden rounded-full">
                  <Image
                    src={post?.sub.imageUrl}
                    height={(8 * 16) / 4}
                    width={(8 * 16) / 4}
                  />
                </div>
              )}
              <p className="text-xl font-semibold text-white">/r/{sub}</p>
            </div>
          </div>
        </a>
      </Link>

      <div className="container flex w-full pt-5 mx-auto">
        {/* post */}
        <div className="w-3/5">
          <div className="bg-white rounded">
            {post && (
              <div className="flex">
                {/* vote */}

                <div className="w-10 py-3 text-center rounded-l">
                  {/* upvote */}
                  <div
                    onClick={() => vote(1)}
                    className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
                  >
                    <i
                      className={classNames("icon-arrow-up", {
                        "text-red-500": post?.userVote === 1,
                      })}
                    ></i>
                  </div>
                  {/* score */}
                  <p className="text-xs font-bold">{post?.voteScore}</p>
                  {/* downvote */}
                  <div
                    onClick={() => vote(-1)}
                    className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
                  >
                    <i
                      className={classNames("icon-arrow-down", {
                        "text-blue-500": post?.userVote === -1,
                      })}
                    ></i>
                  </div>
                </div>
                <div className="p-2">
                  <div className="flex items-center">
                    <p className="text-xs text-gray-500">
                      Posted by
                      <Link href={`/u/${post?.username}`}>
                        <a className="mx-1 hover:underline">
                          /u/{post?.username}
                        </a>
                      </Link>
                      <Link href={post?.url}>
                        <a className="mx-1 hover:underline">
                          {dayjs(post?.createdAt).fromNow()}
                        </a>
                      </Link>
                    </p>
                  </div>
                  {/* post title */}
                  <h1 className="my-1 text-xl font-medium">{post?.title}</h1>
                  {/* post body */}
                  <p className="my-3 text-sm">{post?.body}</p>
                  {/* action buttons */}
                  <div className="flex">
                    <Link href={post?.url}>
                      <a>
                        <ActionButton>
                          <i className="fas fa-comment-alt fa-xs">
                            <span className="ml-1 font-bold">
                              {post?.commentCount} Comments
                            </span>
                          </i>
                        </ActionButton>
                      </a>
                    </Link>

                    <ActionButton>
                      <i className="fas fa-share fa-xs">
                        <span className="ml-1 font-bold">Share </span>
                      </i>
                    </ActionButton>

                    <ActionButton>
                      <i className="fas fa-bookmark fa-xs">
                        <span className="ml-1 font-bold">Save</span>
                      </i>
                    </ActionButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* sidebar */}
        {post && <Sidebar sub={post.sub} />}
      </div>
    </>
  );
}
