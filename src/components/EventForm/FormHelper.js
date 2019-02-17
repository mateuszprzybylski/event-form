import moment from 'moment';

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

export const PAID_EVENT_VALUES = {
    FREE: 'FREE',
    PAID: 'PAID'
}

export const AM_PM_VALUES = {
    AM: 'AM',
    PM: 'PM'
}