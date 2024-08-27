import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Home';
import FilmDetails from './FilmDetails';
import FilmSearch from './FilmSearch.jsx';

function App() {

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recherche" element={<FilmSearch />} />
        <Route path="/film/:id" element={<FilmDetails />} />
      </Routes>
    </Router>
  )
}

export default App
