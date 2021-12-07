import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './components/layout/Navbar';
import Forecast from './components/pages/Forecast';
import ForecastTypes from './components/pages/ForecastTypes';
import ForecastSetup from './components/pages/ForecastSetup';

function App() {
  const getFromState = useSelector((state) => state);
  const { colors } = getFromState.colors;

  const onLoad = () => {
    const rootVariable = {
      0: '--userInput',
      1: '--salesHistory',
      2: '--lastYear',
      3: '--movingAverage',
      4: '--weightedAverage',
      5: '--linearRegression',
    };
    for (let i = 0; i < colors.length; i++) {
      document.documentElement.style.setProperty(rootVariable[i], colors[i]);
    }
  };
  return (
    <div onLoad={onLoad()}>
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
