import MarkdownIt from "markdown-it";
import MarkdownKaTexPlugin from "@zombie110year/markdown-it-katex";

export const markdownToHtml = markdownText => {
  const markdownIt = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    xhtmlOut: true
  });

  const out = markdownIt
    // Support for MathJax and LaTeX
    .use(MarkdownKaTexPlugin)
    .render(markdownText)
    // replace white-spaces around HTML tags which JSX doesn't like
    .replace(/\s*<(.+)>\s*/g, "<$1>");

  // Use GitHub-style markdown, needs content wrapped with 'markdown-body' class
  return `<div class='markdown-body'>${out}</div>`;
};
