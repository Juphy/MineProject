import { Component, OnInit } from "@angular/core";
import Masonry from "masonry-layout";
import imagesLoaded from "imagesloaded";
import { HttpClient } from "@angular/common/http";
@Component({
  selector: "app-images",
  templateUrl: "./images.component.html",
  styleUrls: ["./images.component.css"]
})
export class ImagesComponent implements OnInit {
  page = 1;
  pagesize = 50;
  datas = [];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.get_data();
    const images = document.getElementById("image");
    console.dir(images);
    images.addEventListener("scroll", function() {

      console.log(this.scrollHeight, this.clientHeight, this.scrollTop);
    });
  }

  get_data() {
    this.http
      .get(`/album/list?page=${this.page}&pagesize=${this.pagesize}`)
      .subscribe(res => {
        if (res["status"] === 200) {
          let result = res["result"];
          this.datas = result["rows"].filter(item => item.url);
        }
      });
  }

  make_layout() {
    setTimeout(() => {
      var grid = document.querySelector(".grid" + this.page);
      var masonry = new Masonry(grid, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        percentPosition: true
      });
      imagesLoaded(grid).on("always", function() {
        masonry.layout();
      });
    }, 50);
  }
}
