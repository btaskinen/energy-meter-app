import { FormEvent, useState, useEffect } from 'react';
import {
  Routes,
  Route,
  Link,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
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
  const [currentLocation, setCurrentLocation] = useState<string>('/login');

  const location = useLocation();

  useEffect(() => {
    setCurrentLocation(location.pathname);
  }, [location]);

  console.log(location);

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
      <h1 className="App_title">Cooling Liquid Flow Rate</h1>
      <div className="App_container">
        {user && (
          <>
            <div className="App_loggedUser">
              <button className="App_logoutButton" onClick={logoutHandler}>
                Logout
              </button>
              <p>{user.name} is logged in</p>
            </div>
            <nav className="App_navbar">
              <Link
                className={
                  currentLocation === '/current-reading'
                    ? 'App_navLink selected'
                    : 'App_navLink'
                }
                to="/"
              >
                Current Reading
              </Link>
              <Link
                className={
                  currentLocation === '/flow-history'
                    ? 'App_navLink selected'
                    : 'App_navLink'
                }
                to="/flow-history"
              >
                Flow History
              </Link>
              <Link
                className={
                  currentLocation === '/settings'
                    ? 'App_navLink selected'
                    : 'App_navLink'
                }
                to="/settings"
              >
                Settings
              </Link>
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
      </div>
      <footer>&copy; Barbara Taskinen</footer>
    </>
  );
};

export default App;
