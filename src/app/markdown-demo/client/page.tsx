// app/markdown-demo/client/page.tsx
"use client";
import { marked } from "marked";
import { useEffect, useState } from "react";

export default function ClientMarkdownPage() {
  const [html, setHtml] = useState("");

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/facebook/react/main/README.md")
      .then((res) => res.text())
      .then((md) => setHtml(marked(md) as string));
  }, []);

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
