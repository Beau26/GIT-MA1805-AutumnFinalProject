let snakeHeadX = 110
let snakeHeadY = 250
let xIncrement = 20
let yIncrement = 20
let direction = ""
let gridSize = 20
let gridStartX = 30
let gridStartY = 70
let gridArrayX = []
let gridArrayY = []
let snake = [[snakeHeadX,snakeHeadY]]
let bodyX = snakeHeadX
let bodyY = snakeHeadY
let foodx = 330
let foody = 250
let food2x = 0
let food2y = 0
let point = 0
let rotateValue = 0
let gameOver = false
let secondPhase = false
let gameStarted = false
let buttonPressed = false
let win = false
let bodyArray
let head
let newBody
let BodyPart
let length
let StartButton

let redFood
let blueFood
let backgroundImage
let startScreen
let snakeHeadImage
let snakeBodyImage
let winScreen 
let loseScreen
let border

//preloading all of the assets
function preload(){
  redFood = loadImage("RedFood.png")
  blueFood = loadImage("BlueFood.png")
  backgroundImage = loadImage("Background.png")
  startScreen = loadImage("StartScreen.png")
  snakeHeadImage = loadImage("SnakeHead.png")
  snakeBodyImage = loadImage("SnakeBody.png")
  winScreen = loadImage("WinScreen.png")
  loseScreen = loadImage("LoseScreen.png")
  border = loadImage("Border.png")
}
function setup() {
  createCanvas(440, 480)
  //slows the game down so it runs at a good speed
  frameRate(7)

  //sets the rotation to degrees to rotate the head
  angleMode(DEGREES)

  //makes an array of positions for the food to spawn on the grid
  for (let x = 0; x <= 19; x ++){
    append(gridArrayX,gridStartX)
    append(gridArrayY,gridStartY)
    gridStartX += 20
    gridStartY += 20
  }

  //makes the beginning snake array
  for (x = 0; x <= 1; x ++){
    bodyX -= gridSize
    bodyArray = [bodyX,bodyY]
    append(snake, bodyArray)
  }  

  //makes the start button
  StartButton = createButton("Start")
  StartButton.style('font-size', '40px');
  StartButton.style('color', '#ffffff');
  StartButton.style('background-color','#ff0000')
  StartButton.position(130,260)
  StartButton.size(180,60)
  StartButton.mousePressed(startGame)
    
}

function draw() {
  background(220)

  //sets the background of the game to a grid
  image(backgroundImage,220,260)

  //draws the red food
  noStroke()
  rectMode(CENTER)
  imageMode(CENTER)
  fill(255,0,0)
  image(redFood,foodx,foody,gridSize)

  //draws the blue food
  fill(0,0,255)
  image(blueFood,food2x,food2y,gridSize)

  //draws the snake's body
  for (let i = snake.length-1; i > 0; i --){
    image(snakeBodyImage,snake[i][0],snake[i][1],30,30)
  }

  //draws the head of the snake and rotates it 
  //on which direction it is moving
  push()
  translate(snake[0][0],snake[0][1])
  rotate(rotateValue)
  image(snakeHeadImage,0,0,30,30)
  pop()

  //draws the border
  image(border,220,240,440,480)

  //draws the point counter
  fill(255)
  textSize(30)
  textAlign(CENTER,CENTER)
  textStyle(BOLD)
  text(point,40,20)

  //makes the snake move
  move()

  //ends the game if gameOver is true
  if (gameOver == true){
    gameEnded()
  }
  //makes the snake eat red food
  if (snakeHeadX == foodx && snakeHeadY == foody){
    eatGoodFood()
  }
  //makes the snake eat blue food
  if (snakeHeadX == food2x && snakeHeadY == food2y){
    eatBadFood()
  }

  //starts the spawning of blue food once 10 points is reached
  if (point == 10 && secondPhase == false){
    eatBadFood()
    eatGoodFood()
    secondPhase = true

  }

  //starts the game
  if (gameStarted == false){
    
    fill(0,200)
    image(startScreen,220,260,400)
  }

}

function move(){
  //ends the game if the snake's head is in the same position
  //as a wall or it's own body
  if(snake[0][0] > 410 || snake[0][0] < 30 || snake[0][1] > 450 || snake[0][1] < 70){
    gameOver = true
  }

  for (x = 1; x < snake.length; x++){
    if (snake[0][0] == snake[x][0] && snake[0][1] == snake[x][1]){
      gameOver = true
    }
  }

  //changes the positions of all values in the 2D array
  //so that all of the body parts move one space forward
  if (direction != ""){
    snake.pop()
    newBody = snake

    snakeHeadX = newBody[0][0] + xIncrement
    snakeHeadY = newBody[0][1] + yIncrement
    head = [snakeHeadX,snakeHeadY]
    snake = []
    append(snake,head)
    length = newBody.length
    for (i = 0; i < length;i += 1){
      BodyPart = newBody.shift()
      append(snake,BodyPart)
    }
  
  }
  
}

function eatGoodFood(){
  //adds a point
  point ++

  let positionTaken = true

  //adds a part to the body
  bodyX = snake[snake.length-1][0]
  bodyY = snake[snake.length-1][1]
  bodyArray = [bodyX,bodyY]
  append(snake, bodyArray)

  //creates another red food on an empty space
  while (positionTaken == true){
    positionTaken = false
    foodx = random(gridArrayX)
    foody = random(gridArrayY)

    for (x = 0; x <= snake.length-1; x ++){
      if (foodx == snake[x][0] && foody == snake[x][1]){
        positionTaken = true
      
      }
    }
  }

  positionTaken = true 

  //makes another blue food in an empty space
  while (positionTaken == true && secondPhase == true){
    positionTaken = false
    food2x = random(gridArrayX)
    food2y = random(gridArrayY)

    for (x = 0; x <= snake.length-1; x ++){
      if (food2x == snake[x][0] && food2y == snake[x][1]){
        positionTaken = true
      
      }
      if (food2x == foodx && food2y == foody){
        positionTaken = true
      }
    }
  }

  //ends the game
  if (point == 50){
    gameOver = true
    win = true
  }
}

//does the same as eatGoodFood except subtracts a point 
//and makes the snake shorter
function eatBadFood(){
  point --

  positionTaken = true

  snake.pop()

  while (positionTaken == true){
    positionTaken = false
    food2x = random(gridArrayX)
    food2y = random(gridArrayY)

    for (x = 0; x <= snake.length-1; x ++){
      if (food2x == snake[x][0] && food2y == snake[x][1]){
        positionTaken = true
      
      }
      if (food2x == foodx && food2y == foody){
        positionTaken = true
      }
    }
  }

  positionTaken = true
  
  while (positionTaken == true){
    positionTaken = false
    foodx = random(gridArrayX)
    foody = random(gridArrayY)

    for (x = 0; x <= snake.length-1; x ++){
      if (foodx == snake[x][0] && foody == snake[x][1]){
        positionTaken = true
      
      }
    }
  }

  //ends the game
  if (point == 0){
    gameOver = true
  }
}

//controls the direction and rotation of the snake head
//stops the snake moving in the opposite direction it's going
function keyPressed(){
  if (gameStarted == true){
    if (keyCode == 37 && direction != "right" && direction != ""){
      xIncrement = -gridSize;
      yIncrement = 0;
      direction = "left"
      rotateValue = 180
    }
    if (keyCode == 38 && direction != "down"){
      yIncrement = -gridSize;
      xIncrement = 0;
      direction = "up"
      rotateValue = 270
    }
    if (keyCode == 39 && direction != "left"){
      xIncrement = gridSize;
      yIncrement = 0;
      direction = "right"
      rotateValue = 0
    }
    if (keyCode == 40 && direction != "up"){
      yIncrement = gridSize;
      xIncrement = 0;
      direction = "down"
      rotateValue = 90
    }
  }
}

//displays the respective game over screen depending if 
//the player wins or loses
function gameEnded(){
  if (win == true){
    image(winScreen,220,260,400)
  }
  else{
    image(loseScreen,220,260,400)
  }

  //makes the play again button
  let PlayAgainButton = createButton("Play Again")
  PlayAgainButton.style('font-size', '30px');
  PlayAgainButton.style('color', '#ffffff');
  PlayAgainButton.style('background-color','#ff0000')
  PlayAgainButton.position(130,260)
  PlayAgainButton.size(180,50)
  PlayAgainButton.mousePressed(resetGame)
  
}

//makes the start screen go away and lets the snake move
function startGame(){
  gameStarted = true
  buttonPressed = true
  StartButton.remove()
  
}

//reloads the window when the play again button is pressed
function resetGame(){
  window.location.reload()
}