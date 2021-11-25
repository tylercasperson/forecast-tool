import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Forecast from './components/pages/Forecast';
import ForecastTypes from './components/pages/ForecastTypes';
import ForecastSetup from './components/pages/ForecastSetup';

function App() {
  return (
    <div>
      <Navbar />
      <Router>
        <Routes>
          <Route path='/' element={<Forecast />} exact />
          <Route path='/forecastTypes' element={<ForecastTypes />} />
          <Route path='/forecastSetup' element={<ForecastSetup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
