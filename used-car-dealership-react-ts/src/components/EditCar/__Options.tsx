import React from "react";

interface OptionsProps {
    options: string[];
    optionInput: string;
    setOptionInput: (value: string) => void;
    addOption: () => void;
    removeOption: (index: number) => void;
}

export default function __Options({ options, optionInput, setOptionInput, addOption, removeOption }: OptionsProps) {
	return (
    <div className="col-12">
        <div className="d-flex">
            <input
                type="text"
                className="form-control"
                placeholder="Add Option"
                value={optionInput}
                onChange={(e) => setOptionInput(e.target.value)}
                onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addOption())
                }
            />
            <button
                type="button"
                className="btn btn-secondary btn-sm ms-2"
                onClick={addOption}
            >+</button>
        </div>
        <div className="mt-2 d-flex flex-wrap gap-2">
        {options.map((item, index) => (
            <span
            key={index}
            className="badge bg-secondary p-2"
            style={{ cursor: "pointer" }}
            onClick={() => removeOption(index)}
            >{item}✕</span>
        ))}
        </div>
    </div>
    );
}
