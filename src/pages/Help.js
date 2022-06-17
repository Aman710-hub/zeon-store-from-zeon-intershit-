import React from "react";
import "../pages/Help.css";
import Loading from "../componets/loading/Loading";
import { useState, useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";

const url = "http://localhost:3000/help";

const Help = () => {
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
  const [selected, setSelected] = useState(null);
  //
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  // console.log(data[0].answer);

  // if i = selected then selected will be set to "null" if not it well be "i"
  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const { img } = data[0];
  // console.log(img);

  return (
    <div className="container">
      <div className="accordion">
        <img src={img} alt="" />
        <div className="QAwraper">
          {/* i is index of item */}
          {data.map((curr, i) => {
            const { question, answer, id } = curr;
            return (
              <div key={i} className="item">
                {/* when this div is ckicked we check if  */}
                <div className="title" onClick={() => toggle(i)}>
                  <h3>{question}</h3>
                  <div className="icon">
                    {selected === i ? <BsChevronUp /> : <BsChevronDown />}
                  </div>
                </div>
                {/* if index of curr item matches with "selected"  than "conten and show clacces" will be given to this div and if not only "content" clacc will be gived */}
                <div className={selected === i ? "content show" : "content"}>
                  <p>{answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Help;
