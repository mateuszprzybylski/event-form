import moment from "moment";

const API = {
  categories: "https://www.mocky.io/v2/5bcdd3942f00002c00c855ba",
  coordinators: "https://www.mocky.io/v2/5bcdd7992f00006300c855d5",
  titleValidation: "https://www.mocky.io/v2/5bcdd8732f00007300c855da"
};

export function parseOutput(input) {
  const secondsInHour = 60 * 60;

  const output = {
    title: input.title,
    description: input.description,
    category_id: Number(input.category),
    paid_event: input.paid_event === PAID_EVENT_VALUES.FREE ? 0 : 1,
    event_fee: Number(input.fee),
    reward: Number(input.reward),
    date: parseDateTime(input),
    duration: Number(input.duration) * secondsInHour,
    coordinator: {
      id: input.responsible,
      email: input.email
    }
  };

  return output;
}

function parseDateTime(input) {
  const { date, time, meridiem } = input;
  const dateTimeValue = date + " " + time + " " + meridiem;
  const outputFormat = "YYYY-MM-DDTHH:mm";

  return moment(dateTimeValue, "YYYY-MM-DD HH:mm am").format(outputFormat);
}

export function getCategories() {
  return fetch(API.categories).then(response => response.json());
}

const parseCoordinators = response => {
  return response.map(item => {
    return {
      name: [item.name, item.lastname].join(" "),
      id: item.id
    };
  });
};

export function getCoordinators() {
  return fetch(API.coordinators)
    .then(response => response.json())
    .then(json => parseCoordinators(json));
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

export const PAID_EVENT_VALUES = {
  FREE: "FREE",
  PAID: "PAID"
};

export const MERIDIEM_VALUES = {
  AM: "AM",
  PM: "PM"
};
