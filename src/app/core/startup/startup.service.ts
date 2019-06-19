import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { siteinfo, userinfo, DATA } from '@core/store';
import { NzIconService } from 'ng-zorro-antd';
import { ICONS } from '@core/style-icons';
@Injectable({
    providedIn: 'root'
})
export class StartupService {
    constructor(private http: HttpClient, private iconService: NzIconService) {
        // 初始化添加图标
        this.iconService.addIcon(...ICONS);
    }

    private info_my_account(resolve: any, reject: any) {
        this.http.get('user/info_my_account').subscribe(res => {
            res = res['result'];
            if (res) {
                for (let key in userinfo) {
                    userinfo[key] = res[key];
                }
            }
        }, err => {
            reject(err);
        }, () => {
            resolve(null);
        })
    }

    private list_options() {
        this.http.get('sys/list_options').subscribe(res => {
            if(res['status']===200) DATA['list_options']=res['result'];
        })
    }

    load(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get('siteinfo').subscribe(res => {
                for (let key in res) {
                    if (key !== 'platform') {
                        res[key] = 'https://' + res[key];
                    }
                    siteinfo[key] = res[key]
                }
                this.info_my_account(resolve, reject);
                this.list_options();
            }, error => {
                siteinfo['api'] = 'https://api2.huayingjuhe.top';
                siteinfo['site'] = 'https://www2.huayingjuhe.top';
                siteinfo['ucs'] = 'https://ucs2.huayingjuhe.top';
                siteinfo['platform'] = 'devsite';
                this.info_my_account(resolve, reject);
                this.list_options();
            })
        })
    }
}
