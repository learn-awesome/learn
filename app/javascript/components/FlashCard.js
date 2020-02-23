import React, { useState } from "react";
import Flippy, { FrontSide, BackSide } from "react-flippy";

const FlashCard = props => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const Actions = () => (
    <div style={{ ...styles.actions, ...(isHovered ? {} : styles.hidden) }}>
      <a href={`/flash_cards/${props.id}/edit`} className="mr-2">
        <span className="far fa-edit"></span>
      </a>
      <a
        href={`/flash_cards/${props.id}`}
        data-method="delete"
        data-confirm="Do you really want to delete the selected flash card?"
        rel="nofollow"
        className="text-danger"
      >
        <span className="fas fa-trash"></span>
      </a>
    </div>
  );

  return (
    <div
      style={styles.cardContainer}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flippy
        flipDirection="horizontal"
        isFlipped={isFlipped}
        style={styles.card}
      >
        <FrontSide style={{ ...styles.side, ...styles.frontSide }}>
          <Actions />
          <div style={styles.content}>
            {props.question}
          </div>
        </FrontSide>
        <BackSide style={{ ...styles.side, ...styles.backSide }}>
          <Actions />
          <div style={styles.content}>
            {props.answer}
          </div>
        </BackSide>
      </Flippy>
    </div>
  );
};

const styles = {
  cardContainer: {
    display: "flex",
    flex: "1 1 22%",
    flexDirection: "column",
    minWidth: "250px",
    width: "22%",
    maxWidth: "22%",
    marginRight: "2%",
    marginBottom: "20px"
  },
  card: {
    display: "flex",
    flex: 1
  },
  side: {
    display: "flex",
    flex: 1,
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "2px 2px 8px 0px #ccc",
    overflowX: "hidden"
  },
  frontSide: {
    background: "#fff"
  },
  backSide: {
    background: "#ffd"
  },
  content: {
    display: "flex",
    flex: "1",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px",
    width: "100%",
    height: "300px",
    overflowY: "auto",
  },
  actions: {
    zIndex: 2,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    margin: "-1rem",
    padding: "10px",
    width: "100%",
    position: "absolute",
    background: "#fff",
    transform: "none",
    boxShadow: "0px 1px 10px 10px #fff"
  },
  hidden: {
    display: "none"
  }
};

export default FlashCard;
