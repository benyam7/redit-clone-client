import { route } from "next/dist/next-server/server/router";
import { useRouter } from "next/router";
import useSWR from "swr";
import PostCard from "../../componets/PostCard";

export default function Sub() {
  const router = useRouter();

  const subName = router.query.sub;

  const { data: sub, error } = useSWR(subName ? `/subs/${subName}` : null);

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
    <div className="container flex w-full pt-4 mx-auto">
      <div className="container flex">
        <div className="w-3/5">{postsMarkup}</div>
      </div>
    </div>
  );
}
