const PostPage = () => {
  return <></>;
};

export async function getServerSideProps(context) {
  const delay = Number(context.query.delay ?? 0);
  await new Promise((resolve) => setTimeout(resolve, delay));
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  return { props: { posts } };
}
