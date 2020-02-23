import React from "react";

import FlashCard from "./FlashCard";

const NoFlashCardsPlaceholder = (
  <p>
    You can create Flash Cards using our browser extension and practice them
    using our spaced-repetition algorithm. Flash cards help not just with
    memorization but also conceptual understanding.
  </p>
);

const FlashCardList = ({ flash_cards: flashCards }) => {
  if (!flashCards.length) {
    return <NoFlashCardsPlaceholder />;
  }

  return (
    <div style={styles.list}>
      {flashCards.map(flashCard => (
        <FlashCard key={flashCard.id} flashCard={flashCard} onFlip={() => {}} />
      ))}
    </div>
  );
};

const styles = {
  list: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%"
  }
};

export default FlashCardList;
