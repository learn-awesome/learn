import React, { useState, useEffect } from "react";

import FlashCard from "./FlashCard";

const NoFlashCardPlaceholder = () => (
  <p>No flash card is available for practice right now.</p>
);

const FlashCardPracticeApp = props => {
  const [flashCard, setFlashCard] = useState(props.flash_card);
  const [isFlipped, setIsFlipped] = useState(false);

  const onRecall = actionName => {
    return fetch(`/flash_cards/${flashCard.id}/${actionName}`, {
      method: "POST",
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "X-CSRF-Token": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(response => {
        setIsFlipped(false);
        setFlashCard(response);
      })
      .catch(error => alert(`Something went wrong! ${error}`));
  };

  const helpMessage = !isFlipped && (
    <p>
      Try to <strong>remember</strong> and then{" "}
      <strong>
        <span className="far fa-hand-pointer"></span> click
      </strong>{" "}
      the card!
    </p>
  );

  const actions = isFlipped && (
    <div style={styles.actions}>
      <button
        className="btn btn-danger mr-4"
        onClick={() => {
          onRecall("did_not_recall");
        }}
      >
        <span className="fa fa-repeat"></span> Didn't remember
      </button>
      <button
        className="btn btn-success"
        onClick={() => {
          onRecall("did_recall");
        }}
      >
        <span className="fa fa-check"></span> Remembered!
      </button>
    </div>
  );

  if (!flashCard) {
    return <NoFlashCardPlaceholder />;
  }

  return (
    <div style={styles.screen}>
      <FlashCard
        {...{ flashCard, flipped: isFlipped, wide: true }}
        onFlip={setIsFlipped}
      />
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
    flexDirection: "row"
  }
};

export default FlashCardPracticeApp;
