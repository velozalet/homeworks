import { useEffect, useState } from 'react';

//Components:
import Button from '../../components/Button/Button';
//Styles:
import './ScrollUpButton.css';

function ScrollUpButton() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
          const scrollPosition = window.scrollY + window.innerHeight;
          const pageHeight = document.documentElement.scrollHeight;
          // Show button if within 150px of the bottom
          setShow(scrollPosition >= pageHeight - 150);
        };
        window.addEventListener('scroll', handleScroll);

        return ()=> { //--> UNMOUNTS
          window.removeEventListener('scroll', handleScroll);
        }
      }, []);

    const scrollToTop = ()=> { window.scrollTo({ top: 0, behavior:"smooth"}); };
  
    if (!show) return null;

    return (
    <Button as="span" onClick={scrollToTop} className="scroll-top-btn" text="">
        <i className="fa fa-arrow-circle-o-up"></i>
    </Button>
    );
}
export default ScrollUpButton;