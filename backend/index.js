const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 5551;

app.use(cors());
app.use(express.json());

const baseURL = 'https://random-word-api.herokuapp.com/word';

let score = 0;
let guesses = 0;
let correct = 0;
let currentWord = '';
let correctWords = [];

async function fetchRandomWord() {
  try {
    const response = await axios.get(`${baseURL}`);
    console.log(response.data);
    return response.data; // Extract the first word from the API response array
  } catch (error) {
    throw error;
  }
}

// Function to scramble a word (replace this with your actual scramble logic)
function scrambleWord(word) {
  word = word[0];
  const shuffledWord = word.split('').sort(() => Math.random() - 0.5).join('');
  return shuffledWord;
}

  
// send the score endpoint
app.get('/score', (req, res) => {
  res.send({ score });
});

app.get('/get_word', async (req, res) => {
  try {
    const randomWord = await fetchRandomWord(); // Fetch a random word using the API
    const scrambledWord = scrambleWord(randomWord); // Scramble the word
    currentWord = randomWord;
    res.json({ scrambledWord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching a random word from the API' });
  }
});

// Endpoint to update the score
app.patch('/score', (req, res) => {
  const val = parseInt(req.query.val);
  
  if (!isNaN(val)) { // check if val is a valid number
      score += val;
      res.status(200).json({ score });
    } else {
      res.status(400).json({ message: 'Invalid score value' });
    }
});

app.post('/validate', (req, res) => {
  console.log(currentWord);
  try {
    const userGuess = req.body.guess;
    guesses += 1;
    console.log(currentWord[0]);
    console.log(userGuess.toLowerCase() === currentWord[0].toLowerCase());
    if (userGuess.toLowerCase() === currentWord[0].toLowerCase()) {
      score += 10;
      correct += 1;
      correctWords.push(currentWord[0]);
      res.status(200).send({
        score,
        message: 'Correct guess',
      });
    } else {
      res.status(200).send({
        score,
        message: 'Incorrect guess',
      });
    }
  } catch (error) {
    console.error('Error in /validate:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
});


app.get('/correct_words', (req, res) => {
  res.send({ correctWords });
});

// end point to reset the game after the game is over 
app.post('/reset_game', (req, res) => {
  score = 0;
  correct = 0;
  guesses = 0;
  correctWords = [];
  res.json({ message: 'Game reset successfully' });
});

// retrieve the accuracy
app.get('/accuracy', (req, res) => {
  const accuracy = (correct / guesses) * 100;
  res.send({ accuracy });
});


app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});