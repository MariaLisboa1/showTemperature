import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Map, tileLayer, marker, Popup } from "leaflet";
import { ClimaTempoService } from "src/app/shared/service/clima-tempo.service";
import { SendAlert } from "src/app/shared/helpers/sendAlert/sendAlert";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  map: Map;
  climate;
  constructor(
    private geolocation: Geolocation,
    private climaTempoService: ClimaTempoService,
    private sendAlert: SendAlert,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.presentLoadingWithOptions();
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.map = new Map("mapId").setView(
          [resp.coords.latitude, resp.coords.longitude],
          10
        );

        tileLayer(
          "http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
          {
            attribution: "edupala.com"
          }
        ).addTo(this.map);

        this.leafletMap();
      })
      .catch(error => {
        console.log("Erro ao recuperar sua posição", error);
      });
  }

  leafletMap() {
    this.climaTempoService.listCities().subscribe(res => {
      const $self = this;
      res.geonames.forEach(async property => {
        const popup = new Popup({ autoClose: false, closeOnClick: false })
          .setContent(property.name)
          .setLatLng([property.lat, property.lng]);

        marker([property.lat, property.lng])
          .addTo(this.map)
          .on("click", function(dadosCity) {
            $self.getTemperature("7765");
          })
          .bindPopup(popup)
          .openPopup();
      });
    });
  }

  getNameCityClick(latlng) {
    const lat = latlng.lat;
    const lng = latlng.lng;

    this.climaTempoService.getNameCity(lat, lng).subscribe(
      res => {
        const city = res.results[1].address_components[0].long_name;
      },
      err => console.log(err)
    );
  }

  getTemperature(idCity) {
    this.climaTempoService.getTemperature(idCity).subscribe(
      res => {
        console.log(res);
        const climate = res;

        this.sendAlert.presentAlert(climate);
      },
      err => console.log(err)
    );
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: "circles",
      animated: true,
      duration: 5000,
      message: "Por favor espere...",
      translucent: true,
      cssClass: "custom-class custom-loading"
    });
    return await loading.present();
  }
}
