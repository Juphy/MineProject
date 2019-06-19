import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';

const COMPONENTS = [
  LayoutComponent,
  HeaderComponent
];

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LayoutModule { }
