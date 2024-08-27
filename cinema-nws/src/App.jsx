import { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios';

const API_KEY = '18ffbdd4f338668948dfeecc71baa949';
const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-US&page=1`;

function App() {
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(URL);
        console.log(response.data.results);
      } catch (error) {
        console.error('Erreur lors de la récupération des films:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <>
      <h1>hello</h1>
    </>
  )
}

export default App
