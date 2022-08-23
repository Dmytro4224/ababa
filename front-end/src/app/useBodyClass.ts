import { useEffect } from 'react';

export const useFullBg = () => {
  useEffect(() => {
    document.body.classList.remove('top');
    document.body.classList.add('full');
  }, []);
}

export const useTopBg = () => {
  useEffect(() => {
    document.body.classList.remove('full');
    document.body.classList.add('top');
  }, []);
}

