export function getTime(timer) {
  let minute = Math.floor(timer / 60);
  minute = minute < 10 ? `0${minute}` : minute;

  let second = timer - minute * 60;
  second = second < 10 ? `0${second}` : second;

  return [minute, second];
}

export function getTimeText(timer) {
  const [minute, second] = getTime(timer);
  return `${minute} min ${second} sec`;
}

export function addToLocalStorage(name, data) {
  localStorage.setItem(name, JSON.stringify(data));
}

export function getFromLocalStorage(name, empty = null) {
  return JSON.parse(localStorage.getItem(name) || empty);
}

export function deleteToLocalStorage(name) {
  localStorage.removeItem(name);
}

export function randomIndex(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
