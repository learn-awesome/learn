import SimpleMDE from "simplemde";
import MarkdownIt from "markdown-it";
import MarkdownKaTexPlugin from "@zombie110year/markdown-it-katex";

import "simplemde/dist/simplemde.min.css";
import "katex/dist/katex.min.css";
import "github-markdown-css/github-markdown.css";

const renderMarkdownPreview = plainText => {
  const markdownIt = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });
  return markdownIt.use(MarkdownKaTexPlugin).render(plainText);
};

const defaultEditorConfig = {
  hideIcons: ["guide"],
  showIcons: ["code", "table"],
  status: false,
  spellChecker: false,
  previewRender: renderMarkdownPreview,
  // Async method
  previewRender: function(plainText, preview) {
    setTimeout(function() {
      preview.innerHTML = renderMarkdownPreview(plainText);
    }, 250);

    return "Loading...";
  }
};

$(() => {
  if (!document.getElementById("flash_card_form")) return;

  const flashcardQuestionEditor = new SimpleMDE({
    ...defaultEditorConfig,
    element: document.getElementById("flash_card_question")
  });

  const flashcardAnswerEditor = new SimpleMDE({
    ...defaultEditorConfig,
    element: document.getElementById("flash_card_answer")
  });
});
