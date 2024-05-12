const state = {
  // elementos visuais do jogo
  view:{
      squares: document.querySelectorAll(".square"),        
      enemy: document.querySelector('.enemy'),
      timeLeft: document.querySelector('#time-left'),
      score: document.querySelector('#score'),
      life: document.querySelector('#life'),
  },

  // elementos usandos no backend
  values:{
      timerId: null,
      countDownTimerId: null,        
      gameVelocity: 400,
      gameTime: 1000,
      hitPosition: 0,
      result: 0,
      currentTime: 60,
      currentLife: 1,

  },

  // chamada de funções
  // actions:{
  //     countDownTimerId: setInterval(countDown, 1000),
  // }
};

function countDown(){    
  state.values.currentTime--;
  state.view.timeLeft.textContent = state.values.currentTime;

  if(state.values.currentTime <= 0){             
      clearInterval(state.values.countDownTimerId);
      clearInterval(state.values.timerId);        
      state.values.currentLife--;
      state.view.life.textContent = `x${state.values.currentLife}`;
      if(state.values.currentLife <= 0){ 
        document.querySelector('#score--window').innerHTML = state.values.result;
          windowGameFinally.style.display = "flex" 
      } else {
          playSound("Bugle Tune.mp3");
          endSwal();
      }
      //alert('Game Over! O seu resultado foi: ' + state.values.result);
  }
}

function continueGame(){  
  state.values.currentTime = 60;
  state.view.timeLeft.textContent = state.values.currentTime;
  state.values.timerId = null;
  state.values.countDownTimerId = null;
  state.values.result = 0;
  state.view.score.textContent = state.values.result;
  
  moveEnemy();
  countTime();
}


function playSound(nomeAudio) {
  let audio = new Audio(`./assets/audio/${nomeAudio}`);
  audio.volume = 0.3;
  audio.play();
}

function randomSquare(){    
  state.view.squares.forEach((square) => {
      square.classList.remove('enemy');
  });

  let randomNumber = Math.floor(Math.random()*18);
  let randomSquare = state.view.squares[randomNumber];
  randomSquare.classList.add('enemy');
  state.values.hitPosition = randomSquare.id;
}

function moveEnemy(){
  state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function countTime(){    
  state.values.countDownTimerId= setInterval(countDown, state.values.gameTime);   
}

function addListenerHitBox(){
  state.view.squares.forEach((square) => {
      square.addEventListener('mousedown', () => {
          if(square.id === state.values.hitPosition){
              state.values.result += 1;
              state.view.score.textContent = state.values.result;
              state.values.hitPosition = null;
              playSound("hit.m4a");
          }
      });
  })
}

let windowGameFinally = document.querySelector(".window-game--finally");

document.querySelector('#reload').addEventListener('click', () => {
  window.location.reload(true);
})



function initialize(){
moveEnemy();
countTime();
addListenerHitBox();
}

initialize();