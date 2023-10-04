import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import FlowHistory from './components/FlowHistory';
import Settings from './components/Settings';
import CurrentReading from './components/CurrentReading';
import './App.css';

const App = () => {
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
        <Route path="/current-reading" element={<CurrentReading />} />
        <Route path="/" element={<Navigate replace to="/current-reading" />} />
      </Routes>
    </>
  );
};

export default App;
