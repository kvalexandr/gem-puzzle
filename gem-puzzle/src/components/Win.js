export default class Win {
  constructor(board) {
    this.board = board;
    this.createWin();
  }

  createWin() {
    this.el = document.createElement('div');
    this.el.classList.add('menu');
  }

  createWinNewGame(move, time) {
    const congrat = document.createElement('div');
    congrat.classList.add('congrat');
    congrat.innerHTML = 'Congratulations!';
    this.el.appendChild(congrat);

    const solved = document.createElement('div');
    solved.classList.add('solved');
    solved.innerHTML = 'You have solved The Gem Puzzle!';
    this.el.appendChild(solved);

    const stats = document.createElement('div');
    stats.classList.add('stats');
    stats.innerHTML = `You won the game in ${move} moves!<br>You've spent ${time}`;
    this.el.appendChild(stats);

    this.newgame = document.createElement('a');
    this.newgame.innerHTML = 'New Game';
    this.newgame.href = '#';
    this.newgame.classList.add('menu__link');
    this.el.appendChild(this.newgame);
  }
}
