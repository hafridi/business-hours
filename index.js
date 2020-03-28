'use strict';
const moment = require("moment-timezone");

class ListingHours {

    constructor(periods, timezone) { 
        this.periods = periods;
        this.timezone = timezone;
    }

    /**
     * Returns Array of readable hours
     */
    getHumanReadable() { 
        const readable = [];
        const weekdays = moment.weekdays();

        for (let i = 0; i < weekdays.length; ++i) {
            const filtered = this.periods.filter(p => p.open.day === i);

            if (filtered.length === 0) {
                readable.push(`${weekdays[i]}: Closed`);
                continue;
            }
            
            const sorted = filtered.sort((a, b) => moment(a.open.time, 'HHmm') - moment(b.open.time, 'HHmm'));

            let hr = `${weekdays[i]}: `;
            for (let j = 0; j < sorted.length; ++j) {
                const start = moment(sorted[j].open.time, 'HHmm').format('hh:mm a');
                const end = moment(sorted[j].close.time, 'HHmm').format('hh:mm a');
                if (start === end) {
                    hr += `Open 24 hours`;
                    break;
                }
                hr += `${start} - ${end}`;

                if (j < sorted.length - 1) {
                    hr += ', ';
                }
            }
            readable.push(hr);
        }
        return readable;
    }

    /**
     * Returns business hours for the day
     */
    getTodaysHours() { 
        const current = moment.tz(this.timezone);
        let weekday = current.weekday();
        const filtered = this.periods.filter(p => {
            return p.open.day === weekday || p.close.day === weekday;
        });

        if (filtered.length === 0) return [];
        const timeline = [];
        for (let f of filtered) {
            let start, end;
            if (f.open.day === weekday) {
                start = moment(f.open.time, 'HHmm').tz(this.timezone).set({
                    second: 0,
                    millisecond: 0
                });
                if (f.close.day !== weekday) {
                    end = moment.tz(this.timezone).endOf('day');
                } else {
                    end = moment(f.close.time, 'HHmm').tz(this.timezone).set({
                        second: 0,
                        millisecond: 0
                    });
                }
            } else if (f.close.day === weekday) {
                start = moment.tz(this.timezone).startOf('day');
                end = moment(f.close.time, 'HHmm').tz(this.timezone).set({
                    second: 0,
                    millisecond: 0
                });
            }

            timeline.push({
                start,
                end
            });
        }

        return timeline;
    }

    /**
     * Returns back if restaurant is open or currently closed
     */
    isOpen() {
        const current = moment.tz(this.timezone);
        const timeline = this.getTodaysHours();
        for (let t of timeline) {
            if (current.isBetween(t.start, t.end)) return true;
        }
        return false;
    }
}

module.exports = ListingHours;
