import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, fromEvent, Observable } from "rxjs";
import { debounceTime, map } from "rxjs/operators";
import { default_src, data } from "@routes/DATA";
@Component({
  selector: "app-images",
  templateUrl: "./images.component.html",
  styleUrls: ["./images.component.css"]
})
export class ImagesComponent implements OnInit {
  page = 1;
  pagesize = 50;
  datas = [];
  defaultSrc = default_src;
  flag = false;
  album_id;
  category;
  tab='album';
  source=[
    {label: '相册', value: 'album'}, 
    {label: '源1', value: 'nvshens'}, 
    {label: '源2', value: 'lsm'},
    {label: '源3', value: '2717'},
    {label: '源4', value: 'emmxyz'},
    {label: '源5', value: 'win'},
    {label: 'bing', value: 'bing'},    
  ];
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.change_tab(this.tab);
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
          this.change_tab(this.tab);
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

  get_images(id, category){
    this.album_id = id;
    this.category = category;
    this.flag = true;
  }

  change_tab(value){
    if(this.tab!==value){
      this.datas=[];
      this.tab = value;
      this.page = 1;
    }
    switch(value){
      case 'bing':
          this.http
          .get(`/bing/list?page=${this.page}&pagesize=${this.pagesize}`)
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
      case "album":
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
        break;
      case 'nvshens':
          this.http
          .get(`/image/list?page=${this.page}&pagesize=${this.pagesize}`)
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
            .get(`/meitu/list?page=${this.page}&pagesize=${this.pagesize}`)
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
              .get(`/tupian/list?page=${this.page}&pagesize=${this.pagesize}`)
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
                .get(`/picture/list?page=${this.page}&pagesize=${this.pagesize}`)
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
                  .get(`/img/list?page=${this.page}&pagesize=${this.pagesize}`)
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
}
