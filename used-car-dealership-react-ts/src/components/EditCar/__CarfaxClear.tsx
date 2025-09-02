import React from "react";

interface CarfaxClearProps {
    value:string;
    onChange:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function __CarfaxClear({ value,onChange }: CarfaxClearProps) {
	return (
    <div className="form-check">
        <input
            type="checkbox"
            className="form-check-input"
            id="carfaxClear"
            name="carfaxClear"
            checked={value || ""}
            onChange={onChange}
        />
        <label htmlFor="carfaxClear" className="form-check-label text-black">Carfax Clear</label>
    </div>
    );
}
