import React from "react";

const SlidesArray = [
    {
        text: 'Great service and amazing selection! I found my dream car here after weeks of searching elsewhere without success. The team was patient, knowledgeable, and made me feel confident.',
        person: 'John Bow'
    },
    {
        text: 'Professional staff and great prices. I was impressed by how transparent they were about every detail of the process. From the moment I walked in, I felt welcomed and valued as a customer.',
        person: 'Sarah Lee'
    },
    {
        text: 'Smooth buying process and excellent after-sale support. They guided me through all the paperwork quickly and without stress. Even after the purchase, they followed up to make sure I was fully satisfied.',
        person: 'Michael Green'
    },
    {
        text: 'Incredible experience from beginning to end! The selection of vehicles was outstanding, and I never felt pressured to make a decision. Their honest advice helped me choose the perfect car for my lifestyle.',
        person: 'Emily White'
    },
    {
        text: 'The dealership exceeded my expectations in every way. The staff truly listened to my needs and worked hard to find the right match. I got both a great car and a great deal.',
        person: 'Chris Evans'
    },
    {
        text: 'Top-notch service and an unbeatable atmosphere. Every step, from the test drive to signing the final paperwork, was handled with professionalism and care.',
        person: 'Linda Black'
    }
];//console.log(SlidesArray.length);


const SliderCarouselMainContent = ()=>{
  return (
    <>
      {/* Indicators */}
      <div className="carousel-indicators d-none d-sm-flex">
        { SlidesArray.map( (item,index,array) => (
          <button
            key={index}
            type="button"
            data-bs-target="#slider_testimonials"
            data-bs-slide-to={index}
            aria-label={`Slide ${index + 1}`}
            aria-current={index === 0 ? "true" : undefined}
            className={index === 0 ? "active" : ""}
          ></button>
        ) ) }
      </div>
      {/*__/Indicators/dots */}

    {/* <div className="col-md-4">
        <div className="testimonial-card">
            <p>"Great service and amazing selection! I found my dream car here."</p>
            <h6 className="mt-3 text-warning">– Sarah J.</h6>
        </div>
    </div> */}
      {/*Slides*/}
      <div className="carousel-inner">
        { SlidesArray.map( (item,index,array) => (
          <div key={index} className={`carousel-item ${index === 0 ? " active" : ""}`}>
            <div className="carousel-caption d-none d-sm-block"> 
                <blockquote>
                    <i className="fa fa-quote-left pe-2"></i>{item.text}<i className="fa fa-quote-right ps-2"></i>
                </blockquote>
                <h6 className="mt-3 text-warning">– {item.person}</h6>
            </div>
          </div>
        ))}
      </div>
      {/*__/Slides*/}
    </>
  );
};
export default SliderCarouselMainContent;