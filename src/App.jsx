import * as React from 'react';
import "./index.css";
import Navbar from "./components/Navbar"
import LeftMenu from "./components/LeftMenu"
import RightSide from "./components/RightSide"

function App() {
  return (
    <div className="text">
      <Navbar />
      <div className="flex justify-between">
      <LeftMenu/>
      <RightSide />
      </div>
    </div>
  );
}

export default App;