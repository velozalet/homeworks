import React from "react";
import { carYears } from "../../constants/carYears"; //Array of numbers with car's Years


interface YearProps {
    value:number | "";
    onChange:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function __Year({ value,onChange }: YearProps) {
    //-->Get list of Years
    const car_years = carYears; //-->[2025, 2024, 2023, 2022, 2021, 2020]

	return (
    <div className="col-md-4">
        <label className="form-label text-black">Year</label> 
        <select
            className="form-select"
            name="year"
            value={value || ""}
            onChange={onChange}
        >
        {car_years.map( (year, index, array) => (
            <option key={year} value={year}>{ year }</option>
        ))}
        </select> 
    </div>
    );
} 
