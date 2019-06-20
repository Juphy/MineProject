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
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: MainComponent },
      { path: "image", loadChildren: "./images/images.module#ImagesModule" }
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
