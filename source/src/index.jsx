import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App";
import "./index.css";
import { initializeFirebaseListeners } from "./firebase/firebaseMiddleware";

// Initialize Firebase listeners
const cleanup = initializeFirebaseListeners(store);

// Create root element
const container = document.getElementById("root");
const root = createRoot(container);

// Render app
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// Cleanup Firebase listeners when the app unmounts
if (import.meta.hot) {
  import.meta.hot.dispose(cleanup);
}
