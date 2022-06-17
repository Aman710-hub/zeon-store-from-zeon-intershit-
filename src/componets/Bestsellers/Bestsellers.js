import React from "react";
import styles from "../Bestsellers/Bestsellers.module.css";
import Loading from "../loading/Loading";
import { useState, useEffect } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import New from "../News/New";

const url = "http://localhost:3000/BestsellersInfo";

// localStorage.setItem("amantur", 2001);
// console.log(localStorage.amantur);

const Bestsellers = () => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(8);
  const [favarite, setFavarite] = useState(false);
  const [favorited, setFavorited] = useState();

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

  const { img, name, price, size, colors, isFavarite } = data[0];

  // console.log(name);

  // const fav = (e) => {
  //   e.preventDefault();

  //   return !isFavarite;
  // };

  // const [favList, setFavList] = useState([]);

  // const handleFavAddClick = (e) => {
  //   setFavList((preState) => [...preState, e]);
  //   setData((preState) => preState.filter((item) => item !== e));
  // };

  return (
    <div className={styles.container}>
      <h2>Хит продаж</h2>
      <div className={styles.cardContainer}>
        {data.slice(0, visible).map((curr) => {
          let {
            img,
            name,
            price,
            size,
            colors,
            id,
            isFavarite,
            colors1,
            colors2,
            colors3,
            colors4,
            colors5,
            colors6,
            colors7,
            colors8,
          } = curr;

          const AddToFav = (e) => {
            e.preventDefault();
            const locSt = localStorage.setItem(
              "favarite1",
              JSON.stringify(curr)
            );
            const currId = JSON.parse(localStorage.getItem("favarite1")).id;
            console.log(currId);

            if (id === currId) {
              setFavarite(!favarite);
            }

            // if (currId === id) {
            //   localStorage.setItem("favarite1", JSON.stringify(curr));
            // }

            // if (currId !== id) {
            //   localStorage.removeItem("favarite1");
            // }
          };

          return (
            <div key={id} className={styles.card}>
              <div className={styles.cardImg}>
                <a href="">
                  {favarite ? (
                    <p onClick={(e) => AddToFav(e)}>RedHeart</p>
                  ) : (
                    <AiOutlineHeart
                      size={30}
                      className={styles.cardLike}
                      style={{}}
                      onClick={(e) => AddToFav(e)}
                    />
                  )}
                </a>

                <img src={img} alt="IMG" />
              </div>
              <div className={styles.cardInfo}>
                <h4>{name}</h4>
                <h3>{price} p</h3>
                <p>Размер:{size}</p>
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
        style={{ display: visible === data.length ? "none" : "inline-block" }}
        onClick={showMowe}
        type="button"
        href="#"
      >
        Еще
      </a>
      <New />
    </div>
  );
};

export default Bestsellers;
