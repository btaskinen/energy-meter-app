import { useState, useEffect } from 'react';
import { Data } from '../types';
import flowDataServices from '../services/flow-data';
import axios from 'axios';
import { LineChart } from '@mui/x-charts';

import './FlowHistory.css';

type Props = {
  setNotification: (value: string) => void;
  setNotificationColor: (value: string) => void;
  logoutHandler: () => void;
};

type FlowDataType =
  | 'flow-rate'
  | 'energy-flow-rate'
  | 'velocity'
  | 'fluid-sound-speed'
  | 'temperature-inlet'
  | 'temperature-outlet';

type DispalyData = {
  time: number[];
  values: number[];
};

const FlowHistory = ({
  setNotification,
  setNotificationColor,
  logoutHandler,
}: Props) => {
  const [allData, setAllData] = useState<Data[] | null>(null);
  const [displayData, setDisplayData] = useState<DispalyData>(null);

  useEffect(() => {
    flowDataServices
      .getAllFlowData()
      .then((data) => setAllData(data))
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

  if (!allData) {
    return <p>No data available</p>;
  }

  console.log(allData);

  const selectDataHandler = (flowDataType: FlowDataType) => {
    let displayTimes: number[];
    let displayValues: number[];

    switch (flowDataType) {
      case 'flow-rate':
        displayTimes = allData.map((data) => Date.parse(data.date));
        displayValues = allData.map((data) => data.flowRate);
        setDisplayData({
          time: displayTimes,
          values: displayValues,
        });
        break;
      case 'energy-flow-rate':
        displayTimes = allData.map((data) => Date.parse(data.date));
        displayValues = allData.map((data) => data.energyFlowRate);
        setDisplayData({
          time: displayTimes,
          values: displayValues,
        });
        break;
      case 'fluid-sound-speed':
        displayTimes = allData.map((data) => Date.parse(data.date));
        displayValues = allData.map((data) => data.fluidSoundSpeed);
        setDisplayData({
          time: displayTimes,
          values: displayValues,
        });
        break;
      case 'temperature-inlet':
        displayTimes = allData.map((data) => Date.parse(data.date));
        displayValues = allData.map((data) => data.temperatureInlet);
        setDisplayData({
          time: displayTimes,
          values: displayValues,
        });
        break;
      case 'temperature-outlet':
        displayTimes = allData.map((data) => Date.parse(data.date));
        displayValues = allData.map((data) => data.temperatureOutlet);
        setDisplayData({
          time: displayTimes,
          values: displayValues,
        });
        break;
      case 'velocity':
        displayTimes = allData.map((data) => Date.parse(data.date));
        displayValues = allData.map((data) => data.velocity);
        setDisplayData({
          time: displayTimes,
          values: displayValues,
        });
        break;
      default:
        setDisplayData({ time: [], values: [] });
    }
  };

  return (
    <div className="FlowHistory">
      <div className="FlowHistory_menu">
        <button
          onClick={() => selectDataHandler('flow-rate')}
          className="FlowHistory_menuButton"
        >
          Flow Rate
        </button>
        <button
          onClick={() => selectDataHandler('energy-flow-rate')}
          className="FlowHistory_menuButton"
        >
          Energy Flow Rate
        </button>
        <button
          onClick={() => selectDataHandler('velocity')}
          className="FlowHistory_menuButton"
        >
          Velocity
        </button>
        <button
          onClick={() => selectDataHandler('fluid-sound-speed')}
          className="FlowHistory_menuButton"
        >
          Fluid Sound Speed
        </button>
        <button
          onClick={() => selectDataHandler('temperature-inlet')}
          className="FlowHistory_menuButton"
        >
          Temperature Inlet
        </button>
        <button
          onClick={() => selectDataHandler('temperature-outlet')}
          className="FlowHistory_menuButton"
        >
          Temperature Outlet
        </button>
      </div>
      <div>
        {displayData ? (
          <LineChart
            xAxis={[
              {
                data: displayData.time,
              },
            ]}
            series={[
              {
                data: displayData.values,
              },
            ]}
            width={500}
            height={300}
          />
        ) : (
          <p>Select Data to display.</p>
        )}
      </div>
    </div>
  );
};

export default FlowHistory;
