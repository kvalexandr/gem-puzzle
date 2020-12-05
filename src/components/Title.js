/* eslint-disable class-methods-use-this */
export default class Title {
  constructor(container) {
    this.container = container;
    this.title = this.createTitle();
    this.container.appendChild(this.title);
  }

  createTitle() {
    const title = document.createElement('div');
    title.classList.add('title');
    title.innerHTML = 'The Gem Puzzle';

    return title;
  }
}
