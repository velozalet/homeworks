import React from "react";

interface NoAccidentProps {
    value:string;
    onChange:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function __NoAccident({ value,onChange }: NoAccidentProps) {
	return (
    <div className="form-check">
        <input
            type="checkbox"
            className="form-check-input"
            id="noAccident"
            name="noAccident"
            checked={value || ""}
            onChange={onChange}
        />
        <label htmlFor="noAccident" className="form-check-label text-black">No Accident</label>
    </div>
    );
}
