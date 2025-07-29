import { useEffect } from 'react';

const useScrollRestoration = () => {
  useEffect(() => {
    const saveScroll = () => {
      sessionStorage.setItem('scrollY', window.scrollY.toString());
    };
    window.addEventListener('beforeunload', saveScroll);
    return () => window.removeEventListener('beforeunload', saveScroll);
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem('scrollY');
    if (saved) {
      window.scrollTo({ top: parseInt(saved, 10), behavior: 'auto' });
    }
  }, []);
};

export default useScrollRestoration;
