import {NeuralNetwork} from "./NeuralNetwork";
import Collisions from 'collisions';
import  SAT from "sat";



export function Bird(canvasX,canvasY, x, y,BRAIN) {

    const GRAVITY = 2;
    const LIFT = -20;


    this.RADIUS = 50;
    this.speedY = 0;
    this.x = x;
    this.y = y;

    this.fitness =0;

    this.mouseX = 0;
    this.mouseY = 0;

    this.dead = false;




    if (BRAIN == null) {

     //   console.log("Bird With New Brain");

        this.brain = new NeuralNetwork(null, 6, 8, 2);

    }else{

      //  console.log("Bird With Copy");
        this.brain = new NeuralNetwork(BRAIN, 6, 8, 2);

    }



    document.addEventListener('mousemove', (event) => {
     //   console.log(`Mouse X: ${event.clientX}, Mouse Y: ${event.clientY}`);

        //this.x = event.clientX;
        //this.y = event.clientY;
    });





    this.think = function (pipe) {

        let inputs = [];

        inputs[0] = this.y;
        inputs[1] = pipe.top;
        inputs[2] = pipe.bottom;
        inputs[3] = pipe.x;
        inputs[4] = pipe.SPEEDX;
        inputs[5] = this.speedY;

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

           // console.log("COLIDED");

            pipe.hit(true,false);
            this.dead = true;
        }

        if (SAT.testPolygonCircle(b2,c,response2)){


            pipe.hit(false,true);
            this.dead = true;


         //   console.log("COLIDED 2");
        }



    }


    this.goUp = function(){


        this.speedY =  LIFT;





    }


    this.update = function (p5) {



        this.checkGame();
        this.draw(p5);


    }



    this.checkGame = function () {


        this.y = this.y + this.speedY;
        this.speedY = this.speedY + GRAVITY;

        if (this.y > canvasY){


            this.speedY = 0;
            this.y = canvasY;

           return;
        }

        if (this.y < 0){


            this.speedY = 0;
            this.y = 0;

            return;
        }





    }

    this.draw = function (p5) {




        p5.fill(255,255,255,100);

        p5.ellipse(this.x,this.y,this.RADIUS,this.RADIUS);



    }


}



