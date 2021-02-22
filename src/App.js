import React, { Component } from 'react';
import AppRoutes from 'routes/AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from 'components/Header/Header';
export class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <AppRoutes />
      </Router>
    )
  }
}

export default App;
