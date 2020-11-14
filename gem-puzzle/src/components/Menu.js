import { addToLocalStorage, getFromLocalStorage } from './utils';

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

  // eslint-disable-next-line class-methods-use-this
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
      console.log('back');
      this.menuChange(menu, this.mainmenu);
    });

    this.el.appendChild(menu);
  }
}
