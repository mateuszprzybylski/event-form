import moment from "moment";

export function parseFormData(input) {
  const secondsInHour = 60 * 60;

  const output = {
    title: input.title,
    description: input.description,
    category_id: Number(input.category),
    paid_event: input.paid_event === PAID_EVENT_VALUES.PAID,
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

export function parseDateTime(input) {
  const { date, time, meridiem } = input;
  const dateTimeValue = date + " " + time + " " + meridiem;
  const outputFormat = "YYYY-MM-DDTHH:mm";

  return moment(dateTimeValue, "YYYY-MM-DD HH:mm am").format(outputFormat);
}

export function parseCoordinators(coordinators) {
  return coordinators.map(item => {
    return {
      name: [item.name, item.lastname].join(" "),
      id: item.id
    };
  });
};

export const PAID_EVENT_VALUES = {
  FREE: "FREE",
  PAID: "PAID"
};

export const MERIDIEM_VALUES = {
  AM: "AM",
  PM: "PM"
};
