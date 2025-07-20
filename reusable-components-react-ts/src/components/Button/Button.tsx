import React, {forwardRef} from 'react';

import './Button.css';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & { 
    as?: keyof JSX.IntrinsicElements; //JSX.IntrinsicElements is a built-in TS type that contains all standard HTML tag names 'div','span','a','button','form',etc...
    size?: 'sm' | 'lg'; //Add a size prop to Button (sm,lg)
};

function Button(props: ButtonProps){
    const { as = 'button', href, className, onClick, children, size, ...rest } = props;

    //Combine className + size
    let sizeClass = size ? size : '';
    let fullClassName = (className + ' ' + sizeClass).trim(); // const fullClassName = `${className} ${size ?? ''}`.trim();
        
    if(as === 'a'){ 
        return( <a href={href} className={fullClassName} onClick={onClick} {...rest}>{children} </a> );
    }else if(as === 'div'){ 
        return( <div className={fullClassName} onClick={onClick} {...rest}>{children}</div> );
    }else if(as === 'span'){ 
        return( <span className={fullClassName} onClick={onClick} {...rest}>{children}</span>);
    }else{ 
        return( <button className={fullClassName} onClick={onClick} {...rest}>{children}</button> ); 
    }
} //function Button()
export default Button;