import { FormEvent, useState } from 'react';
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

type User = {
  username: string;
};

const App = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

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

  const loginHandler = (event: FormEvent) => {
    event.preventDefault();
    const loggedInUser: User = {
      username,
    };
    setUser(loggedInUser);
    console.log(user);
    console.log(username, password);
    setUsername('');
    setPassword('');
    navigate('/');
  };

  const logoutHandler = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <h1>Cooling Liquid Flow Rate</h1>
      {user && <p>{user.username} is logged in</p>}
      <nav className="App_navbar">
        <Link to="/">Current Reading</Link>
        <Link to="/flow-history">Flow History</Link>
        <Link to="/settings">Settings</Link>
        <button className="App_logoutButton" onClick={logoutHandler}>
          Logout
        </button>
      </nav>
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage
              username={username}
              password={password}
              setPassword={setPassword}
              setUsername={setUsername}
              handleLogin={loginHandler}
            />
          }
        />
        <Route
          path="/flow-history"
          element={user ? <FlowHistory /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/settings"
          element={user ? <Settings /> : <Navigate replace to="/login" />}
        />
        <Route
          path="/current-reading"
          element={
            user ? (
              <CurrentReading data={currentData} />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
        <Route
          path="/"
          element={
            user ? (
              <Navigate replace to="/current-reading" />
            ) : (
              <Navigate replace to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;
