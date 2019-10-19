// 정사각형 하나는 작은 정사각형 네 개로 쪼갤 수 있다.
function solution(board) {
  board.forEach((board2, i) =>
    board2.forEach((__, j) => {
      if (
        !board[i - 1] ||
        !board[i - 1][j - 1] ||
        !board[i - 1][j] ||
        !board[i][j - 1] ||
        !board2[j]
      )
        return;
      board[i][j] =
        Math.min(board[i - 1][j - 1], board[i - 1][j], board[i][j - 1]) + 1;
    })
  );

  return Math.max(...board.map(v => Math.max(...v))) ** 2;
}
