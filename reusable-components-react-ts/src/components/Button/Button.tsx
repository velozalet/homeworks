import React, {forwardRef} from 'react';

import './Button.css';

/*Define prop types for polymorphic components */ 
type ButtonProps = React.ComponentPropsWithoutRef<'button'> & { 
    as?: keyof JSX.IntrinsicElements; 
  };


function Button(props: ButtonProps) {
    const { as = 'button', href, onClick, children, ...rest } = props;
    //If as is 'a', render an <a> tag
    if (as === 'a') {
      return (
        <a href={href} onClick={onClick} {...rest} className="btn-example">
          {children}
        </a>
      );
    }
    //Otherwise, render a <button>
    return (
      <button onClick={onClick} {...rest} className="btn-example">
        {children}
      </button>
    );
} //function Button()
/*OR: 
    function Button(props: ButtonProps) {
    const { as = 'button', href, onClick, children, ...rest } = props;
    const Component = as; //Component is a variable that refers to a JSX tag ('button', 'a', 'div', etc.).

    return (
        <Component href={href} onClick={onClick} {...rest} className="btn-example">
            {children}
        </Component>
    );
    }
*/
export default Button;