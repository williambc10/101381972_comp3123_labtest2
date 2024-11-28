import { BrowserRouter, Routes, Route} from "react-router-dom";
import {Component} from 'react';
import Weather from "./components/Weather";

export default class App extends Component {
  render() {
    return (
      <div className="App">
            <BrowserRouter>
                <Routes>
                  <Route path="/weather" element={<Weather/>} />
                </Routes>
            </BrowserRouter>
      </div>
    );
  }
}

