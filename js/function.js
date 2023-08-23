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
let board = new Array(cells.length).fill('')
let isWin = false

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

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    // 空欄じゃないセルをクリックした場合は反応させない
    // 勝敗が決まったor引き分け時は反応させない
    if (cell.innerHTML != '' || count === maxCount || isWin) return

    const isTurnCircle = count % 2 === 0

    const char = isTurnCircle ? circlePlayer : crossPlayer
    cell.innerHTML = char
    board[index] = char

    // 勝敗チェック
    isWin = checkWin(char)
    if (isWin) state.innerHTML = `${char} is win!`

    // クリックごとに「turn-box-item」の下線をスイッチさせる
    if (isTurnCircle) {
      circleTurn.classList.remove('js-active')
      crossTurn.classList.add('js-active')
    } else {
      crossTurn.classList.remove('js-active')
      circleTurn.classList.add('js-active')
    }

    // countがmaxCountに達したら引き分けとする
    count++
    if (count === maxCount) {
      state.innerHTML = 'draw'
    }
  })
})

// 勝敗をチェック
const checkWin = (char) => {
  for (let i = 0; i < winPatterns.length; i++) {
    // ループ内で勝敗のパターンを「pattern」に格納
    const pattern = winPatterns[i]

    // winPatterns内の配列データを分割代入
    const [index0, index1, index2] = pattern

    if (
      board[index0] === char &&
      board[index1] === char &&
      board[index2] === char
    ) {
      return true
    }
  }

  return false
}

// Restartボタン
button.addEventListener('click', () => {
  location.reload()
  // Locationインターフェイス＝関連付けられたオブジェクトの場所 (URL)
})
