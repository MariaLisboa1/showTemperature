import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { HTTP } from "@ionic-native/http/ngx";
import { Platform, LoadingController } from "@ionic/angular";
import { from } from "rxjs";
import { finalize } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ClimaTempoService {
  constructor(
    private http: HttpClient // private nativeHttp: HTTP, // private plt: Platform, // private loadingCtrl: LoadingController
  ) {}
  data = [];
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

  static getNameCity(lat, lng) {
    const climaTempoService = new ClimaTempoService(lat);

    return climaTempoService.http.get<any>(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCgXayXgfesJodYDaAz98NhBqiTJPFedsY`
    );
  }

  getNameCity(lat, lng) {
    return this.http.get<any>(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCgXayXgfesJodYDaAz98NhBqiTJPFedsY`
    );
  }

  cadastraCity(idCity) {
    // return this.http.put(`http://apiadvisor.climatempo.com.br/api-manager/user-token/9e7c0ce5ef9a03684e2495a4fccbd270/locales`,
    // )
  }
}
