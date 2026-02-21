import { marked } from "marked";

const ServerMarkDown = async () => {
  const response = await fetch(
    "https://raw.githubusercontent.com/facebook/react/main/README.md",
  );
  const markdown = await response.text();
  const html = marked(markdown);

  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default ServerMarkDown;
