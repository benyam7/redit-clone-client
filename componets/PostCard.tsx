import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Post } from "../types";
import Link from "next/link";
import { Fragment } from "react";
import classNames from "classnames";

import Axios from "axios";

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post;
}

const ActionButton = ({ children }) => {
  return (
    <div className="px-1 py-1 mr-0.5 text-xs text-gray-400 rounded cursor-pointer hover:bg-gray-200">
      {children}
    </div>
  );
};

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
}: PostCardProps) => {
  const vote = async (value) => {
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
    <div key={identitfier} className="flex mb-4 bg-white rounded">
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
            <Fragment>
              <img
                className="w-6 h-6 mr-1 rounded-full cursor-pointer"
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              />
              <a className="text-xs font-bold cursor-pointer hover:underline">
                /r/{subName}
              </a>
            </Fragment>
          </Link>

          <p className="text-xs text-gray-500">
            <span className="mx-1">•</span>d by
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
