(function(e){function t(t){for(var r,o,c=t[0],s=t[1],u=t[2],l=0,d=[];l<c.length;l++)o=c[l],a[o]&&d.push(a[o][0]),a[o]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==a[c]&&(r=!1)}r&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},o={app:0},a={app:0},i=[];function c(e){return s.p+"assets/js/"+({main:"main"}[e]||e)+"."+{main:"ac87e698"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={main:1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise(function(t,n){for(var r="assets/css/"+({main:"main"}[e]||e)+"."+{main:"9440a7ee"}[e]+".css",a=s.p+r,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var u=i[c],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===r||l===a))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){u=d[c],l=u.getAttribute("data-href");if(l===r||l===a)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var r=t&&t.target&&t.target.src||a,i=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete o[e],f.parentNode.removeChild(f),n(i)},f.href=a;var v=document.getElementsByTagName("head")[0];v.appendChild(f)}).then(function(){o[e]=0}));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var i=new Promise(function(t,n){r=a[e]=[t,n]});t.push(r[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=c(e),u=function(t){l.onerror=l.onload=null,clearTimeout(d);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");i.type=r,i.request=o,n[1](i)}a[e]=void 0}};var d=setTimeout(function(){u({type:"timeout",target:l})},12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var f=l;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"1c1e":function(e,t,n){"use strict";n("a481");var r=n("bc3a"),o=n.n(r),a=n("41cb"),i=n("5c96"),c=n.n(i),s=o.a.create({baseURL:"https://wxgzh.whtdzyy.com",timeout:3e3});s.interceptors.request.use(function(e){return sessionStorage.getItem("token")&&(e.headers.Authorization="Bearer "+sessionStorage.getItem("token")),localStorage.getItem("device")&&(e.headers.device=localStorage.getItem("device")),e},function(e){console.log(e),Promise.reject(e)}),s.interceptors.response.use(function(e){var t=e.data;if(401===t.code)a["a"].push("/"),sessionStorage.clear(),window.location.reload(),c.a.Message.error(t.message);else if(400===t.code)c.a.Message.error(t.message);else if(500===t.code)c.a.Message.error(t.message);else if(402===t.code)c.a.Message.error(t.message);else if(403===t.code)c.a.Message.error(t.message);else if(200===t.code&&sessionStorage.getItem("token")&&void 0!==e.headers.authorization){var n=e.headers.authorization.replace(/Bearer /,"");sessionStorage.setItem("token",n)}return t},function(e){return c.a.Message.error("404:网络链接错误"),c.a.Loading.service().close(),Promise.reject(e)}),t["a"]=s},"41cb":function(e,t,n){"use strict";var r=n("2b0e"),o=n("8c4f"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"login"},[n("div",{staticClass:"bg"}),n("div",{staticClass:"login-auto"},[n("h1",[e._v("泰斗公众号聊天系统")]),n("p",[e._v("Business Management System")]),n("div",{staticClass:"login-input"},[e.qrcodeShow?n("div",{staticClass:"qrcode"},[n("div",{staticClass:"code"}),n("canvas",{attrs:{id:"canvas"}})]):n("div",{staticClass:"overtime"},[n("p",[e._v("二维码已过期")])]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.qrcodeShow,expression:"qrcodeShow"}],staticClass:"text"},[e._v("请扫上方二维码进行登录")]),e._m(0)])])])])},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text"},[e._v("@2019\n          "),n("a",{attrs:{href:"http://www.whtdzyy.com/",target:"_blank"}},[e._v("泰斗中医院")]),e._v(" 版权所有\n        ")])}],c=(n("28a5"),n("96cf"),n("3b8d")),s=n("cebc"),u=n("bc3a"),l=n.n(u),d=n("1c1e");function f(e){return Object(d["a"])({url:"/v1/device",method:"GET",data:e})}function v(e){return Object(d["a"])({url:"v1/wechat/login/login_poll?login_code="+e,method:"GET"})}var m=n("2f62"),g=n("d055"),h=n.n(g),p={data:function(){return{device:"",qrcodeUrl:"",login_code:"",timeOut:!1,qrcodeShow:!0,baseURL:"https://wxgzh.whtdzyy.com"}},mounted:function(){localStorage.getItem("device")||this.GetDevice(),this.device=localStorage.getItem("device"),this.GetQrCode()},methods:Object(s["a"])({},Object(m["b"])({getAdmin:"getAdmin",getToken:"getToken",getDevice:"getDevice"}),{GetQrCode:function(){var e=this;l.a.defaults.headers.device=localStorage.getItem("device"),l.a.get(this.baseURL+"/v1/wechat/login/qrcode").then(function(t){if(200==t.data.code){e.qrcodeUrl=t.data.data.qr_code_url;var n=document.querySelector("#canvas");h.a.toCanvas(n,e.qrcodeUrl,function(e){e&&console.error(e)}),e.move()}}).catch(function(e){console.log(e)})},GetDevice:function(){var e=Object(c["a"])(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,f(this.device);case 2:t=e.sent,200===t.code&&(this.device=t.data.device,this.getDevice(t.data.device));case 4:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),GetLoginSuccess:function(){var e=Object(c["a"])(regeneratorRuntime.mark(function e(){var t,n,r;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t=this.qrcodeUrl,n=t.split("=")[1],this.login_code=n,e.next=5,v(this.login_code);case 5:r=e.sent,200===r.code?(this.getToken(r.data.token),this.timeOut=!0,this.$router.push({path:"/main",query:{avatar:r.data.avatar,nickname:r.data.nickname}})):400===r.code&&(this.qrcodeShow=!1,this.timeOut=!0);case 7:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),move:function(){var e=this,t=function t(){var n=null;e.timeOut||(clearTimeout(n),e.GetLoginSuccess(),n=setTimeout(t,3e3))};t()}})},b=p,w=(n("7a3c"),n("2877")),y=Object(w["a"])(b,a,i,!1,null,"b264cbe2",null),_=y.exports;r["default"].use(o["a"]);t["a"]=new o["a"]({mode:"history",base:"/",routes:[{path:"*",name:"",meta:{title:"泰斗医聊客服系统-登录页面",keepAlive:!0},component:_},{path:"/",name:"login",meta:{title:"泰斗公众号聊天系统-登录页面",keepAlive:!0},component:_},{path:"/main",name:"main",meta:{title:"泰斗公众号聊天系统-聊天页面",keepAlive:!0},component:function(){return n.e("main").then(n.bind(null,"7f94"))}}]})},"4ee2":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},a=[],i=n("2877"),c={},s=Object(i["a"])(c,o,a,!1,null,null,null),u=s.exports,l=n("41cb"),d=n("2f62");r["default"].use(d["a"]);var f=new d["a"].Store({state:{login:JSON.parse(sessionStorage.getItem("login"))||"",token:sessionStorage.getItem("token")||0,device:localStorage.getItem("device")||0},mutations:{GET_ADMIN:function(e,t){e.login=t},GET_TOKEN:function(e,t){e.token=t},GET_DEVICE:function(e,t){e.device=t}},actions:{getAdmin:function(e,t){var n=e.commit;sessionStorage.setItem("login",JSON.stringify(t)),n("GET_ADMIN",t)},getToken:function(e,t){var n=e.commit;sessionStorage.setItem("token",t),n("GET_TOKEN",t)},getDevice:function(e,t){var n=e.commit;localStorage.setItem("device",t),n("GET_DEVICE",t)}}}),v=n("5c96"),m=n.n(v),g=(n("0fae"),n("a2f0"),n("4ee2"),n("a342"),["/"]);l["a"].beforeEach(function(e,t,n){0==f.state.token?"/"!==e.path?n({path:"/"}):n():-1===g.indexOf(e.path)?n():n("/")}),r["default"].filter("dis_type",function(e){return 1==e?"待诊断":2==e?"已诊断":3==e?"已确诊":4==e?"放弃确诊":6==e?"已下处方":7==e?"已下单":8==e?"未成单":9==e?"已驳回":10==e?"取消病症":11==e?"临时保存":void 0}),r["default"].filter("button_type",function(e){return 1==e?"驳回原因":2==e?"弃用":3==e?"复用":void 0}),r["default"].filter("office_id",function(e){return 1==e?"男科":2==e?"肛肠科":3==e?"鼻炎科":4==e?"乳腺科":void 0}),r["default"].filter("sex_type",function(e){return 1==e?"男":2==e?"女":void 0}),r["default"].filter("sk_state",function(e){return 0==e?"在线":1==e?"离线":void 0}),r["default"].config.productionTip=!1,r["default"].use(m.a),n("1368").polyfill(),l["a"].beforeEach(function(e,t,n){document.title=e.meta.title,n()}),new r["default"]({router:l["a"],store:f,render:function(e){return e(u)}}).$mount("#app")},"7a3c":function(e,t,n){"use strict";var r=n("e4c2"),o=n.n(r);o.a},a2f0:function(e,t,n){},a342:function(e,t,n){},e4c2:function(e,t,n){}});