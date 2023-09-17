import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyComponent() {
  const [scrambledWord, setScrambledWord] = useState('');

  useEffect(() => {
    const fetchWord = async () => {
      try {
        const response = await axios.get('http://localhost:5551//get_word');
        setScrambledWord(response.data.scrambledWord);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWord(); // Trigger the request when the component is mounted
  }, []); // Empty dependency array means this effect runs once on mount
  // Render your component with the scrambledWord state
}
