import React from "react";
import styles from "../pages/AboutUs.module.css";
import Loading from "../componets/loading/Loading";
import { useState, useEffect } from "react";

const url = "http://localhost:3000/aboutUs";
const AboutUs = () => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  // we need fetch to get needed data asyncon way. That means that the main thred will not wait for data download
  const fetchHeader = async () => {
    // in TRY we will try run the code and if there is some kind of err than we will run code that inside CATCH block
    try {
      // AWAIT -  untill we done fetching url the variable will not be given value
      const respons = await fetch(url);
      const intoJSON = await respons.json();
      setData(intoJSON);
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

  const { img1, img2, img3, title, text } = data[0];
  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <div className={styles.img1}>
          <img src={img1} alt="" />
          <img src={img2} alt="" />
        </div>
        <div className={styles.img2}>
          <img src={img3} alt="" />
        </div>
      </div>
      <div className={styles.wraper2}>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default AboutUs;
