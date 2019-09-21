import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Map, latLng, tileLayer, Layer, marker, Popup } from "leaflet";
import { ClimaTempoService } from "src/app/shared/service/clima-tempo.service";
import { AlertController } from "@ionic/angular";
import { SendAlert } from "src/app/shared/helpers/sendAlert/sendAlert";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  map: Map;

  constructor(
    private geolocation: Geolocation,
    private climaTempoService: ClimaTempoService,
    private sendAlert: SendAlert
  ) {}

  ngOnInit() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {
        this.map = new Map("mapId").setView(
          [resp.coords.latitude, resp.coords.longitude],
          8
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
      res.geonames.forEach(property => {
        const popup = new Popup({ autoClose: false, closeOnClick: false })
          .setContent(property.name)
          .setLatLng([property.lat, property.lng]);

        marker([property.lat, property.lng])
          .addTo(this.map)
          .on("click", function(dadosCity) {
            $self.getNameCityClick(dadosCity.latlng);
          })
          .bindPopup(popup)
          .openPopup();
      });
    });
  }

  //quando clicar na cidade, pega o nome, da cidade, pega id, e da put da api do clima para adicionar ao meu token
  getIdCity(citys) {
    this.climaTempoService.getIdCity(citys).subscribe(
      res => {
        const idCity = res[0].id;
        this.getTemperature(idCity);
      },
      err => console.log(err)
    );
  }

  getNameCityClick(latlng) {
    const lat = latlng.lat;
    const lng = latlng.lng;

    this.climaTempoService.getNameCity(lat, lng).subscribe(
      res => {
        const city = res.results[1].address_components[0].long_name;
        this.getIdCity(city);
      },
      err => console.log(err)
    );
  }

  getTemperature(idCity) {
    this.climaTempoService.getTemperature(idCity).subscribe(
      res => {
        const climate = res;
        this.sendAlert.presentAlert(climate);
      },
      err => console.log(err)
    );
  }
}
