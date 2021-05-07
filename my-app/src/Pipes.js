
export function Pipes(p5,canvasX,canvasY) {



    let randomY = Math.random() * (canvasY / 2);

    this.x = canvasX - 50;

    this.top = randomY;
    this.bottom = randomY + 300;

    this.canvasX = canvasX;
    this.canvasY = canvasY;


    this.p5 = p5;
    this.SPEEDX = 10;
    this.WIDTH = 100;



    this.update = function () {



        this.checkGame();

        this.draw();


    }



    this.checkGame = function () {


        this.x = this.x - this.SPEEDX;




    }

    this.draw = function () {




        this.p5.rect(this.x,0,this.WIDTH,this.top);


        this.p5.rect(this.x,this.bottom,this.WIDTH,canvasY - this.bottom);



    }


}



