const express = require('express');
const cors = require('cores');
const app = express();
const PORT = 3000;

// app.use(cors()); // this is for security, eventually we need it so that 
// see for yourself what happens when you get to the front end stage^

let score = 0;


app.get('/', (req, res) => {
    res.send('hello world!');
});

app.get(`/score`, (req, res) => {
    res.send(`${score}`);
});


// path not working here:
// app.patch('score', (req, res) => {
//     score += parseInt(req.query.val);
//     res.send(`${score}`);
// });


// eventually you will need to send the backend a guess, and tell them whether or not it was wrong.
// one way is through status codes, here is one way:
app.patch('/score', (req, res) => {
    score += parseInt(req.query.val);
    res.status(250).send(`${score}`);
});
// different number ranges mean different things. Will have to do it for later endpoints.


// one more package cors

app.listen(PORT, () => {
    console.log(`Backend is running on https://localhost:${PORT}`);
})

// nodemon is not working