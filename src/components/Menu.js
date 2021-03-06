/* eslint-disable class-methods-use-this */
import { addToLocalStorage, getFromLocalStorage, getTimeText } from './utils';

export default class Menu {
  constructor(board) {
    this.board = board;
    this.createOverlay();
  }

  createOverlay() {
    this.el = document.createElement('div');
    this.el.classList.add('menu');

    this.createMenuMain();
    this.createMenuSettings();
    this.createMenuAbout();
  }

  createMenuMain() {
    this.mainmenu = document.createElement('div');
    this.mainmenu.classList.add('menu-main');
    this.mainmenu.classList.add('menu-block');

    const menuItemNewGame = document.createElement('div');
    menuItemNewGame.classList.add('menu_item');
    this.mainmenu.appendChild(menuItemNewGame);
    this.newgame = document.createElement('a');
    this.newgame.innerHTML = 'New Game';
    this.newgame.href = '#';
    this.newgame.classList.add('menu__link');
    menuItemNewGame.appendChild(this.newgame);

    const menuItemScore = document.createElement('div');
    menuItemScore.classList.add('menu_item');
    this.mainmenu.appendChild(menuItemScore);
    this.scores = document.createElement('a');
    this.scores.innerHTML = 'Best scores';
    this.scores.href = '#';
    this.scores.classList.add('menu__link');
    this.scores.addEventListener('click', () => {
      this.createMenuScore();
      this.menuChange(this.mainmenu, this.scoremenu);
    });
    menuItemScore.appendChild(this.scores);

    const menuItemSettings = document.createElement('div');
    menuItemSettings.classList.add('menu_item');
    this.mainmenu.appendChild(menuItemSettings);
    this.settings = document.createElement('a');
    this.settings.innerHTML = 'Settings';
    this.settings.href = '#';
    this.settings.classList.add('menu__link');
    this.settings.addEventListener('click', () => {
      this.menuChange(this.mainmenu, this.settingsmenu);
    });
    menuItemSettings.appendChild(this.settings);

    const menuItemAbout = document.createElement('div');
    menuItemAbout.classList.add('menu_item');
    this.mainmenu.appendChild(menuItemAbout);
    this.about = document.createElement('a');
    this.about.innerHTML = 'Readme';
    this.about.href = '#';
    this.about.classList.add('menu__link');
    this.about.addEventListener('click', () => {
      this.menuChange(this.mainmenu, this.aboutmenu);
    });
    menuItemAbout.appendChild(this.about);

    this.el.appendChild(this.mainmenu);
  }

  createMenuSettings() {
    this.settingsmenu = document.createElement('div');
    this.settingsmenu.classList.add('menu-settings');
    this.settingsmenu.classList.add('menu-block');
    this.settingsmenu.classList.add('menu-hide');

    const menuTitle = document.createElement('h2');
    menuTitle.classList.add('menu_title');
    menuTitle.innerHTML = 'Settings';
    this.settingsmenu.appendChild(menuTitle);

    const menuItem = document.createElement('div');
    menuItem.classList.add('menu_item');
    this.settingsmenu.appendChild(menuItem);

    const labelSizeSelect = document.createElement('label');
    labelSizeSelect.classList.add('menu_label');
    labelSizeSelect.innerHTML = 'Field size:';
    menuItem.appendChild(labelSizeSelect);

    const sizeselect = document.createElement('select');
    sizeselect.classList.add('menu__link');

    const settingsStorage = getFromLocalStorage('settings', '{}');
    const size = settingsStorage.size || this.board.size;

    const sizeArr = [3, 4, 5, 6, 7, 8];
    sizeArr.forEach(s => {
      const option = document.createElement('option');
      option.value = s;
      option.text = `${s}x${s}`;
      if (parseInt(size, 10) === s) {
        option.selected = true;
      }
      sizeselect.appendChild(option);
    });

    sizeselect.addEventListener('change', () => {
      settingsStorage.size = sizeselect.value;
      addToLocalStorage('settings', settingsStorage);
    });

    menuItem.appendChild(sizeselect);

    this.linkBack(this.settingsmenu);

    this.el.appendChild(this.settingsmenu);
  }

  createMenuAbout() {
    this.aboutmenu = document.createElement('div');
    this.aboutmenu.classList.add('menu-about');
    this.aboutmenu.classList.add('menu-block');
    this.aboutmenu.classList.add('menu-hide');

    const menuTitle = document.createElement('h2');
    menuTitle.classList.add('menu_title');
    menuTitle.innerHTML = 'About game';
    this.aboutmenu.appendChild(menuTitle);

    const divDescr = document.createElement('div');
    divDescr.classList.add('about');

    const divDescrItem = document.createElement('div');
    divDescrItem.innerHTML = `
      1. Игра начинается сразу после загрузки<br><br>
      2. Сохранение игры происходит в каждый момент времени и при перезагрузке будет начинаться с того места где закончили.<br><br>
      3. В настройках можно выбрать размер поля.<br><br>
      4. После выбора размера поля, необходимо начать новую игру.
    `;

    divDescr.appendChild(divDescrItem);

    this.aboutmenu.appendChild(divDescr);
    this.linkBack(this.aboutmenu);

    this.el.appendChild(this.aboutmenu);
  }

  createMenuScore() {
    this.scoremenu = document.createElement('div');
    this.scoremenu.classList.add('menu-score');
    this.scoremenu.classList.add('menu-block');
    this.scoremenu.classList.add('menu-hide');

    const menuTitle = document.createElement('h2');
    menuTitle.classList.add('menu_title');
    menuTitle.innerHTML = 'Best scores';
    this.scoremenu.appendChild(menuTitle);

    const divScoreTitle = document.createElement('div');
    divScoreTitle.classList.add('score');

    const divDateTitle = document.createElement('div');
    divDateTitle.classList.add('score__date', 'score__title');
    divDateTitle.innerHTML = 'Date';
    divScoreTitle.appendChild(divDateTitle);

    const divSizeTitle = document.createElement('div');
    divSizeTitle.classList.add('score__size', 'score__title');
    divSizeTitle.innerHTML = 'Size';
    divScoreTitle.appendChild(divSizeTitle);

    const divMoveTitle = document.createElement('div');
    divMoveTitle.classList.add('score__move', 'score__title');
    divMoveTitle.innerHTML = 'Moves';
    divScoreTitle.appendChild(divMoveTitle);

    const divTimeTitle = document.createElement('div');
    divTimeTitle.classList.add('score__time', 'score__title');
    divTimeTitle.innerHTML = 'Time';
    divScoreTitle.appendChild(divTimeTitle);

    this.scoremenu.appendChild(divScoreTitle);

    const scoreStoarage = getFromLocalStorage('score', '[]');
    scoreStoarage.forEach(item => {
      const divScore = document.createElement('div');
      divScore.classList.add('score');

      const divDate = document.createElement('div');
      divDate.classList.add('score__date');
      divDate.innerHTML = item.date;
      divScore.appendChild(divDate);

      const divSize = document.createElement('div');
      divSize.classList.add('score__size');
      divSize.innerHTML = `${item.size}x${item.size}`;
      divScore.appendChild(divSize);

      const divMove = document.createElement('div');
      divMove.classList.add('score__move');
      divMove.innerHTML = item.move;
      divScore.appendChild(divMove);

      const divTime = document.createElement('div');
      divTime.classList.add('score__time');
      divTime.innerHTML = getTimeText(item.time);
      divScore.appendChild(divTime);

      this.scoremenu.appendChild(divScore);
    });

    this.linkBack(this.scoremenu);

    this.el.appendChild(this.scoremenu);
  }

  menuChange(from, to) {
    from.classList.add('menu-hide');
    to.classList.remove('menu-hide');
  }

  linkBack(menu) {
    const back = document.createElement('a');
    back.innerHTML = 'Go Back';
    back.href = '#';
    back.classList.add('menu__link');
    back.classList.add('menu-back');
    menu.appendChild(back);

    back.addEventListener('click', () => {
      this.menuChange(menu, this.mainmenu);
    });

    this.el.appendChild(menu);
  }
}
