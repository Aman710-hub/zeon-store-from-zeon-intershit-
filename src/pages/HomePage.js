import Header from "../componets/Header/Header";
import HeroSlider from "../componets/HeroSleder/Hero";
import Bestsellers from "../componets/Bestsellers/Bestsellers";
import New from "../componets/News/New";
import Footer from "../componets/Footer/Footer";
import Colaction from "../componets/Colaction/Colaction";
import OurAdvantage from "../componets/Our-advantage/Our-advantage";
import { Routes, Route } from "react-router-dom";
import React from "react";

const HomePage = () => {
  return (
    <div>
      {/* <Header/> */}
      <HeroSlider />
      <Bestsellers />
      <Colaction />
      <OurAdvantage />
    </div>
  );
};

export default HomePage;
