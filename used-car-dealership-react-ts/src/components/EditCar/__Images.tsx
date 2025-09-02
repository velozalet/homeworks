import React from "react";

interface ImagesProps {
    images: string[];
    addImage: (file: File) => void;
    removeImage: (index: number) => void;
}

export default function __Images({ images, addImage, removeImage }: ImagesProps) {
	return (
    <div className="col-12">
        <div className="d-flex">
            <input
                type="file"
                accept="image/*"
                className="form-control"
                placeholder="Add Image"
                onChange={ (e) => {
                    if (!e.target.files?.length) return;
                    addImage(e.target.files[0]);
                }}
            />
        </div>
        <div className="mt-2 d-flex flex-wrap gap-2">
            {images.map((item, index) => ( 
            <span
                key={index}
                className="badge bg-secondary p-2"
                style={{ cursor: "pointer" }}
                onClick={() => removeImage(index)}
            >{item}✕</span>
            ))}
        </div> 
    </div>
    );
}
