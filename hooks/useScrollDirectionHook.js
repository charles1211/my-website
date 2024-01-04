import React, { useEffect, useRef, useReducer } from 'react';

const reducers = (state, { type }) => {
  if (!type) {
    return '';
  }

  const actions = {
    up() {
      return 'up';
    },
    down() {
      return 'down';
    },
  };

  return actions[type]();
};

const useScrollDirectionHook = (elementRef) => {
  const scrollYPos = useRef();
  const [scrollDirection, scrollDispatch] = useReducer(reducers, 'up');

  useEffect(() => {
    scrollYPos.current = window.scrollY;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > scrollYPos.current) {
        if (elementRef?.current && scrollDirection === 'up') {
          elementRef.current.style.willChange = 'transform';
        }
        scrollDispatch({ type: 'down' });
      } else {
        if (elementRef?.current && scrollDirection === 'down') {
          elementRef.current.style.willChange = 'transform';
        }
        scrollDispatch({ type: 'up' });
      }
      scrollYPos.current = window.scrollY;
    };

    const handleScrollEnd = () => {
      if (elementRef?.current) {
        elementRef.current.style.willChange = 'auto';
      }
    };
    document.addEventListener('scroll', handleScroll);
    document.addEventListener('scrollend', handleScrollEnd);
    return () => {
      document.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scrollend', handleScrollEnd);
    };
  }, []);

  const handlerOnTransitionEnd = () => {
    if (elementRef?.current) {
      elementRef.current.style.willChange = 'auto';
    }
  };

  return [scrollDirection, handlerOnTransitionEnd];
};

export default useScrollDirectionHook;
