const app = require('express')();
const BCA = require('@premiumfastnet/bca-kurs');

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
    const dateObj = new Date(dateParse);

    console.log(dateObj)

    const dateUTC = dateObj.toISOString();
    const dateTimestamp = +new Date(dateParse);

    return {
        dateParse,
        dateUTC,
        dateTimestamp
    }
}

app.get('/api/kurs', async (req, res) => {
    const currency = new BCA();
    const datas = await currency.getCurrency();

    console.log(datas)

    // date parser
    const dateConvert = dateParser(datas.check);

    res.json({
        check: datas.check,
        checkTimeUTC: dateConvert.dateUTC,
        checkTimestamp: dateConvert.dateTimestamp,
        data: datas.data
    });
})

module.exports = app;