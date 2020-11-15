export default class Gem {
  constructor(board, index, position = null) {
    this.board = board;
    this.index = index;
    this.position = position !== null ? position : index;

    this.width = 100 / this.board.size;
    this.height = 100 / this.board.size;

    this.isEmpty = false;
    this.gem = this.createGem();
    this.board.board.appendChild(this.gem);

    if (this.index === this.board.size ** 2 - 1) {
      this.isEmpty = true;
      return;
    }

    this.setPosition(this.position);
    this.setData(this.index);
  }

  setData(index) {
    this.gem.innerHTML = index + 1;

    this.gem.style.width = `${this.width}%`;
    this.gem.style.height = `${this.height}%`;

    const { x: left, y: top } = this.getXY(index);

    this.gem.style.backgroundImage = `url(${this.board.imageSrc})`;
    this.gem.style.backgroundPosition = `-${(this.board.width / this.board.size) * left}px -${(this.board.width / this.board.size) * top}px`;
  }

  setPosition(index) {
    const { x: left, y: top } = this.getXY(index);
    this.gem.style.top = `${this.height * top}%`;
    this.gem.style.left = `${this.width * left}%`;
  }

  createGem() {
    const gem = document.createElement('div');
    gem.classList.add('gem');
    gem.style.backgroundSize = `${this.board.width}px`;

    gem.addEventListener('click', () => {
      const emptyGem = this.board.findEmpty();
      const currentGem = this.board.findPosition(this.index);

      const { x: leftEmpty, y: topEmpty } = this.getXY(emptyGem);
      const { x: leftCurrent, y: topCurrent } = this.getXY(currentGem);

      const leftDiff = Math.abs(leftEmpty - leftCurrent);
      const topDiff = Math.abs(topEmpty - topCurrent);

      if (leftDiff + topDiff > 1) {
        return;
      }

      this.board.move += 1;
      this.board.onSwap(this.board.move);
      this.board.swapGems(emptyGem, currentGem);

      if (this.board.isWin()) {
        // this.board.stop();
        this.board.onFinished();
      }
    });

    return gem;
  }

  getXY(index) {
    const x = index % this.board.size;
    const y = (index - x) / this.board.size;

    return { x, y };
  }
}
