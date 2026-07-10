import { DateTime } from 'luxon'

const TIMEZONE = 'America/Chicago'
const toLocalTime = (date) => DateTime.fromISO(date.toISOString()).setZone(TIMEZONE)

const nth = (d) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1:  return 'st'
        case 2:  return 'nd'
        case 3:  return 'rd'
        default: return 'th'
    }
}

export default {
    dateForFeed: (date) => {
        return date.toISOString()
    },
    isOldPost: (date) => {
        const d = toLocalTime(date)
        return DateTime.now().diff(d, 'years').years > 4
    },
    diffInYears: (date) => {
        const d = toLocalTime(date)
        return Math.floor(DateTime.now().diff(d, 'years').years)
    },
    toDateTime: (date) => {
        const formatted = DateTime.fromISO(date)

        const trail = (number) => {
            return parseInt(number, 10) < 10 ? `0${number}` : number
        }

        return `${formatted.year}-${trail(formatted.month)}-${trail(formatted.day)} ${trail(formatted.hour)}:${trail(formatted.minute)}`
    },
    isoDateOnly: (date) => {
        let d = new Date(date)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        let year = d.getFullYear()

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        return [year, month, day].join('-');
    },
    postDate: (date) => {
        return toLocalTime(date).toFormat('d MMMM yyyy')
    },
    postTime: (date) => {
        return toLocalTime(date).toFormat('HH:mm')
    },
    postDateNoYear: (date) => {
        return toLocalTime(date).toFormat('d MMMM')
    },
    toDateTimeForHCard: (date) => {
        return toLocalTime(date).toFormat('yyyy-MM-dd HH:mm:ss')
    },
}
