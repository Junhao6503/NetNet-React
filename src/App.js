import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Component/Header';
import React, { Component } from 'react';
// import axios from 'axios'
import Layout from './Component/Layout';
import Graph from './Component/Graph';
import Axios from 'axios';
class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            {/* <Header /> */}
            <Layout />
            {/* <Graph myGraph={this.state} /> */}
          </div>
        </div>
      </Router>

    );
  }
}


export default App;