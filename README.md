# Listing Hours

A small module to check if store is open or closed based on a specific date.

## Installation
-----
```console
npm install listing-hours
```

## Usage

```javascript
const ListingHours = require('listing-hours');

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

const lh = new ListingHours(periods, timezone);

lh.isOpen(); //true or false
lh.getTodayHours(); // return back a timeline of todays hours
lh.getHumanReadable(); // returns a array of hours for the week
```

This uses moment-timezone to pull the current time based on the timezone passed and uses that as the basis for checking if the business is open or closed. This simple library relies on information being passed in a specific way. 

