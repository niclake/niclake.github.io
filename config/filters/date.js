import { DateTime } from 'luxon'
import moment from 'moment'

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
        const d = DateTime.fromISO(date.toISOString())
            .setZone('America/Chicago')

        return DateTime.now().diff(d, 'years').years > 4
    },
    diffInYears: (date) => {
        const d = DateTime.fromISO(date.toISOString())
            .setZone('America/Chicago')

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
        const d = new Date(date)
        const month = d.toLocaleString('default', { month: 'long' })
        const day = d.getDate()
        const nominal = nth(d.getDate())
        const year = d.getFullYear()

        return `${day} ${month} ${year}`
    },
    postTime: (date) => {
        return DateTime.fromISO(date.toISOString())
            .setZone('America/Chicago')
            .toFormat('HH:mm')
    },
    postDateNoYear: (date) => {
        const d = DateTime.fromISO(date.toISOString())
            .setZone('America/Chicago')

        return `${d.toFormat(`d MMMM`)}`
    },
    toDateTimeForHCard: (date) => {
        return DateTime.fromISO(date.toISOString())
            .setZone('America/Chicago')
            .toFormat('yyyy-MM-dd HH:mm:ss')
    },
}
