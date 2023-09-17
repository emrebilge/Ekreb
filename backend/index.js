const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(cors());

const baseURL = 'https://random-word-api.herokuapp.com/word';

let score = 0;
let guesses = 0;
let correct = 0;
let words = [];

// Function to fetch a random word from the API
async function fetchRandomWord() {
  try {
    const response = await axios.get(`${baseURL}`);
    return response.data; // Extract the first word from the API response array
  } catch (error) {
    throw error; // Handle errors as needed
  }
}

// Function to scramble a word (replace this with your actual scramble logic)
// Function to scramble a word (replace this with your actual scramble logic)
function scrambleWord(word) {
    // Implement your word scrambling logic here
    // For example, you can shuffle the characters in the word
    word = word[0];
    const shuffledWord = word.split('').sort(() => Math.random() - 0.5).join('');
    return shuffledWord;
  }
  

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/get_word', async (req, res) => {
  try {
    const randomWord = await fetchRandomWord(); // Fetch a random word using the API
    const scrambledWord = scrambleWord(randomWord); // Scramble the word

    res.json({ scrambledWord });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching a random word from the API' });
  }
});

app.get('/score', (req, res) => {
  res.send(`${score}`);
});

// Increment or decrement the score based on the query parameter
app.patch('/score', (req, res) => {
    const val = parseInt(req.query.val);
    if (!isNaN(val)) {
      score += val;
      res.status(200).json({ score, guessedWords });
    } else {
      res.status(400).json({ message: 'Invalid score value' });
    }
});

app.listen(PORT, () => {
  console.log(`Backend is running on http://localhost:${PORT}`);
});