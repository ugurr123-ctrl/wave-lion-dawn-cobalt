import React from 'react';
import { createRoot } from 'react-dom/client';
import App from '../src/flora/App';
import './styles.css';

function MobileApp() {
  React.useEffect(() => {
    document.getElementById('floria-loading')?.remove();
  }, []);
  return <App />;
}

createRoot(document.getElementById('root')!).render(<MobileApp />);
