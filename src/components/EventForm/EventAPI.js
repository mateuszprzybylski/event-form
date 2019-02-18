const API = {
  categories: "https://www.mocky.io/v2/5bcdd3942f00002c00c855ba",
  coordinators: "https://www.mocky.io/v2/5bcdd7992f00006300c855d5",
  titleValidation: "https://www.mocky.io/v2/5bcdd8732f00007300c855da"
};

export function getCategories() {
  return fetch(API.categories).then(response => response.json());
}

export function getCoordinators() {
  return fetch(API.coordinators)
    .then(response => response.json());
}

export function isTitleInUse(title) {
  return fetch(API.titleValidation)
    .then(response => response.json())
    .then(events => events.map(event => event.title))
    .then(titles => titles.includes(title));
}

export function getLogedInUserId() {
  return 3;
}