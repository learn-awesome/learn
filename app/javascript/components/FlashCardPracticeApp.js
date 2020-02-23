import React, { useState } from "react";

import FlashCard from "./FlashCard";

const NoFlashCardPlaceholder = (
  <p>No flash card is available for practice right now.</p>
);

const FlashCardPracticeApp = ({ flash_card: flashCard }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const helpMessage = !isFlipped && (
    <p>
      Try to <strong>remember</strong> and then{" "}
      <strong>
        <span class="far fa-hand-pointer"></span> click
      </strong>{" "}
      the card!
    </p>
  );

  const actions = isFlipped && (
    <div style={styles.actions}>
      <button className="btn btn-lg btn-danger mr-4" onClick={() => {}}>
        <span className="fa fa-repeat"></span> Didn't remember
      </button>
      <button className="btn btn-lg btn-success" onClick={() => {}}>
        <span className="fa fa-check"></span> Remembered!
      </button>
    </div>
  );

  if (!flashCard) {
    return <NoFlashCardPlaceholder />;
  }

  return (
    <div style={styles.screen}>
      <FlashCard {...{ flashCard, wide: true }} onFlip={setIsFlipped} />
      {helpMessage}
      {actions}
    </div>
  );
};

const styles = {
  screen: {
    display: "flex",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
  },
  actions: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
  }
};

export default FlashCardPracticeApp;
