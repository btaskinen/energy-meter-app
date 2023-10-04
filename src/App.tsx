import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import FlowHistory from './components/FlowHistory';
import Settings from './components/Settings';
import CurrentReading from './components/CurrentReading';
import './App.css';

export type Data = {
  flowRate: number;
  energyFlowRate: number;
  velocity: number;
  fluidSoundSpeed: number;
  temperatureInlet: number;
  temperatureOutlet: number;
  date: string;
};

const App = () => {
  const currentData: Data = {
    flowRate: 0.75,
    energyFlowRate: 18.5,
    velocity: 0.63,
    fluidSoundSpeed: 1657.1,
    temperatureInlet: 7.1,
    temperatureOutlet: 10.8,
    date: new Date().toString(),
  };
  const navigate = useNavigate();

  const logoutHandler = () => {
    navigate('/login');
  };

  return (
    <>
      <h1>Cooling Liquid Flow Rate</h1>
      <nav className="App_navbar">
        <Link to="/">Current Reading</Link>
        <Link to="/flow-history">Flow History</Link>
        <Link to="/settings">Settings</Link>
        <button className="App_logoutButton" onClick={logoutHandler}>
          Logout
        </button>
      </nav>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/flow-history" element={<FlowHistory />} />
        <Route path="/settings" element={<Settings />} />
        <Route
          path="/current-reading"
          element={<CurrentReading data={currentData} />}
        />
        <Route path="/" element={<Navigate replace to="/current-reading" />} />
      </Routes>
    </>
  );
};

export default App;
