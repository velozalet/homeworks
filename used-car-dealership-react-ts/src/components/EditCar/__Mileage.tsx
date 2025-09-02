import React from "react";

interface MileageProps {
    value:string;
    onChange:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function __Mileage({ value,onChange }: MileageProps) {
	return (
    <div className="col-md-4">
        <label className="form-label text-black">Mileage</label>
        <input 
        type="text" 
        name="mileage" 
        className="form-control" 
        placeholder="Mileage" 
        value={value || ""}
        onChange={onChange}
        />
    </div> 
    );
}
