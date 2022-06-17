import "./App.css";
import Loading from "./componets/loading/Loading";
import { useState, useEffect } from "react";
import React from "react";
import Header from "./componets/Header/Header";
import HeroSlider from "./componets/HeroSleder/Hero";
import Bestsellers from "./componets/Bestsellers/Bestsellers";
import New from "./componets/News/New";
import Footer from "./componets/Footer/Footer";
// import Colaction from "./componets/Colaction/Colaction";
// import OurAdvantage from "./componets/Our-advantage/Our-advantage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import News from "./pages/News";
import AboutUS from "./pages/AboutUs";
import HomePage from "./pages/HomePage";
import Colection from "./pages/Colection";
import Help from "./pages/Help";
import SummerColectin from "./pages/SummerColectin";
import Favorites from "./pages/Favorites";

const FetchData = (url) => {
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
  //

  //
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  return data;
};

function App() {
  return (
    <div className="container">
      <Header />
      <main className="wraper">
        <Routes>
          <Route path="/news" element={<News />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUS />} />
          <Route path="/colection" element={<Colection />} />
          <Route path="/colectionDitail" element={<SummerColectin />} />
          <Route path="/help" element={<Help FetchData={FetchData} />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
