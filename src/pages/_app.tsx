import React from 'react';
// import ChatPopup from '@/components/ChatPopup';
import { useLocation } from 'react-router-dom';

function MyApp({ Component, pageProps }) {
  const location = useLocation();
  const isContentManager = location.pathname.toLowerCase().includes('blogadmin');
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp; 