const express = require('express');
const bodyParser = require('body-parser');
const http = require('https');


const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());

server.post('/getJoke', (req, res) => {
    const reqUrl = 'https://geek-jokes.sameerkumar.website/api';
    http.get(reqUrl, (responseFromAPI) => {
        let jokeData = '';
        responseFromAPI.on('data', (chunk) => {
            jokeData += chunk;
        });
        responseFromAPI.on('end', () => {
            const joke = JSON.parse(jokeData);

            return res.json({
                text: joke,
                source: 'getJoke'
            });
        });
    }, (error) => {
        return res.json({
            text : 'Something went wrong',
            source: 'getJoke'
        });
    });
});

server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});