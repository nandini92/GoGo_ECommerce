import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { CartProvider } from './components/contexts/CartContext';
import { DataProvider } from "./components/contexts/DataContext";
import {SignInProvider} from "./components/contexts/SignInContext";

ReactDOM.render(
  <React.StrictMode>
    <SignInProvider>
    <DataProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </DataProvider>
    </SignInProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
