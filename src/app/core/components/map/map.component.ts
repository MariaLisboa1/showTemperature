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
  propertyList = [];
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
    this.map = new Map("mapId").setView([42.35663, -71.1109], 16);

    tileLayer("http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
      attribution: "edupala.com"
    }).addTo(this.map);

    this.leafletMap();
  }

  leafletMap() {
    // this.geolocation
    //   .getCurrentPosition()
    //   .then(resp => {

    //     this.map = new Map("mapId").setView([-41.3058, 174.82082], 8);

    //   })
    //   .catch(error => {
    //     console.log("Erro ao recuperar sua posição", error);
    //   });
    this.climaTempoService.listCities().subscribe(res => {
      res.forEach(property => {
        marker([property.lat, property.lgn])
          .addTo(this.map)
          .bindPopup(property.toponymName)
          .openPopup();
      });
    });

    // for (const property of this.properties) {
    //   console.log(property);
    // }
  }
}
