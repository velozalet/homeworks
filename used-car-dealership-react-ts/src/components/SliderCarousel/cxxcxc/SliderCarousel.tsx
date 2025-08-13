import React from 'react'; 
import { useState } from 'react';
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
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        //Carousel will auto-init via Bootstrap data attributes
    }, []);

    const handleIndicatorClick = (index: number) => {
        const carousel = document.querySelector('#slider_carousel') as HTMLElement;
        if(carousel){
            (window as any).bootstrap.Carousel.getInstance(carousel)?.to(index);
        }
        setActiveIndex(index);
    };

    return(
    <div
      id="slider_carousel"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel">

      {/*Indicators/dots*/}
      <div className="carousel-indicators custom-indicators">
      {Array.from({ length: TOTAL_SLIDES }).map((_, index) => ( 
        <button
          key={index}
          type="button"
          data-bs-target="#slider_carousel"
          data-bs-slide-to={index}
          aria-label={`Slide ${index + 1}`}
          aria-current={activeIndex === index}
          className={activeIndex === index ? 'active' : ''} 
          onClick={() => handleIndicatorClick(index)}>
            <i className={ activeIndex === index ? 'fa fa-circle' : 'fa fa-circle-o' }></i>
        </button>
      ))}
      </div>
      {/*Indicators/dots*/}

      {/* Slides */} 
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={HomeSlider1}
            alt="Los Angeles"
            className="d-block w-100"
          />
          <div className="carousel-caption d-none d-sm-block">
            <h3>1 slide label</h3>
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
            <h3>2 slide label</h3>
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
            <h3>3 slide label</h3>
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
            <h3>4 slide label</h3>
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
            <h3>5 slide label</h3>
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
            <h3>6 slide label</h3>
            <p>Some representative placeholder content for the 6-th slide.</p>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
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
    </div>
    );
};
export default SliderCarousel; 
