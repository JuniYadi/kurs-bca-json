const date = '14 Agt 2022 15.08 WIB'

const monthConv = {
    'jan': 'Jan',
    'feb': 'Feb',
    'mar': 'Mar',
    'apr': 'Apr',
    'may': 'May',
    'jun': 'Jun',
    'jul': 'Jul',
    'agt': 'Aug',
    'sep': 'Sep',
    'oct': 'Oct',
    'nov': 'Nov',
    'dec': 'Dec'
}

const dateParser = (date) => {
    const dateSplit = date.split(' ');
    const day = dateSplit[0];
    const month = dateSplit[1];
    const year = dateSplit[2];
    const minutes = dateSplit[3];

    const minuteSplit = minutes.split('.');
    const hour = minuteSplit[0];
    const minute = minuteSplit[1];

    const dateParse = `${day}-${monthConv[month.toLowerCase()]}-${year} ${hour}:${minute}:00`;
    // const dateParse = `${day}-${month}-${year} ${hour}:${minute}:00`;

    console.log('dateParse: ' + dateParse)

    const dateObj = new Date(dateParse);

    console.log('dateObj: ' + dateObj)

    const dateUTC = dateObj.toISOString();
    const dateTimestamp = +new Date(dateParse);

    return {
        dateParse,
        dateUTC,
        dateTimestamp
    }
}

console.log(dateParser(date))