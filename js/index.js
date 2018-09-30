var canvas = document.getElementById("myCanvas");
  //讀取"myCanvas"
var ctx = canvas.getContext("2d");
//設為2D
//磚塊  
var brickRowCount = 3; //磚塊列數
var brickColumnCount = 5; //磚塊行數
var brickWidth = 75; //寬
var brickHeight = 20; //高
var brickPadding = 10; //間距 
var brickOffsetTop = 30; // 離上面的距離 
var brickOffsetLeft = 30; //左邊的距離
//-----------
//板子起始位置
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

//-------
//表示鍵盤都沒按
var rightPressed = false;
var leftPressed = false;
//分數
var score = 0;
//document.addEventListener("mousemove", mouseMoveHandler, false);
//滑鼠
document.addEventListener("keydown", keyDownHandler, false);
//監看按下
document.addEventListener("keyup", keyUpHandler, false);
//監看沒按

//球
var x = canvas.width/2;//球起始X位置
var y = canvas.height-40;//球起始Y
var dx = 1.5; //由左右速度
var dy = -1.5; //上下速度
var ballRadius = 10; //球半徑
var lives = 3;
var cnum3="rgb(0,255,0)";
var space = false;
var start =0;

//設定按鍵是否按下
function keyDownHandler(e) {
    if(e.keyCode == 39) {
      //右鍵 電腦讀值 =39
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
      //左鍵 
    }
    else if(e.keyCode == 32) {
        space = true;
      //空白 
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
    else if(e.keyCode == 32) {
        space = false;
      //空白 
    }
}


function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
    //左距  上距
}

//將磚塊放入陣列中
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {//列
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {//行
        bricks[c][r] = { x: 0, y: 0, status: 1 };//新增屬性 status: 1  碰撞屬性
    }
}
//呈現磚塊
function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {//列
        for(var r=0; r<brickRowCount; r++) {//行
         if(bricks[c][r].status === 1) {//等於1才執行
            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
            // (塊寬+塊距)*第幾列+離左邊的距離 
            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            // (塊高+塊距)*第幾行+離上面距離 
            bricks[c][r].x = brickX;//設定X
            bricks[c][r].y= brickY;//設定Y
            ctx.beginPath();
            ctx.rect( brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
            }
        }
    }
}

//磚塊碰到消失
function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {//列
        for(var r=0; r<brickRowCount; r++) {//行
            var b = bricks[c][r]; //設定b為變數
            if(b.status == 1) {//如果b還在
            if(x+ballRadius >= b.x && x <= b.x+brickWidth+ballRadius && y+ballRadius>= b.y && y <=  b.y+brickHeight+ballRadius) {
    //1.球的X位置+半徑大於磚X位置 (左邊)  2.球的x位置 小於 半徑+ 磚X位置+寬 (右) 
    //3.球的Y位置+半徑大於 磚Y位置 (上)    4.球的Y位置 小於 半徑+ 磚Y位置+高 (下)  
                dy = -dy; 
              b.status = 0;//等於被打到
  cnum3="rgb("+Math.floor(Math.random()*180)+","+Math.floor(Math.random()*180)+","+Math.floor(Math.random()*180)+")" ; 
              score++; //得分
              if(score == brickRowCount*brickColumnCount) {
                alert("恭喜!你贏了!");
                location.reload() ;
              }
              
            }
            }
        }
    }
}



//畫球
function drawBall(){
 
  ctx.beginPath();
   ctx.arc(x, y, ballRadius, 0, Math.PI*2,false);
  //圓弧中心的x、y座標 r 圓弧開始和結束的角度 
  //false代表順時針方向, 預設或true為逆時針方向
   ctx.fillStyle =cnum3; 

   //填滿藍色
  ctx.fill();
   //填滿
  ctx.closePath();
};
//畫板子
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight-20, paddleWidth, paddleHeight);
    //距離左邊  上方 寬 高 //paddleHeight -10 板子的高度 -20底下的距離
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
};
function draw(){
   
  ctx.clearRect(0,0,canvas.width,canvas.height);
  //左上角的x,y 右下角的x,y 在這之中的東西會被清理掉
  drawBall();
  drawLives();
  drawPaddle();
  drawBricks();
  collisionDetection();
  drawScore();

  
  if(space === true){
    //按下空白建開始 start =1
   start=1;
  }
  if(start === 1){
   x+=dx;
   y+=dy; 
  }
    if(start===1 ){
    $('#note').hide();
   }else{
    $('#note').show();
   }
   
   
 
    //左右牆壁
  if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
     //x的位置 大於 板子的最左邊 且 x的位置小於 板子的最左邊加上寬度
    dx = -dx;
    cnum3="rgb("+Math.floor(Math.random()*180)+","+Math.floor(Math.random()*180)+","+Math.floor(Math.random()*180)+")" ;
}else if( y + dy < ballRadius) {
//如果高度y加上球的變化量dy 小於 球的半徑
 //上下牆壁
  dy = -dy;
    //變顏色 
  cnum3="rgb("+Math.floor(Math.random()*180)+","+Math.floor(Math.random()*180)+","+Math.floor(Math.random()*180)+")" ;  
  //如果碰到板子
}else if(x+ballRadius>paddleX&&x<paddleX+paddleWidth+ballRadius&& (y + dy+ballRadius>canvas.height-paddleHeight-20)&&(y + dy<canvas.height+ballRadius-20)){
  //x+半徑> 板子左邊    x小於  板子左邊+寬度+半徑
  //高度y加上球的變化量dy 大於 canvas.height高度 480 減掉 球的半徑減 板子高度 及厚度(板子上面)
  //canvas.height高度 480 - 20
  dy+=1;
  dx+=1;
   dy = -dy;
   cnum3="rgb("+Math.floor(Math.random()*180)+","+Math.floor(Math.random()*180)+","+Math.floor(Math.random()*180)+")" ;  
 }else if(y + dy > canvas.height-ballRadius){  
    
   lives--;

  if(lives>0){alert("Lives-1");}
if(!lives) {
    alert("遊戲結束");
     history.go(0);
}
else {
    start=0; //結束 start =0 要再按一次空白鍵
   
    x = canvas.width/2;
    y = canvas.height-41;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width-paddleWidth)/2;
}
}
if(rightPressed && paddleX < (canvas.width-paddleWidth)-5) {

      paddleX +=5;
  //paddleX 板子的位置 板子移動速度
     }
else if(leftPressed && paddleX -5> 0) {
      paddleX -=5;
  };
  
  
 requestAnimationFrame(draw);
   
}
              
draw();
//setInterval 無限循環
//draw 每十毫秒 執行一次