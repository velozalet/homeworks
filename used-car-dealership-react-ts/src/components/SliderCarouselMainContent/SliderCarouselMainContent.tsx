import React from "react";

import HomeSlider1 from "../../assets/home_page_slider/Home-Slider_1.jpg";
import HomeSlider2 from "../../assets/home_page_slider/Home-Slider_2.jpg";
import HomeSlider3 from "../../assets/home_page_slider/Home-Slider_3.jpg";
import HomeSlider4 from "../../assets/home_page_slider/Home-Slider_4.jpg";
import HomeSlider5 from "../../assets/home_page_slider/Home-Slider_5.jpg";
import HomeSlider6 from "../../assets/home_page_slider/Home-Slider_6.jpg";
const SlidesArray = [
  HomeSlider1,
  HomeSlider2,
  HomeSlider3,
  HomeSlider4,
  HomeSlider5,
  HomeSlider6,
]; //console.log(SlidesArray.length);

const SliderCarouselMainContent = ()=>{
  return (
    <>
      {/* Indicators */}
      <div className="carousel-indicators d-none d-sm-flex">
        { SlidesArray.map( (item,index,array) => (
          <button
            key={index}
            type="button"
            data-bs-target="#slider_carousel"
            data-bs-slide-to={index}
            aria-label={`Slide ${index + 1}`}
            aria-current={index === 0 ? "true" : undefined}
            className={index === 0 ? "active" : ""}
          ></button>
        ) ) }
      </div>
      {/*__/Indicators/dots */}
      {/*Slides*/}
      <div className="carousel-inner">
        { SlidesArray.map( (item,index,array) => (
          <div key={index} className={`carousel-item ${index === 0 ? " active" : ""}`}>
            <img src={item} alt={`Slide ${index + 1}`} className="d-block w-100" />
            <div className="carousel-caption d-none d-sm-block"> 
            <h3 className="chromatic-aberration-effect">{index + 1} slide label</h3>
              <p>Some placeholder content for slide #{index + 1} slide.</p>
            </div>
          </div>
        ))}
      </div>
      {/*__/Slides*/}
    </>
  );
};
export default SliderCarouselMainContent;