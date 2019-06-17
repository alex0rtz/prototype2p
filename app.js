const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const Router = require('./utils/router');

app.get('/routes', (req, res) => {
    let ip = req.query.ip;
    let port = req.query.port;

    let routes = Router.list();

    let isset = routes.some(route => route.port === port);

    if (!isset) {
        Router.add(ip, port);
    }

    let router = Router.list();

    res.status(200).send({
        result: true,
        router,
        counts: router.length
    });
});

const HQ_SERVER = app.listen(3010, _ => {
    console.log(`HQ Server running on port ${HQ_SERVER.address().port}`);
});