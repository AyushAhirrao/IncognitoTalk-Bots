// calculator
const math = require('mathjs');

// cpp
const {
    CppCompile
} = require('../compiler/cpp');

// java
const {
    javaCompile
} = require('../compiler/java');

// python
const {
    PythonCompile
} = require('../compiler/python');


const express = require('express');
const app = express();

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// calculator bot
app.get('/calculate', async (req, res) => {
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

// compiler bot
app.get('/compiler', async (req, res) => {
    let lang = decodeURIComponent(req.query.lang);
    let code = decodeURIComponent(req.query.code);
    let input = decodeURIComponent(req.query.input);

    console.log(lang, code, input);
    try {
        // cpp
        if (lang === 'cpp') {
            await CppCompile(code, input)
                .then(result => {
                    res.send(JSON.stringify({
                        stdout: result.stdout,
                        stderr: result.stderr,
                        statusMes: result.statusMes
                    }));
                })
                .catch(error => {
                    console.error(error)
                });
        }
        // Java
        else if (lang === 'java') {
            await javaCompile(code, input)
                .then(result => {
                    res.send(JSON.stringify({
                        stdout: result.stdout,
                        stderr: result.stderr,
                        statusMes: result.statusMes
                    }));
                })
                .catch(error => {
                    console.error(error)
                });
        }
        // Python
        else if (lang === 'python') {
            await PythonCompile(code, input)
                .then(result => {
                    res.send(JSON.stringify({
                        stdout: result.stdout,
                        stderr: result.stderr,
                        statusMes: result.statusMes
                    }));
                })
                .catch(error => {
                    console.error(error)
                });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message);
    }

});


app.listen(7774, () => {
    console.log('API listening on port 7774!');
});