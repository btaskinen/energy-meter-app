import { useEffect, useState } from 'react';
import { Data } from '../types';
import flowDataServices from '../services/flow-data';
import axios from 'axios';
import './CurrentReading.css';

type Props = {
  setNotification: (value: string) => void;
  setNotificationColor: (value: string) => void;
  logoutHandler: () => void;
};

const CurrentReading = ({
  setNotification,
  setNotificationColor,
  logoutHandler,
}: Props) => {
  const [currentData, setCurrentData] = useState<Data | null>(null);

  useEffect(() => {
    flowDataServices
      .getCurrentFlowData()
      .then((data) => setCurrentData(data))
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          setNotification(error.response?.data.error);
        } else {
          setNotification('An error occured.');
        }
        setNotificationColor('error');
        logoutHandler();
      });
  }, [setNotification, setNotificationColor, logoutHandler]);

  if (!currentData) {
    return <p>No current data available</p>;
  }

  return (
    <div className="CurrentReading">
      <div className="CurrentReading_label">Flow Rate</div>
      <div className="CurrentReading_value">
        {currentData.flowRate} m<sup>3</sup>/h
      </div>
      <div className="CurrentReading_label">Energy Flow Rate</div>
      <div className="CurrentReading_value">
        {currentData.energyFlowRate} GJ/h
      </div>
      <div className="CurrentReading_label">Velocity</div>
      <div className="CurrentReading_value">{currentData.velocity} m/s</div>
      <div className="CurrentReading_label">Fluid Sound Speed</div>
      <div className="CurrentReading_value">
        {currentData.fluidSoundSpeed} m/s
      </div>
      <div className="CurrentReading_label">Inlet Temperature</div>
      <div className="CurrentReading_value">
        {currentData.temperatureInlet} °C
      </div>
      <div className="CurrentReading_label">Outlet Temperature</div>
      <div className="CurrentReading_value">
        {currentData.temperatureOutlet} °C
      </div>
    </div>
  );
};

export default CurrentReading;
