import { Component, OnInit } from "@angular/core";
import { ClimaTempoService } from "../../service/clima-tempo.service";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"]
})
export class SearchComponent implements OnInit {
  citys;
  constructor(private cityService: ClimaTempoService) {}

  async ngOnInit() {
    await this.cityService.getDataNativeHttp();
  }

  getSearch(ev) {
    const val = ev.target.value;
    this.initializeCity(val);
  }

  initializeCity(city) {
    this.cityService
      .getCity(city)
      .subscribe(res => (this.citys = [res]), err => console.log(err));
  }

  getCity(e) {
    // this.cityService
    //   .getIdCity(e)
    //   .subscribe(res => console.log(res), err => console.log(err));
  }
}
