import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import NumberPage from './AvgCals';


function App() {


  return (
    <div className="App position-absolute top-10 start-50 translate-middle">
      <header className="App-header">
        <h1>Average Calculator</h1>
        <NumberPage />
      </header>
    </div>
  );
}

export default App
