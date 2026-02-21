"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { z } from "zod";

const TodoSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.coerce.string(),
});

const TodoListSchema = z.array(TodoSchema);
type Todo = z.infer<typeof TodoSchema>;
type TodoList = z.infer<typeof TodoListSchema>;

const Todo = ({ todo }: { todo: Todo }) => {
  return (
    <div className="border border-gray-300 p-4">
      <p>titie: {todo.title}</p>
      <p>completed: {todo.completed}</p>
    </div>
  );
};

const TodoContent = () => {
  const searchParams = useSearchParams();
  const [todos, setTodos] = useState<TodoList>([]);

  const fetchTodos = useCallback(async () => {
    const delayParam = searchParams?.get("delay");
    const delay = Number(delayParam ?? 2000);
    await new Promise((resolve) => setTimeout(resolve, delay));
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const results = await res.json();
    const todos = TodoListSchema.safeParse(results);
    if (!todos.success) {
      return;
    }

    setTodos(todos.data);
  }, [searchParams]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <>
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </>
  );
};

export default function TodoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TodoContent />
    </Suspense>
  );
}
