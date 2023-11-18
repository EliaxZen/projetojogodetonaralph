const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    timeLeft: document.querySelector("#time-left"),
    score: document.querySelector("#score")
  },
  values: {
    gameVelocity: 1000,
    hitPosition: 0,
    result: 0,
    currentTime: 60,
  },
  actions: {
    timerId: setInterval(randomSquare, 1000),
    countDownTimerId: setInterval(countDown, 1000),
  }
};

function playSound() {
  let audio = new Audio("../assets/audio/hit.m4a");
  audio.volume = 0.2;
  audio.play();
}

function countDown() {
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if(state.values.currentTime <= 0){
    clearInterval(state.actions.countDownTimerId)
    clearInterval(state.actions.timerId)
    alert("O TEMPO ACABOU! O seu resultado foi de: " + state.values.result + "pts")
  }
}

function randomSquare(){    
  state.view.squares.forEach((square) => {
      square.classList.remove('enemy');
  });

  let randomNumber = Math.floor(Math.random()*9);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add('enemy');
  state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox(){
  state.view.squares.forEach((square) => {
      square.addEventListener('mousedown', () => {
          if(square.id === state.values.hitPosition){
              state.values.result += 1;
              state.view.score.textContent = state.values.result;
              state.values.hitPosition = null;
              playSound();
          }
      });
  })
}

function initialize() {
addListenerHitBox();
}

initialize();