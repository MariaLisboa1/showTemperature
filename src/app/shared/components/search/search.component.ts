import { Component, OnInit } from "@angular/core";
import { ClimaTempoService } from "../../service/clima-tempo.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  citys;
  cityId;
  nameCity;
  constructor(
    private cityService: ClimaTempoService,
    public alertController: AlertController
  ) {}

  ngOnInit() {}

  getSearch(ev) {
    this.nameCity = ev.target.value;
    this.initializeCity(this.nameCity);
  }

  initializeCity(city) {
    this.cityService
      .getCity(city)
      .subscribe(res => (this.citys = [res]), err => console.log(err));
  }

  getCity(city) {
    this.cityService.getIdCity(city).subscribe(
      res => {
        this.cityId = res[0].id;
        this.getClima(this.cityId);
      },
      err => console.log(err)
    );
  }

  getClima(cityId) {
    this.cityService.getTemperature(cityId).subscribe(
      res => {
        const graus = res;
        this.presentAlert(graus);
      },
      err => console.log(err)
    );
  }

  presentAlert = async clima => {
    const alert = await this.alertController.create({
      header: `${clima.data.temperature}Cº`,
      // subHeader: `${clima.data.temperature}Cº`,
      message: `Hoje: ${clima.data.condition} no momento. A humidade está de ${clima.data.humidity}Cº e a Sensação termica: ${clima.data.sensation}`,
      buttons: ["OK"]
    });
    await alert.present();
  };
}
