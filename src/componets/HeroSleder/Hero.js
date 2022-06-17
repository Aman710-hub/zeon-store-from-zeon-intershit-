import React from "react";
import Slider from "react-slick";
import styles from "../HeroSleder/Hero.module.css";
import Loading from "../loading/Loading";
import { useState, useEffect } from "react";

// import Hero from "src/assets/img/hero.png";
// slider css
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const url = "http://localhost:3000/hero";

function SimpleSlider() {
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

  /////////////////////////////////////

  // console.log(data);

  const { hero } = data[0];

  // console.log(hero);

  /////////////////////////////////////////////

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <div>
      <Slider {...settings} className={styles.sleder}>
        <div className={styles.slide}>
          <img src={hero} alt="hero" />
        </div>
        <div className={styles.slide}>
          <img src={hero} alt="hero" />
        </div>
        <div className={styles.slide}>
          <img src={hero} alt="hero" />
        </div>
        <div className={styles.slide}>
          <img src={hero} alt="hero" />
        </div>
        <div className={styles.slide}>
          <img src={hero} alt="hero" />
        </div>
      </Slider>
    </div>
  );
}

export default SimpleSlider;

// import React from "react";

// function Hero() {

//   return (

//   );
// }

// export default Hero;
