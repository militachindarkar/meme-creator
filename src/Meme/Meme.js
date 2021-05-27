import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MemesList } from "./MemesList";
import styles from "./Styles.module.css";

export const Meme = () => {
  const [memes, setMemes] = useState([]);
  const [memeIndex, setMemeIndex] = useState(0);
  const [memeCaptions, setMemeCaption] = useState([]);
  const history = useHistory();
  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes").then((res) => {
      res
        .json()
        .then((res) => {
          const _memes = res.data.memes;
          setMemes(_memes);
          shuffleMemes(_memes);
          console.log(_memes);
        })
        .catch((error) => console.log(error));
    });
  }, []);

  useEffect(() => {
    if (memes.length) {
      setMemeCaption(Array(memes[memeIndex].box_count).fill(""));
    }
  }, [memeIndex, memes]);

  const updateCaptions = (e, index) => {
    const text = e.target.value || "";
    setMemeCaption(
      memeCaptions.map((c, i) => {
        return index === i ? text : c;
      })
    );
  };
  const shuffleMemes = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  const generateMeme = () => {
    const currMeme = memes[memeIndex];
    const formData = new FormData();
    formData.append("username", process.env.REACT_APP_USERNAME);
    formData.append("password", process.env.REACT_APP_PASSWORD);
    formData.append("template_id", currMeme.id);
    memeCaptions.forEach((c, i) => {
      formData.append(`boxes[${i}][text]`, c);
    });

    fetch("https://api.imgflip.com/caption_image", {
      method: "POST",
      body: formData,
    }).then((res) =>
      res
        .json()
        .then((res) => {
          history.push(`/generated?url=${res.data.url}`);
        })
        .catch((error) => console.log(error))
    );
  };

  const onImgClick = (e) => {
    setMemeIndex(e.target.alt);
  };

  return memes.length ? (
    <div className={styles.container}>
      <div className={styles.imgFormContainer}>
        <div className={styles.container_2}>
          <img src={memes[memeIndex].url} alt={memes[memeIndex].name} />
        </div>
        <div className={styles.container_3}>
          <button onClick={generateMeme} className={styles.generate}>
            Generate Meme
          </button>
          <button
            onClick={() => {
              setMemeIndex(memeIndex + 1);
            }}
            className={styles.skip}
          >
            Skip
          </button>
          {memeCaptions.map((item, index) => (
            <input
              key={index}
              onChange={(e) => updateCaptions(e, index)}
            ></input>
          ))}
        </div>
      </div>

      <div className={styles.listContainer}>
        <h2>Choose From Below Templates</h2>
        <MemesList memes={memes} onClickHandle={onImgClick} />
      </div>
    </div>
  ) : (
    <></>
  );
};
