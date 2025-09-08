import React, { useEffect, useRef } from "react";

import nouislider from "nouislider";
import "nouislider/dist/nouislider.css";

import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store/store";
import { selectPrice } from "../../store/carsSlice";


function FilterPrice(){ 
    const dispatch = useDispatch<AppDispatch>();
    const sliderRef = useRef<HTMLDivElement>(null);
    const sliderInstance = useRef<nouislider.API>(null);

    const selectedPrice = useSelector((state: RootState) => state.cars.selectedPrice); 

    useEffect(() => {
        if (!sliderRef.current) return;
    
        const slider = nouislider.create(sliderRef.current, {
            start: [15000, 70000], //initial min & max
            connect: true,
            step: 1000,
            range: {
            min: 15000,
            max: 70000,
            },
            tooltips: [true, true], //show tooltips for both handles
            format: {
            to: (value:number) => `$${Math.round(value).toLocaleString()}`,
            from: (value:string) => Number(value.replace(/\$|,/g, "")),
            },
        });

        sliderInstance.current = slider;
        slider.on("update", (values) => {
            const [min, max] = values.map((v) =>
            Number(v.toString().replace(/\$|,/g, ""))
            );
            dispatch(selectPrice({ min, max }));
        });
    
        return () => {
            slider.destroy();
        };
    }, [dispatch]);

    //reset UI when Redux clears selectedPrice
    useEffect(() => {
        if (selectedPrice === null && sliderInstance.current) {
            sliderInstance.current.set([15000, 70000]);
        }
    }, [selectedPrice]);


    return(
    <div className="mt-3 text-center">
        <label className="form-label text-center">Price ($)</label>
        <div ref={sliderRef} />
    </div>
    );
}
export default FilterPrice; 