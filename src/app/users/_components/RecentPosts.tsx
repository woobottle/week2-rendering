import { PostListSchema } from "@/pages/posts";

const RecentPosts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5",
  );
  const posts = await res.json();
  const parsedPosts = PostListSchema.parse(posts);

  return (
    <div>
      <h1>최근 게시글</h1>
      <ul>
        {parsedPosts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecentPosts;
