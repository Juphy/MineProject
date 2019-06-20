import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { ImagesComponent } from "./images.component";
import { RouterModule, Routes } from "@angular/router";
const routes: Routes = [
  { path: "", redirectTo: "album", pathMatch: "full" },
  { path: "album", component: ImagesComponent }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [ImagesComponent]
})
export class ImagesModule {}
