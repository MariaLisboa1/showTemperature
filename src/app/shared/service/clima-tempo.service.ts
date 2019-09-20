import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class ClimaTempoService {
  constructor(private http: HttpClient) {}

  listCities() {
    return this.http.get<any>(environment.apiCities);
  }

  getIdCity(name) {
    console.log(name);

    return this.http.get(
      `${environment.apiClim}/api/v1/locale/city?name=${name}&state=AL/${environment.tokenClim}`
    );
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
