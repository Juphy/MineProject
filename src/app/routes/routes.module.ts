import { NgModule } from '@angular/core';
import { MainComponent } from './main/main.component';
import { RouteRoutingModule } from './routes-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouteRoutingModule,
  ],
  declarations: [MainComponent]
})
export class RoutesModule { }
