import { Component, OnInit } from "@angular/core";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { Map, latLng, tileLayer, Layer, marker } from "leaflet";
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
    // var mymap = L.map('mapid').setView([51.505, -0.09], 13);

    // L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    //     maxZoom: 18,
    //     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    //         '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    //         'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    //     id: 'mapbox.streets'
    // }).addTo(mymap);

    // var markers = [
    //     {pos: [51.51, -0.10], popup: "This is the popup for marker #1"},
    //     {pos: [51.50, -0.09], popup: "This is the popup for marker #2"},
    //     {pos: [51.49, -0.08], popup: "This is the popup for marker #3"}];
    // markers.forEach(function (obj) {
    //     var m = L.marker(obj.pos).addTo(mymap),
    //         p = new L.Popup({ autoClose: false, closeOnClick: false })
    //                 .setContent(obj.popup)
    //                 .setLatLng(obj.pos);
    //     m.bindPopup(p);
    // });

    this.climaTempoService.listCities().subscribe(res => {
      const $self = this;
      res.geonames.forEach(property => {
        marker([property.lat, property.lng])
          .addTo(this.map)
          .on("click", function(dadosCity) {
            $self.getNameCityClick(dadosCity.latlng);
          })
          .setLatLng([property.lat, property.lng])
          .bindPopup(property.name)
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
