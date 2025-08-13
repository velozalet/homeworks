import React from 'react'; 
import { useEffect } from 'react';

const TOTAL_SLIDES = 6; //or get this from your images array length


//Images:
import HomeSlider1 from '../../assets/home_page_slider/Home-Slider_1.jpg';
import HomeSlider2 from '../../assets/home_page_slider/Home-Slider_2.jpg';
import HomeSlider3 from '../../assets/home_page_slider/Home-Slider_3.jpg';
import HomeSlider4 from '../../assets/home_page_slider/Home-Slider_4.jpg';
import HomeSlider5 from '../../assets/home_page_slider/Home-Slider_5.jpg';
import HomeSlider6 from '../../assets/home_page_slider/Home-Slider_6.jpg';

//Styles:
import './SliderCarousel.css';

const SliderCarousel = ()=> {
  useEffect(() => {
    // Carousel will auto-init via Bootstrap data attributes
  }, []);

  return ( //
    <div
      id="slider_carousel"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      {/*Indicators/dots */}
      <div className="carousel-indicators d-none d-sm-flex">
        <button
          type="button"
          data-bs-target="#slider_carousel"
          data-bs-slide-to="0"
          aria-label="Slide 1"
          aria-current="true"
          className="active"
        ></button>
        <button
          type="button"
          data-bs-target="#slider_carousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#slider_carousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#slider_carousel"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#slider_carousel"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
        <button
          type="button"
          data-bs-target="#slider_carousel"
          data-bs-slide-to="5"
          aria-label="Slide 6"
        ></button>
      </div>
      {/*__/Indicators/dots */}

      {/*Slides*/}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={HomeSlider1}
            alt="Los Angeles"
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-sm-block">
            <h3 className="chromatic-aberration-effect">1 slide label</h3>
            <p>Some representative placeholder content for the 1-st slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={HomeSlider2}
            alt="Chicago"
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-sm-block">
            <h3 className="chromatic-aberration-effect">2 slide label</h3>
            <p>Some representative placeholder content for the 2-nd slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={HomeSlider3}
            alt="New York"
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-sm-block">
            <h3 className="chromatic-aberration-effect">3 slide label</h3>
            <p>Some representative placeholder content for the 3-rd slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={HomeSlider4}
            alt="New York"
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-sm-block">
            <h3 className="chromatic-aberration-effect">4 slide label</h3>
            <p>Some representative placeholder content for the 4-th slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={HomeSlider5}
            alt="New York"
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-sm-block">
            <h3 className="chromatic-aberration-effect">5 slide label</h3>
            <p>Some representative placeholder content for the 5-th slide.</p>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={HomeSlider6}
            alt="New York"
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-sm-block">
            <h3 className="chromatic-aberration-effect">6 slide label</h3>
            <p>Some representative placeholder content for the 6-th slide.</p>
          </div>
        </div>
      </div>
      {/*__/Slides*/}

      {/*Navigation buttons*/}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#slider_carousel"
        data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#slider_carousel"
        data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
      {/*__/Navigation buttons*/}
    </div>
  );
};
export default SliderCarousel; 
