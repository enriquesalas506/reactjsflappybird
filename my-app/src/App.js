import logo from './logo.svg';
import './App.css';
import Sketch from "react-p5";
import React from "react";
import {Bird} from "./Bird";
import {Pipes} from "./Pipes";
import * as tf from '@tensorflow/tfjs';
import Game from "./Game";


function App() {






    return (
    <div className="App">
      <header className="App-header">



         <Game></Game>


      </header>
    </div>
  );
}

export default App;
