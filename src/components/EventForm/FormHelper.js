import moment from 'moment';

const API = {
    categories: 'http://www.mocky.io/v2/5bcdd3942f00002c00c855ba',
    coordinators: 'http://www.mocky.io/v2/5bcdd7992f00006300c855d5',
    titleValidation: 'http://www.mocky.io/v2/5bcdd8732f00007300c855da'
}

export function parseOutput(input) {
    const secondsInHour = 60*60;
    const dateTimeValue = input.date + ' ' + input.time + ' ' + input.ampm;
    const date = moment(dateTimeValue).format('YYYY-MM-DDTHH:mm');

    const output = {
        title: input.title,
        description: input.description,
        category_id: Number(input.category),
        paid_event: input.paid_event === PAID_EVENT_VALUES.FREE ? 0 :1,
        event_fee: Number(input.fee),
        reward: Number(input.reward),
        date: date,
        duration: Number(input.duration) * secondsInHour,
        coordinator: {
            id: input.responsible,
            email: input.email
        }
    }

    return output;
}

export function getCategories() {
    return fetch(API.categories)
        .then(response => response.json());
}

export function getCoordinators() {
    return fetch(API.coordinators)
        .then(response => response.json());
}

export function validateTitle(title) {
    return fetch(API.titleValidation)
        .then(response => response.json())
        .then(events => events.map(event => event.title))
        .then(titles => !titles.includes(title));
}

export function getLogedInUserId() {
    return 3;
}

export const PAID_EVENT_VALUES = {
    FREE: 'FREE',
    PAID: 'PAID'
}

export const AM_PM_VALUES = {
    AM: 'AM',
    PM: 'PM'
}