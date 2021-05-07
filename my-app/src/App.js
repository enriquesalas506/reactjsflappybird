import logo from './logo.svg';
import './App.css';
import Sketch from "react-p5";
import React from "react";
import {Bird} from "./Bird";
import {Pipes} from "./Pipes";
import * as tf from '@tensorflow/tfjs';


function App() {



    let x = 50;
    let y = 50;
    let bird;


    let pipes = [];


    const createPipe = (p5) =>{




        let pipe = new Pipes(p5,1000,1000);
        pipes.push(pipe);


    }


    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(1000, 1000).parent(canvasParentRef);

       bird = new Bird(p5,100,0);


        setInterval(()=>{
            createPipe(p5)
        }, 2000);


        window.addEventListener("click",() =>{


         //   bird.goUp();

        })


    };




    const draw = (p5) => {


        p5.background(0);


        for (let x = 0; x < pipes.length;x++){

            let pipe = pipes[x];
            pipe.update();

            if (pipe.x < 0){

                console.log("DELETEING PIPE");
                //remove from array
               pipes.splice(x,1);
               pipe = null;

            }

        }

        if (pipes.length > 0){


            bird.think(pipes[0]);
            bird.hits(pipes[0]);


        }


        bird.update();


    };





    return (
    <div className="App">
      <header className="App-header">



          <Sketch setup={setup} draw={draw} />



      </header>
    </div>
  );
}

export default App;
