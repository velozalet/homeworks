import React, { useState } from "react";

interface MaskedInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { mask: string; } //e.g. "(999) 999-9999"

const MaskedInput: React.FC<MaskedInputProps> = ({ mask, onChange, ...rest }) => {
  const [value, setValue] = useState("");

  const applyMask = (raw: string) => {
    let masked = "";
    let rawIndex = 0;

    for (let i = 0; i < mask.length; i++) {
      const maskChar = mask[i];
      const rawChar = raw[rawIndex];

      if (!rawChar) break;

      if (maskChar === "9") {
        if (/\d/.test(rawChar)) {
          masked += rawChar;
          rawIndex++;
        } else {
          rawIndex++; // skip invalid
          i--; // retry mask slot
        }
      } else {
        masked += maskChar;
        if (rawChar === maskChar) rawIndex++;
      }
    }

    setValue(masked);
    return masked;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const masked = applyMask(e.target.value);
    if (onChange) {
      onChange({ ...e, target: { ...e.target, value: masked } });
    }
  };

  return (
    <input
      {...rest}
      value={value}
      onChange={handleChange}
      maxLength={mask.length}
    />
  );
};
export default MaskedInput;