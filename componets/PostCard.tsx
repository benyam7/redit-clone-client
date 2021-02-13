import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Post } from "../types";
import Link from "next/link";
import React, { Fragment } from "react";

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

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
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
              <ActionButton>
                <i className="fas fa-comment-alt fa-xs">
                  <span className="ml-1 font-bold">20 comments</span>
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
