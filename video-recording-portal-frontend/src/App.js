import React from "react";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Routes from './routing/Routes';
import store, {persistor} from './store';

if (document.getElementsByName("csrfmiddlewaretoken")[0]) {
  axios.defaults.headers.common['X-CSRFToken'] = document.getElementsByName("csrfmiddlewaretoken")[0].value;
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <Routes />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
