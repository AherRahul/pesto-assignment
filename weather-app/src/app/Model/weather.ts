import { climate } from "./climate";

export class weather {
  id: number;
  name: string;
  country: string;
  day: string;
  hour: string;
  temp: string;
  sunrise: any;
  sunset: any;
  climate: climate;
  dt: string;
}
