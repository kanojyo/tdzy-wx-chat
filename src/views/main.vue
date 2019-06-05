<template>
  <div>
    <div class="main">
      <el-container>
        <el-header class="centered">
          <div class="head">
            <div class="pull-left">
              <img src="../assets/img/logo.png" alt>
              <span class="text">泰斗医聊客服系统</span>
            </div>
            <div class="pull-right">
              <div class="avatar">
                <img src="../assets/img/kefu.jpg" alt>
              </div>
              <el-dropdown>
                <span class="el-dropdown-link">
                  {{info.username}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <!-- <el-dropdown-item split-button>
                    <span @click="baseInfo">基本信息</span>
                  </el-dropdown-item>
                  <el-dropdown-item split-button>
                    <span @click="changePassword">修改密码</span>
                  </el-dropdown-item>-->
                  <!-- <el-dropdown-item split-button>
                    <span @click="WebSocketTest">websocket</span>
                  </el-dropdown-item>-->
                  <el-dropdown-item divided split-button>
                    <el-tooltip content="退出登录" placement="bottom" effect="light">
                      <div class="iconCenter" @click="headClick(3)" style="text-align:center;">
                        <i class="icon iconfont icon-tuichu"></i>
                      </div>
                    </el-tooltip>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-header>
        <el-container>
          <el-aside class="left" width="500px">
            <div class="ul_left">
              <ul class="wechat-list">
                <li
                  class="item"
                  v-for="(item, index) in wechatList"
                  :key="index"
                  :class="{wechatActive: wechatActive === item.id}"
                  @click="openList(item)"
                >
                  <el-badge
                    class="photo"
                    :value="item.not_read_num>99?'99+':item.not_read_num"
                    v-if="item.not_read_num !== 0"
                  >
                    <img :src="item.img" alt>
                  </el-badge>
                  <div class="photo" v-else>
                    <img :src="item.img" alt>
                  </div>
                  <div class="text">
                    <div class="name" :title="item.name">{{item.name}}</div>
                    <!-- <span class="number" v-show="item.not_read_num !== 0">{{item.not_read_num}}</span> -->
                  </div>
                </li>
              </ul>
            </div>
            <div class="ul_right">
              <div class="name centered">{{title}}</div>
              <div class="input-search">
                <el-input
                  v-model="keyword"
                  placeholder="昵称/备注"
                  prefix-icon="el-icon-search"
                  @change="searchChange"
                ></el-input>
              </div>
              <div class="search" v-show="searchShow">
                <ul class="search-list">
                  <li class="isSearch centered" v-if="isSearchShow">无数据</li>
                  <li
                    class="item"
                    v-else
                    v-for="(item, index) in userList"
                    :key="index"
                    @click="searchClick(item)"
                  >
                    <div class="photo">
                      <img :src="item.avatar" alt>
                    </div>
                    <div class="name">{{item.nickname}}</div>
                  </li>
                </ul>
              </div>
              <ul class="one-list">
                <li class="one-item cursor" v-for="(item, index) in groupList" :key="index">
                  <div class="title" @click="OneChange(item)">
                    <el-badge
                      class="text"
                      :value="item.not_read_num>99?'99+':item.not_read_num"
                      v-if="item.not_read_num !==0"
                    >{{item.group_name}}（{{item.count}}个）</el-badge>
                    <div class="text" v-else>{{item.group_name}}（{{item.count}}个）</div>
                    <div class="ioc">
                      <i class="el-icon-arrow-down" v-show="item.status"></i>
                      <i class="el-icon-arrow-right" v-show="!item.status"></i>
                    </div>
                  </div>
                  <el-collapse-transition>
                    <ul class="two-list" v-show="item.status">
                      <li
                        class="two-item"
                        v-for="(i, k) in item.userList"
                        :key="k"
                        :class="{bgActive: bgActive === i.id}"
                        @click="chatChange(i)"
                      >
                        <el-badge
                          class="avatar"
                          :value="item.not_read_num>99?'99+':item.not_read_num"
                          v-if="item.not_read_num !==0"
                        >
                          <img :src="i.headimgurl">
                        </el-badge>
                        <div class="avatar" v-else>
                          <img :src="i.headimgurl">
                        </div>
                        <div class="text">
                          <p class="nickname">{{i.nickname}}</p>
                          <p class="txt">{{i.last_msg}}</p>
                        </div>
                        <div class="tubiao">
                          <div class="tubiao-icon shezhi" @click.stop="shezhiChange(i)">
                            <i class="icon iconfont icon-shezhi"></i>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </el-collapse-transition>
                </li>
              </ul>
            </div>
          </el-aside>
          <el-main>
            <div class="main-contens" v-if="devShow">
              <div class="nickname centered">{{userData.nickname}}</div>
              <div class="dialogue-k">
                <div class="centered upload" v-show="uploadShow" @click="getChatList">加载更多~</div>
                <div class="centered isUpload" v-show="!uploadShow">无更多消息~</div>
                <ul class="list">
                  <li class="item" v-for="(item, index) in chatList" :key="index">
                    <div class="system" v-if="item.key===1">
                      <div class="text">{{item.content}}</div>
                    </div>
                    <div class="info" v-if="item.key===0">
                      <div class="tourist" v-if="item.send_type === 1">
                        <div class="avatar">
                          <img :src="item.fans_avatar" alt>
                        </div>
                        <div class="centens">
                          <div class="time">{{item.ctime|formatDate}}</div>
                          <div class="text" v-if="item.msg_type === 1">{{item.content}}</div>
                          <div v-if="item.msg_type === 2" class="pull-left" style="width: 200px;">
                            <img :src="item.picurl" alt>
                          </div>
                        </div>
                      </div>
                      <div class="hospital-guide" v-if="item.send_type === 2">
                        <div class="avatar">
                          <img :src="item.kf_avatar" alt>
                        </div>
                        <div class="centens">
                          <div class="time">{{item.ctime|formatDate}}</div>
                          <div class="text" v-if="item.msg_type === 1">{{item.content}}</div>
                          <div class="pull-right" v-if="item.msg_type === 2" style="width:300px;">
                            <img :src="item.picurl" alt style="width:100%;">
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="footer">
                <div class="toolbar">
                  <ul class="list">
                    <li class="pull-left cursor file">
                      <el-upload
                        list-type="picture-card"
                        :action="uploadUrl"
                        :before-upload="beforeUpload"
                        :onSuccess="uploadSuccess"
                        :show-file-list="false"
                      >
                        <i class="icon iconfont icon-wenjianjia"></i>
                      </el-upload>
                    </li>
                    <li class="pull-left cursor">
                      <i class="el-icon-picture" style="font-size:24px;" @click="sendQrcode"></i>
                    </li>
                    <li class="pull-left cursor">
                      <i class="icon iconfont icon-liaotian" @click="getRecord"></i>
                    </li>
                  </ul>
                </div>
                <div class="input-text">
                  <el-input
                    v-model="formParams.content"
                    @keyup.enter.native="submit"
                    class="textarea"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入内容"
                  ></el-input>
                </div>
                <div class="btn">
                  <el-button size="small" type="primary" @click.enter="submit">发 送</el-button>
                </div>
              </div>
            </div>
          </el-main>
          <el-aside class="right" width="400px">
            <div class="right-aside">
              <div class="right-aside-top">
                <ul class="list">
                  <li
                    class="item"
                    :class="{active: rightActive === 1}"
                    @click="rightActive = 1"
                  >快捷回复</li>
                  <li
                    class="item"
                    :class="{active: rightActive === 2}"
                    @click="rightActive = 2"
                  >客户资料</li>
                  <!-- <li class="item" :class="{active: rightActive === 3}" @click="rightActive = 3">聊天记录</li> -->
                  <li
                    class="item"
                    :class="{active: rightActive === 4}"
                    @click="rightActive = 4"
                  >病症信息</li>
                </ul>
              </div>
              <div class="right-middle-contens">
                <div class="reply" v-show="rightActive === 1">快捷回复</div>
                <div class="remark" v-show="rightActive === 2">用户信息</div>
                <!-- <div class="record" v-show="rightActive === 3">
                  聊天记录
                </div>-->
                <div class="disease" v-show="rightActive === 4">病症信息</div>
              </div>
            </div>
          </el-aside>
        </el-container>
      </el-container>
    </div>
    <!-- 发送图片 -->
    <el-dialog title="发送图片" :visible.sync="imageShow" :width="dialogWidth">
      <div class="image" style="text-align:center;">
        <!-- <img :src="imageUrl" alt v-if="imageWidth>900" style="width:100%;">
        <img :src="imageUrl" alt v-else style="width:auto;">-->
        <img :src="imageUrl" alt>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="imageShow = false">返 回</el-button>
        <el-button type="primary" @click="imageChange">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="聊天记录" :visible.sync="chatRecordsShow" width="50%">
      <div class="chatRecords">
        <div class="centered upload" v-show="RecordsShow" @click="chatRecordsGet">加载更多~</div>
        <div class="centered isUpload" v-show="!RecordsShow">无更多消息~</div>
        <ul class="list">
          <li class="item" v-for="(item, index) in chatRecords" :key="index">
            <div class="system" v-if="item.key===1">
              <div class="text">{{item.content}}</div>
            </div>
            <div class="info" v-if="item.key===0">
              <div class="tourist" v-if="item.send_type === 1">
                <div class="avatar">
                  <img :src="item.fans_avatar" alt>
                </div>
                <div class="centens">
                  <div class="time">{{item.ctime|formatDate}}</div>
                  <div class="text" v-if="item.msg_type === 1">{{item.content}}</div>
                  <div v-if="item.msg_type === 2" class="pull-left" style="width: 200px;">
                    <img :src="item.picurl" alt>
                  </div>
                </div>
              </div>
              <div class="hospital-guide" v-if="item.send_type === 2">
                <div class="avatar">
                  <img :src="item.kf_avatar" alt>
                </div>
                <div class="centens">
                  <div class="time">{{item.ctime|formatDate}}</div>
                  <div class="text" v-if="item.msg_type === 1">{{item.content}}</div>
                  <div class="pull-right" v-if="item.msg_type === 2" style="width:300px;">
                    <img :src="item.picurl" alt style="width:100%;">
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </el-dialog>
    <!-- 设置分组 -->
    <el-dialog title="设置" :visible.sync="setShow" width="550px">
      <el-form label-width="100px" :model="userGroup">
        <el-form-item label="* 分组">
          <el-select v-model="userGroup.group_id" clearable size="mini" placeholder="请选择分组">
            <el-option
              v-for="item in groupList"
              :key="item.groupid"
              :label="item.group_name"
              :value="item.groupid"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setShow = false">返 回</el-button>
        <el-button type="primary" @click="setChange">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import {
  wechatList,
  wechatGroup,
  friendList,
  sendMsg,
  chatListGet,
  uploads,
  sendImage,
  readMsg,
  sendCode,
  changeGroup,
  signOut
} from "@/api/main.js";
import { formatDate } from "@/utils/index.js";
export default {
  data() {
    return {
      info: [],
      dialogWidth: "30%",
      socketData: {
        user_type: "yz",
        query_type: "head_data",
        user_id: ""
      },
      formParams: {
        //  发送消息参数
        weid: "", //微信公众id
        fans_openid: "", //粉丝openid
        msg_type: "", // int 消息类型 1文字，2图片
        content: "", // string 消息内容
        source_type: "", //1：图片，2：声音，3：视频，4：缩略图（目前只支持1）
        file: ""
      },
      picParams: {
        weid: "", //微信公众id
        fans_openid: "", //粉丝openid
        source_type: 1, //1：图片
        url: ""
      },
      userData: "", //  用户
      devShow: false, //  显示聊天对话框
      cacheData: {
        cache_content: "", //临时内容储存
        id: "",
        groupid: ""
      },

      rightActive: 1, //  右边tabs切换
      keyword: "", //用户搜索keyword
      userList: [], //  用户搜索数据
      searchShow: false, //  用户搜索显示
      isSearchShow: false, //  用户搜索显示数据
      title: "",
      wechatList: [], //公众号列表
      wechatActive: "", //  公众号选中样式
      bgActive: "", //  好友选中样式
      groupList: [],
      friendList: [],
      weid: "", //公众号的id
      params: {
        //好友列表的参数
        weid: "",
        groupid: ""
      },
      chatParams: {
        fans_openid: "",
        page_index: "",
        page_size: 20
      },
      recordsParams: {
        fans_openid: "",
        page_index: "",
        page_size: 20,
      },
      readMsgParams: {
        //消息上报的参数
        fans_openid: "",
        msg_id: "",
        weid: ""
      },
      chatList: [], //  页面聊天记录
      chatRecords: [], // 弹出层的聊天记录
      imageUrl: "", //  复制图片
      imageWidth: 0, //  图片宽度
      imageHeight: 0, //  图片高度
      imageShow: false, //  显示图片
      codeImageShow: false, //显示二维码图片
      codeImageUrl: "", //  二维码图片
      chatRecordsShow: false, //显示聊天记录
      baseURL: process.env.VUE_APP_URL,
      uploadUrl: "",
      avatar: "https://cdn-statis.mangguokandian.com/avatar.png",
      title: "",
      uploadShow: false, //有无更多聊天记录
      RecordsShow: false, //聊天弹框有无更多聊天记录
      setShow: false, //分组状态
      userGroup: {
        //分组参数
        fans_openid: "",
        group_id: ""
      },
      chating:{
        groupid:'',
      },
    };
  },
  filters: {
    formatDate(time) {
      let date = new Date(time * 1000);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss"); // 年月日 格式自己定义   'yyyy : MM : dd'  例 2018年12月5日的格式
    }
  },
  mounted() {
    this.getWechatList(); //获取公众号列表
    this.WebSocketTest();
    this.uploadUrl = this.baseURL + "/v1/uploads";
  },
  computed: mapState({
    // user: state => state.login, //   用户名
    token: state => state.token, // token
    device: state => state.device // device
  }),
  methods: {
    async headClick(val) {
      if (val === 3) {
        //退出登录
        let data = await signOut();
        if (data.code === 200) {
          this.$router.push('/out');
          sessionStorage.clear();
          window.location.reload();
        }
      }
    },
    //已读消息上报
    async readMsg() {
      let data = await readMsg(this.readMsgParams);
      if (data.code === 200) {
        let msg = data.data;
        this.wechatList.forEach(item => {
          if ((item.id == msg.weid)) {
            item.not_read_num = msg.we_not_read_num;
          }
        });
      }
    },
    //获取公众号列表
    async getWechatList() {
      let data = await wechatList();
      if (data.code === 200) {
        // console.log(data);
        this.wechatList = data.data.wechat;
        this.weid = data.data.wechat[0].id;
        this.params.weid = this.weid;
        this.formParams.weid = this.weid;
        this.picParams.weid = this.weid;
        this.title = data.data.wechat[0].name;
        this.getGroup();
      }
    },
    //获取公众号下面的分组列表
    async getGroup() {
      let data = await wechatGroup(this.weid);
      if (data.code === 200) {
        // console.log(data);
        this.groupList = data.data.group_info;
        this.groupList.forEach(item => {
          item.status = false;
          this.params.groupid = item.groupid;
          friendList(this.params).then(data => {
            if (data.code === 200) {
              item.userList = data.data.friend_list;
              item.userList.forEach(val => {
                //给每个用户赋值content,用来存为输入完没发送的文字;
                val.content = "";
              });
            }
          });
        });
        console.log(this.groupList);
      }
    },
    //点击打开公众号列表
    openList(val) {
      console.log(val)
      this.wechatActive = val.id;
      this.weid = val.id;
      this.params.weid = val.id;
      this.formParams.weid = val.id;
      this.picParams.weid = val.id;
      this.title = val.name;
      //获取公众号下面的分组列表
      this.getGroup();
      console.log(this.weid,"公众号id")
      console.log(this.wechatList)
    },
    //聊天页面的聊天记录数据
    async getChatList() {
      let data = await chatListGet(this.chatParams);
      if (data.code === 200) {
        this.chatList.unshift(...data.data.data);
        if (this.chatParams.page_index == "") {
          this.chatParams.page_index = data.data.max_page - 1;
          if (data.data.max_page > 1) {
            this.uploadShow = true;
          } else {
            this.uploadShow = false;
          }
        } else if (this.chatParams.page_index > 1) {
          this.chatParams.page_index--;
          this.uploadShow = true;
        } else if (this.chatParams.page_index === 1) {
          this.uploadShow = false;
        }
      }
    },
    //点击打开聊天界面
    chatChange(val) {
      // console.log(val)
      console.log(this.weid,"聊天公众号id")
      this.formParams.fans_openid = val.fans_openid;
      this.picParams.fans_openid = val.fans_openid;
      this.chatParams.fans_openid = val.fans_openid;
      this.chatParams.page_index = "";
      this.readMsgParams.fans_openid = val.fans_openid;
      this.readMsgParams.weid = this.weid;
      this.readMsgParams.msg_id = 0;
      this.readMsg();
      val.not_read_num = 0;
      // console.log(this.groupList)
      this.groupList.forEach(item => {
        item.not_read_num = 0;
        item.userList.forEach(it => {
          item.not_read_num += it.not_read_num;
        });
      });
      //将content内容存起来
      this.cacheData.content = this.formParams.content;
      if (this.cacheData.groupid) {
        this.groupList.forEach(item => {
          if (item.groupid === this.cacheData.groupid) {
            item.userList.forEach(it => {
              if (it.id === this.cacheData.id) {
                it.content = this.cacheData.content;
              }
            });
          }
        });
        // console.log(this.groupList)
      }
      this.formParams.content = val.content;
      this.bgActive = val.id;
      this.userData = val;
      //将临时储存内容的id和groupid存起来
      this.cacheData.id = val.id;
      this.cacheData.groupid = val.groupid;
      this.devShow = true;
      this.chatList=[];
      this.getChatList(); //获取聊天记录数据
      this.scrollChange();//  让聊天窗口处于最底部
    },
    OneChange(item) {
      // console.log(item);
      item.status = !item.status;
      this.chating.groupid=item.groupid;
      this.$forceUpdate();
    },
    async send() {
      //  发送提交
      let data = await sendMsg(this.formParams);
      if (data.code === 200) {
        console.log(data);
        let sendData = data.data;
        let chatData = {};
        // if (this.formParams.msg_type === 1) {
        //文字发送成功后将文本输入框重置
        this.formParams.content = "";
        //将发送的文字信息加入到聊天记录中;
        chatData = {
          content: sendData.content,
          msg_type: sendData.msg_type,
          ctime: sendData.ctime,
          key: 0,
          send_type: 2,
          msg_type: 1,
          kf_avatar: this.avatar
        };
        this.chatList.push(chatData);
        // console.log(this.chatList)
        this.scrollChange();//  让聊天窗口处于最底部
        // }
      }
    },
    submit() {
      //  发送文字消息
      if (this.formParams.content === "") {
        this.$message({ message: "请输入内容", type: "warning" });
        return;
      }
      //把按enter发送的回车\n给替换掉
      this.formParams.content = this.formParams.content.replace(/\n/, "");
      this.formParams.msg_type = 1;
      this.send();
    },
    beforeUpload(file) {
      const isGif = file.type === 'image/gif';
      const isLt4M = file.size / 1024 / 1024 <= 4;
      if ( isGif ) {
          this.$message.error('上传图片不能是Gif格式!');
        }
      if (!isLt4M) {
        this.$message.error('上传图片大小不能超过 4MB!');
      }
      return !isGif && isLt4M
    },
    uploadSuccess(file) {
      //	上传图片
      if (file.code === 200) {
        console.log(file.data.url);
        this.imageUrl = file.data.url;
        this.imageShow = true;
        this.title = "发送图片";
      }
    },
    async imageChange() {
      //  发送图片
      this.picParams.url = this.imageUrl;
      let data = await sendImage(this.picParams);
      if (data.code === 200) {
        // console.log(data);
        let receiveData = data.data;
        let chatData = {
          picurl: receiveData.picurl,
          msg_type: receiveData.msg_type,
          ctime: receiveData.ctime,
          key: 0,
          send_type: 2,
          kf_avatar: this.avatar
        };
        this.chatList.push(chatData);
        this.imageUrl = "";
        this.imageShow = false;
        this.scrollChange();//  让聊天窗口处于最底部
      }
    },
    //模糊搜索
    searchChange() {
      this.userList = [];
      if (this.keyword === "") {
        this.searchShow = false;
      } else {
        this.groupList.forEach(items => {
          items.userList.forEach(item => {
            if (item.nickname.search(this.keyword) !== -1) {
              // console.log(item)
              this.userList.push({
                avatar: item.headimgurl,
                nickname: item.nickname,
                groupid: item.groupid,
                id: item.id
              });
            }
          });
        });
        if (this.userList === "") {
          this.searchShow = true;
          this.isSearchShow = true;
        } else {
          this.searchShow = true;
          this.isSearchShow = false;
        }
      }
    },
    //打开模糊搜索项
    searchClick(val) {
      // console.log(val)
      let searchUser = val;
      this.groupList.forEach(item => {
        if (item.groupid === searchUser.groupid) {
          item.status = true;
          item.userList.forEach(it => {
            if (it.id === searchUser.id) {
              this.chatChange(it);
              this.searchShow = false;
              this.isSearchShow = false;
            }
          });
        }
      });
    },
    //  让聊天窗口处于最底部
    scrollChange() {
      setTimeout(() => {
        let ulNode = document.querySelector(".dialogue-k > .list");
        let dialogueNode = document.querySelector(".dialogue-k");
        setTimeout(() => {
          if (dialogueNode.scrollHeight - 110 <= ulNode.scrollHeight) {
            dialogueNode.scrollTop = ulNode.scrollHeight;
          }
        }, 50);
      }, 200);
    },
    //获取收款二维码
    async sendCodeGet() {
      let data = await sendCode({
        weid: this.formParams.weid,
        fans_openid: this.formParams.fans_openid
      });
      if (data.code === 200) {
        // console.log(data.data);
        let receiveData = data.data;
        let chatData = {
          picurl: receiveData.picurl,
          msg_type: receiveData.msg_type,
          ctime: receiveData.ctime,
          key: 0,
          send_type: 2,
          kf_avatar: this.avatar
        };
        this.chatList.push(chatData);
        this.scrollChange();//  让聊天窗口处于最底部
        // this.codeImageUrl=data.data.picurl;
      }
    },
    //弹出收款二维码图片的弹框
    sendQrcode() {
      this.sendCodeGet();
    },
    //弹出聊天记录
    getRecord() {
      this.chatRecordsShow = true;
      this.recordsParams.fans_openid = this.chatParams.fans_openid;
      this.recordsParams.page_index = "";
      this.chatRecords=[];
      this.chatRecordsGet();
    },
    //获取弹框的聊天记录
    async chatRecordsGet() {
      let data = await chatListGet(this.recordsParams);
      if (data.code === 200) {
        this.chatRecords.unshift(...data.data.data);
        if (this.recordsParams.page_index === "") {
          this.recordsParams.page_index = data.data.max_page - 1;
          if (data.data.max_page > 1) {
            this.RecordsShow = true;
          } else {
            this.RecordsShow = false;
          }
        } else if (this.recordsParams.page_index > 1) {
          this.recordsParams.page_index--;
          this.RecordsShow = true;
        } else if (this.recordsParams.page_index === 1) {
          this.RecordsShow = false;
        }
      }
    },
    //设置分组弹窗
    shezhiChange(item) {
      this.setShow = true;
      this.userGroup.group_id = "";
      this.userGroup.fans_openid = item.fans_openid;
    },
    //设置分组请求
    async setChange() {
      if (this.userGroup.group_id === "") {
        this.$message({ message: "请选择分组", type: "warning" });
        return;
      }
      let data = await changeGroup(this.userGroup);
      if (data.code === 200) {
        this.getGroup();
        this.setShow = false;
      }
    },
    //基本信息
    // baseInfo() {
    //   // this.Info();
    //   this.dialogInfoVisible = true;
    // },
    //websocket聊天消息提醒
    WebSocketTest() {
      let ws = new WebSocket(
        "ws://tdcsgzh.wuhanlst.com:11111?token=" +
          this.token +
          "&device=" +
          this.device
      );
      ws.onopen = () => {};
      ws.onmessage = evt => {
        let received_msg;
        if (evt.data.indexOf("{") != -1) {
          received_msg = JSON.parse(evt.data);
        } else {
          received_msg = evt.data;
        }
        if (received_msg.code === 200) {
          let msg = received_msg.data;
          console.log(msg);

          //是当前公众号和分组下时，将新来的文字信息渲染到页面
          if(this.weid === msg.weid && this.chating.groupid===msg.groupid){
              if(msg.msg_type===1){
                this.groupList.forEach(item=>{
                  if (item.groupid === this.chating.groupid) {
                    item.userList.forEach(it=>{
                      if(it.fans_openid===msg.fans_openid){
                        it.last_msg=msg.content;
                      }
                    })
                  }
                })
              }
          };

          //当聊天界面的粉丝id等于发送信息的粉丝id时;
          if (this.formParams.fans_openid == msg.fans_openid) {
            this.readMsgParams.msg_id = msg.msg_id;
            //发来的消息已读
            this.readMsg();
            msg.not_read_num = 0;
            this.chatList.push(msg);
            this.scrollChange();//  让聊天窗口处于最底部
            // console.log(this.chatList)
          } else {
            //收到的消息是当前聊天公众号下面
            if (this.weid === msg.weid) {
              this.groupList.forEach(item => {
                if (item.groupid === msg.groupid) {
                  let data = 0;
                  item.userList.forEach(it => {
                    console.log(it);
                    if (it.fans_openid === msg.fans_openid) {
                      it.not_read_num = msg.not_read_num;
                      data += it.not_read_num;
                      // this.$set()
                      console.log(this.groupList);
                    } else {
                      data += it.not_read_num;
                    }
                    // this.$forceUpdate();
                  });
                  item.not_read_num = data;
                }
              });
              this.wechatList.forEach(item => {
                if (item.id === msg.weid) {
                  item.not_read_num = msg.wx_not_read_num;
                }
              });
            } else if (this.weid !== msg.weid) {
              //收到的消息不是当前聊天界面公众号的
              this.wechatList.forEach(item => {
                if (item.id === msg.weid) {
                  item.not_read_num = msg.wx_not_read_num;
                }
              });
            }
          }
        }
      };
      ws.onclose = () => {
        // 关闭 websocket
      };
    }
  }
};
</script>
<style type="text/css" scoped lang="less">
@import "../assets/css/chat.css"; //  公共样式库
@color_f8494c: #1abc9c;
@bg_eaedf1: rgba(234, 237, 241, 1);
.main {
  width: 100%;
  height: calc(100vh);
  .el-container {
    width: 100%;
    height: 100%;
    .el-header {
      width: 100;
      min-width: 1400px;
      background-color: @color_f8494c;
      .head {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: space-between;
        .pull-left {
          height: 60px;
          display: flex;
          align-items: center;
          img {
            display: inline-block;
            width: 34px;
            height: 34px;
            margin-right: 10px;
          }
          .text {
            display: inline-block;
            font-size: 20px;
            font-weight: bold;
            color: #fff;
          }
        }
        .pull-right {
          height: 60px;
          display: flex;
          align-items: center;
          color: #fff;
          div {
            margin-right: 15px;
          }
          .avatar {
            width: 32px;
            height: 32px;
            img {
              border-radius: 50%;
            }
          }
          .icon {
            .icon {
              font-size: 24px;
              color: #fff;
              cursor: pointer;
            }
          }
          .el-dropdown {
            span {
              color: #fff;
            }
          }
        }
      }
    }
    .el-container {
      .left {
        display: flex;
        background-color: @bg_eaedf1;
        border-right: 1px solid #e2e2e2;
        .ul_left {
          width: 200px;
          border-right: 1px solid #e2e2e2;
          .wechat-list {
            .item {
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 15px 5px;
              border-bottom: 1px solid #e2e2e2;
              cursor: pointer;
              .photo {
                width: 50px;
                margin-right: 10px;
              }
              .text {
                position: relative;
                .name {
                  width: 80px;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .number {
                  display: block;
                  padding: 1px 6px;
                  background-color: #f56c6c;
                  color: #fff;
                  font-size: 12px;
                  border-radius: 10px;
                  position: absolute;
                  top: -8px;
                  right: -20px;
                }
              }
            }
            .wechatActive {
              background-color: @color_f8494c;
              // border-right:2px solid @color_f8494c;
              .name {
                color: #fff;
              }
            }
          }
        }
        .ul_right {
          width: 300px;
          overflow-y: scroll;
          &::-webkit-scrollbar {
            display: none;
          }
          .name {
            width: 100%;
            height: 50px;
            border-bottom: 1px solid #e2e2e2;
          }
          .input-search {
            padding: 10px 10px 0 10px;
          }
          .search {
            position: absolute;
            top: 163px;
            left: 210px;
            width: 276px;
            border: 1px solid #e2e2e2;
            background-color: #fff;
            z-index: 9;
            overflow-y: scroll;
            &::-webkit-scrollbar {
              display: none;
            }
            .search-list {
              height: calc(100vh - 115px);
              .isSearch {
                padding: 10px;
              }
              .item {
                display: flex;
                flex-direction: row;
                align-items: center;
                padding: 0 10px;
                cursor: pointer;
                border-bottom: 1px solid #e2e2e2;
                .photo {
                  width: 35px;
                  height: 35px;
                  margin-right: 10px;
                }
                .name {
                  border-bottom: none;
                  line-height: 50px;
                }
              }
            }
          }
          .one-list {
            .one-item {
              .title {
                width: 100%;
                height: 50px;
                border-bottom: 1px solid #e2e2e2;
                padding: 10px;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .text {
                  padding: 0 5px;
                }
                .ioc {
                  width: 20px;
                }
              }
              .two-list {
                background-color: rgb(215, 215, 215);
                .two-item {
                  position: relative;
                  display: flex;
                  flex-direction: row;
                  align-items: center;
                  padding: 10px;
                  border-bottom: 1px solid #e2e2e2;
                  .avatar {
                    margin-right: 15px;
                    img {
                      width: 50px;
                      height: 50px;
                      border-radius: 50%;
                    }
                  }
                  .text{
                     width:170px;
                    .nickname{
                      font-size: 14px;
                      line-height: 24px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                    .txt{
                      font-size: 12px;
                      line-height: 20px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                  }
                  .tubiao {
                    position: absolute;
                    top: 25px;
                    right: 25px;
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    .tubiao-icon {
                      margin-left: 6px;
                      .icon-shezhi {
                        font-size: 18px;
                      }
                    }
                  }
                  .status {
                    position: absolute;
                    top: 20px;
                    right: 10px;
                    .icon-zaixian {
                      font-size: 18px;
                      color: @color_f8494c;
                    }
                  }
                }
                .bgActive {
                  background-color: @color_f8494c;
                  .nickname {
                    color: #fff;
                  }
                  .txt{color: #fff;}

                  .status {
                    .icon {
                      color: #333;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .el-main {
        min-width: 900px;
        padding: 0 !important;
        .main-contens {
          width: 100%;
          height: calc(100vh - 60px);
          display: flex;
          flex-direction: column;
          .nickname {
            width: 100%;
            height: 50px;
            border-bottom: 1px solid #e2e2e2;
            background-color: @bg_eaedf1;
          }
          .dialogue-k {
            width: 100%;
            flex: 1;
            border-bottom: 1px solid #e2e2e2;
            background-color: @bg_eaedf1;
            padding: 30px;
            box-sizing: border-box;
            overflow-y: scroll;
            &::-webkit-scrollbar {
              display: none;
            }
            .upload {
              padding: 10px;
              color: @color_f8494c;
              cursor: pointer;
            }
            .isUpload {
              padding: 10px;
              color: @color_f8494c;
              cursor: pointer;
            }
            .list {
              .item {
                margin-bottom: 15px;
                .info {
                  .tourist {
                    display: flex;
                    .avatar {
                      margin-right: 10px;
                      img {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                      }
                    }
                    .centens {
                      .time {
                        margin-bottom: 10px;
                      }
                      .text {
                        background-color: #fff;
                        padding: 5px;
                        border-radius: 5px;
                      }
                    }
                  }
                  .hospital-guide {
                    display: flex;
                    flex-direction: row-reverse;
                    .avatar {
                      margin-left: 10px;
                      img {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                      }
                    }
                    .centens {
                      text-align: right;
                      .time {
                        margin-bottom: 10px;
                      }
                      .text {
                        background-color: @color_f8494c;
                        padding: 5px;
                        border-radius: 5px;
                        color: #fff;
                        max-width: 600px;
                        word-wrap: break-word;
                        text-align: left;
                      }
                    }
                  }
                }
                .system {
                  display: flex;
                  justify-content: center;
                  .text {
                    background-color: #e2e2e2;
                    padding: 5px 20px;
                    border-radius: 5px;
                  }
                }
              }
            }
          }
          .footer {
            position: relative;
            width: 100%;
            height: 150px;
            .toolbar {
              height: 25px;
              padding: 10px;
              .list {
                display: flex;
                .pull-left {
                  margin-right: 8px;
                  .icon {
                    font-size: 24px;
                    color: #333;
                  }
                }
              }
            }
            .btn {
              position: absolute;
              right: 10px;
              bottom: 20px;
            }
          }
        }
      }
      .right {
        .right-aside {
          height: calc(100vh - 60px);
          border-left: 1px solid #e2e2e2;
          background-color: @bg_eaedf1;
          overflow-y: scroll;
          &::-webkit-scrollbar {
            display: none;
          }
          .right-aside-top {
            .list {
              width: 100%;
              height: 50px;
              display: flex;
              align-items: center;
              flex-direction: row;
              .item {
                width: 33.3%;
                text-align: center;
                padding: 16px 0;
                cursor: pointer;
                border-bottom: 3px solid @bg_eaedf1;
              }
              .active {
                color: @color_f8494c;
                border-bottom: 3px solid @color_f8494c;
              }
            }
          }
          .right-middle-contens {
            .reply {
              padding-top: 5px;
            }
            .remark {
              padding-top: 5px;
            }
            .record {
              padding-top: 5px;
            }
            .disease {
              padding-top: 5px;
            }
          }
        }
      }
    }
  }
}
.el-dialog {
  .chatRecords {
    width: 100%;
    flex: 1;
    // border-bottom: 1px solid #e2e2e2;
    // background-color: @bg_eaedf1;
    padding: 30px;
    box-sizing: border-box;
    height: 600px;
    overflow-y: scroll;
    // &::-webkit-scrollbar {
    //   display: none;
    // }
    .upload {
      padding: 10px;
      color: @color_f8494c;
      cursor: pointer;
    }
    .isUpload {
      padding: 10px;
      color: @color_f8494c;
      cursor: pointer;
    }
    .list {
      .item {
        margin-bottom: 15px;
        .info {
          .tourist {
            display: flex;
            .avatar {
              margin-right: 10px;
              img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
            }
            .centens {
              .time {
                margin-bottom: 10px;
              }
              .text {
                background-color: #fff;
                padding: 5px;
                border-radius: 5px;
              }
            }
          }
          .hospital-guide {
            display: flex;
            flex-direction: row-reverse;
            .avatar {
              margin-left: 10px;
              img {
                width: 40px;
                height: 40px;
                border-radius: 50%;
              }
            }
            .centens {
              text-align: right;
              .time {
                margin-bottom: 10px;
              }
              .text {
                background-color: @color_f8494c;
                padding: 5px;
                border-radius: 5px;
                color: #fff;
                max-width: 600px;
                word-wrap: break-word;
                text-align: left;
              }
            }
          }
        }
        .system {
          display: flex;
          justify-content: center;
          .text {
            background-color: #e2e2e2;
            padding: 5px 20px;
            border-radius: 5px;
          }
        }
      }
    }
  }
}
/* 左右垂直居中 */
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
