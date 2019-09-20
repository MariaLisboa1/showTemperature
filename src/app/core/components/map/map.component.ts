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

  properties = [
    {
      city: "Cambridge",
      state: "MA",
      long: -71.10858,
      lat: 42.35963
    },
    {
      city: "Cambridge",
      state: "MA",
      long: -71.10869,
      lat: 42.359103
    },
    {
      city: "Boston",
      state: "MA",
      long: -71.110061,
      lat: 42.360686
    },
    {
      city: "Cambridge",
      long: -71.110448,
      lat: 42.360642
    }
  ];

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
    })
      .addTo(this.map)
      .on("onclick", function(e) {
        console.log("oi", e);
      });

    this.leafletMap();
  }

  leafletMap() {
    this.climaTempoService.listCities().subscribe(res => {
      res.geonames.forEach(property => {
        marker([property.lat, property.lng])
          .addTo(this.map)
          .bindPopup(property.name)
          .openPopup();
      });
    });
  }

  getTemperature(property) {
    console.log(property);
  }
}
