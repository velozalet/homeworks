import React from "react";

interface DescriptionProps {
    value:string;
    onChange:(e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function __Description({ value,onChange }: DescriptionProps) {
	return (
    <div className="col-12">
        <textarea
            className="form-control"
            rows={3}
            name="description"
            value={value || ""}
            onChange={onChange}
            placeholder="Description"
            required
        ></textarea>
    </div>
    );
}
