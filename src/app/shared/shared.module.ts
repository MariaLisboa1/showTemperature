import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SearchComponent } from "./components/search/search.component";
import { HTTP } from "@ionic-native/http/ngx";
import { SendAlert } from "./helpers/sendAlert/sendAlert";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  declarations: [SearchComponent],
  exports: [
    SearchComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ],
  providers: [HTTP, SendAlert]
})
export class SharedModule {}
