import React, { useState } from "react";

const FlashCard = props => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={styles.listItem}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={isHovered ? styles.actions : { display: "none" }}>
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
      <div style={styles.container}>{props.question}</div>
    </div>
  );
};

const styles = {
  listItem: {
    display: "flex",
    flex: "1 1 22%",
    flexDirection: "column",
    height: "300px",
    minWidth: "250px",
    width: "22%",
    maxWidth: "22%",
    marginRight: "2%",
    marginBottom: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    background: "#fff",
    boxShadow: "2px 2px 8px 0px #ccc",
    overflowY: "scroll",
    position: "relative"
  },
  container: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px"
  },
  actions: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px",
    width: "100%",
    position: "absolute",
    boxShadow: "0 5px 15px 15px #eee"
  }
};

export default FlashCard;
