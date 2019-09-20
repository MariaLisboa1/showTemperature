import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { MapComponent } from "./components/map/map.component";

import { Geolocation } from "@ionic-native/geolocation/ngx";
import { SharedModule } from "../shared/shared.module";
@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: "",
        component: MapComponent
      }
    ])
  ],
  declarations: [MapComponent],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  providers: [Geolocation]
})
export class CoreModule {}
