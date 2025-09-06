import React from "react";
import { Link } from 'react-router-dom';

interface CarItem {
    img: string;
    text: string;
}
interface SliderCarouselNewCarsContentProps {
    cars: CarItem[];
}

const SliderCarouselNewCarsContent = ( {cars }: SliderCarouselNewCarsContentProps ) => {
    //helper: chunk array into groups of `size`
    function chunkArray<T>(arr: T[], size: number): T[][] {
        return arr.reduce((acc: T[][], _, i) => {
            if (i % size === 0) acc.push(arr.slice(i, i + size));
            return acc;
        }, []);
    }
    const grouped = chunkArray(cars, 3); 

    return (
    <>
    {/*Slides*/}
    <div className="carousel-inner">
    {grouped.map((group, slideIndex) => (
        <div key={slideIndex} className={`carousel-item ${slideIndex === 0 ? "active" : ""}`}>
            <div className="d-flex justify-content-center gap-3">
                {group.map((item, index) => (
                <div key={index} className="text-center">
                    <Link className="" to="/new-cars">
                        <img
                        src={item.img}
                        alt={item.text}
                        className="d-block"
                        style={{ width:"100%", height:"auto" }} 
                        />
                    </Link>
                    <h6 className="mt-2 text-warning">– {item.text}</h6> 
                </div>
                ))}
            </div>
        </div>
    ))}
    </div>
    {/*__/Slides*/}
    </>
    );
};
export default SliderCarouselNewCarsContent;