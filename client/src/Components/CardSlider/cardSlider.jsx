import React, { useRef, useState } from "react";
import Card from "../Card/Card";
import "./cardSlider.css";

const CardSlider = React.memo(({ data, title }) => {
  const [showControl, setShowControl] = useState(false);
  const [sliderPos, setSliderPos] = useState(0);
  const listRef = useRef();

  // Function
  function handleDirection(dir) {
    let distance = listRef.current.getBoundingClientRect().x - 48;
    if (dir === "left" && sliderPos > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setSliderPos(sliderPos - 1);
    }

    if (dir === "right" && sliderPos < 5) {
      listRef.current.style.transform = `translateX(${-230 + distance}px)`;
      setSliderPos(sliderPos + 1);
    }
  }
  return (
    <div
      className="cardSlider-cont"
      onMouseEnter={() => setShowControl(true)}
      onMouseLeave={() => setShowControl(false)}
    >
      <h1>{title}</h1>
      <div className="cardSlider-wrapper">
        <div
          className={`slider-action left ${!showControl && "none"}`}
          onClick={() => {
            handleDirection("left");
          }}
        >
          <i className="fa-solid fa-chevron-left"></i>
        </div>
        <div className="cardSlider-div" ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} index={index} key={movie.id} />;
          })}
        </div>
        <div
          className={`slider-action right ${!showControl && "none"}`}
          onClick={() => {
            handleDirection("right");
          }}
        >
          <i className="fa-solid fa-chevron-right"></i>
        </div>
      </div>
    </div>
  );
});

export default CardSlider;
