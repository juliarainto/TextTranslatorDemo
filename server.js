const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const morgan = require('morgan');
const http = require('http');
const cors = require('cors');

const translate = require('google-translate-api');

const PORT = 3001;

// CORS enabled
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// logging with morgan
app.use(morgan('dev'));

app.post('/translate', function (req, res) {
    let language = req.body.lang;
    let text = req.body.text;

    translate(text, {
        to: language
    }).then(resp => {
        console.log(resp.text); 
        console.log(resp.from.language.iso);

        return res.status(200).json({
            text: resp.text,
            language: resp.from.language.iso,
        });
    }).catch(err => {
        console.error(err);
        return res.status(500).json({
            error: err
        });
    });
});

http.createServer(app).listen(PORT, function () {
    console.log('Server listening on port: ' + PORT);
});
