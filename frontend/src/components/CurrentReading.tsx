import { useEffect, useState } from 'react';
import { Data } from '../types';
import flowDataServices from '../services/flow-data';
import axios from 'axios';

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
    <div>
      <div>Flow Rate</div>
      <div>
        {currentData.flowRate} m<sup>3</sup>/h
      </div>
      <div>Energy Flow Rate</div>
      <div>{currentData.energyFlowRate} GJ/h</div>
      <div>Velocity</div>
      <div>{currentData.velocity} m/s</div>
      <div>Fluid Sound Speed</div>
      <div>{currentData.fluidSoundSpeed} m/s</div>
      <div>Inlet Temperature</div>
      <div>{currentData.temperatureInlet} °C</div>
      <div>Outlet Temperature</div>
      <div>{currentData.temperatureOutlet} °C</div>
    </div>
  );
};

export default CurrentReading;
