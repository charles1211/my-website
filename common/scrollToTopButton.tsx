import { Fab, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface ScrollToTopButtonProps {}

const ScrollToTopButton = ({}: ScrollToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', function (e) {
      toggleVisibility();
    });
  }, []);

  function toggleVisibility() {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div className='scroll-to-top'>
      {isVisible && (
        <Grid container justifyContent='center'>
          <Fab aria-label='up' sx={{ backgroundColor: '#D4D4D4' }} onClick={scrollToTop}>
            <KeyboardArrowUpIcon sx={{ fontSize: 40 }} />
          </Fab>
        </Grid>
      )}
    </div>
  );
};

export default ScrollToTopButton;
