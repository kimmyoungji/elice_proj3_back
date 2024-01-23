import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from '@components/store';
import { ToastProvider } from '@components/UI/Toast';
import { ErrorBoundary } from 'react-error-boundary';
import Error from '@components/error/Error';
import { QueryClient, QueryClientProvider } from 'react-query';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 20 * 60 * 1000, //20분
      retry: 1,
      retryDelay: 0,
    },
  },
});

root.render(
  <ErrorBoundary fallback={<Error />}>
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <BrowserRouter>
          <Provider store={store}>
            <App />
          </Provider>
        </BrowserRouter>
      </ToastProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);
