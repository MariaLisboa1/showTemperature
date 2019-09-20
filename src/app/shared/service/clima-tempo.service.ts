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
    private http: HttpClient,
    private nativeHttp: HTTP,
    private plt: Platform,
    private loadingCtrl: LoadingController
  ) {}
  data = [];
  listCities() {
    return this.http.get<any>(environment.apiCities);
  }

  getIdCity(city) {
    // {{ base_url  }}/api/v1/locale/city?name=ouro branco&state=AL&token={{ token  }}
    const url = `${environment.apiClim}/api/v1/locale/city?name=${city}&state=AL&token=${environment.tokenClim}`;

    return this.http.get(url);
  }

  // async getDataStandard() {
  //   let loading = await this.loadingCtrl.create();
  //   await loading.present();

  //   this.http
  //     .get(
  //       `${environment.apiClim}/api/v1/locale/city?name=maceio&state=AL/${environment.tokenClim}`
  //     )
  //     .pipe(finalize(() => loading.dismiss()))
  //     .subscribe(
  //       data => {
  //         this.data = data["results"];
  //       },
  //       err => {
  //         console.log("JS Call error: ", err);
  //       }
  //     );
  // }

  // async getDataNativeHttp() {
  //   let loading = await this.loadingCtrl.create();
  //   await loading.present();

  //   // Returns a promise, need to convert with of() to Observable (if want)!
  //   from(
  //     this.nativeHttp.get(
  //       `${environment.apiClim}/api/v1/locale/city?name=maceio&state=AL/${environment.tokenClim}`,
  //       {},
  //       { "Content-Type": "application/json" }
  //     )
  //   )
  //     .pipe(finalize(() => loading.dismiss()))
  //     .subscribe(
  //       data => {
  //         let parsed = JSON.parse(data.data);
  //         this.data = parsed.results;
  //       },
  //       err => {
  //         console.log("Native Call error: ", err);
  //       }
  //     );
  // }

  // getDataEverywhere() {
  //   if (this.plt.is("cordova")) {
  //     this.getDataNativeHttp();
  //   } else {
  //     this.getDataStandard();
  //   }
  // }

  getTemperature(cityId) {
    const url = `${environment.apiClim}/api/v1/weather/locale/${cityId}/current?token=${environment.tokenClim}`;

    return this.http.get(url);
  }

  getCity(city) {
    return this.http.get<any>(
      `${environment.apiGoogle}=${city}+AL&key=${environment.tokenGoogle}`
    );
  }
}
