import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import { weather } from "../Model/weather";

@Component({
  selector: "app-city-page",
  templateUrl: "./city-page.component.html",
  styleUrls: ["./city-page.component.css"]
})
export class CityPageComponent implements OnInit {

  @Input() wertherId = 0;
  idweather: number;
  climates$: Object[];
  weatherForm = new FormControl("Mumbai");
  weather: weather;
  list: any[];
  listclimates: any[];
  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  dateAtual;

  constructor(private route: ActivatedRoute, private data: DataService) {
  }

  ngOnInit(): void {
    const newDate = new Date();
    this.dateAtual = newDate.getHours()
    +":"
    + newDate.getMinutes()+ " " 
    +  newDate.getDate() + " " 
    + this.monthNames[newDate.getMonth()];
    
    this.data.getDeatilsOfWeather(this.wertherId).subscribe(data => {
      this.list = data["list"].slice(0, 5);

      this.weather = { ...this.weather, ...data["city"] };
      
      this.list.forEach((element, index) => {
        
        let date = element["dt"];
        let dateToConvert = new Date(date * 1000);
        let weather = element["weather"][0];
        let main = element["main"];
        let hour = dateToConvert.getHours();
        let minutes = dateToConvert.getMinutes() != 0 ? dateToConvert.getMinutes() : '00';
        let day = dateToConvert.getDate();
        let daySemana = this.days[dateToConvert.getDay()];
        let month = this.monthNames[dateToConvert.getMonth()];

        var climate = {
          icon: weather.icon,
          description: weather.description,
          temp_max: main.temp_max,
          temp_min: main.temp_min,
          day: [daySemana] + " " + day + " " + month,
          hour: hour + ":" + minutes
        };

        this.list[index] = climate;
      });
    });
  }
}
