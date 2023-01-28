const http = require('http');
const express = require('express');
const math = require('mathjs');
const {
    resourceLimits
} = require('worker_threads');
const app = express();

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// mathematician
app.get('/expression', async (req, res) => {
    let expression = decodeURIComponent(req.query.expression);
    console.log(expression);
    try {
        let result = await math.evaluate(expression).toString();
        res.send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }
});

app.listen(7774, () => {
    console.log('Math API listening on port 7774!');
});