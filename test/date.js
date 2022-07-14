const date = '14 Jul 2022 15.08 WIB'

const dateParser = (date) => {
    const dateSplit = date.split(' ');
    const day = dateSplit[0];
    const month = dateSplit[1];
    const year = dateSplit[2];
    const minutes = dateSplit[3];

    const minuteSplit = minutes.split('.');
    const hour = minuteSplit[0];
    const minute = minuteSplit[1];

    const dateParse = `${day}-${month}-${year} ${hour}:${minute}:00`;
    const dateObj = new Date(dateParse);
    const dateUTC = dateObj.toISOString();
    const dateTimestamp = +new Date(dateParse);

    return {
        dateParse,
        dateUTC,
        dateTimestamp
    }
}

console.log(dateParser(date))