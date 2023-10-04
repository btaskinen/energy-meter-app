import { Data } from '../App';

type Props = {
  data: Data;
};

const CurrentReading = ({ data }: Props) => {
  return (
    <div>
      <div>Flow Rate</div>
      <div>
        {data.flowRate} m<sup>3</sup>/h
      </div>
      <div>Energy Flow Rate</div>
      <div>{data.energyFlowRate} GJ/h</div>
      <div>Velocity</div>
      <div>{data.velocity} m/s</div>
      <div>Fluid Sound Speed</div>
      <div>{data.fluidSoundSpeed} m/s</div>
      <div>Inlet Temperature</div>
      <div>{data.temperatureInlet} °C</div>
      <div>Outlet Temperature</div>
      <div>{data.temperatureOutlet} °C</div>
    </div>
  );
};

export default CurrentReading;
