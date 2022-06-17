import React from "react";
import styles from "../pages/Colection.module.css";
import Loading from "../componets/loading/Loading";
import { useState, useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";
import { Link } from "react-router-dom";

const url = "http://localhost:3000/colectionPage";

const Colection = () => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        {data.map((item) => {
          const { img, id } = item;
          return (
            <div key={id} className={styles.cardsWraper}>
              <img src={img} alt="img" />
              <div className={styles.cardBtn}>
                <Link to="/colectionDitail" type="button">
                  Смотреть все
                </Link>
                <BsChevronRight className={styles.icons} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Colection;
