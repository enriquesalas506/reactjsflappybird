(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{283:function(t,e,i){},284:function(t,e,i){},290:function(t,e){},291:function(t,e){},299:function(t,e){},302:function(t,e){},303:function(t,e){},310:function(t,e,i){"use strict";i.r(e);var s=i(20),n=i.n(s),a=i(146),r=i.n(a),o=(i(283),i.p,i(284),i(217)),c=i.n(o),h=i(4),d=i(9),l=i(84),p=function(){function t(e,i,s,n){if(Object(h.a)(this,t),e instanceof l.a)return this.model=e,this.inputnodes=i,this.hidden_nodes=s,void(this.outputnodes=n);this.inputnodes=i,this.hidden_nodes=s,this.outputnodes=n,this.model=this.createModel()}return Object(d.a)(t,[{key:"copy",value:function(){var e=this;return console.log("COPY"),l.f((function(){for(var i=e.createModel(),s=e.model.getWeights(),n=[],a=0;a<s.length;a++)n[a]=s[a].clone();return i.setWeights(n),new t(i,e.inputnodes,e.hidden_nodes,e.outputnodes)}))}},{key:"createModel",value:function(){var t=l.c(),e=l.b.dense({units:this.hidden_nodes,inputShape:[this.inputnodes],activation:"sigmoid"});t.add(e);var i=l.b.dense({units:this.outputnodes,activation:"softmax"});return t.add(i),t}},{key:"predict",value:function(t){var e=this;return l.f((function(){var i=l.e([t]);return e.model.predict(i).dataSync()}))}},{key:"mutate",value:function(t,e){var i=this;l.f((function(){for(var e=i.model.getWeights(),s=[],n=0;n<e.length;n++){for(var a=e[n],r=e[n].shape,o=a.dataSync().slice(),c=0;c<o.length;c++)if(Math.random<t){var h=2*(Math.random()-.5),d=o[c]+h*t;o[c]=d}var p=l.d(o,r);s[n]=p}i.model.setWeights(s)}))}}]),t}(),u=(i(309),i(85)),f=i.n(u);function b(t,e,i,s,n){this.RADIUS=50,this.speedY=0,this.x=i,this.y=s,this.fitness=0,this.mouseX=0,this.mouseY=0,this.dead=!1,this.brain=new p(null==n?null:n,6,8,2),document.addEventListener("mousemove",(function(t){})),this.think=function(t){var e=[];e[0]=this.y,e[1]=t.top,e[2]=t.bottom,e[3]=t.x,e[4]=t.SPEEDX,e[5]=this.speedY;var i=this.brain.predict(e);i[0]>i[1]&&this.goUp()},this.hits=function(t){var e=new f.a.Circle(new f.a.Vector(this.x,this.y),1),i=new f.a.Box(new f.a.Vector(t.x,0),t.WIDTH,t.top).toPolygon(),s=new f.a.Box(new f.a.Vector(t.x,t.bottom),t.WIDTH,t.canvasY-t.bottom).toPolygon(),n=new f.a.Response,a=new f.a.Response;f.a.testPolygonCircle(i,e,n)&&(t.hit(!0,!1),this.dead=!0),f.a.testPolygonCircle(s,e,a)&&(t.hit(!1,!0),this.dead=!0)},this.goUp=function(){this.speedY=-20},this.update=function(t){this.checkGame(),this.draw(t)},this.checkGame=function(){return this.y=this.y+this.speedY,this.speedY=this.speedY+2,this.y>e?(this.speedY=0,void(this.y=e)):this.y<0?(this.speedY=0,void(this.y=0)):void 0},this.draw=function(t){t.fill(255,255,255,100),t.ellipse(this.x,this.y,this.RADIUS,this.RADIUS)}}function v(t,e,i){var s=Math.random()*(i-200);this.x=e,this.top=s,this.bottom=s+200,this.canvasX=e,this.canvasY=i,this.p5=t,this.SPEEDX=15,this.WIDTH=50,this.hittop=!1,this.hitbottom=!1,this.update=function(){this.checkGame(),this.draw()},this.hit=function(t,e){this.hittop=t,this.hitbottom=e},this.checkGame=function(){this.x=this.x-this.SPEEDX},this.draw=function(){var t=this.p5.color(255,255,255);if(this.p5.fill(t),1==this.hittop){var e=this.p5.color(255,0,0);this.p5.fill(e)}if(this.p5.rect(this.x,0,this.WIDTH,this.top),this.p5.fill(t),1==this.hitbottom){var s=this.p5.color(255,0,0);this.p5.fill(s)}this.p5.rect(this.x,this.bottom,this.WIDTH,i-this.bottom),this.p5.fill(t)}}var m=i(13),g=i(14),x=i(326),j=i(325),y=i(46),O=function(t){Object(m.a)(i,t);var e=Object(g.a)(i);function i(t){var s;return Object(h.a)(this,i),(s=e.call(this,t)).createPipe=function(t){var e=new v(t,s.canvasX,s.canvasY);s.pipes.push(e)},s.setup=function(t,e){t.createCanvas(s.canvasX,s.canvasY).parent(e),t.frameRate(30),window.addEventListener("click",(function(){})),s.buildBirds(s.totalBirds)},s.buildBirds=function(t){for(var e=0;e<t;e++){var i=Math.floor(Math.random()*s.canvasY)+10;if(null==s.bestBrain){var n=new b(s.canvasX,s.canvasY,50,i);s.birds.push(n)}else{var a=new b(s.canvasX,s.canvasY,50,i,s.bestBrain.copy());s.birds.push(a)}}},s.increaseBirdFitness=function(){for(var t=0;t<s.birds.length;t++){var e=s.birds[t];e.fitness=e.fitness+1}},s.birdsThink=function(){for(var t=0;t<s.birds.length;t++)for(var e=0;e<s.pipes.length;e++){var i=s.pipes[e],n=s.birds[t];i.x<n.x||n.think(i)}},s.birdHits=function(t){for(var e=[],i=0;i<s.birds.length;i++){var n=s.birds[i];n.hits(s.pipes[0]),1==n.dead&&(e.push(n),n.fitness>s.highscore&&(console.log("BEST BRAIN"),s.highscore=n.fitness,s.bestBrain=n.brain.copy(),s.brainNumber=s.brainNumber+1,s.forceUpdate()))}for(var a=0;a<e.length;a++){for(var r=e[a],o=0;o<s.birds.length;o++){if(r==s.birds[o]){s.birds.splice(o,1);break}}0==s.birds.length&&s.resetGame()}},s.birdsUpdate=function(t){for(var e=0;e<s.birds.length;e++){s.birds[e].update(t)}},s.draw=function(t){for(var e=0;e<s.speed;e++){t.background(0),s.counter%(120-s.pipes_per_second/5*90)==0&&s.createPipe(t),s.counter++;for(var i=0;i<s.pipes.length;i++){var n=s.pipes[i];n.update(),n.x<0&&(s.pipes.splice(i,1),n=null,s.game_score++,s.game_max_score=Math.max(s.game_max_score,s.game_score),s.forceUpdate(),s.increaseBirdFitness())}s.pipes.length>0&&(s.birdsThink(),s.birdHits(t)),s.birdsUpdate(t)}},s.resetGame=function(){console.log("RESET GAME HIGHSCORE "+s.highscore),s.pipes=null,s.pipes=[],s.birds=null,s.birds=[],s.highscore=0,s.game_score=0,s.forceUpdate(),s.buildBirds(s.totalBirds)},s.state={change:!0},s.x=50,s.y=50,s.birds=[],s.highscore=0,s.game_max_score=0,s.game_score=0,s.evolution=0,s.bestBrain=null,s.brainNumber=0,s.pipes=[],s.counter=0,s.canvasX=1080,s.canvasY=500,s.speed=1,s.totalBirds=5,s.pipes_per_second=1,s}return Object(d.a)(i,[{key:"render",value:function(){var t=this;return Object(y.jsx)("div",{children:Object(y.jsxs)("div",{style:{display:"flex",flexDirection:"row"},children:[Object(y.jsx)(c.a,{setup:this.setup,draw:this.draw}),Object(y.jsxs)("div",{style:{marginLeft:100,display:"flex",justifyContent:"flex-start",flexDirection:"column",alignContent:"flex-start",alignItems:"flex-start"},children:[Object(y.jsxs)("p",{children:[" ","Speed of simulation "+this.speed]}),Object(y.jsx)(x.a,{defaultValue:1,"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",step:1,marks:!0,min:1,max:10,onChange:function(e,i){t.speed=i,t.forceUpdate()}}),Object(y.jsx)("p",{children:"Total Mutations "+this.totalBirds}),Object(y.jsx)(x.a,{defaultValue:5,"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",step:1,marks:!0,min:1,max:100,onChange:function(e,i){t.totalBirds=i,t.forceUpdate()}}),Object(y.jsx)("p",{children:"Difficulty "+this.pipes_per_second}),Object(y.jsx)(x.a,{defaultValue:1,"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",step:1,marks:!0,min:1,max:5,onChange:function(e,i){t.pipes_per_second=i,t.forceUpdate()}}),Object(y.jsx)("p",{children:"Current Score "+this.game_score}),Object(y.jsx)("p",{children:"Max Score "+this.game_max_score}),Object(y.jsx)("p",{children:"Brain Number "+this.brainNumber}),Object(y.jsx)(j.a,{color:"primary",onClick:function(){t.resetGame()},children:"Reset Game"})]})]})})}}]),i}(n.a.Component);var w=function(){return Object(y.jsx)("div",{className:"App",children:Object(y.jsx)("header",{className:"App-header",children:Object(y.jsx)(O,{})})})},_=function(t){t&&t instanceof Function&&i.e(3).then(i.bind(null,328)).then((function(e){var i=e.getCLS,s=e.getFID,n=e.getFCP,a=e.getLCP,r=e.getTTFB;i(t),s(t),n(t),a(t),r(t)}))};r.a.render(Object(y.jsx)(n.a.StrictMode,{children:Object(y.jsx)(w,{})}),document.getElementById("root")),_()}},[[310,1,2]]]);
//# sourceMappingURL=main.9fc5b5d3.chunk.js.map