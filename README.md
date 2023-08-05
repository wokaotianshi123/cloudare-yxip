### 8、目前脚本中可以使用的优选域名（实时更新）：

  "time.cloudflare.com"

  "shopify.com"

  "time.is"

  "icook.hk"

  "icook.tw"

  "ip.sb"

  "japan.com"

  "malaysia.com"

  "russia.com"

  "singapore.com"

  "www.visa.com"

  "www.visa.com.sg"

  "www.visa.com.hk"

  "www.visa.com.tw"

  "www.visa.co.jp"

  "www.visakorea.com"

  "www.gco.gov.qa"

  "www.gov.se"

  "www.gov.ua"

  "www.digitalocean.com"

  "www.csgo.com"

  "www.shopify.com"

  "www.whoer.net"

  "www.whatismyip.com"

  "www.ipget.net"

  "www.hugedomains.com"

  "www.udacity.com"

  "www.4chan.org"

  "www.okcupid.com"

  "www.glassdoor.com"

  "www.udemy.com"

  "www.baipiao.eu.org"

  "cdn.anycast.eu.org"

  "cdn-all.xn--b6gac.eu.org"

  "cdn-b100.xn--b6gac.eu.org"

  "xn--b6gac.eu.org"

  "edgetunnel.anycast.eu.org"


<details>
<summary>V2rayN(Xray、V2ray)</summary>

```bash
* 客户端下载：https://github.com/2dust/v2rayN/releases
* 代理协议：vless 或 vmess
* 地址：xxx.herokuapp.com
* 端口：443
* 默认UUID：24b4b1e1-7a89-45f6-858c-242cf53b5bdb
* vmess额外id：0
* 加密：none
* 传输协议：ws
* 伪装类型：none
* 伪装域名：xxx.workers.dev(CF Workers反代地址)
* 路径：/24b4b1e1-7a89-45f6-858c-242cf53b5bdb-vless // 默认vless使用(/自定义UUID码-vless)，vmess使用(/自定义UUID码-vmess)
* 底层传输安全：tls
* 跳过证书验证：false
```
</details>

<details>
<summary>Trojan-Go</summary>

```bash
* 客户端下载: https://github.com/p4gefau1t/trojan-go/releases
{
    "run_type": "client",
    "local_addr": "127.0.0.1",
    "local_port": 1080,
    "remote_addr": "xxx.herokuapp.com",
    "remote_port": 443,
    "password": [
        "24b4b1e1-7a89-45f6-858c-242cf53b5bdb"
    ],
    "websocket": {
        "enabled": true,
        "path": "/24b4b1e1-7a89-45f6-858c-242cf53b5bdb-trojan",
        "host": "xxx.herokuapp.com"
    }
}
```
</details>

<details>
<summary>Shadowsocks</summary>

```bash
* 客户端下载：https://github.com/shadowsocks/shadowsocks-windows/releases/
* 服务器地址: xxx.herokuapp.com
* 端口: 443
* 密码：24b4b1e1-7a89-45f6-858c-242cf53b5bdb
* 加密：chacha20-ietf-poly1305
* 插件程序：xray-plugin_windows_amd64.exe  //需将插件https://github.com/shadowsocks/xray-plugin/releases下载解压后放至shadowsocks同目录
* 插件选项: tls;host=xxx.herokuapp.com;path=/24b4b1e1-7a89-45f6-858c-242cf53b5bdb-ss
```
</details>

<details>
<summary>可以使用Cloudflare的Workers来中转流量，（支持VLESS\VMESS\Trojan-Go的WS模式）配置为：</summary>
</details>

<details>
<summary>CloudFlare Workers单账户反代代码</summary>

```js
addEventListener(
    "fetch",event => {
        let url=new URL(event.request.url);
        url.hostname="appname.herokuapp.com";
        let request=new Request(url,event.request);
        event. respondWith(
            fetch(request)
        )
    }
)
```
</details>

<details>
<summary>CloudFlare Workers单双日轮换反代代码</summary>

```js
const SingleDay = 'app0.herokuapp.com'
const DoubleDay = 'app1.herokuapp.com'
addEventListener(
    "fetch",event => {
    
        let nd = new Date();
        if (nd.getDate()%2) {
            host = SingleDay
        } else {
            host = DoubleDay
        }
        
        let url=new URL(event.request.url);
        url.hostname=host;
        let request=new Request(url,event.request);
        event. respondWith(
            fetch(request)
        )
    }
)
```
</details>

<details>
<summary>CloudFlare Workers每五天轮换一遍式反代代码</summary>

```js
const Day0 = 'app0.herokuapp.com'
const Day1 = 'app1.herokuapp.com'
const Day2 = 'app2.herokuapp.com'
const Day3 = 'app3.herokuapp.com'
const Day4 = 'app4.herokuapp.com'
addEventListener(
    "fetch",event => {
    
        let nd = new Date();
        let day = nd.getDate() % 5;
        if (day === 0) {
            host = Day0
        } else if (day === 1) {
            host = Day1
        } else if (day === 2) {
            host = Day2
        } else if (day === 3){
            host = Day3
        } else if (day === 4){
            host = Day4
        } else {
            host = Day1
        }
        
        let url=new URL(event.request.url);
        url.hostname=host;
        let request=new Request(url,event.request);
        event. respondWith(
            fetch(request)
        )
    }
)
```
</details>

<details>
<summary>CloudFlare Workers一周轮换反代代码</summary>

```js
const Day0 = 'app0.herokuapp.com'
const Day1 = 'app1.herokuapp.com'
const Day2 = 'app2.herokuapp.com'
const Day3 = 'app3.herokuapp.com'
const Day4 = 'app4.herokuapp.com'
const Day5 = 'app5.herokuapp.com'
const Day6 = 'app6.herokuapp.com'
addEventListener(
    "fetch",event => {
    
        let nd = new Date();
        let day = nd.getDay();
        if (day === 0) {
            host = Day0
        } else if (day === 1) {
            host = Day1
        } else if (day === 2) {
            host = Day2
        } else if (day === 3){
            host = Day3
        } else if (day === 4) {
            host = Day4
        } else if (day === 5) {
            host = Day5
        } else if (day === 6) {
            host = Day6
        } else {
            host = Day1
        }
        
        let url=new URL(event.request.url);
        url.hostname=host;
        let request=new Request(url,event.request);
        event. respondWith(
            fetch(request)
        )
    }
)
```
</details>

## OpenWrt优选IP脚本自动更新：

* [CloudflareST](https://github.com/Lbingyi/CloudflareST) `OpenWrt推荐-速度较快`
* [cf-autoupdate](https://github.com/Lbingyi/cf-autoupdate) `OpenWrt推荐`

> [更多来自热心网友PR的使用教程](/tutorial)

## 关于CF筛选IP

* 请参考 [CloudflareSpeedTest](https://github.com/XIU2/CloudflareSpeedTest) `推荐`
* 请参考 [better-cloudflare-ip](https://github.com/badafans/better-cloudflare-ip)


* 由于CloudFlare的dev被封CloudFlare Pages 反代脚本分享
<details>
 
 <summary>CloudFlare pages单日反代代码</summary>
 
 ```js
 export default {
  async fetch(request, env) {
    let url = new URL(request.url);
    if (url.pathname.startsWith('/')) {
      url.hostname = 'app0.example.com'
      let new_request = new Request(url, request);
      return fetch(new_request);
    }
    return env.ASSETS.fetch(request);
  },
};
 ```
</details>

<details>
 
<summary>CloudFlare pages单双日轮换反代代码</summary>

```js
export default {
  async fetch(request, env) {
    const day1 = 'app0.example.com'
    const day2 = 'app1.example.com'
    let url = new URL(request.url);
    if (url.pathname.startsWith('/')) {
      let day = new Date()
      if (day.getDay() % 2) {
        url.hostname = day1
      } else {
        url.hostname = day2
      }
      let new_request = new Request(url, request);
      return fetch(new_request);
    }
    return env.ASSETS.fetch(request);
  },
};
```
</details>

<details>
<summary>CloudFlare pages五天轮换反代代码</summary>

```js
 export default {
  async fetch(request, env) {
    const day1 = 'app0.example.com'
    const day2 = 'app1.example.com'
    const day3 = 'app2.example.com'
    const day4 = 'app3.example.com'
    const day5 = 'app4.example.com'
    let url = new URL(request.url);
    if (url.pathname.startsWith('/')) {
      let day = new Date().getDay() % 5;
      if (day === 0) {
        url.hostname = day1
      } else if (day === 1) {
        url.hostname = day2
      } else if (day === 2) {
        url.hostname = day3
      } else if (day === 3) {
        url.hostname = day4
      } else if (day === 4) {
        url.hostname = day5
      } else {
        url.hostname = day1
      }
      let new_request = new Request(url, request);
      return fetch(new_request);
    }
    return env.ASSETS.fetch(request);
  },
};
```
</details>

<details>
<summary>CloudFlare pages一周轮换反代代码</summary>

```js
 export default {
  async fetch(request, env) {
    const day1 = 'app0.example.com'
    const day2 = 'app1.example.com'
    const day3 = 'app2.example.com'
    const day4 = 'app3.example.com'
    const day5 = 'app4.example.com'
    const day6 = 'app5.example.com'
    const day7 = 'app6.example.com'
    let url = new URL(request.url);
    if (url.pathname.startsWith('/')) {
      let day = new Date().getDay();
      if (day === 0) {
        url.hostname = day1
      } else if (day === 1) {
        url.hostname = day2
      } else if (day === 2) {
        url.hostname = day3
      } else if (day === 3) {
        url.hostname = day4
      } else if (day === 4) {
        url.hostname = day5
      } else if (day === 5) {
        url.hostname = day6
      } else if (day === 6) {
        url.hostname = day7
      } else {
        url.hostname = day1
      }
      let new_request = new Request(url, request);
      return fetch(new_request);
    }
    return env.ASSETS.fetch(request);
  },
};

```
</details>

<details>
<summary>CloudFlare pages反代代码</summary>

```js
 export default {
    async fetch(request, env) {
      let url = new URL(request.url);
      if (url.pathname.startsWith('/')) {
        // 修改下方的example.com为自己的节点ip/域名
        url.hostname="example.com";
        let new_request=new Request(url,request);
        return fetch(new_request);
      }
      return env.ASSETS.fetch(request);
    }
  };
