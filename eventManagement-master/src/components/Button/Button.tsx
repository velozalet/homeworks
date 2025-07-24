import type { PropsWithChildren } from "react";
import classes from "./Button.module.css";
import createClassName from "../../utils/createClassName";

type ButtonProps<T extends React.ElementType> = {
  as?: T;
  variant?: "solid" | "outline";
  disabled?: boolean; //New
} & React.ComponentPropsWithRef<T>;

export default function Button<T extends React.ElementType = "button">({
  ref,
  children,
  as = "button",
  variant = "solid",
  disabled = false, //New
  ...props
}: PropsWithChildren<ButtonProps<T>>) {
  const Component = as as React.ElementType;

  const { className, ...remainingProps } = props;

  const btnClasses = createClassName(
    className,
    classes.btn,
    variant === "solid" ? classes.solid : classes.outline,
    disabled ? classes.disabled : ""  //New
  );

  return (
    <Component 
    ref={ref} 
    className={btnClasses} 
    {...(as === "button" ? { disabled } : {})} //New 
    aria-disabled={as !== "button" ? disabled : undefined} //New
    {...remainingProps}>
      {children}
    </Component>
  );
}
