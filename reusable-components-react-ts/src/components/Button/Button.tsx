import React, {forwardRef} from 'react';

import './Button.css';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & { 
    as?: keyof JSX.IntrinsicElements; //JSX.IntrinsicElements is a built-in TS type that contains all standard HTML tag names 'div','span','a','button','form',etc...
};

function Button(props: ButtonProps){
    const { as = 'button', href, className, onClick, children, ...rest } = props;
    
    if(as === 'a'){ 
        return( <a href={href} className={className} onClick={onClick} {...rest}>{children} </a> );
    }else if(as === 'div'){ 
        return( <div className={className} onClick={onClick} {...rest}>{children}</div> );
    }else if(as === 'span'){ 
        return( <span className={className} onClick={onClick} {...rest}>{children}</span>);
    }else{ 
        return( <button className={className} onClick={onClick} {...rest}>{children}</button> ); 
    }
} //function Button()
export default Button;