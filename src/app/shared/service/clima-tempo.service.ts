import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import Pouchdb from "pouchdb";

@Injectable({
  providedIn: "root"
})
export class ClimaTempoService {
  data: any;
  db: any;
  remote: any;
  constructor(private http: HttpClient) {
    this.db = new Pouchdb("citys");
    this.remote = "http://127.0.0.1:5984/citys";
  }

  insertCitys(citys) {
    this.db.post(citys);
  }

  getCitys() {
    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {
      this.db
        .allDocs({
          include_docs: true
        })
        .then(result => {
          this.data = [];
          const docs = result.rows.map(row => {
            this.data.push(row.doc);
          });
          resolve(this.data);
          this.db
            .changes({ live: true, since: "now", include_docs: true })
            .on("change", change => {
              this.handleChange(change);
            });
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  handleChange(change) {
    let changedDoc = null;
    let changedIndex = null;

    this.data.forEach((doc, index) => {
      if (doc._id === change.id) {
        changedDoc = doc;
        changedIndex = index;
      }
    });

    // Documento deletado
    if (change.deleted) {
      this.data.splice(changedIndex, 1);
    } else {
      if (changedDoc) {
        // Documento atualizado
        this.data[changedIndex] = change.doc;
      } else {
        // Documento adicionado
        this.data.push(change.doc);
      }
    }
  }

  listCities() {
    return this.http.get<any>(environment.apiCities);
  }

  getIdCity(city) {
    const url = `${environment.apiClim}/api/v1/locale/city?name=${city}&state=AL&token=${environment.tokenClim}`;

    return this.http.get(url);
  }

  getTemperature(cityId) {
    const url = `${environment.apiClim}/api/v1/weather/locale/${cityId}/current?token=${environment.tokenClim}`;

    return this.http.get(url);
  }

  getCity(city) {
    return this.http.get<any>(
      `${environment.apiGoogle}=${city}+AL&key=${environment.tokenGoogle}`
    );
  }

  getNameCity(lat, lng) {
    return this.http.get<any>(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyCgXayXgfesJodYDaAz98NhBqiTJPFedsY`
    );
  }
}
