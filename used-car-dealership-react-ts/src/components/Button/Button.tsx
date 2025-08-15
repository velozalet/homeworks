import React from 'react';

//import './Button.css';

type ButtonProps = {
  as?: 'button' | 'a' | 'div' | 'span'; // Only allow tags  'a', 'div', 'span'
  href?: string; //For only <a> tag
  text: string;
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset'; //Only relevant for <button>
  onClick?: ()=> void;
  children: React.ReactNode;
};

const Button: React<ButtonProps> = ({
    as = 'button',
    href,
    text='Default Btn Text',
    className = 'btn',
    disabled = false,
    type = 'button', //Default button type
    onClick,
    children,
}) => {
    switch (as){ 
        case 'a':
        return(
            <a href={disabled ? undefined : href} className={`${className}`}  onClick={onClick}>{children || text}</a>
        );
        case 'button':
        return(
            <button type="button" disabled={disabled}  className={`${className}`} onClick={onClick}>{children || text}</button>
        );
        case 'div':
        return (
            <div className={`${className}`} onClick={!disabled ? onClick : undefined}>{children || text}</div>
        );
        case 'span':
        return (
            <span className={`${className}`} onClick={!disabled ? onClick : undefined}>{children || text}</span>
        );
        default: return null;
    } //End switch
};
export default Button;

/* Example Usage:
<Button as="button" text="Submit Form" type="submit" />
<Button as="button" text="Reset Form" type="reset" />

 <Button 
    as="button" 
    className="btn btn-yellow px-4 py-2 rounded" 
    text="View Details" 
    type="submit"
    onClick={(e) => {e.preventDefault();}}
 ></Button>

 <Button as="a" href="/cars" text="Cars Link" />
*/