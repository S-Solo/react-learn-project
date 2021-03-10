import React, { Component } from 'react';
import AppRoutes from 'routes/AppRoutes';
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router } from 'react-router-dom';
import Header from 'components/Header/Header';
import AppContextProvider from 'context/AppContextProvider';

import 'react-toastify/dist/ReactToastify.css';
export class App extends Component {

  render() {
    return (
      <div>
        <AppContextProvider>
          <Router>
            <Header />
            <AppRoutes />
          </Router>
        </AppContextProvider>
        <ToastContainer
          position="bottom-right"
          className="app-toast-container"
        />
      </div>
    )
  }
}

export default App;
