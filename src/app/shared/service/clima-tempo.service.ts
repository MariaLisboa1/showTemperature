import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
// import Pouchdb from 'pouchdb';
import * as Pouchdb from "pouchdb";

@Injectable({
  providedIn: "root"
})
export class ClimaTempoService {
  data: any;
  db: any;
  remote: any;
  constructor(
    private http: HttpClient // private nativeHttp: HTTP, // private plt: Platform, // private loadingCtrl: LoadingController
  ) {
    // this.db = new Pouchdb("todo");
    // this.remote = "http://127.0.0.1:5984/todo";
  }

  insertCompra(valores) {
    console.log(valores);

    this.db.post(valores);
  }

  listCities() {
    return this.http.get<any>(environment.apiCities);
  }

  getIdCity(city) {
    const url = `${environment.apiClim}/api/v1/locale/city?name=${city}&state=AL&token=${environment.tokenClim}`;

    return this.http.get(url);
  }

  getTemperature(cityId) {
    // console.log(cityId);

    const url = `${environment.apiClim}/api/v1/weather/locale/${cityId}/current?token=${environment.tokenClim}`;

    return this.http.get(url);
  }

  getCity(city) {
    return this.http.get<any>(
      `${environment.apiGoogle}=${city}+AL&key=${environment.tokenGoogle}`
    );
  }

  // static getNameCity(lat, lng) {
  //   const climaTempoService = new ClimaTempoService(lat);

  //   return climaTempoService.http.get<any>(
  //     `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCgXayXgfesJodYDaAz98NhBqiTJPFedsY`
  //   );
  // }

  getNameCity(lat, lng) {
    return this.http.get<any>(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCgXayXgfesJodYDaAz98NhBqiTJPFedsY`
    );
  }
}
