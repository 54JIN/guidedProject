import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

//Components
import HomePage from './components/HomePage';

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
