import React from "react";
import styles from "../News/New.module.css";
import Loading from "../loading/Loading";
import { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";

const url = "http://localhost:3000/New";

const New = () => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(4);

  const showMowe = (e) => {
    e.preventDefault();
    return setVisible(visible + 4);
  };

  // we need fetch to get needed data asyncon way. That means that the main thred will not wait for data download
  const fetchHeader = async () => {
    // in TRY we will try run the code and if there is some kind of err than we will run code that inside CATCH block
    try {
      // AWAIT -  untill we done fetching url the variable will not be given value
      const respons = await fetch(url);
      const intoJson = await respons.json();
      setData(intoJson);
    } catch (err) {
      alert("there is error");
    }

    setLoading(false);
  };

  // we use useEffect here to fetch data once we on the app ([] - means that useEffect will run just once )
  useEffect(() => {
    fetchHeader();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  /////////////////////////////////////

  // console.log(data);

  const { img, name, price, size, colors } = data[0];

  // console.log(name);

  return (
    <div className={styles.container}>
      <h2>Новинки</h2>
      <div className={styles.cardsWraper}>
        {data.slice(0, visible).map((curr) => {
          const {
            img,
            name,
            price,
            size,
            colors,
            id,
            colors1,
            colors2,
            colors3,
            colors4,
            colors5,
            colors6,
            colors7,
            colors8,
            discount,
          } = curr;
          return (
            <div key={id} className={styles.card}>
              <div className={styles.cardImg}>
                <a href="">
                  <AiOutlineHeart size={30} className={styles.cardLike} />
                </a>
                <img src={img} alt="IMG" />
              </div>
              <div className={styles.cardInfo}>
                <h4>{name}</h4>
                <h3>{price}</h3>
                <p>{size}</p>
                <div className={styles.colors}>
                  <div
                    style={{ backgroundColor: colors1 }}
                    className={styles.color}
                  ></div>
                  <div
                    style={{ backgroundColor: colors2 }}
                    className={styles.color}
                  ></div>
                  <div
                    style={{ backgroundColor: colors3 }}
                    className={styles.color}
                  ></div>
                  <div
                    style={{ backgroundColor: colors4 }}
                    className={styles.color}
                  ></div>
                  <div
                    style={{ backgroundColor: colors5 }}
                    className={styles.color}
                  ></div>
                  <div
                    style={{ backgroundColor: colors6 }}
                    className={styles.color}
                  ></div>
                  <div
                    style={{ backgroundColor: colors7 }}
                    className={styles.color}
                  ></div>
                  <div
                    style={{ backgroundColor: colors8 }}
                    className={styles.color}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <a
        style={{ display: visible === 12 ? "none" : "inline-block" }}
        onClick={showMowe}
        href="#"
        type="button"
        className={styles.moreBtn}
      >
        Еще
      </a>
    </div>
  );
};

export default New;
