import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Post } from "../types";
import Link from "next/link";

import classNames from "classnames";

import { useAuthState } from "../context/auth";
import ActionButton from "./ActionButton";
import Axios from "axios";
import { useRouter } from "next/router";

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post;
  revalidate?: Function;
}

const PostCard = ({
  post: {
    identitfier,
    slug,
    title,
    body,
    subName,
    createdAt,
    voteScore,
    userVote,
    commentCount,
    url,
    username,
  },
  revalidate,
}: PostCardProps) => {
  // global state
  const { authenticated } = useAuthState();

  // utils
  const router = useRouter();

  const vote = async (value: number) => {
    try {
      if (!authenticated) router.push("/login");

      if (value === userVote) value = 0;
      // reset vote
      if (value === userVote) {
        value = 0;
      }
      const res = await Axios.post("/misc/vote/", {
        identitfier,
        slug,
        value,
      });
      if (revalidate) revalidate();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      key={identitfier}
      className="flex mb-4 bg-white rounded"
      id={identitfier}
    >
      {/* vote */}
      <div className="w-10 py-3 text-center bg-gray-200 rounded-l">
        {/* upvote */}
        <div
          onClick={() => vote(1)}
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-red-500"
        >
          <i
            className={classNames("icon-arrow-up", {
              "text-red-500": userVote === 1,
            })}
          ></i>
        </div>
        {/* score */}
        <p className="text-xs font-bold">{voteScore}</p>
        {/* downvote */}
        <div
          onClick={() => vote(-1)}
          className="w-6 mx-auto text-gray-400 rounded cursor-pointer hover:bg-gray-300 hover:text-blue-600"
        >
          <i
            className={classNames("icon-arrow-down", {
              "text-blue-500": userVote === -1,
            })}
          ></i>
        </div>
      </div>
      {/* data */}
      <div className="w-full p-2">
        <div className="flex items-center">
          <Link href={`/r/${subName}`}>
            <img
              className="w-6 h-6 mr-1 rounded-full cursor-pointer"
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
            />
          </Link>
          <Link href={`/r/${subName}`}>
            <a className="text-xs font-bold cursor-pointer hover:underline">
              /r/{subName}
            </a>
          </Link>

          <p className="hidden text-xs text-gray-500 md:block">
            <span className="mx-1 ">•</span>Posted by
            <Link href={`/u/${username}`}>
              <a className="mx-1 hover:underline">/u/{username}</a>
            </Link>
            <Link href={url}>
              <a className="mx-1 hover:underline">
                {dayjs(createdAt).fromNow()}
              </a>
            </Link>
          </p>
        </div>
        <Link href={url}>
          <a className="my-1 text-lg font-medium">{title}</a>
        </Link>

        {body && <p className="my-1 text-sm ">{body}</p>}

        <div className="flex">
          <Link href={url}>
            <a>
              <ActionButton>
                <i className="fas fa-comment-alt fa-xs">
                  <span className="ml-1 font-bold">
                    {commentCount} Comments
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
  );
};

export default PostCard;
