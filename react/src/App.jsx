import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

//Components
import HomePage from './components/HomePage';
import CharactersPage from './components/CharactersPage';
import FilmsPage from './components/FilmsPage';
import PlanetsPage from './components/PlanetsPage';

import './App.css'

function App() {

  return (
    <>
      <Router>
        <main>
          <div >
            <div className="row">
              <Routes>
                  <Route exact path="/" element={<HomePage />} />
                  <Route exact path="/character" element={<CharactersPage />} />
                  <Route exact path="/film" element={<FilmsPage />} />
                  <Route exact path="/planet" element={<PlanetsPage />} />
                  {/* <Route path="/Login" element={<LoginForm />} /> */}
              </Routes>
            </div>
          </div>
        </main>
      </Router>
    </>
  )
}

export default App
