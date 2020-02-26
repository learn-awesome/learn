import SimpleMDE from "simplemde";
import "simplemde/dist/simplemde.min.css";

const defaultEditorConfig = {
  hideIcons: ["guide"],
  showIcons: ["code", "table"],
  status: false,
  spellChecker: false
};

$(() => {
  const flashcardQuestionEditor = new SimpleMDE({
    ...defaultEditorConfig,
    element: document.getElementById("flash_card_question")
  });

  const flashcardAnswerEditor = new SimpleMDE({
    ...defaultEditorConfig,
    element: document.getElementById("flash_card_answer")
  });
});
