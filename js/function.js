const cells = document.querySelectorAll('.cell') // NodeListで返却されるのでforeachが使用できる
const circleTurn = document.querySelector('.turn-box-item.circle')
const crossTurn = document.querySelector('.turn-box-item.cross')
const state = document.querySelector('.state')
const button = document.querySelector('.button')

const circlePlayer = '⚪︎'
const crossPlayer = '×'
const circleNum = 1
const crossNum = 2
const maxCount = cells.length
let count = 0
let isWin = false
let isTurnCircle = true

// 勝敗のパターンを登録
const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  [0, 4, 8],
  [2, 4, 6],
]

// let board = [
//   [0, 0, 0], // 1行目
//   [0, 0, 0], // 2行目
//   [0, 0, 0], // 3行目
// ]
// ↑勝敗チェックを一次元配列でチェックするようにしたので、boardの配列の一次元でいい
// 2次元配列でも動作するが、クリック時に一次元に配列内の値が置き換わっていくの2次元配列は無駄になる
// let board = [0, 0, 0, 0, 0, 0, 0, 0, 0]

let board = []
for (let i = 0; i < maxCount; i++) {
  board.push(0)
}

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    // 空欄じゃないセルをクリックした場合は反応させない
    // 勝敗が決まったor引き分け時は反応させない
    if (cell.innerHTML != '' || count === maxCount || isWin) return

    if (isTurnCircle) {
      cell.innerHTML = circlePlayer
      board[index] = circleNum
    } else {
      cell.innerHTML = crossPlayer
      board[index] = crossNum
    }

    // 勝敗チェック
    const checkNum = isTurnCircle ? circleNum : crossNum
    checkWin(checkNum)

    // 現在のプレイヤーを判別し勝者を画面に表示
    /*
     * const player = isTurnCircle ? circlePlayer : crossPlayer
     * const winner = player ? circlePlayer : crossPlayer
     * ↑　playerがtrue/falseかどうかをチェックしてしまっているので、常にcirclePlayerが返されてしまった
     */

    const winner = isTurnCircle ? circlePlayer : crossPlayer
    if (isWin) {
      state.innerHTML = `${winner} is win!`

      // 勝者が決まった時点で処理を終了する
      cell.setAttribute('disabled', '')
      return
    } else {
      // クリックごとに「turn-box-item」の下線をスイッチさせる
      if (isTurnCircle) {
        circleTurn.classList.remove('js-active')
        crossTurn.classList.add('js-active')
        isTurnCircle = false
      } else {
        crossTurn.classList.remove('js-active')
        circleTurn.classList.add('js-active')
        isTurnCircle = true
      }
    }

    // countがmaxCountに達したら引き分けとする
    count++
    if (count === maxCount) {
      state.innerHTML = 'draw'
    }
  })
})

// 勝敗をチェック
const checkWin = (num) => {
  for (let i = 0; i < winPatterns.length; i++) {
    // ループ内で勝敗のパターンを「pattern」に格納
    const pattern = winPatterns[i]

    // winPatterns内の配列データを分割代入
    const [index0, index1, index2] = pattern

    // patternに格納されたcellのnum(circleNum/crossNum)が同一だった場合、勝利とする
    if (
      board[index0] === num &&
      board[index1] === num &&
      board[index2] === num
    ) {
      isWin = true
      return
    }
  }
}

// Restartボタン
button.addEventListener('click', () => {
  location.reload()
  // Locationインターフェイス＝関連付けられたオブジェクトの場所 (URL)
})
