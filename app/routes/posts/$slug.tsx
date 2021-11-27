import { LoaderFunction, useLoaderData } from "remix";
import invariant from "tiny-invariant";
import { getPost } from "~/post";

export default function PostSlug() {
  let post = useLoaderData();
  return (
    <div>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}

export let loader: LoaderFunction = async ({ params }) => {
  invariant(params.slug, "expected params.slug");
  return getPost(params.slug);
};
