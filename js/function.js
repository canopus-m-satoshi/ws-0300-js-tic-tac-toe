const cells = document.querySelectorAll('.cell') // NodeListで返却されるのでforeachが使用できる
const circleTurn = document.querySelector('.turn-box-item.circle')
const crossTurn = document.querySelector('.turn-box-item.cross')
const state = document.querySelector('.state')
const button = document.querySelector('.button')

const circlePlayer = '⚪︎'
const crossPlayer = '×'
const circleNum = 1
const crossNum = 2
const maxCount = 9
let count = 0
let isWin = false
let isTurnCircle = true

let board = [
  [0, 0, 0], // 1行目
  [0, 0, 0], // 2行目
  [0, 0, 0], // 3行目
]

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    // 空欄じゃないセルをクリックした場合は反応させない
    // 勝敗が決まったor引き分け時は反応させない
    if (cell.innerHTML != '' || count === maxCount || isWin) return

    // index = セルの添字を取得
    const row = Math.floor(index / 3) // クリックされた行の位置を特定
    const col = index % 3 // クリックされた列の位置を特定

    if (isTurnCircle) {
      cell.innerHTML = circlePlayer
      board[row][col] = circleNum
    } else {
      cell.innerHTML = crossPlayer
      board[row][col] = crossNum
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
      } else {
        circleTurn.classList.add('js-active')
        crossTurn.classList.remove('js-active')
      }
    }

    if (isTurnCircle) {
      isTurnCircle = false
    } else {
      isTurnCircle = true
    }

    // countがmaxCountに達したら引き分けとする
    count++
    if (count === maxCount) {
      state.innerHTML = 'draw'
    }
  })
})

const checkWin = (num) => {
  if (board[0][0] === num && board[0][1] === num && board[0][2] === num) {
    return (isWin = true)
  } else if (
    board[1][0] === num &&
    board[1][1] === num &&
    board[1][2] === num
  ) {
    return (isWin = true)
  } else if (
    board[2][0] === num &&
    board[2][1] === num &&
    board[2][2] === num
  ) {
    return (isWin = true)
  } else if (
    board[0][0] === num &&
    board[1][0] === num &&
    board[2][0] === num
  ) {
    return (isWin = true)
  } else if (
    board[0][1] === num &&
    board[1][1] === num &&
    board[2][1] === num
  ) {
    return (isWin = true)
  } else if (
    board[0][2] === num &&
    board[1][2] === num &&
    board[2][2] === num
  ) {
    return (isWin = true)
  } else if (
    board[0][0] === num &&
    board[1][1] === num &&
    board[2][2] === num
  ) {
    return (isWin = true)
  } else if (
    board[2][0] === num &&
    board[1][1] === num &&
    board[0][2] === num
  ) {
    return (isWin = true)
  }
}

// Restartボタン
button.addEventListener('click', () => {
  location.reload()
  // Locationインターフェイス＝関連付けられたオブジェクトの場所 (URL)
})
