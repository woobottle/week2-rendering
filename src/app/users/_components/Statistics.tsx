import { z } from "zod";

const CommentSchema = z.object({
  postId: z.number(),
  id: z.number(),
  name: z.string(),
  email: z.string(),
  body: z.string(),
});

const CommentListSchema = CommentSchema.array();

const Statistics = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/comments?_limit=1",
  );
  const comments = await res.json();
  const parsedComments = CommentListSchema.parse(comments);

  return (
    <div>
      <h1>최근 통계 데이터</h1>
      <ul>
        {parsedComments.map((comment) => (
          <li key={comment.id}>{comment.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Statistics;
