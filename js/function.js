const restart = document.getElementById('restart');
const crossClass = document.querySelector('.cross');
const circleClass = document.querySelector('.circle');
const messageClass = document.querySelector('.message');
const tableClass = document.querySelector('.table');
const cell = document.querySelectorAll('.cell');

// 勝ちパターン
const winSituation = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

const crossPlayer = 'x';
const circlePlayer = '○';
const draw = 'draw';

let currentPlayer = '○';
let count = 0;

cell.forEach(function(element) {
  element.addEventListener('click', function(e) {
    console.log(winSituation);
    // 書き込まれてる場合もしくは、
    // countが9の場合は、クリックしても無効化
    if (element.innerHTML !== '' || count === 9){
      return;
    }
    console.log(element, cell, e);
    // element.innerHTML()
    // element.textContent = currentPlayer ? crossPlayer: circlePlayer;]
    // switchPlayer();
    element.innerHTML = currentPlayer === circlePlayer ? circlePlayer : crossPlayer;
    console.log(currentPlayer + '=addInnerHTML');
    // ターン変更
    switchPlayer();
    count++;
    if (count === 9) {
      messageClass.innerHTML = draw;
    }
  })
})

function switchPlayer() {
  if (currentPlayer === circlePlayer) {
    // プレイヤーを入れ替える
     currentPlayer = crossPlayer;
     // turnのアンダーバーの位置を入れ替える
     crossClass.classList.add('active');
     circleClass.classList.remove('active');
     return;
  } else {
    // プレイヤーを入れ替える
    currentPlayer = circlePlayer;
     // turnのアンダーバーの位置を入れ替える
    crossClass.classList.remove('active');
    circleClass.classList.add('active');
    return;
  }
}

// Restartクリック時の処理
restart.addEventListener('click', function(){
  window.location.reload();
});
