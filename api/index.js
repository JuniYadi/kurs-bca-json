const app = require('express')();
const BCA = require('@premiumfastnet/bca-kurs');

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
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

app.get('/api/kurs', async (req, res) => {
    const currency = new BCA();
    const datas = await currency.getCurrency();

    // date parser
    const dateConvert = dateParser(datas.check);

    res.json({
        check: datas.check,
        checkTimeUTC: dateConvert.dateUTC,
        checkTimestamp: dateConvert.dateTimestamp,
        data: datas.data
    });
})

module.exports = allowCors(app);