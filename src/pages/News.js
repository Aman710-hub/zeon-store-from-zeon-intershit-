import React from "react";
import styles from "../pages/News.module.css";
import Loading from "../componets/loading/Loading";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const url = "http://localhost:3000/news";

const News = () => {
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
      <h2>Новости</h2>
      {data.map((curr) => {
        const { img, title, text, id } = curr;
        return (
          <div key={id} className={styles.wraper}>
            <img src={img} alt="" />
            <div className={styles.textWraper}>
              <h4>{title}</h4>
              <p>{text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default News;
