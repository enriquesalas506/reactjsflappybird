import React from "react";
import {Pipes} from "./Pipes";
import {Bird} from "./Bird";
import Sketch from "react-p5";
import Slider from "@material-ui/core/Slider";

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = { change: true };

        this.x = 50;
        this.y = 50;
        this.birds = [];

        this.highscore = 0;
        this.game_max_score = 0;
        this.game_score = 0;

        this.evolution = 0;

        this.bestBrain = null;



        this.pipes = [];
        this.counter = 0;

        this.canvasX = 500;
        this.canvasY = 500;

        this.speed = 1;
        this.totalBirds = 5;
    }




    createPipe = (p5) =>{


        let pipe = new Pipes(p5,this.canvasX,this.canvasY);
        this.pipes.push(pipe);


    }


    setup = (p5, canvasParentRef) => {
        // use parent to render the canvas in this ref
        // (without that p5 will render the canvas outside of your component)
        p5.createCanvas(this.canvasX, this.canvasY).parent(canvasParentRef);


        p5.frameRate(30);


        window.addEventListener("click",() =>{


            //   bird.goUp();

        })

        this.buildBirds(this.totalBirds);


    };



    buildBirds = (total) =>{

        for (let x = 0; x < total; x++){


            let randomY =   Math.floor(Math.random() * this.canvasY)+10;

            if (this.bestBrain == null) {

                let bird = new Bird(this.canvasX,this.canvasY,50, randomY);
                this.birds.push(bird);

            }else {

                let bird = new Bird(this.canvasX,this.canvasY,50, randomY,this.bestBrain.copy());
                //  bird.brain.mutate(0.05)
                this.birds.push(bird);


            }

        }


    }


    increaseBirdFitness = () =>{

        for (let x = 0; x < this.birds.length;x++) {

            //   bird.fitness = bird.fitness + 1;
            let bird = this.birds[x];
            bird.fitness = bird.fitness + 1;

            // console.log("BIRD FITNESS "+bird.fitness+" HGIHSCORE "+highscore);

        }
    }


    birdsThink = () =>{

        for (let x = 0; x < this.birds.length;x++) {

            let bird = this.birds[x];
            bird.think(this.pipes[0]);



        }
    }
    birdHits = (p5) =>{

        let killBirds = [];

        for (let x = 0; x < this.birds.length;x++) {


            let bird = this.birds[x];
            bird.hits(this.pipes[0]);


            if (bird.dead == true){

                killBirds.push(bird);


                //   console.log("BIRD FITNESS "+bird.fitness+" Highscore "+highscore);
                if (bird.fitness > this.highscore){
                    //HIGHLY SELECTED BIRD


                    console.log("BEST BRAIN");

                    this.highscore = bird.fitness;
                    this.bestBrain = bird.brain.copy();

                    this.forceUpdate();



                }





            }


        }

        for (let k  = 0; k< killBirds.length; k++){

            let killbird = killBirds[k];

            for (let x = 0; x < this.birds.length; x++  ) {

                let bird = this.birds[x];

                if (killbird == bird) {
                    this.birds.splice(x, 1);
                    break;
                }

            }


            if (this.birds.length == 0){
                this.resetGame();
            }

        }







    }

    birdsUpdate = (p5) =>{

        for (let x = 0; x < this.birds.length;x++) {

            let bird = this.birds[x];
            bird.update(p5);



        }
    }

    draw = (p5) => {


        for (let i = 0; i < this.speed; i++) {

            p5.background(0);

            if (this.counter % 120 == 0) {

                this.createPipe(p5);
            }

            this.counter++;

            for (let x = 0; x < this.pipes.length; x++) {

                let pipe = this.pipes[x];
                pipe.update();

                if (pipe.x < 0) {

                    //  console.log("DELETEING PIPE");
                    //remove from array
                    this.pipes.splice(x, 1);
                    pipe = null;
                    this.game_score++;
                    this.game_max_score = Math.max(this.game_max_score,this.game_score);
                    this.forceUpdate();


                    //--------- INCREASE SCORE

                    this.increaseBirdFitness();


                }

            }

            if (this.pipes.length > 0) {


                this.birdsThink();
                this.birdHits(p5);


            }


            this.birdsUpdate(p5);


        }


    };


    resetGame =() =>{

        console.log("RESET GAME HIGHSCORE "+this.highscore);

        this. pipes = null;
        this. pipes = [];

        this.birds = null;
        this.birds = [];

        this.highscore = 0;
        this.game_score = 0;

        this.forceUpdate();

        this.buildBirds(this.totalBirds);


    }


    render() {
        return (
            <div>



                <div style={{display:"flex",flexDirection:"row"}}>
                <Sketch setup={this.setup} draw={this.draw} />


                <div style={{marginLeft:100,display:"flex",justifyContent:"flex-start",flexDirection:"column",alignContent:"flex-start",alignItems:"flex-start"}}>

                    <p> {"Speed of simulation "+this.speed}</p>
                    <Slider
                        defaultValue={1}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={10}
                        onChange={(event,value) =>{

                            this.speed = value;
                            this.forceUpdate();

                        }}
                    />

                    <p>{"Total Mutations "+this.totalBirds}</p>
                    <Slider
                        defaultValue={5}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        step={1}
                        marks
                        min={1}
                        max={100}
                        onChange={(event,value) =>{

                            this.totalBirds = value;
                            this.forceUpdate();

                        }}
                    />


                    <p>{"Current Score "+this.game_score}</p>
                    <p>{"Max Score "+this.game_max_score}</p>






                </div>

                </div>




            </div>
        );
    }
}

export default Game;
