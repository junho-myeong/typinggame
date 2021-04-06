const gametime = 8;
let score =0;
let time = gametime;
let isplaying = false;
let timeinterval;
let words =[];
let checkInterval;


const wordinput = document.querySelector('.wordinput');
const worddisplay =document.querySelector('.worddisplay');
const scoredisplay = document.querySelector('.score');
const timedisplay =document.querySelector('.time');
const button = document.querySelector('.button');

//초기 값으로 세팅할 언어들 사용할때 init 사용한다.
init();

function init(){
  getWords();
  wordinput.addEventListener('input',checkmatch)
}
//게임실행 부분
function run(){
  if(isplaying){
    return;
  }
  isplaying = true;
  time = gametime;
  wordinput.focus();
  scoredisplay.innerText = 0 ;
  timeinterval =setInterval(countdown,1000);
  checkInterval = setInterval(checksatus,50);
  buttonchange('게임중');
}

function checksatus(){
  if(isplaying && time === 0){
    buttonchange('게임시작')
    clearInterval(checkInterval)
  }
}
//단어 불러오기
function getWords(){
  axios.get('https://random-word-api.herokuapp.com/word?number=100')
  .then(function (response) {
    // handle success
    response.data.forEach((word)=>{
      if(word.length<10){
        words.push(word);
      }
    })

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })

  buttonchange('게임시작')
}



// 단어 일치 체크
function checkmatch(){
  if(wordinput.value.toUpperCase() === worddisplay.innerText.toUpperCase()){
  wordinput.value="";
  if(!isplaying){
    return;
  }
  score++;
  scoredisplay.innerText = score;
  time = gametime;
  const randomindex = Math.floor(Math.random()*words.length);
  worddisplay.innerText = words[randomindex];
  }
}
//setInterval(countdown,1000);
buttonchange('게임시작')


function countdown(){
  time > 0 ? time-- : isplaying = false;
  if(isplaying === false){
    clearInterval(timeinterval);
  }
  timedisplay.innerText = time;
}

function buttonchange(text){
  button.innerText = text;
  text === '게임시작' ? button.classList.remove('loding') : button.classList.add('loding')
}
