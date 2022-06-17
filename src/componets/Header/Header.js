import React from "react";
import styles from "../Header/Header.module.css";
import { BrowserRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";
import { BiShoppingBag } from "react-icons/bi";
import { Routes, Route } from "react-router-dom";
import News from "../../pages/News";

const url = "http://localhost:3000/header";

function Header() {
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

  const { logo, id, phoneNumber, basketIcon } = data[0];

  return (
    <>
      <div className={styles.wraper}>
        <div className={styles.headerMain}>
          <div className={styles.headerWraper}>
            <div className={styles.header}>
              <div className={styles.headerSection}>
                <div className={`${styles.headerItem} ${styles.headerLink}`}>
                  <Link to={"/about"}>О нас</Link>
                </div>
                <div className={`${styles.headerItem} ${styles.headerLink}`}>
                  <Link to={"/colection"}>Коллекции</Link>
                </div>
                <div className={`${styles.headerItem} ${styles.headerLink}`}>
                  <Link to={"/news"}>Новости</Link>
                </div>
              </div>
              <div className={styles.headerSection}>
                <span>Тел:</span>
                <a href="tel: 996 000 00 00 00">+{phoneNumber}</a>
              </div>
            </div>
          </div>
          <div className={styles.logoWraper}>
            <div className={styles.logoSection}>
              <div className={styles.logo}>
                <Link to="/">
                  <img src={logo} alt="Zeon-Store" />
                </Link>
              </div>
              <div className={styles.searchBox}>
                <input
                  type="text"
                  className={caches.input}
                  placeholder="Поиск"
                />
                <AiOutlineSearch className={styles.searchIcon} />
              </div>
              <div className={styles.basketsAndFaverit}>
                <Link to="/favorites">
                  <div className={styles.faverit}>
                    <IoIosHeartEmpty className={styles.icons} />
                    <p>Избранное</p>
                  </div>
                </Link>
                <div className={styles.basket}>
                  <img src={basketIcon} alt="" className={styles.icons} />
                  <p>Корзина</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
