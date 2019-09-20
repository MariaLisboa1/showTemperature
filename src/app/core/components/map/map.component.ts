import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Map, latLng, tileLayer, Layer, marker } from "leaflet";
import { ClimaTempoService } from "src/app/shared/service/clima-tempo.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"]
})
export class MapComponent implements OnInit {
  map: Map;

  constructor(
    private geolocation: Geolocation,
    private climaTempoService: ClimaTempoService
  ) {}

  ngOnInit() {
    this.geolocation
      .getCurrentPosition()
      .then(resp => {})
      .catch(error => {
        console.log("Erro ao recuperar sua posição", error);
      });
    this.map = new Map("mapId").setView([42.35663, -71.1109], 8);

    tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
      attribution: "edupala.com"
    }).addTo(this.map);

    this.leafletMap();
  }

  leafletMap() {
    this.climaTempoService.listCities().subscribe(res => {
      res.geonames.forEach(property => {
        marker([property.lat, property.lng])
          .addTo(this.map)
          .on("click", function(dadosCity) {
            MapComponent.getNameCityClick(dadosCity.latlng);
          })
          .bindPopup()
          .openPopup();
      });
    });
  }

  //quando clicar na cidade, pega o nome, da cidade, pega id, e da put da api do clima para adicionar ao meu token
  getIdCity(citys) {
    this.climaTempoService.getIdCity(citys).subscribe(
      res => {
        console.log(res[0].id);
      },
      err => console.log(err)
    );
  }

  static getNameCityClick(latlng) {
    console.log(latlng);

    const lat = latlng.lat;
    const lng = latlng.lng;
    console.log(this);
    const mapComponent = new MapComponent(lat, latlng);
    mapComponent.climaTempoService
      .getNameCity(lat, lng)
      .subscribe(res => console.log(res), err => console.log(err));

    // this.climaTempoService
    //   .getNameCity(lat, lng)
    //   .subscribe(res => console.log(res), err => console.log(err));
  }

  getTemperature(property) {
    console.log(property);
  }
}
