import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { LayoutComponent } from "@layout/layout.component";
import { environment } from "@env/environment";
import { MainComponent } from "./main/main.component";
const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      { path: "", redirectTo: "album", pathMatch: "full" },
      { path: "album", loadChildren: "./images/images.module#ImagesModule" }
    ]
  }
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, environment.production ? { preloadingStrategy: PreloadAllModules } : {})], //  预加载所有路由
  imports: [
    RouterModule.forRoot(
      routes,
      environment.production ? { preloadingStrategy: PreloadAllModules } : {}
    )
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule {}
