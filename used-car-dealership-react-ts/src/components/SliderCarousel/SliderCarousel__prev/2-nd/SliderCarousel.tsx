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
const SlidesArray = [
  HomeSlider1,
  HomeSlider2,
  HomeSlider3,
  HomeSlider4,
  HomeSlider5,
  HomeSlider6
]; //console.log(SlidesArray.length);

//Styles:
import './SliderCarousel.css';

// Define props
type SliderCarouselProps = {
  interval?: number; //autoplay delay in ms
  effect_name?: "simply-carousel"|"flash-fade"|"smooth-fade"; //effect type depends on the set of classes
};

/*1) Classes:
    "carousel slide" --> regular carousel
    "carousel carousel-fade" --> carousel flash fade
    "carousel slide carousel-fade" --> carousel smooth fade
    ----------------------------
2) data-bs-ride="carousel"  --> auto start on page load
    data-bs-interval="3000" --> 3 sec per slide
    data-bs-pause="false"   --> don't pause on hover
    data-bs-keyboard="true" --> allow arrow key nav
    data-bs-wrap="true"  --> loop from last to first
    data-bs-touch="true" --> enable swipe on touch
*/
const SliderCarousel = ( {interval=5000, effect_name="simply-carousel"}: SliderCarouselProps )=> {
  useEffect(() => {
    //Carousel will auto-init via Bootstrap data attributes
  }, []);

    //Choose className based on `effect name`
    let carouselClass = '';
    if( effect_name === "simply-carousel" ){ carouselClass = "carousel slide";
    }else if( effect_name === "flash-fade" ){ carouselClass = "carousel carousel-fade";
    }else if(effect_name === "smooth-fade"){ carouselClass = "carousel slide carousel-fade";
    }else{ carouselClass = 'carousel slide'; }

  return ( //
    <div
      id="slider_carousel" 
      className={carouselClass}
      data-bs-ride="carousel" 
      data-bs-interval={interval}
      data-bs-pause="false"
      data-bs-keyboard="false" 
      data-bs-wrap="true"
      data-bs-touch="true">
      {/*Indicators/dots */}
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
            <div key={index} className={`carousel-item ${index === 0 ? ' active' : ''}`}>
                <img src={item} alt={`Slide ${index + 1}`}className="d-block w-100" />
                <div className="carousel-caption d-none d-sm-block">
                    <h3 className="chromatic-aberration-effect">{index + 1} slide label</h3>
                    <p>Some representative placeholder content for the #{index + 1} slide.</p>
                </div>
            </div>
        ) ) }
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
/* Use of this:
  <SliderCarousel interval={3000} effect_name="simply-carousel" /> -->regular carousel
  <SliderCarousel interval={5000} effect_name="flash-fade" />      -->carousel flash fade
  <SliderCarousel interval={4000} effect_name="smooth-fade" />     -->smooth fade
*/