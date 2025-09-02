import React from "react";

interface OneOwnerProps {
    value:string;
    onChange:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function __OneOwner({ value,onChange }: OneOwnerProps) {
	return (
    <div className="form-check">
        <input
            type="checkbox"
            className="form-check-input"
            id="oneOwner"
            name="oneOwner"
            checked={value || ""}
            onChange={onChange}
        />
        <label htmlFor="oneOwner" className="form-check-label text-black">One Owner</label>
    </div>
    );
}
