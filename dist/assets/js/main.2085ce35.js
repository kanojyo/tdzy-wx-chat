(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["main"],{"11e9":function(t,e,a){var s=a("52a7"),i=a("4630"),n=a("6821"),r=a("6a99"),o=a("69a8"),c=a("c69a"),u=Object.getOwnPropertyDescriptor;e.f=a("9e1e")?u:function(t,e){if(t=n(t),e=r(e,!0),c)try{return u(t,e)}catch(a){}if(o(t,e))return i(!s.f.call(t,e),t[e])}},"1af6":function(t,e,a){var s=a("63b6");s(s.S,"Array",{isArray:a("9003")})},"20fd":function(t,e,a){"use strict";var s=a("d9f6"),i=a("aebd");t.exports=function(t,e,a){e in t?s.f(t,e,i(0,a)):t[e]=a}},"386d":function(t,e,a){"use strict";var s=a("cb7c"),i=a("83a1"),n=a("5f1b");a("214f")("search",1,function(t,e,a,r){return[function(a){var s=t(this),i=void 0==a?void 0:a[e];return void 0!==i?i.call(a,s):new RegExp(a)[e](String(s))},function(t){var e=r(a,t,this);if(e.done)return e.value;var o=s(t),c=String(this),u=o.lastIndex;i(u,0)||(o.lastIndex=0);var d=n(o,c);return i(o.lastIndex,u)||(o.lastIndex=u),null===d?-1:d.index}]})},"3b2b":function(t,e,a){var s=a("7726"),i=a("5dbc"),n=a("86cc").f,r=a("9093").f,o=a("aae3"),c=a("0bfb"),u=s.RegExp,d=u,l=u.prototype,h=/a/g,p=/a/g,f=new u(h)!==h;if(a("9e1e")&&(!f||a("79e5")(function(){return p[a("2b4c")("match")]=!1,u(h)!=h||u(p)==p||"/a/i"!=u(h,"i")}))){u=function(t,e){var a=this instanceof u,s=o(t),n=void 0===e;return!a&&s&&t.constructor===u&&n?t:i(f?new d(s&&!n?t.source:t,e):d((s=t instanceof u)?t.source:t,s&&n?c.call(t):e),a?this:l,u)};for(var m=function(t){t in u||n(u,t,{configurable:!0,get:function(){return d[t]},set:function(e){d[t]=e}})},g=r(d),v=0;g.length>v;)m(g[v++]);l.constructor=u,u.prototype=l,a("2aba")(s,"RegExp",u)}a("7a56")("RegExp")},4454:function(t,e,a){t.exports=a.p+"assets/img/kefu.c023d355.jpg"},"4ffd":function(t,e,a){t.exports=a.p+"assets/img/logo.e1d63897.png"},"549b":function(t,e,a){"use strict";var s=a("d864"),i=a("63b6"),n=a("241e"),r=a("b0dc"),o=a("3702"),c=a("b447"),u=a("20fd"),d=a("7cd6");i(i.S+i.F*!a("4ee1")(function(t){Array.from(t)}),"Array",{from:function(t){var e,a,i,l,h=n(t),p="function"==typeof this?this:Array,f=arguments.length,m=f>1?arguments[1]:void 0,g=void 0!==m,v=0,_=d(h);if(g&&(m=s(m,f>2?arguments[2]:void 0,2)),void 0==_||p==Array&&o(_))for(e=c(h.length),a=new p(e);e>v;v++)u(a,v,g?m(h[v],v):h[v]);else for(l=_.call(h),a=new p;!(i=l.next()).done;v++)u(a,v,g?r(l,m,[i.value,v],!0):i.value);return a.length=v,a}})},"54a1":function(t,e,a){a("6c1c"),a("1654"),t.exports=a("95d5")},"5dbc":function(t,e,a){var s=a("d3f4"),i=a("8b97").set;t.exports=function(t,e,a){var n,r=e.constructor;return r!==a&&"function"==typeof r&&(n=r.prototype)!==a.prototype&&s(n)&&i&&i(t,n),t}},"6f15":function(t,e,a){},"774e":function(t,e,a){t.exports=a("d2d5")},"7f7f":function(t,e,a){var s=a("86cc").f,i=Function.prototype,n=/^\s*function ([^ (]*)/,r="name";r in i||a("9e1e")&&s(i,r,{configurable:!0,get:function(){try{return(""+this).match(n)[1]}catch(t){return""}}})},"7f94":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"main"},[s("el-container",[s("el-header",{staticClass:"centered"},[s("div",{staticClass:"head"},[s("div",{staticClass:"pull-left"},[s("img",{attrs:{src:a("4ffd"),alt:""}}),s("span",{staticClass:"text"},[t._v("泰斗医聊客服系统")])]),s("div",{staticClass:"pull-right"},[s("div",{staticClass:"avatar"},[s("img",{attrs:{src:a("4454"),alt:""}})]),s("el-dropdown",[s("span",{staticClass:"el-dropdown-link"},[t._v("\n                "+t._s(t.info.username)+"\n                "),s("i",{staticClass:"el-icon-arrow-down el-icon--right"})]),s("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[s("el-dropdown-item",{attrs:{divided:"","split-button":""}},[s("el-tooltip",{attrs:{content:"退出登录",placement:"bottom",effect:"light"}},[s("div",{staticClass:"iconCenter",staticStyle:{"text-align":"center"},on:{click:function(e){return t.headClick(3)}}},[s("i",{staticClass:"icon iconfont icon-tuichu"})])])],1)],1)],1)],1)])]),s("el-container",[s("el-aside",{staticClass:"left",attrs:{width:"500px"}},[s("div",{staticClass:"ul_left"},[s("ul",{staticClass:"wechat-list"},t._l(t.wechatList,function(e,a){return s("li",{key:a,staticClass:"item",class:{wechatActive:t.wechatActive===e.id},on:{click:function(a){return t.openList(e)}}},[0!==e.not_read_num?s("el-badge",{staticClass:"photo",attrs:{value:e.not_read_num>99?"99+":e.not_read_num}},[s("img",{attrs:{src:e.img,alt:""}})]):s("div",{staticClass:"photo"},[s("img",{attrs:{src:e.img,alt:""}})]),s("div",{staticClass:"text"},[s("div",{staticClass:"name",attrs:{title:e.name}},[t._v(t._s(e.name))])])],1)}),0)]),s("div",{staticClass:"ul_right"},[s("div",{staticClass:"name centered"},[t._v(t._s(t.title))]),s("div",{staticClass:"input-search"},[s("el-input",{attrs:{placeholder:"昵称/备注","prefix-icon":"el-icon-search"},on:{change:t.searchChange},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1),s("div",{directives:[{name:"show",rawName:"v-show",value:t.searchShow,expression:"searchShow"}],staticClass:"search"},[s("ul",{staticClass:"search-list"},[t.isSearchShow?s("li",{staticClass:"isSearch centered"},[t._v("无数据")]):t._l(t.userList,function(e,a){return s("li",{key:a,staticClass:"item",on:{click:function(a){return t.searchClick(e)}}},[s("div",{staticClass:"photo"},[s("img",{attrs:{src:e.avatar,alt:""}})]),s("div",{staticClass:"name"},[t._v(t._s(e.nickname))])])})],2)]),s("ul",{staticClass:"one-list"},t._l(t.groupList,function(e,a){return s("li",{key:a,staticClass:"one-item cursor"},[s("div",{staticClass:"title",on:{click:function(a){return t.OneChange(e)}}},[0!==e.not_read_num?s("el-badge",{staticClass:"text",attrs:{value:e.not_read_num>99?"99+":e.not_read_num}},[t._v(t._s(e.group_name)+"（"+t._s(e.count)+"个）")]):s("div",{staticClass:"text"},[t._v(t._s(e.group_name)+"（"+t._s(e.count)+"个）")]),s("div",{staticClass:"ioc"},[s("i",{directives:[{name:"show",rawName:"v-show",value:e.status,expression:"item.status"}],staticClass:"el-icon-arrow-down"}),s("i",{directives:[{name:"show",rawName:"v-show",value:!e.status,expression:"!item.status"}],staticClass:"el-icon-arrow-right"})])],1),s("el-collapse-transition",[s("ul",{directives:[{name:"show",rawName:"v-show",value:e.status,expression:"item.status"}],staticClass:"two-list"},t._l(e.userList,function(a,i){return s("li",{key:i,staticClass:"two-item",class:{bgActive:t.bgActive===a.id},on:{click:function(e){return t.chatChange(a)}}},[0!==e.not_read_num?s("el-badge",{staticClass:"avatar",attrs:{value:e.not_read_num>99?"99+":e.not_read_num}},[s("img",{attrs:{src:a.headimgurl}})]):s("div",{staticClass:"avatar"},[s("img",{attrs:{src:a.headimgurl}})]),s("div",{staticClass:"text"},[s("p",{staticClass:"nickname"},[t._v(t._s(a.nickname))]),s("p",{staticClass:"txt"},[t._v(t._s(a.last_msg))])]),s("div",{staticClass:"tubiao"},[s("div",{staticClass:"tubiao-icon shezhi",on:{click:function(e){return e.stopPropagation(),t.shezhiChange(a)}}},[s("i",{staticClass:"icon iconfont icon-shezhi"})])])],1)}),0)])],1)}),0)])]),s("el-main",[t.devShow?s("div",{staticClass:"main-contens"},[s("div",{staticClass:"nickname centered"},[t._v(t._s(t.userData.nickname))]),s("div",{staticClass:"dialogue-k"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.uploadShow,expression:"uploadShow"}],staticClass:"centered upload",on:{click:t.getChatList}},[t._v("加载更多~")]),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.uploadShow,expression:"!uploadShow"}],staticClass:"centered isUpload"},[t._v("无更多消息~")]),s("ul",{staticClass:"list"},t._l(t.chatList,function(e,a){return s("li",{key:a,staticClass:"item"},[1===e.key?s("div",{staticClass:"system"},[s("div",{staticClass:"text"},[t._v(t._s(e.content))])]):t._e(),0===e.key?s("div",{staticClass:"info"},[1===e.send_type?s("div",{staticClass:"tourist"},[s("div",{staticClass:"avatar"},[s("img",{attrs:{src:e.fans_avatar,alt:""}})]),s("div",{staticClass:"centens"},[s("div",{staticClass:"time"},[t._v(t._s(t._f("formatDate")(e.ctime)))]),1===e.msg_type?s("div",{staticClass:"text"},[t._v(t._s(e.content))]):t._e(),2===e.msg_type?s("div",{staticClass:"pull-left",staticStyle:{width:"200px"}},[s("img",{attrs:{src:e.picurl,alt:""}})]):t._e()])]):t._e(),2===e.send_type?s("div",{staticClass:"hospital-guide"},[s("div",{staticClass:"avatar"},[s("img",{attrs:{src:e.kf_avatar,alt:""}})]),s("div",{staticClass:"centens"},[s("div",{staticClass:"time"},[t._v(t._s(t._f("formatDate")(e.ctime)))]),1===e.msg_type?s("div",{staticClass:"text"},[t._v(t._s(e.content))]):t._e(),2===e.msg_type?s("div",{staticClass:"pull-right",staticStyle:{width:"300px"}},[s("img",{staticStyle:{width:"100%"},attrs:{src:e.picurl,alt:""}})]):t._e()])]):t._e()]):t._e()])}),0)]),s("div",{staticClass:"footer"},[s("div",{staticClass:"toolbar"},[s("ul",{staticClass:"list"},[s("li",{staticClass:"pull-left cursor file"},[s("el-upload",{attrs:{"list-type":"picture-card",action:t.uploadUrl,onSuccess:t.uploadSuccess,"show-file-list":!1}},[s("i",{staticClass:"icon iconfont icon-wenjianjia"})])],1),s("li",{staticClass:"pull-left cursor"},[s("i",{staticClass:"el-icon-picture",staticStyle:{"font-size":"24px"},on:{click:t.sendQrcode}})]),s("li",{staticClass:"pull-left cursor"},[s("i",{staticClass:"icon iconfont icon-liaotian",on:{click:t.getRecord}})])])]),s("div",{staticClass:"input-text"},[s("el-input",{staticClass:"textarea",attrs:{type:"textarea",rows:4,placeholder:"请输入内容"},nativeOn:{keyup:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submit(e)}},model:{value:t.formParams.content,callback:function(e){t.$set(t.formParams,"content",e)},expression:"formParams.content"}})],1),s("div",{staticClass:"btn"},[s("el-button",{attrs:{size:"small",type:"primary"},on:{click:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.submit(e)}}},[t._v("发 送")])],1)])]):t._e()]),s("el-aside",{staticClass:"right",attrs:{width:"400px"}},[s("div",{staticClass:"right-aside"},[s("div",{staticClass:"right-aside-top"},[s("ul",{staticClass:"list"},[s("li",{staticClass:"item",class:{active:1===t.rightActive},on:{click:function(e){t.rightActive=1}}},[t._v("快捷回复")]),s("li",{staticClass:"item",class:{active:2===t.rightActive},on:{click:function(e){t.rightActive=2}}},[t._v("客户资料")]),s("li",{staticClass:"item",class:{active:4===t.rightActive},on:{click:function(e){t.rightActive=4}}},[t._v("病症信息")])])]),s("div",{staticClass:"right-middle-contens"},[s("div",{directives:[{name:"show",rawName:"v-show",value:1===t.rightActive,expression:"rightActive === 1"}],staticClass:"reply"},[t._v("快捷回复")]),s("div",{directives:[{name:"show",rawName:"v-show",value:2===t.rightActive,expression:"rightActive === 2"}],staticClass:"remark"},[t._v("用户信息")]),s("div",{directives:[{name:"show",rawName:"v-show",value:4===t.rightActive,expression:"rightActive === 4"}],staticClass:"disease"},[t._v("病症信息")])])])])],1)],1)],1),s("el-dialog",{attrs:{title:"发送图片",visible:t.imageShow,width:t.dialogWidth},on:{"update:visible":function(e){t.imageShow=e}}},[s("div",{staticClass:"image",staticStyle:{"text-align":"center"}},[s("img",{attrs:{src:t.imageUrl,alt:""}})]),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.imageShow=!1}}},[t._v("返 回")]),s("el-button",{attrs:{type:"primary"},on:{click:t.imageChange}},[t._v("确 定")])],1)]),s("el-dialog",{attrs:{title:"聊天记录",visible:t.chatRecordsShow,width:"50%"},on:{"update:visible":function(e){t.chatRecordsShow=e}}},[s("div",{staticClass:"chatRecords"},[s("div",{directives:[{name:"show",rawName:"v-show",value:t.RecordsShow,expression:"RecordsShow"}],staticClass:"centered upload",on:{click:t.chatRecordsGet}},[t._v("加载更多~")]),s("div",{directives:[{name:"show",rawName:"v-show",value:!t.RecordsShow,expression:"!RecordsShow"}],staticClass:"centered isUpload"},[t._v("无更多消息~")]),s("ul",{staticClass:"list"},t._l(t.chatRecords,function(e,a){return s("li",{key:a,staticClass:"item"},[1===e.key?s("div",{staticClass:"system"},[s("div",{staticClass:"text"},[t._v(t._s(e.content))])]):t._e(),0===e.key?s("div",{staticClass:"info"},[1===e.send_type?s("div",{staticClass:"tourist"},[s("div",{staticClass:"avatar"},[s("img",{attrs:{src:e.fans_avatar,alt:""}})]),s("div",{staticClass:"centens"},[s("div",{staticClass:"time"},[t._v(t._s(t._f("formatDate")(e.ctime)))]),1===e.msg_type?s("div",{staticClass:"text"},[t._v(t._s(e.content))]):t._e(),2===e.msg_type?s("div",{staticClass:"pull-left",staticStyle:{width:"200px"}},[s("img",{attrs:{src:e.picurl,alt:""}})]):t._e()])]):t._e(),2===e.send_type?s("div",{staticClass:"hospital-guide"},[s("div",{staticClass:"avatar"},[s("img",{attrs:{src:e.kf_avatar,alt:""}})]),s("div",{staticClass:"centens"},[s("div",{staticClass:"time"},[t._v(t._s(t._f("formatDate")(e.ctime)))]),1===e.msg_type?s("div",{staticClass:"text"},[t._v(t._s(e.content))]):t._e(),2===e.msg_type?s("div",{staticClass:"pull-right",staticStyle:{width:"300px"}},[s("img",{staticStyle:{width:"100%"},attrs:{src:e.picurl,alt:""}})]):t._e()])]):t._e()]):t._e()])}),0)])]),s("el-dialog",{attrs:{title:"设置",visible:t.setShow,width:"550px"},on:{"update:visible":function(e){t.setShow=e}}},[s("el-form",{attrs:{"label-width":"100px",model:t.userGroup}},[s("el-form-item",{attrs:{label:"* 分组"}},[s("el-select",{attrs:{clearable:"",size:"mini",placeholder:"请选择分组"},model:{value:t.userGroup.group_id,callback:function(e){t.$set(t.userGroup,"group_id",e)},expression:"userGroup.group_id"}},t._l(t.groupList,function(t){return s("el-option",{key:t.groupid,attrs:{label:t.group_name,value:t.groupid}})}),1)],1)],1),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.setShow=!1}}},[t._v("返 回")]),s("el-button",{attrs:{type:"primary"},on:{click:t.setChange}},[t._v("确 定")])],1)],1)],1)},i=[],n=(a("386d"),a("a481"),a("a745")),r=a.n(n);function o(t){if(r()(t)){for(var e=0,a=new Array(t.length);e<t.length;e++)a[e]=t[e];return a}}var c=a("774e"),u=a.n(c),d=a("c8bb"),l=a.n(d);function h(t){if(l()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return u()(t)}function p(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function f(t){return o(t)||h(t)||p()}a("7f7f"),a("ac6a"),a("96cf");var m=a("3b8d"),g=a("bd86"),v=a("2f62"),_=a("1c1e");function w(){return Object(_["a"])({url:"/v1/wechat/index/wechat_list",method:"GET"})}function C(t){return Object(_["a"])({url:"/v1/wechat/index/wechat_group?weid="+t,method:"GET"})}function y(t){return Object(_["a"])({url:"/v1/wechat/index/my_friend_list?weid="+t.weid+"&groupid="+t.groupid,method:"GET"})}function x(t){return Object(_["a"])({url:"/v1/wechat/send_msg",method:"POST",data:t})}function b(t){return Object(_["a"])({url:"/v1/wechat/index/chat_list?fans_openid="+t.fans_openid+"&page_index="+t.page_index+"&page_size="+t.page_size,method:"GET",data:t})}function S(t){return Object(_["a"])({url:"/v1/wechat/send_image_wechat",method:"POST",data:t})}function k(t){return Object(_["a"])({url:"/v1/wechat/index/read_msg?fans_openid="+t.fans_openid+"&msg_id="+t.msg_id+"&weid="+t.weid,method:"GET",data:t})}function L(t){return Object(_["a"])({url:"/v1/wechat/send_pay_code",method:"POST",data:t})}function P(t){return Object(_["a"])({url:"/v1/wechat/change_group",method:"POST",data:t})}function R(){return Object(_["a"])({url:"/v1/wechat/login_out",method:"GET"})}a("3b2b");function O(t,e){/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(t.getFullYear()+"").substr(4-RegExp.$1.length)));var a={"M+":t.getMonth()+1,"d+":t.getDate(),"h+":t.getHours(),"m+":t.getMinutes(),"s+":t.getSeconds()};for(var s in a)if(new RegExp("(".concat(s,")")).test(e)){var i=a[s]+"";e=e.replace(RegExp.$1,1===RegExp.$1.length?i:j(i))}return e}function j(t){return("00"+t).substr(t.length)}var E={data:function(){var t;return t={info:[],dialogWidth:"30%",socketData:{user_type:"yz",query_type:"head_data",user_id:""},formParams:{weid:"",fans_openid:"",msg_type:"",content:"",source_type:"",file:""},picParams:{weid:"",fans_openid:"",source_type:1,url:""},userData:"",devShow:!1,cacheData:{cache_content:"",id:"",groupid:""},rightActive:1,keyword:"",userList:[],searchShow:!1,isSearchShow:!1,title:"",wechatList:[],wechatActive:"",bgActive:"",groupList:[],friendList:[],weid:"",params:{weid:"",groupid:""},chatParams:{fans_openid:"",page_index:"",page_size:20},recordsParams:{fans_openid:"",page_index:"",page_size:20},readMsgParams:{fans_openid:"",msg_id:"",weid:""},chatList:[],chatRecords:[],imageUrl:"",imageWidth:0,imageHeight:0,imageShow:!1,codeImageShow:!1,codeImageUrl:"",chatRecordsShow:!1,baseURL:"https://tdcsgzh.wuhanlst.com",uploadUrl:"",avatar:"https://cdn-statis.mangguokandian.com/avatar.png"},Object(g["a"])(t,"title",""),Object(g["a"])(t,"uploadShow",!1),Object(g["a"])(t,"RecordsShow",!1),Object(g["a"])(t,"setShow",!1),Object(g["a"])(t,"userGroup",{fans_openid:"",group_id:""}),Object(g["a"])(t,"chating",{groupid:""}),t},filters:{formatDate:function(t){var e=new Date(1e3*t);return O(e,"yyyy-MM-dd hh:mm:ss")}},mounted:function(){this.getWechatList(),this.WebSocketTest(),this.uploadUrl=this.baseURL+"/v1/uploads"},computed:Object(v["c"])({token:function(t){return t.token},device:function(t){return t.device}}),methods:{headClick:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(e){var a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(3!==e){t.next=5;break}return t.next=3,R();case 3:a=t.sent,200===a.code&&(this.$router.push("/"),sessionStorage.clear());case 5:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),readMsg:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,k(this.readMsgParams);case 2:e=t.sent,200===e.code&&(a=e.data,this.wechatList.forEach(function(t){t.id==a.weid&&(t.not_read_num=a.we_not_read_num)}));case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),getWechatList:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,w();case 2:e=t.sent,200===e.code&&(this.wechatList=e.data.wechat,this.weid=e.data.wechat[0].id,this.params.weid=this.weid,this.formParams.weid=this.weid,this.picParams.weid=this.weid,this.title=e.data.wechat[0].name,this.getGroup());case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),getGroup:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e,a=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,C(this.weid);case 2:e=t.sent,200===e.code&&(this.groupList=e.data.group_info,this.groupList.forEach(function(t){t.status=!1,a.params.groupid=t.groupid,y(a.params).then(function(e){200===e.code&&(t.userList=e.data.friend_list,t.userList.forEach(function(t){t.content=""}))})}),console.log(this.groupList));case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),openList:function(t){console.log(t),this.wechatActive=t.id,this.weid=t.id,this.params.weid=t.id,this.formParams.weid=t.id,this.picParams.weid=t.id,this.title=t.name,this.getGroup(),console.log(this.weid,"公众号id"),console.log(this.wechatList)},getChatList:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,b(this.chatParams);case 2:e=t.sent,200===e.code&&((a=this.chatList).unshift.apply(a,f(e.data.data)),""==this.chatParams.page_index?(this.chatParams.page_index=e.data.max_page-1,e.data.max_page>1?this.uploadShow=!0:this.uploadShow=!1):this.chatParams.page_index>1?(this.chatParams.page_index--,this.uploadShow=!0):1===this.chatParams.page_index&&(this.uploadShow=!1));case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),chatChange:function(t){var e=this;console.log(this.weid,"聊天公众号id"),this.formParams.fans_openid=t.fans_openid,this.picParams.fans_openid=t.fans_openid,this.chatParams.fans_openid=t.fans_openid,this.chatParams.page_index="",this.readMsgParams.fans_openid=t.fans_openid,this.readMsgParams.weid=this.weid,this.readMsgParams.msg_id=0,this.readMsg(),t.not_read_num=0,this.groupList.forEach(function(t){t.not_read_num=0,t.userList.forEach(function(e){t.not_read_num+=e.not_read_num})}),this.cacheData.content=this.formParams.content,this.cacheData.groupid&&this.groupList.forEach(function(t){t.groupid===e.cacheData.groupid&&t.userList.forEach(function(t){t.id===e.cacheData.id&&(t.content=e.cacheData.content)})}),this.formParams.content=t.content,this.bgActive=t.id,this.userData=t,this.cacheData.id=t.id,this.cacheData.groupid=t.groupid,this.devShow=!0,this.chatList=[],this.getChatList(),this.scrollChange()},OneChange:function(t){t.status=!t.status,this.chating.groupid=t.groupid,this.$forceUpdate()},send:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e,a,s,i;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,x(this.formParams);case 2:e=t.sent,200===e.code&&(console.log(e),s=e.data,i={},this.formParams.content="",a={content:s.content,msg_type:s.msg_type,ctime:s.ctime,key:0,send_type:2},Object(g["a"])(a,"msg_type",1),Object(g["a"])(a,"kf_avatar",this.avatar),i=a,this.chatList.push(i),this.scrollChange());case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),submit:function(){""!==this.formParams.content?(this.formParams.content=this.formParams.content.replace(/\n/,""),this.formParams.msg_type=1,this.send()):this.$message({message:"请输入内容",type:"warning"})},uploadSuccess:function(t){200===t.code&&(console.log(t.data.url),this.imageUrl=t.data.url,this.imageShow=!0,this.title="发送图片")},imageChange:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e,a,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.picParams.url=this.imageUrl,t.next=3,S(this.picParams);case 3:e=t.sent,200===e.code&&(a=e.data,s={picurl:a.picurl,msg_type:a.msg_type,ctime:a.ctime,key:0,send_type:2,kf_avatar:this.avatar},this.chatList.push(s),this.imageUrl="",this.imageShow=!1,this.scrollChange());case 5:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),searchChange:function(){var t=this;this.userList=[],""===this.keyword?this.searchShow=!1:(this.groupList.forEach(function(e){e.userList.forEach(function(e){-1!==e.nickname.search(t.keyword)&&t.userList.push({avatar:e.headimgurl,nickname:e.nickname,groupid:e.groupid,id:e.id})})}),""===this.userList?(this.searchShow=!0,this.isSearchShow=!0):(this.searchShow=!0,this.isSearchShow=!1))},searchClick:function(t){var e=this,a=t;this.groupList.forEach(function(t){t.groupid===a.groupid&&(t.status=!0,t.userList.forEach(function(t){t.id===a.id&&(e.chatChange(t),e.searchShow=!1,e.isSearchShow=!1)}))})},scrollChange:function(){setTimeout(function(){var t=document.querySelector(".dialogue-k > .list"),e=document.querySelector(".dialogue-k");setTimeout(function(){e.scrollHeight-110<=t.scrollHeight&&(e.scrollTop=t.scrollHeight)},50)},200)},sendCodeGet:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e,a,s;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,L({weid:this.formParams.weid,fans_openid:this.formParams.fans_openid});case 2:e=t.sent,200===e.code&&(a=e.data,s={picurl:a.picurl,msg_type:a.msg_type,ctime:a.ctime,key:0,send_type:2,kf_avatar:this.avatar},this.chatList.push(s),this.scrollChange());case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),sendQrcode:function(){this.sendCodeGet()},getRecord:function(){this.chatRecordsShow=!0,this.recordsParams.fans_openid=this.chatParams.fans_openid,this.recordsParams.page_index="",this.chatRecords=[],this.chatRecordsGet()},chatRecordsGet:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e,a;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,b(this.recordsParams);case 2:e=t.sent,200===e.code&&((a=this.chatRecords).unshift.apply(a,f(e.data.data)),""===this.recordsParams.page_index?(this.recordsParams.page_index=e.data.max_page-1,e.data.max_page>1?this.RecordsShow=!0:this.RecordsShow=!1):this.recordsParams.page_index>1?(this.recordsParams.page_index--,this.RecordsShow=!0):1===this.recordsParams.page_index&&(this.RecordsShow=!1));case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),shezhiChange:function(t){this.setShow=!0,this.userGroup.group_id="",this.userGroup.fans_openid=t.fans_openid},setChange:function(){var t=Object(m["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(""!==this.userGroup.group_id){t.next=3;break}return this.$message({message:"请选择分组",type:"warning"}),t.abrupt("return");case 3:return t.next=5,P(this.userGroup);case 5:e=t.sent,200===e.code&&(this.getGroup(),this.setShow=!1);case 7:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),WebSocketTest:function(){var t=this,e=new WebSocket("ws://tdcsgzh.wuhanlst.com:11111?token="+this.token+"&device="+this.device);e.onopen=function(){},e.onmessage=function(e){var a;if(a=-1!=e.data.indexOf("{")?JSON.parse(e.data):e.data,200===a.code){var s=a.data;console.log(s),t.weid===s.weid&&t.chating.groupid===s.groupid&&1===s.msg_type&&t.groupList.forEach(function(e){e.groupid===t.chating.groupid&&e.userList.forEach(function(t){t.fans_openid===s.fans_openid&&(t.last_msg=s.content)})}),t.formParams.fans_openid==s.fans_openid?(t.readMsgParams.msg_id=s.msg_id,t.readMsg(),s.not_read_num=0,t.chatList.push(s),t.scrollChange()):t.weid===s.weid?(t.groupList.forEach(function(e){if(e.groupid===s.groupid){var a=0;e.userList.forEach(function(e){console.log(e),e.fans_openid===s.fans_openid?(e.not_read_num=s.not_read_num,a+=e.not_read_num,console.log(t.groupList)):a+=e.not_read_num}),e.not_read_num=a}}),t.wechatList.forEach(function(t){t.id===s.weid&&(t.not_read_num=s.wx_not_read_num)})):t.weid!==s.weid&&t.wechatList.forEach(function(t){t.id===s.weid&&(t.not_read_num=s.wx_not_read_num)})}},e.onclose=function(){}}}},A=E,T=(a("d6ee"),a("2877")),G=Object(T["a"])(A,s,i,!1,null,"b5979d0a",null);e["default"]=G.exports},"83a1":function(t,e){t.exports=Object.is||function(t,e){return t===e?0!==t||1/t===1/e:t!=t&&e!=e}},"8b97":function(t,e,a){var s=a("d3f4"),i=a("cb7c"),n=function(t,e){if(i(t),!s(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,s){try{s=a("9b43")(Function.call,a("11e9").f(Object.prototype,"__proto__").set,2),s(t,[]),e=!(t instanceof Array)}catch(i){e=!0}return function(t,a){return n(t,a),e?t.__proto__=a:s(t,a),t}}({},!1):void 0),check:n}},9093:function(t,e,a){var s=a("ce10"),i=a("e11e").concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return s(t,i)}},"95d5":function(t,e,a){var s=a("40c3"),i=a("5168")("iterator"),n=a("481b");t.exports=a("584a").isIterable=function(t){var e=Object(t);return void 0!==e[i]||"@@iterator"in e||n.hasOwnProperty(s(e))}},a745:function(t,e,a){t.exports=a("f410")},ac6a:function(t,e,a){for(var s=a("cadf"),i=a("0d58"),n=a("2aba"),r=a("7726"),o=a("32e9"),c=a("84f2"),u=a("2b4c"),d=u("iterator"),l=u("toStringTag"),h=c.Array,p={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},f=i(p),m=0;m<f.length;m++){var g,v=f[m],_=p[v],w=r[v],C=w&&w.prototype;if(C&&(C[d]||o(C,d,h),C[l]||o(C,l,v),c[v]=h,_))for(g in s)C[g]||n(C,g,s[g],!0)}},c8bb:function(t,e,a){t.exports=a("54a1")},d2d5:function(t,e,a){a("1654"),a("549b"),t.exports=a("584a").Array.from},d6ee:function(t,e,a){"use strict";var s=a("6f15"),i=a.n(s);i.a},f410:function(t,e,a){a("1af6"),t.exports=a("584a").Array.isArray}}]);