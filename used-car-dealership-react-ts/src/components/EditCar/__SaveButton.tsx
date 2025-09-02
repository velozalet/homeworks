import React from "react";

interface SaveButtonProps {
    loading: boolean;
}

export default function __SaveButton({ loading }: SaveButtonProps) {
	return (
    <div className="col-12 text-center pb-5">
        <button type="submit" className="btn btn-success" disabled={loading}>{loading ? "Saving..." : "Save Car"}</button>
    </div>
    );
}
