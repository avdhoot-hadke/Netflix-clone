import React from "react";
import CardSlider from "../CardSlider/cardSlider";
import "./slider.css";

function Slider({ movies, parent }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

  return (
    <div className={`slider ${parent === "netflix" ? "parent-netflix" : ""}`}>
      <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
      <CardSlider title="New Releases" data={getMoviesFromRange(10, 20)} />
      <CardSlider
        title="Popular on Netflix"
        data={getMoviesFromRange(20, 30)}
      />
      <CardSlider title="BlockBuster" data={getMoviesFromRange(30, 40)} />
      <CardSlider title="Action" data={getMoviesFromRange(40, 50)} />
      <CardSlider title="Top picks for you" data={getMoviesFromRange(50, 60)} />
    </div>
  );
}

export default Slider;
