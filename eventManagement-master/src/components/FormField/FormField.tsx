import { useRef, useState } from "react";
import createClassName from "../../utils/createClassName";

import classes from "./FormField.module.css"; 

type SelectOption = {
  value: string | number;
  label: string;
};

type CommonProps = {
  label: string;
  type?: "input" | "select";
  options?: SelectOption[]; // Only for <select>
} & React.ComponentPropsWithoutRef<"input"> &
  React.ComponentPropsWithoutRef<"select">;

export default function FormField({
  label,
  type = "input",
  options = [],
  ...props
}: CommonProps) {
  const inputRef = useRef<HTMLInputElement | HTMLSelectElement>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    className,
    onBlur,
    placeholder,
    id,
    name,
    required,
    ...remainingProps
  } = props;

  const onBlurHandler = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onBlur?.(e);

    const input = inputRef.current;
    if (!input) return;

    setErrorMessage(input.checkValidity() ? "" : input.validationMessage);
  };

  return (
    <div className={createClassName(className, classes.input_container)}>
      {type === "input" ? (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          id={id ?? label}
          name={name ?? label}
          placeholder={placeholder ? " " : " "}
          onBlur={onBlurHandler}
          className={createClassName(
            classes.input,
            errorMessage && classes.has_error
          )}
          required={required}
          {...remainingProps}
        />
      ) : (
        <select
          ref={inputRef as React.RefObject<HTMLSelectElement>}
          id={id ?? label}
          name={name ?? label}
          onBlur={onBlurHandler}
          required={required}
          {...remainingProps}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      )}

      <label htmlFor={id ?? label}>
        {label} {required && "*"}
      </label>

      {errorMessage && <span>{errorMessage}</span>}
    </div>
  );
}