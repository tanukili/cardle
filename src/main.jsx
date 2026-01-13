import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "material-symbols";
import "./assets/index.scss";
// import 'bootstrap/dist/js/bootstrap.min.js';
import { Provider } from "react-redux";
import { store } from "./store/index";

import "./assets/index.scss";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
