import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, fromEvent, Observable } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
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
    fromEvent(images, "scroll")
      .pipe(
        debounceTime(200),
        map(e => e.srcElement || e.target)
      )
      .subscribe(e => {
        this.lazyLoad();
        if (e["scrollHeight"] - e["clientHeight"] - e["scrollTop"] < 250) {
          this.page++;
          this.get_data();
        }
      });
  }

  get_data() {
    this.http
      .get(`/album/list?page=${this.page}&pagesize=${this.pagesize}`)
      .subscribe(res => {
        if (res["status"] === 200) {
          let result = res["result"]["rows"];
          result.forEach(item => (item["page"] = this.page));
          if (this.datas.length) {
            this.datas = this.datas.concat(result);
          } else {
            this.datas = result;
          }
          setTimeout(() => {
            this.lazyLoad();
          });
        }
      });
  }

  lazyLoad(url = "assets/images/loading.svg", className = "img" + this.page) {
    let imgs = document.getElementsByClassName(className);
    Array.from(imgs).forEach(item => {
      item["src"] = url;
      item["style"].opacity = 1;
    });
    let offset = function(curEle) {
      let left = curEle.offsetLeft,
        top = curEle.offsetTop,
        par = curEle.offsetParent;
      while (par.tagName.toUpperCase() !== "BODY") {
        if (window.navigator.userAgent.indexOf("MSIE 8.0") <= -1) {
          // 处理其他浏览器情况，亟需优化
          left += par.clientLeft;
          top += par.clientTop;
        }
        left += par.offsetLeft;
        top += par.offsetTop;
        par = par.offsetParent;
      }
      return { left, top };
    };
    let num = imgs.length,
      image = document.getElementById("image");
    const H = image.clientHeight,
      T = image.scrollTop;
    console.log(H, T);
    for (let i = 0; i < num; i++) {
      let h = imgs[i].hasAttribute("offset")
        ? Number(imgs[i].getAttribute("offset"))
        : 0;
      console.log(offset(imgs[i]));
      if (offset(imgs[i]).top < H + T - h) {
        imgs[i]["src"] = imgs[i].getAttribute("data-src");
      }
    }
  }
}
