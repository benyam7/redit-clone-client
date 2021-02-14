import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Post } from "../../../../types";

export default function PostPage() {
  const router = useRouter();
  const { identitfier, sub, slug } = router.query;

  const { data: post, error } = useSWR<Post>(
    identitfier && slug ? `/posts/${identitfier}/${slug}` : null
  );

  if (error) router.push("/");
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
                    src={post.sub.imageUrl}
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
    </>
  );
}
