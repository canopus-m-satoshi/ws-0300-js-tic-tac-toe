const restart = document.getElementById('restart');
const crossClass = document.querySelector('.cross');
const circleClass = document.querySelector('.circle');
const messageClass = document.querySelector('.message');
const tableClass = document.querySelector('.table');
const cells = document.querySelectorAll('.cell');
const circlePlayer = '○';
const circleNum = 1;
const crossPlayer = 'x';
const crossNum = 2;
const maxCellNum = 9;
const boardMaxIndex = 2;
const draw = 'draw';
const deleteCount = 1;

let currentPlayer = '○';
let count = 0;
let fin = false;
let board = [
  [0, 0, 0], // 0
  [0, 0, 0], // 1
  [0, 0, 0]  // 2
];

cells.forEach(function (element) {
  element.addEventListener('click', function (e) {
    // 書き込まれてる場合、countが9の場合、一列揃った場合は、クリックしても無効化
    if (element.innerHTML !== '' || count === maxCellNum || fin === true) {
      return;
    }

    // プレイヤーの記号を格納
    element.innerHTML = currentPlayer === circlePlayer ? circlePlayer : crossPlayer;

    let checkedId = element.id;
    let checkedPlayer = element.innerHTML;

    // プレイヤー番号を格納
    let playerNum = checkedPlayer === circlePlayer ? circleNum : crossNum;

    checkBoard(checkedId, playerNum);
    if (checkWin(circleNum)) {
      messageClass.innerHTML = '○ win!!';
      return fin = true;
    };

    if (checkWin(crossNum)) {
      messageClass.innerHTML = '× win!!';
      return fin = true;
    }
    switchPlayer();
    count++;

    // マスが全て埋まったら、’引き分け’を表示
    if (count === maxCellNum) {
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
restart.addEventListener('click', function () {
  window.location.reload();
});

// board配列に、チェックしたプレイヤー番号を格納
function checkBoard(checkedId, playerNum) {
  if (checkedId === '0' || checkedId === '1' || checkedId === '2') {
    return board[0].splice(checkedId, deleteCount, playerNum);
  } else if (checkedId === '3' || checkedId === '4' || checkedId === '5') {
    return board[1].splice(checkedId - 3, deleteCount, playerNum);
  } else if (checkedId === '6' || checkedId === '7' || checkedId === '8') {
    return board[2].splice(checkedId - 6, deleteCount, playerNum);
  }
}

// 勝敗チェック
function checkWin(num) {
  // 縦横列 チェック
  for (let i = 0; i < boardMaxIndex; i++) {
    if (board[i][0] === num && board[i][1] === num && board[i][2] === num ){
        return true;
    }
    if (board[0][i] === num && board[1][i] === num && board[2][i] === num ){
      return true;
    }
  }

  // 斜列チェック
  if (board[0][0] === num && board[1][1] === num && board[2][2] === num ){
      return true;
  }
  if (board[0][2] === num && board[1][1] === num && board[2][0] === num ){
      return true;
  }

  return false;
}