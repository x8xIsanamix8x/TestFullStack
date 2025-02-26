import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router';
import { Provider } from 'react-redux';
import store from './store/store';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </React.StrictMode>
  );
}