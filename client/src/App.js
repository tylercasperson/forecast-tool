import './App.css';
import Navbar from './components/layout/Navbar';
import Forecast from './components/pages/Forecast';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Forecast />
    </div>
  );
}

export default App;
