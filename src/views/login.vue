<template>
  <div>
    <div class="login">
      <div class="bg"></div>
      <div class="login-auto">
        <h1>泰斗公众号聊天系统</h1>
        <p>Business Management System</p>
        <div class="login-input">
          <div class="qrcode" v-if="qrcodeShow">
            <div class="code"></div>
            <canvas id="canvas"></canvas>
          </div>
          <div class="overtime" v-else >
            <p>二维码已过期</p>
          </div>
          <div class="text" v-show="qrcodeShow">请扫上方二维码进行登录</div>
          <div class="text">@2019
            <a href="http://www.whtdzyy.com/" target="_blank">泰斗中医院</a> 版权所有
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Device, LoginPoll, GetInfo } from "@/api/login.js";
import { mapActions } from "vuex";
import QRCode from "qrcode"; //生成二维码插件
export default {
  data() {
    return {
      device: "", //设备号
      qrcodeUrl: "",
      login_code: "",
      timeOut: false,
      qrcodeShow:true,
      baseURL: process.env.VUE_APP_URL,
    };
  },
  mounted() {
    //获取设备的信息；
    if (!localStorage.getItem("device")) {
      this.GetDevice();
    }
    this.device = localStorage.getItem("device");
    //获取二维码图片
    this.GetQrCode();
  },
  methods: {
    ...mapActions({
      getAdmin: "getAdmin", //  存储登录信息
      getToken: "getToken", //  存储toKen
      getDevice: "getDevice", //  存储设备号
    }),
    //获取二维码地址生成二维码图片
    GetQrCode() {
      axios.defaults.headers.device = localStorage.getItem("device"); // 添加设备号
      axios
        .get(this.baseURL+"/v1/wechat/login/qrcode")
        .then(res => {
          if (res.data.code == 200) {
            this.qrcodeUrl = res.data.data.qr_code_url;
            //通过canvas生成二维码;
            var canvas = document.querySelector("#canvas");
            QRCode.toCanvas(canvas, this.qrcodeUrl, function(error) {
              if (error) console.error(error);
            });
            this.move(); //  调用轮询
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //获取设备号
    async GetDevice() {
      let data = await Device(this.device);
      if (data.code === 200) {
        this.device = data.data.device;
        this.getDevice(data.data.device);
      }
    },
    //判断是否微信登录授权成功
    async GetLoginSuccess() {
      let url = this.qrcodeUrl;
      let str = url.split("=")[1];
      this.login_code = str;
      let data = await LoginPoll(this.login_code);
      if (data.code === 200) {
        this.getToken(data.data.token);
        this.timeOut=true; //停止轮询
        this.$router.push({path:"/main",query:{avatar:data.data.avatar,nickname:data.data.nickname}});
        // this.$router.push("/main");
      } else if (data.code === 400) {
        this.qrcodeShow=false;
        this.timeOut=true; //停止轮询
      }
    },
    move() {
      //  调用轮询
      let fuc = () => {
        let time = null;
        if (this.timeOut) return;
        clearTimeout(time);
        this.GetLoginSuccess();
        time = setTimeout(fuc, 3000);
      };
      fuc();
    }
  }
};
</script>

<style type="text/css" scoped lang="less">
@color_f8494c: #1abc9c;
.login {
  position: relative;
  background: @color_f8494c;
  height: calc(100vh);
  .bg {
    width: 100%;
    height: 360px;
    background: url("../assets/img/bg.png");
    position: relative;
    top: 200px;
  }
  .login-auto {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: rgba(255, 255, 255, 0.6);
    padding: 30px 60px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    text-align: center;
    color: #fff;
    h1 {
      font-size: 28px;
      color: @color_f8494c;
      margin-bottom: 8px;
    }
    p {
      font-size: 18px;
      color: @color_f8494c;
    }
    .login-input {
      width: 300px;
      margin: 35px 0 20px;
      div {
        margin-bottom: 10px;
        button {
          width: 100%;
          background: @color_f8494c;
          border: none;
          padding: 12px 0px;
        }
      }
      .verifyCode {
        display: flex;
        img {
          margin-left: 10px;
          height: 40px;
        }
      }
      .overtime{
        padding-bottom: 20px;
        p{
          color:#fff;
          font-size: 24px;
          line-height: 30px;
        }
      }
    }
    .text {
      font-size: 12px;
      a {
        color: #fff;
      }
    }
  }
}
</style>