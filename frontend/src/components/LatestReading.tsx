import { useEffect, useState } from 'react';
import { Data } from '../types';
import flowDataServices from '../services/flow-data';
import axios from 'axios';
import './LatestReading.css';

type Props = {
  setNotification: (value: string) => void;
  setNotificationColor: (value: string) => void;
  logoutHandler: () => void;
};

const LatestReading = ({
  setNotification,
  setNotificationColor,
  logoutHandler,
}: Props) => {
  const [latestData, setLatestData] = useState<Data | null>(null);

  useEffect(() => {
    flowDataServices
      .getLatestFlowData()
      .then((data) => setLatestData(data))
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

  if (!latestData) {
    return <p>No data available</p>;
  }

  return (
    <div className="LatestReading">
      <div className="LatestReading_label">Flow Rate</div>
      <div className="LatestReading_value">
        {latestData.flowRate} m<sup>3</sup>/h
      </div>
      <div className="LatestReading_label">Energy Flow Rate</div>
      <div className="LatestReadingg_value">
        {latestData.energyFlowRate} GJ/h
      </div>
      <div className="LatestReading_label">Velocity</div>
      <div className="LatestReading_value">{latestData.velocity} m/s</div>
      <div className="LatestReading_label">Fluid Sound Speed</div>
      <div className="LatestReading_value">
        {latestData.fluidSoundSpeed} m/s
      </div>
      <div className="LatestReading_label">Inlet Temperature</div>
      <div className="LatestReading_value">
        {latestData.temperatureInlet} °C
      </div>
      <div className="LatestReading_label">Outlet Temperature</div>
      <div className="LatestReading_value">
        {latestData.temperatureOutlet} °C
      </div>
    </div>
  );
};

export default LatestReading;
