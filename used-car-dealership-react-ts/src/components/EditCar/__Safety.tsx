import React from "react";

interface SafetyProps {
    safety: string[];
    safetyInput: string;
    setSafetyInput: (value: string) => void;
    addSafety: () => void;
    removeSafety: (index: number) => void;
}

export default function __Safety({ safety, safetyInput, setSafetyInput, addSafety, removeSafety }: SafetyProps) {
	return (
    <div className="col-12">
        <div className="d-flex">
            <input
                type="text"
                className="form-control"
                placeholder="Add Safety"
                value={safetyInput}
                onChange={(e) => setSafetyInput(e.target.value)}
                onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addSafety())
                }
            />
            <button
                type="button"
                className="btn btn-secondary btn-sm ms-2"
                onClick={addSafety}
            >+</button>
        </div>
        <div className="mt-2 d-flex flex-wrap gap-2">
        {safety.map((item, index) => (
            <span
            key={index}
            className="badge bg-secondary p-2"
            style={{ cursor: "pointer" }}
            onClick={() => removeSafety(index)}
            >{item}✕</span>
        ))}
        </div>
    </div>
    );
}
