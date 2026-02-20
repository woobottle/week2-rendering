import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { z } from "zod";

const PostSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

const PostListSchema = PostSchema.array();

type Post = z.infer<typeof PostSchema>;
type PostList = z.infer<typeof PostListSchema>;

const Post = ({ post }: { post: Post }) => {
  return (
    <div className="border border-gray-300 p-4">
      <p>titie: {post.title}</p>
      <p>body: {post.body}</p>
    </div>
  );
};

export default function PostPage({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
): Promise<GetServerSidePropsResult<{ posts: PostList }>> => {
  const delay = Number(context.query.delay ?? 2000);
  await new Promise((resolve) => setTimeout(resolve, delay));
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const results = await res.json();

  /*
    zod를 사용한 타입 가드 / safeParse를 사용
  */
  const posts = PostListSchema.safeParse(results);
  if (!posts.success) {
    return { props: { posts: [] } };
  }
  return { props: { posts: posts.data } };
};
