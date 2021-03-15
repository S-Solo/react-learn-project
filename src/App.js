import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AppRoutes from 'routes/AppRoutes';
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from 'components/Header/Header';
import AppContextProvider from 'context/AppContextProvider';
import { store } from 'reducers';

import 'react-toastify/dist/ReactToastify.css';
export class App extends Component {
  render() {
    return (
      <div>
        <Provider store={store}>
          <AppContextProvider>
            <Router>
              <Header />
              <AppRoutes />
            </Router>
          </AppContextProvider>
        </Provider>
        <ToastContainer
          position="bottom-right"
          className="app-toast-container"
        />
      </div>
    )
  }
}

export default App;
