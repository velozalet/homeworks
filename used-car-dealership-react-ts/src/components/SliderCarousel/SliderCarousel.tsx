import React from 'react'; 
import {useEffect} from 'react';
import type {ReactNode} from 'react';

//Styles:
import './SliderCarousel.css';

//Define props
type SliderCarouselProps = {
  id?: string; //ID of slider
  interval?: number; //autoplay delay in ms
  effect_name?: "simply-carousel"|"flash-fade"|"smooth-fade"; //effect type depends on the set of classes
  children: ReactNode; //Content component
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

const SliderCarousel = ( {id, interval=5000, effect_name="simply-carousel", children}: SliderCarouselProps )=> {
  useEffect(() => {
    //Carousel will auto-init via Bootstrap data attributes
  }, []);

    //Choose className based on `effect name`
    let carouselClass = '';
    if( effect_name === "simply-carousel" ){ carouselClass = "carousel slide";
    }else if( effect_name === "flash-fade" ){ carouselClass = "carousel carousel-fade";
    }else if(effect_name === "smooth-fade"){ carouselClass = "carousel slide carousel-fade";
    }else{ carouselClass = 'carousel slide'; }

  return (
    <div
      id={id}
      className={carouselClass}
      data-bs-ride="carousel" 
      data-bs-interval={interval}
      data-bs-pause="false"
      data-bs-keyboard="false" 
      data-bs-wrap="true"
      data-bs-touch="true">

        {children}

        {/*Navigation buttons*/}
        <button
        className="carousel-control-prev"
        type="button"
        data-bs-target={`#${id}`}
        data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button
        className="carousel-control-next"
        type="button"
        data-bs-target={`#${id}`}
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

    <SliderCarousel interval={4000} effect_name="flash-fade">
        <SliderCarouselMainContent />
    </SliderCarousel>

    <SliderCarousel interval={5000} effect_name="smooth-fade">
        <SliderCarouselTestimonialsContent />
    </SliderCarousel>
*/