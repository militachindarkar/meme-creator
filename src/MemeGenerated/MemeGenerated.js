import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "./Styles.module.css";
import { useClipboard } from "use-clipboard-copy";

const MemeGenerated = () => {
  const [copied, setCopied] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const clipboard = useClipboard();

  const url = new URLSearchParams(location.search).get("url");
  const copyLink = () => {
    clipboard.copy(url);
    setCopied(true);
  };
  return (
    <div className={styles.container}>
      <button className={styles.home} onClick={() => history.push("/")}>
        Make more memes!
      </button>
      {url && <img src={url} alt="meme generated"></img>}
      <button className={styles.copy} onClick={copyLink}>
        {copied ? "Link copied!" : "Copy Link"}
      </button>
    </div>
  );
};
export default MemeGenerated;
