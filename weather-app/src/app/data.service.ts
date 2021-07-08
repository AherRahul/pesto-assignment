import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class DataService {
  constructor(private http: HttpClient) {}

  getweather(cityName: string): any {
    return this.http.get(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityName +
        "&appid=76d1b43ba3695cfae59aa9f7dc9b4877&units=metric"
    );
  }

  getweatherId(id: number): any {
    return this.http.get(
      "https://api.openweathermap.org/data/2.5/weather?id=" +
        id +
        "&appid=76d1b43ba3695cfae59aa9f7dc9b4877&units=metric"
    );
  }

  getDeatilsOfWeather(id): any {
    return this.http.get(
      "https://api.openweathermap.org/data/2.5/forecast?id=" +
        id +
        "&appid=76d1b43ba3695cfae59aa9f7dc9b4877&units=metric"
    );
  }
}
