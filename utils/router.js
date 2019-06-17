const fs = require('fs');
const moment = require('moment');

const random = require('../lib/random');

const list = _ => {
    let data = fs.readFileSync('./data/router.ip.json');
    return (data.length > 0) ? JSON.parse(data) : [];
}

const add = (ip, port) => {
    let routesTable = list();

    if (routesTable.some(route => route.ip === ip && route.port === port)) {
        return;
    }

    routesTable.push({ id: +`${moment().unix()}${random.number(1, 200)}`, ip, port });

    fs.writeFileSync('./data/router.ip.json', JSON.stringify(routesTable));
}

module.exports = {list, add}