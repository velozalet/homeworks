import React from "react";

interface VinProps {
    value:string;
    onChange:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function __Vin({ value,onChange }: VinProps) {
	return (
    <div className="col-md-4">
        <label className="form-label text-black">VIN</label>
        <input 
        type="text" 
        name="vin" 
        className="form-control" 
        placeholder="VIN" 
        value={value || ""}
        onChange={onChange}
        required
        />
    </div> 
    );
}
