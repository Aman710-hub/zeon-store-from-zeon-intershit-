import React from "react";
import styles from "../Footer/Footer.module.css";
import Loading from "../loading/Loading";
import { useState, useEffect } from "react";
import { IoCallOutline } from "react-icons/io5";
import { GoMail } from "react-icons/go";
import { AiOutlineInstagram } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io5";
import { Link } from "react-router-dom";

// import { TbBrandTelegram } from "react-icons/tb";

const url = "http://localhost:3000/footer";

function Footer() {
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

  const {
    logo,
    develeper,
    company,
    aboutUs,
    news,
    help,
    contects,
    phoneNumber,
    mail,
    weInSionialMedia,
    Instagram,
    Telegram,
    telegramIcon,
    Whatsapp,
  } = data[0];

  /////////////////////////////////////
  return (
    <div className={styles.container}>
      <div className={styles.wraper}>
        <div className={styles.content}>
          <div className={styles.logoWraper}>
            <div className={styles.logo}>
              <img src={logo} alt="Img" />
              <p>{develeper}</p>
            </div>
          </div>
          <div className={styles.contWraper}>
            <div className={styles.company}>
              <h4>{company}</h4>
              <Link to="/about">{aboutUs}</Link>
              <Link to="/news">{news}</Link>
              <Link to="/help">{help}</Link>
            </div>
          </div>
          <div className={styles.contWraper}>
            <div className={styles.contects}>
              <h4>{contects}Контакты</h4>
              <div className={styles.iconWraper}>
                <IoCallOutline className={styles.icons} />
                <a href="#">{phoneNumber}</a>
              </div>
              <div className={styles.iconWraper}>
                <IoCallOutline className={styles.icons} />
                <a href="#">{phoneNumber}</a>
              </div>
              <div className={styles.iconWraper}>
                <GoMail className={styles.icons} />
                <a href="https://www.youtube.com/watch?v=TPWFowLrlcI">{mail}</a>
              </div>
            </div>
          </div>
          <div className={styles.contWraper}>
            <h4>{weInSionialMedia}</h4>
            <div className={styles.iconWraper}>
              <AiOutlineInstagram className={styles.icons} />
              <a href="#">{Instagram}</a>
            </div>

            <div className={styles.iconWraper}>
              {/* <TbBrandTelegram /> */}
              <img src={telegramIcon} className={styles.icons} alt="" />

              <a href="#">{Telegram}</a>
            </div>

            <div className={styles.iconWraper}>
              <IoLogoWhatsapp className={styles.icons} />
              <a href="#">{Whatsapp}Whatsapp</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
