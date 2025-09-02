import React from "react";
import { capitalize } from "../../utils/helpers";

interface PriceProps {
    value:string;
    onChange:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function __Price({ value,onChange }: PriceProps) {

	return (
    <div className="col-md-4">
        <label className="form-label text-black">Price($)</label>
        <input
        type="text"
        className="form-control"
        name="price"
        placeholder="Price" 
        value={value || ""}
        onChange={onChange}
        required
        />
    </div>
    );
}
