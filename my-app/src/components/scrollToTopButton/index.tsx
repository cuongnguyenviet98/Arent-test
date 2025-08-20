import React, { useState, useEffect } from 'react';
import "./styles.scss";
import { ScrollIcon } from '../../static/image/svg';

interface ScrollToTopButtonProps {
  className?: string;
}

const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({ className = "scroll-to-top-button" }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={className}>
      {isVisible && (
        <img onClick={scrollToTop} src={ScrollIcon} alt="Scroll Icon" />
      )}
    </div>
  );
};

export default ScrollToTopButton;
