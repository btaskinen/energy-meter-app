export type Data = {
  flowRate: number;
  energyFlowRate: number;
  velocity: number;
  fluidSoundSpeed: number;
  temperatureInlet: number;
  temperatureOutlet: number;
  date: string;
};

export type User = {
  username: string;
  name: string;
  token: string;
};

export type LoginData = {
  username: string;
  password: string;
};
