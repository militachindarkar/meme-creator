import React from "react";
import styles from "./Styles.module.css";

export const MemesList = ({ memes, onClickHandle }) => {
  //console.log(memeIndex);
  return (
    <div className={styles.memelistContainer}>
      {memes.map((item, index) => (
        <img
          onClick={onClickHandle}
          className={styles.memeItem}
          key={item.id}
          src={item.url}
          alt={index}
        />
      ))}
    </div>
  );
};
