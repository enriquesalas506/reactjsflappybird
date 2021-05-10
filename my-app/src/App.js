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
    let birds = [];

    var highscore = 0;
    var evolution = 0;

    var bestBrain = null;



    let pipes = [];
    let counter = 0;

    let canvasX = 1000;
    let canvasY = 1000;

    const createPipe = (p5) =>{


        let pipe = new Pipes(p5,canvasX,canvasY);
        pipes.push(pipe);


    }


    const setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(canvasX, canvasY).parent(canvasParentRef);


        p5.frameRate(30);


        window.addEventListener("click",() =>{


         //   bird.goUp();

        })

        buildBirds(10);


    };



    const buildBirds = (total) =>{

        for (let x = 0; x < total; x++){


           let randomY =   Math.floor(Math.random() * canvasY)+10;

           if (bestBrain == null) {

               let bird = new Bird(100, randomY);
               birds.push(bird);

           }else {

               let bird = new Bird(100, randomY,bestBrain.copy());
             //  bird.brain.mutate(0.05)
               birds.push(bird);


           }

        }


    }


    const increaseBirdFitness = () =>{

        for (let x = 0; x < birds.length;x++) {

            //   bird.fitness = bird.fitness + 1;
            let bird = birds[x];
            bird.fitness = bird.fitness + 1;

           // console.log("BIRD FITNESS "+bird.fitness+" HGIHSCORE "+highscore);

        }
    }


    const birdsThink = () =>{

        for (let x = 0; x < birds.length;x++) {

            let bird = birds[x];
            bird.think(pipes[0]);



        }
    }
    const birdHits = (p5) =>{

        let killBirds = [];

        for (let x = 0; x < birds.length;x++) {


            let bird = birds[x];
            bird.hits(pipes[0]);


            if (bird.dead == true){

                killBirds.push(bird);


                //   console.log("BIRD FITNESS "+bird.fitness+" Highscore "+highscore);
                if (bird.fitness > highscore){
                    //HIGHLY SELECTED BIRD


                    console.log("BEST BRAIN");

                    highscore = bird.fitness;
                    bestBrain = bird.brain.copy();



                }





            }


        }

        for (let k  = 0; k< killBirds.length; k++){

            let killbird = killBirds[k];

            for (let x = 0; x < birds.length; x++  ) {

                let bird = birds[x];

                if (killbird == bird) {
                    birds.splice(x, 1);
                    break;
                }

            }


            if (birds.length == 0){
                resetGame();
            }

        }







    }

    const birdsUpdate = (p5) =>{

        for (let x = 0; x < birds.length;x++) {

            let bird = birds[x];
            bird.update(p5);



        }
    }

    const draw = (p5) => {


        for (let i = 0; i < 5; i++) {

            p5.background(0);

            if (counter % 120 == 0) {

                createPipe(p5);
            }

            counter++;

            for (let x = 0; x < pipes.length; x++) {

                let pipe = pipes[x];
                pipe.update();

                if (pipe.x < 0) {

                    //  console.log("DELETEING PIPE");
                    //remove from array
                    pipes.splice(x, 1);
                    pipe = null;


                    //--------- INCREASE SCORE

                    increaseBirdFitness();


                }

            }

            if (pipes.length > 0) {


                birdsThink();
                birdHits(p5);


            }


            birdsUpdate(p5);


        }


    };


    const resetGame =() =>{

        console.log("RESET GAME HIGHSCORE "+highscore);

        pipes = null;
        pipes = [];

        birds = null;
        birds = [];

        highscore = 0;

        buildBirds(10);


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
