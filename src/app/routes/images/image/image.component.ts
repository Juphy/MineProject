import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { default_src } from "@routes/DATA";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, fromEvent, Observable } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.sass']
})
export class ImageComponent implements OnInit {
  page = 1;
  pagesize = 50;
  datas = [];
  defaultSrc = default_src;
  @Input() category;
  @Input() album_id;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.get_data();
    const images = document.getElementById("image");
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

  get_data(){
    switch(this.category){
      case 'nvshens':
          this.http
          .get(`/image/list?album_id=${this.album_id}&page=${this.page}&pagesize=${this.pagesize}`)
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
        break;
        case 'lsm':
            this.http
            .get(`/meitu/list?album_id=${this.album_id}&page=${this.page}&pagesize=${this.pagesize}`)
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
          break;
          case '2717':
          case 'gtmm':
          case 'ilovgou':   
          case 'mmonly':
              this.http
              .get(`/tupian/list?album_id=${this.album_id}&page=${this.page}&pagesize=${this.pagesize}`)
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
            break;
            case 'emmxyz':
                this.http
                .get(`/picture/list?album_id=${this.album_id}&page=${this.page}&pagesize=${this.pagesize}`)
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
              break;
              case 'win':
                  this.http
                  .get(`/img/list?album_id=${this.album_id}&page=${this.page}&pagesize=${this.pagesize}`)
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
                break;                                                    
    }
  }

  lazyLoad(url = this.defaultSrc, className = "img" + this.page) {
    let imgs = document.getElementsByClassName(className);
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
    for (let i = 0; i < num; i++) {
      let h = imgs[i].hasAttribute("offset")
        ? Number(imgs[i].getAttribute("offset"))
        : 0;
      if (offset(imgs[i]).top < H + T - h) {
        if(imgs[i].getAttribute('data-src')){
          imgs[i]["src"] = imgs[i].getAttribute("data-src");
        }
      }
    }
  }
}
