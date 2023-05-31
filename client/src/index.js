import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import { Provider } from "react-redux";
import store from "./app/store";
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="403714864826-r8i18vce3ula259ahfq7g12i9trgctf7.apps.googleusercontent.com">
    <BrowserRouter>
      <GlobalStyle>
        <App />
      </GlobalStyle>
    </BrowserRouter>
    </GoogleOAuthProvider>;
  </Provider>
);
