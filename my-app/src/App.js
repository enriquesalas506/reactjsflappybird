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

    var highscore = 0;
    var evolution = 0;

    var bestBrain = null;



    let pipes = [];

    let counter = 0;


    const createPipe = (p5) =>{


        let pipe = new Pipes(p5,1000,1000);
        pipes.push(pipe);


    }


    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(1000, 1000).parent(canvasParentRef);

       bird = new Bird(p5,100,0);



        window.addEventListener("click",() =>{


         //   bird.goUp();

        })


    };




    const draw = (p5) => {


        p5.background(0);

        if (counter % 30 ==0){

            createPipe(p5);
        }

        counter++;

        for (let x = 0; x < pipes.length;x++){

            let pipe = pipes[x];
            pipe.update();

            if (pipe.x < 0){

              //  console.log("DELETEING PIPE");
                //remove from array
               pipes.splice(x,1);
               pipe = null;



            }

        }

        if (pipes.length > 0){


            bird.think(pipes[0]);
            bird.hits(pipes[0]);

            if (bird.dead == true){


                console.log("BIRD FITNESS "+bird.fitness+" Highscore "+highscore);
                if (bird.fitness > highscore){
                    //HIGHLY SELECTED BIRD

                    bestBrain = bird.brain.copy();

                    highscore = Math.max(bird.fitness,highscore);
                    evolution = evolution+1;

                    bird = new Bird(p5,100,500,bestBrain);



                }else{


                    bird.brain.mutate(0.1,p5);

                    bird = new Bird(p5,100,500,bestBrain);


                }

                resetGame(p5);





            }


        }


        bird.update();


    };


    const resetGame =(p5) =>{

        console.log("RESET GAME");

        pipes = null;
        pipes = [];


    }




    return (
    <div className="App">
      <header className="App-header">



          <Sketch setup={setup} draw={draw} />



      </header>
    </div>
  );
}

export default App;
