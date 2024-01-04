import { Fab, Grid } from '@mui/material';
import { useEffect, useState } from 'react';

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { FadeIn } from 'react-slide-fade-in';

interface ScrollToTopButtonProps {}

const ScrollToTopButton = ({}: ScrollToTopButtonProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', function (e) {
      toggleVisibility();
    });
  }, []);

  function toggleVisibility() {
    if (window.scrollY > 1000) {
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
        <FadeIn from='bottom' positionOffset={200} triggerOffset={200} delayInMilliseconds={0}>
          <Grid container justifyContent='center'>
            <Fab
              aria-label='up'
              sx={{ backgroundColor: '#D4D4D4', opacity: 0.4 }}
              onClick={scrollToTop}
            >
              <KeyboardArrowUpIcon sx={{ fontSize: 40 }} />
            </Fab>
          </Grid>
        </FadeIn>
      )}
    </div>
  );
};

export default ScrollToTopButton;
