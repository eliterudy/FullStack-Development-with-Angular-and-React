import React, { useState } from "react";
import "./App.css";
import { Main as MainComponent } from "./components/index";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/configureStore";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <MainComponent />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
