import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { HTTP } from "@ionic-native/http";

@Injectable({
  providedIn: "root"
})
export class ClimaTempoService {
  constructor(private http: HttpClient, private http2: HTTP) {}

  listCities() {
    return this.http.get<any>(environment.apiCities);
  }

  getIdCity(name) {
    console.log(name);
    const url = `${environment.apiClim}/api/v1/locale/city?name=${name}&state=AL/${environment.tokenClim}`;
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "content-type": "application/json"
    };
    return this.http.get(url, { headers: headers });
  }

  getTemperature() {
    const url = `${environment.apiClim}/api/v1/weather/locale/6809/current?${environment.tokenClim}`;

    var headers = new Headers();
    headers.append("Access-Control-Allow-Origin", "*");
    headers.append("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT");
    headers.append("Accept", "application/json");
    headers.append("content-type", "application/json");

    return this.http.get(url);
  }

  getCity(city) {
    return this.http.get<any>(
      `${environment.apiGoogle}=${city}+AL&key=${environment.tokenGoogle}`
    );
  }
}
