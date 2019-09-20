import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { SearchComponent } from "./components/search/search.component";

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
  providers: []
})
export class SharedModule {}
