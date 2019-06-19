import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { ImagesComponent } from "./images.component";
import { RouterModule, Routes } from "@angular/router";
const routes: Routes = [
  { path: "", redirectTo: "index", pathMatch: "full" },
  { path: "index", component: ImagesComponent }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [ImagesComponent]
})
export class ImagesModule {}
