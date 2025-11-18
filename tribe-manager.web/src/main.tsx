import { Provider } from '@/components/ui/provider';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '@/store';

import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ReduxProvider>
  </StrictMode>,
);
