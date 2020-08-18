import React, { Component } from 'react';
import './App.css';

import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

//Pages
import MainPage from "./pages";
import RecognizePage from "./pages/recognize";
import UploadPage from "./pages/upload";

class App extends Component {

  render() {
    return <Router>
      <Switch>
         <Route exact path="/" component={MainPage} />
         <Route exact path="/recognize" component={RecognizePage} />
         <Route exact path="/upload" component={UploadPage} />
         <Redirect to="/" />
         </Switch>
    </Router>
  }
}

export default App;