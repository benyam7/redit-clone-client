import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import PostCard from "../../componets/PostCard";
import { Post, Comment } from "../../types";

dayjs.extend(relativeTime);

export default function user() {
  const router = useRouter();
  const username = router.query.username;

  const { data, error } = useSWR<any>(
    username ? `/submissions/${username}` : null
  );

  if (error) router.push("/");
  console.log(data);

  return (
    <>
      <Head>
        <title>{data?.user.username}</title>
      </Head>

      {data && (
        <div className="container flex w-full pt-5 mx-auto">
          <div className="w-3/5">
            {data.submissions.map((submission: any) => {
              if (submission.type === "Post") {
                const post: Post = submission;
                return <PostCard key={submission.identitfier} post={post} />;
              } else {
                const comment: Comment = submission;
                return (
                  <div
                    key={comment.identifier}
                    className="flex my-4 bg-white rounded"
                  >
                    {/* user submissions */}
                    <div className="flex-shrink-0 w-10 py-4 text-center bg-gray-200 rounded-l">
                      <i className="text-gray-500 fas fa-comment-alt fa-xs"></i>
                    </div>

                    <div className="w-full p-2">
                      <p className="mb-2 text-xs text-gray-500">
                        {comment.username}
                        <span> commented on </span>
                        <Link href={comment.post?.url}>
                          <a className="font-semibold cursor-pointer hover:underline">
                            {comment.post?.title}
                          </a>
                        </Link>
                        <span className="mx-1">•</span>
                        <Link href={`/r/${comment.post?.subName}`}>
                          <a className="text-black cursor-pointer hover:underline">
                            /r/{comment.post?.subName}
                          </a>
                        </Link>
                      </p>

                      <hr />
                      <p>{comment.body}</p>
                    </div>
                  </div>
                );
              }
            })}
          </div>
          <div className="pt-4 ml-6 w-80">
            <div className="bg-white rounded">
              <div className="bg-white rounded-l">
                <div className="p-2 bg-blue-500 rounded-t">
                  <img
                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    alt="user profile"
                    className="w-16 h-16 mx-auto border-2 border-white rounded-full"
                  />
                </div>

                <div className="p-3 text-center">
                  <h1 className="mb-4 text-xl ">{data.user.username}</h1>
                  <hr />
                  <p className="mt-3">
                    Joined {dayjs(data.user.createdAt).format("MM YYYY")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
