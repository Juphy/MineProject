import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html'
})
export class LayoutComponent implements OnInit {
  path: any = "";
  constructor(private location: Location) { }

  ngOnInit() {
  }
  activate(e) {
    this.path = this.location.path();
  }
}
