import { FormEvent, useState, useEffect } from 'react';
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import FlowHistory from './components/FlowHistory';
import Settings from './components/Settings';
import CurrentReading from './components/CurrentReading';
import loginServices from './services/login';
import flowDataServices from './services/flow-data';
import { LoginData, User } from './types';
import Notification from './components/Notification';
import axios from 'axios';
import './App.css';

const App = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [notification, setNotification] = useState<string>('');
  const [notificationType, setNotificationColor] = useState<string>('');

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(
      'loggedFlowMeterAppUser'
    );
    if (loggedUserJSON) {
      const user: User = JSON.parse(loggedUserJSON);
      flowDataServices.setToken(user.token);
      setUser(user);
    }
  }, []);

  const navigate = useNavigate();

  const loginHandler = async (event: FormEvent) => {
    event.preventDefault();

    const userCredentials: LoginData = {
      username,
      password,
    };
    try {
      const loggedInUser: User = await loginServices.login(userCredentials);
      console.log(loggedInUser);
      setUser(loggedInUser);
      window.localStorage.setItem(
        'loggedFlowMeterAppUser',
        JSON.stringify(loggedInUser)
      );
      flowDataServices.setToken(loggedInUser.token);
      setUsername('');
      setPassword('');
      setNotification('');
      setNotificationColor('');
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setNotification(error.response?.data.error);
      } else {
        setNotification('An error occured.');
      }
      setNotificationColor('error');
    }
  };

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedFlowMeterAppUser');
    setUser(null);
    navigate('/login');
  };

  return (
    <>
      <h1>Cooling Liquid Flow Rate</h1>
      {user && (
        <>
          <p>{user.name} is logged in</p>
          <nav className="App_navbar">
            <Link to="/">Current Reading</Link>
            <Link to="/flow-history">Flow History</Link>
            <Link to="/settings">Settings</Link>
            <button className="App_logoutButton" onClick={logoutHandler}>
              Logout
            </button>
          </nav>
        </>
      )}
      <Notification message={notification} type={notificationType} />
      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate replace to="/" />
            ) : (
              <LoginPage
                username={username}
                password={password}
                setPassword={setPassword}
                setUsername={setUsername}
                handleLogin={loginHandler}
              />
            )
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
              <CurrentReading
                setNotification={setNotification}
                setNotificationColor={setNotificationColor}
                logoutHandler={logoutHandler}
              />
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
