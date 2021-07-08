import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { DataService } from "../data.service";
import { weather } from "../Model/weather";
import { climate } from "../Model/climate";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.css"]
})
export class LandingPageComponent implements OnInit {
  weatherForm = new FormControl("");
  weather: weather;
  hideMoreData: boolean = false;

  constructor(private data: DataService) {}
  
  ngOnInit() {}


  showData() {
    this.hideMoreData = !this.hideMoreData;
  }

  onClickCleanBtn() {
    this.weatherForm = undefined;
  }


  search(e) {
    this.data.getweather(this.weatherForm.value).subscribe(data => {
      let Climate: climate;
      this.weather = { ...this.weather, ...data["main"] };
      this.weather = { ...this.weather, ...data["sys"] };
      this.weather.name = data.name;
      this.weather.dt = data.dt;
      this.weather.id = data.id;

      Climate = { ...Climate, ...data["weather"][0] };
      Climate = { ...Climate, ...data["main"] };
      this.weather.climate = Climate;
    });
  }
}
