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

type UnitTypes = 'm3/h' | 'GJ/h' | 'm/s' | '°C';

type DispalyData = {
  time: Date[];
  values: number[];
  unit: UnitTypes;
  selectedCategory: FlowDataType;
};

const FlowHistory = ({
  setNotification,
  setNotificationColor,
  logoutHandler,
}: Props) => {
  const [allData, setAllData] = useState<Data[] | null>(null);
  const [displayData, setDisplayData] = useState<DispalyData | null>(null);

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
    let displayTimes: Date[];
    let displayValues: number[];

    switch (flowDataType) {
      case 'flow-rate':
        displayTimes = allData.map((data) => new Date(data.date));
        displayValues = allData.map((data) => data.flowRate);
        setDisplayData({
          time: displayTimes,
          values: displayValues,
          unit: 'm3/h',
          selectedCategory: flowDataType,
        });
        break;
      case 'energy-flow-rate':
        displayTimes = allData.map((data) => new Date(data.date));
        displayValues = allData.map((data) => data.energyFlowRate);
        setDisplayData({
          time: displayTimes,
          values: displayValues,
          unit: 'GJ/h',
          selectedCategory: flowDataType,
        });
        break;
      case 'fluid-sound-speed':
        displayTimes = allData.map((data) => new Date(data.date));
        displayValues = allData.map((data) => data.fluidSoundSpeed);
        setDisplayData({
          time: displayTimes,
          values: displayValues,
          unit: 'm/s',
          selectedCategory: flowDataType,
        });
        break;
      case 'temperature-inlet':
        displayTimes = allData.map((data) => new Date(data.date));
        displayValues = allData.map((data) => data.temperatureInlet);
        setDisplayData({
          time: displayTimes,
          values: displayValues,
          unit: '°C',
          selectedCategory: flowDataType,
        });
        break;
      case 'temperature-outlet':
        displayTimes = allData.map((data) => new Date(data.date));
        displayValues = allData.map((data) => data.temperatureOutlet);
        setDisplayData({
          time: displayTimes,
          values: displayValues,
          unit: '°C',
          selectedCategory: flowDataType,
        });
        break;
      case 'velocity':
        displayTimes = allData.map((data) => new Date(data.date));
        displayValues = allData.map((data) => data.velocity);
        setDisplayData({
          time: displayTimes,
          values: displayValues,
          unit: 'm/s',
          selectedCategory: flowDataType,
        });
        break;
      default:
        setDisplayData({
          time: [],
          values: [],
          unit: 'm/s',
          selectedCategory: flowDataType,
        });
    }
  };

  return (
    <div className="FlowHistory">
      <div className="FlowHistory_menu">
        <button
          onClick={() => selectDataHandler('flow-rate')}
          className={
            displayData?.selectedCategory === 'flow-rate'
              ? 'FlowHistory_menuButton selected'
              : 'FlowHistory_menuButton'
          }
        >
          Flow Rate
        </button>
        <button
          onClick={() => selectDataHandler('energy-flow-rate')}
          className={
            displayData?.selectedCategory === 'energy-flow-rate'
              ? 'FlowHistory_menuButton selected'
              : 'FlowHistory_menuButton'
          }
        >
          Energy Flow Rate
        </button>
        <button
          onClick={() => selectDataHandler('velocity')}
          className={
            displayData?.selectedCategory === 'velocity'
              ? 'FlowHistory_menuButton selected'
              : 'FlowHistory_menuButton'
          }
        >
          Velocity
        </button>
        <button
          onClick={() => selectDataHandler('fluid-sound-speed')}
          className={
            displayData?.selectedCategory === 'fluid-sound-speed'
              ? 'FlowHistory_menuButton selected'
              : 'FlowHistory_menuButton'
          }
        >
          Fluid Sound Speed
        </button>
        <button
          onClick={() => selectDataHandler('temperature-inlet')}
          className={
            displayData?.selectedCategory === 'temperature-inlet'
              ? 'FlowHistory_menuButton selected'
              : 'FlowHistory_menuButton'
          }
        >
          Temperature Inlet
        </button>
        <button
          onClick={() => selectDataHandler('temperature-outlet')}
          className={
            displayData?.selectedCategory === 'temperature-outlet'
              ? 'FlowHistory_menuButton selected'
              : 'FlowHistory_menuButton'
          }
        >
          Temperature Outlet
        </button>
      </div>
      <div className="FlowHistory_chartContainer">
        {displayData ? (
          <LineChart
            xAxis={[
              {
                data: displayData.time,
                scaleType: 'time',
                label: 'Date',
              },
            ]}
            yAxis={[
              {
                label: displayData.unit,
              },
            ]}
            series={[
              {
                data: displayData.values,
                color: '#660708',
              },
            ]}
            width={500}
            height={300}
            margin={{ top: 28 }}
          />
        ) : (
          <p>Select Data to display.</p>
        )}
      </div>
    </div>
  );
};

export default FlowHistory;
