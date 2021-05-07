import {NeuralNetwork} from "./NeuralNetwork";
import Collisions from 'collisions';
import  SAT from "sat";



export function Bird(p5, x, y,brain) {

    const GRAVITY = 1;

    this.RADIUS = 50;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.p5 = p5;

    this.mouseX = 0;
    this.mouseY = 0;



    this.brain = new NeuralNetwork(null,5,8,2);



    document.addEventListener('mousemove', (event) => {
     //   console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);

        this.x = event.clientX;
        this.y = event.clientY;
    });



    this.think = function (pipe) {

        let inputs = [];

        inputs[0] = this.y;
        inputs[1] = pipe.top;
        inputs[2] = pipe.bottom;
        inputs[3] = pipe.x;
        inputs[4] = pipe.SPEEDX;
        let output = this.brain.predict(inputs);


       // console.log("BIRD THINKS "+JSON.stringify(output));

        if (output[0] > output[1]){

            this.goUp();
        }


    }

    this.hits = function (pipe) {


        var c = new SAT.Circle(new SAT.Vector(this.x  ,this.y ), 1);

        var b = new SAT.Box(new SAT.Vector(pipe.x,0), pipe.WIDTH, pipe.top).toPolygon();

        var b2 = new SAT.Box(new SAT.Vector(pipe.x,pipe.bottom), pipe.WIDTH, pipe.canvasY - pipe.bottom).toPolygon();


        var response = new SAT.Response();
        var response2 = new SAT.Response();


        if (SAT.testPolygonCircle(b,c,response)){

            console.log("COLIDED");
        }

        if (SAT.testPolygonCircle(b2,c,response2)){

            console.log("COLIDED 2");
        }



    }


    this.goUp = function(){


        this.speedY = -15;





    }


    this.update = function () {



        this.checkGame();

        this.draw();


    }



    this.checkGame = function () {


        if (this.y > 1000){


            this.speedY = 0;
            this.y = 1000;

           return;
        }

        if (this.y < 0){


            this.speedY = 0;
            this.y = 0;

            return;
        }



        this.speedY = this.speedY + GRAVITY;
       // this.y = this.y + this.speedY;


    }

    this.draw = function () {




        this.p5.ellipse(this.x,this.y,this.RADIUS,this.RADIUS);


    }


}



