# Business Hours Module

A small module to check if sotre is open or closed based on a specific date.

## Installation
-----
```console
npm install @hafridi/business-hours
```

## Usage

```javascript
const BusinessHours = require('@hafridi/business-hours');

const periods = [
    {
        "close" : {
            "day" : 0,
            "time" : "1430"
        },
        "open" : {
            "day" : 0,
            "time" : "1130"
        }
    },
    {
        "close" : {
            "day" : 0,
            "time" : "2300"
        },
        "open" : {
            "day" : 0,
            "time" : "1730"
        }
    },
    {
        "close" : {
            "day" : 6,
            "time" : "0230"
        },
        "open" : {
            "day" : 5,
            "time" : "1200"
        }
    }
];

const timezone = 'America/New_York';

const bh = new BusinessHours(periods, timezone);

bh.isOpen(); //true or false
bh.getTodayHours(); // return back a timeline of todays hours
bh.getHumanReadable(); // returns a array of hours for the week
```

This uses moment-timezone to pull the current time based on the timezone passed and uses that as the basis for checking of the business is open or closed. This simple library relies on information being passed in a specific way. 

