import { Component, OnInit } from "@angular/core";
import { ClimaTempoService } from "../../service/clima-tempo.service";
import { AlertController } from "@ionic/angular";
import { SendAlert } from "../../helpers/sendAlert/sendAlert";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  citys = [];
  cityPouch;
  cityId;
  nameCity;
  constructor(
    private cityService: ClimaTempoService,
    private sendAlert: SendAlert
  ) {}

  ngOnInit() {}

  getSearch(ev) {
    this.nameCity = ev.target.value;
    this.initializeCity(this.nameCity);
  }

  initializeCity(city) {
    this.cityService.getCity(city).subscribe(
      res => {
        this.citys = res.results[0].address_components[0].long_name;
      },
      err => {
        this.getAllCitys(city);
      }
    );
  }

  async getAllCitys(city) {
    await this.cityService.getCitys().then(citys => {
      const getCity = citys.find(e => e.name === city);

      getCity !== undefined ? (this.citys = getCity.name) : "";
    });
  }

  getCity(city) {
    this.cityService.getIdCity(city).subscribe(
      res => {
        this.cityId = res[0].id;
        this.getclimate("7765");
      },
      err => console.log(err)
    );
  }

  getclimate(cityId) {
    this.cityService.getTemperature(cityId).subscribe(
      res => {
        const climate = res;
        this.sendAlert.presentAlert(climate);
      },
      err => console.log(err)
    );
  }
}
