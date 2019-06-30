import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { ImagesComponent } from "./images.component";
import { RouterModule, Routes } from "@angular/router";
import { ImageComponent } from './image/image.component';
const routes: Routes = [
  { path: "", redirectTo: "image", pathMatch: "full" },
  { path: "image", component: ImagesComponent },
  { path: 'image/:id', component: ImageComponent }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [ImagesComponent, ImageComponent, ImageComponent]
})
export class ImagesModule {}
