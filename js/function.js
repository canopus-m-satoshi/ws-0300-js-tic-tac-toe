const restart = document.getElementById('restart');
const crossClass = document.querySelector('.cross');
const circleClass = document.querySelector('.circle');
const messageClass = document.querySelector('.message');
const tableClass = document.querySelector('.table');
const cell = document.querySelectorAll('.cell');

// 勝ちパターン
const winSituation = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const crossPlayer = 'x';
const circlePlayer = '○';
const draw = 'draw';

let currentPlayer = '○';
let count = 0;
let checkedData = [];


cell.forEach(function (element) {
  element.addEventListener('click', function (e) {
    console.log(winSituation + '=winSituation');
    // 書き込まれてる場合もしくは、
    // countが9の場合は、クリックしても無効化
    if (element.innerHTML !== '' || count === 9) {
      return;
    }
    console.log(element, cell, e);
    element.innerHTML = currentPlayer === circlePlayer ? circlePlayer : crossPlayer;
    console.log(currentPlayer + '=addInnerHTML', element.id, e);

    let checkedId = element.id;
    let checkedPlayer = element.innerHTML;
    console.log(checkedPlayer + '=checkWin');

    // 勝敗チェック
    checkWin(checkedId, checkedPlayer);
    // ターン変更
    switchPlayer();
    count++;
    if (count === 9) {
      messageClass.innerHTML = draw;
    }
  })
})

// 配置されている記号を配列に格納する。
// let empty_count = 0;
// let datas = [];
// for (let i = 0; i < cells.length; i++) {
//   datas.push(cells[i].textContent);
//   if (!cells[i].textContent) {
//     empty_count++;
//   }
// }
// ３つ並んでいるかチェックする
// if (this.check_line(datas)) {
//   this.game_over(winner);
// }
// MAIN.prototype.check_line = function (datas) {
//   if (!datas) { return null; }
//   for (let i = 0; i < pattern.length; i++) {
//     if (!datas[pattern[i][0]]) { continue; }
//     if (datas[pattern[i][0]] === datas[pattern[i][1]]
//       && datas[pattern[i][0]] === datas[pattern[i][2]]) {
//       return datas[pattern[i][0]];
//     }
//   }
//   return false;
// };

function checkWin(celNum, player) {
  // クリックしたidを取得＝マスのどこにチェックしたかわかる
  // それが○or× なのか確認
  // 配列に突っ込む？
  // winSituationのどれかに当てはまらないか確認？
  console.log(celNum);
  for (let i = 0; i < winSituation.length; i++) {
    console.log(cell[i].textContent + '←' + i + '///pattern==' + winSituation[i] + '///winSituation[0]==' + winSituation[i][0] + '///==' + winSituation[i][1] + '///' + winSituation[i][2]);
  }
  return;
}


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
