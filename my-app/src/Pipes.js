
export function Pipes(p5,canvasX,canvasY) {


    const MIN_PIPE_BOTTOM = 200;

    let randomY = Math.random() * (canvasY -MIN_PIPE_BOTTOM);

    this.x = canvasX;

    this.top = randomY;
    this.bottom = randomY + 200;

    this.canvasX = canvasX;
    this.canvasY = canvasY;


    this.p5 = p5;
    this.SPEEDX = 15
    this.WIDTH = 50;


    this.hittop = false;
    this.hitbottom = false;




    this.update = function () {



        this.checkGame();

        this.draw();


    }


    this.hit = function (top,bottom) {


        this.hittop = top;
        this.hitbottom = bottom;




    }



    this.checkGame = function () {


        this.x = this.x - this.SPEEDX;




    }

    this.draw = function () {


        let white = this.p5.color(255, 255, 255);
        this.p5.fill(white);



        if (this.hittop == true){
            let color = this.p5.color(255, 0, 0);
            this.p5.fill(color);
        }

        this.p5.rect(this.x,0,this.WIDTH,this.top);
        this.p5.fill(white);


        if (this.hitbottom == true) {
            let color = this.p5.color(255, 0, 0);
            this.p5.fill(color);
        }

        this.p5.rect(this.x,this.bottom,this.WIDTH,canvasY - this.bottom);

        this.p5.fill(white);


    }


}



