import React from "react";
import Loading from "../loading/Loading";
import { useState, useEffect } from "react";
import styles from "../Our-advantage/Our-advantage.module.css";

const url = "http://localhost:3000/our-advantages";

const OurAdvantage = () => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);

  // we need fetch to get needed data asyncon way. That means that the main thred will not wait for data download
  const fetchHeader = async () => {
    // in TRY we will try run the code and if there is some kind of err than we will run code that inside CATCH block
    try {
      // AWAIT -  untill we done fetching url the variable will not be given value
      const respons = await fetch(url);
      const header = await respons.json();
      setData(header);
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
  ///////////////////////////////////////////////////////////

  //   const { logo, id, phoneNumber } = data[0];

  return (
    <div className={styles.container}>
      <h2>Наши преимущества</h2>
      <div className={styles.wraper}>
        {data.map((item) => {
          const { icon, title, text, id } = item;
          return (
            <div key={id} className={styles.card}>
              <div className={styles.block}>
                <img className={icon} src={icon} alt="" />
                <div className={styles.textSection}>
                  <h5>{title}</h5>
                  <p>{text}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurAdvantage;
