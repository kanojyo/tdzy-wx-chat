<template>
  <div>
    <div class="main">
      <el-container>
        <el-header class="centered">
          <div class="head">
            <div class="pull-left">
              <img src="../assets/img/logo.png" alt>
              <span class="text">泰斗公众号聊天系统</span>
            </div>
            <div class="pull-right">
              <div class="avatar">
                <img :src="kfInfo.avatar" alt>
              </div>
              <el-dropdown>
                <span class="el-dropdown-link">
                  {{kfInfo.nickname}}
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
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
                  placeholder="昵称/备注名"
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
                    <div class="name">{{item.nickname}}<span v-if="item.name">({{item.name}})</span> </div>
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
                          :value="i.not_read_num>99?'99+':i.not_read_num"
                          v-if="i.not_read_num !==0"
                        >
                          <img :src="i.headimgurl">
                        </el-badge>
                        <div class="avatar" v-else>
                          <img :src="i.headimgurl">
                        </div>
                        <div class="text">
                          <p class="nickname">{{i.nickname}}<span v-if="i.name">({{i.name}})</span> </p>
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
              <div class="nickname centered">{{userData.nickname}}<span v-if="userData.name">({{userData.name}})</span>  </div>
              <div class="dialogue-k">
                <!-- <div class="centered upload" v-show="uploadShow" @click="getChatList">加载更多~</div>
                <div class="centered isUpload" v-show="!uploadShow">无更多消息~</div>-->
                <ul class="list">
                  <li class="item" v-for="(item, index) in chatList" :key="index">
                    <div class="system" v-if="item.key===1">
                      <div class="text">{{item.ctime|formatDate}} {{item.content}}</div>
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
                            <img :src="item.picurl" @click="largeImage(item.picurl)" alt>
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
                            <img
                              :src="item.picurl"
                              @click="largeImage(item.picurl)"
                              alt
                              style="width:100%;"
                            >
                          </div>
                          <div class="pull-right">{{item.username}}({{item.kf_nickname}})</div>
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
                  >用户信息</li>
                  <li
                    class="item"
                    :class="{active: rightActive === 2}"
                    @click="rightActive = 2"
                  >病症信息</li>
                  <!-- <li class="item" :class="{active: rightActive === 3}" @click="rightActive = 3">聊天记录</li> -->
                  <li
                    class="item"
                    :class="{active: rightActive === 3}"
                    @click="rightActive = 3"
                  >快捷回复</li>
                </ul>
              </div>
              <div class="right-middle-contens">
                <div class="userInfo" v-show="rightActive === 1">
                  <div class="userInfo-main" v-if="Object.keys(fansBaseInfo).length !== 0">
                    <h4>公众号用户信息</h4>
                    <table>
                      <tbody>
                        <tr>
                          <td>公众号</td>
                          <td>{{fansBaseInfo.we_name}}</td>
                        </tr>
                        <tr>
                          <td>关注时间</td>
                          <td>
                            <div v-if="fansBaseInfo.subscribe_time">
                              {{fansBaseInfo.subscribe_time|formatDate}}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>创建时间</td>
                          <td>
                            <div v-if="fansBaseInfo.ctime">
                              {{fansBaseInfo.ctime|formatDate}}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>最后到访</td>
                          <td>
                            <div v-if="fansBaseInfo.last_time">
                              {{fansBaseInfo.last_time|formatDate}}
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>接待医助</td>
                          <td>{{fansBaseInfo.kf_name}}</td>
                        </tr>
                        <tr>
                          <td>openid</td>
                          <td>{{fansBaseInfo.openid}}</td>
                        </tr>
                        <tr>
                          <td>UnionID</td>
                          <td>{{fansBaseInfo.unionid}}</td>
                        </tr>
                        <tr>
                          <td>昵称</td>
                          <td>{{fansBaseInfo.nickname}}</td>
                        </tr>
                        <tr>
                          <td>备注名</td>
                          <td>
                            <input type="text" v-model="fansBaseInfo.name">
                            <el-button @click="modifyName">修改</el-button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <h4>用户关注信息</h4>
                    <table>
                      <thead>
                        <tr>
                          <td>公众号</td>
                          <td>时间</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item,index) in fansAttention" :key="index">
                          <td style="width:80px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;" :title="item.we_name">{{item.we_name}}</td>
                          <td>
                            <div v-if="item.subscribe_time">关注时间：{{item.subscribe_time|formatDate}}</div>
                            <div v-if="item.ctime">创建时间：{{item.ctime|formatDate}}</div>
                            <div v-if="item.last_time">最后到访：{{item.last_time|formatDate}}</div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <h4>用户档案信息</h4>
                    <el-form :model="filesForm" label-width="80px">
                      <el-form-item label="档案编号">
                        <el-input v-model="filesForm.customer_code" disabled="disabled"></el-input>
                      </el-form-item>
                      <el-form-item label="用户姓名">
                        <el-input v-model="filesForm.name"></el-input>
                      </el-form-item>
                      <el-form-item label="联系方式">
                        <el-input v-model="filesForm.mobile"></el-input>
                      </el-form-item>
                      <el-form-item label="性别">
                        <el-radio-group v-model="filesForm.sex">
                          <el-radio :label="1">男</el-radio>
                          <el-radio :label="2">女</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="年龄">
                        <el-input v-model="filesForm.age"></el-input>
                      </el-form-item>
                      <el-form-item label="备注">
                        <el-input v-model="filesForm.remarks"></el-input>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="submitFile">提交</el-button>
                        <!-- <el-button>修改</el-button> -->
                      </el-form-item>
                    </el-form>
                  </div>
                  <div class="centered" v-else>暂无用户信息</div>
                </div>
                <div class="disease" v-show="rightActive === 2">
                  <div >
                    <div class="disease-main" v-show="diseaseInfoStatus">
                      <div class="disease-content" v-if="Object.keys(diseaseListData).length !== 0">
                        <h4>用户病症信息</h4>
                        <table v-for="(item,index) in diseaseListData" :key="index">
                          <tbody>
                            <tr>
                              <td style="width:70px;">病症编号</td>
                              <td>{{item.id}}</td>
                            </tr>
                            <tr>
                              <td>问诊科室</td>
                              <td>{{item.office_name}}</td>
                            </tr>
                            <tr>
                              <td>主治医生</td>
                              <td>{{item.doctor_name}}</td>
                            </tr>
                            <tr>
                              <td>接待医助</td>
                              <td>{{item.kf_name}}</td>
                            </tr>
                            <tr>
                              <td>创建时间</td>
                              <td>
                                <div v-if="item.ctime">{{item.ctime|formatDate}}</div>
                              </td>
                            </tr>
                            <tr>
                              <td>病症状态</td>
                              <td>{{item.state|dis_type}}</td>
                            </tr>
                            <tr>
                              <td>操作</td>
                              <td>
                                <el-button @click="diseaseDetail(item.id)">详情</el-button>
                                <el-button v-if="item.state===9 && item.is_new ===2" @click="reason(item.reject_reason)">驳回原因</el-button>
                                <el-button v-if="item.state===2 && item.is_new ===2" @click="giveUp(item.id)">放弃</el-button>
                                <el-button v-if="item.state===7 && item.is_new ===2" @click="reuse(item.id)">复用</el-button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="centered" v-else>暂无用户病症信息</div>
                      <div class="disease-footer">
                        <el-button @click="GoDrafts">草稿箱</el-button>
                        <el-button @click="GoAdd">添加病症</el-button>
                      </div>
                    </div>
                    <div class="drafts disease-main" v-show="draftsStatus">
                      <div class="disease-content" v-if="Object.keys(draftsListData).length !== 0">
                        <h4>病症草稿箱</h4>
                        <table v-for="(item,index) in draftsListData" :key="index">
                          <tbody>
                            <tr>
                              <td style="width:70px;">病症编号</td>
                              <td>{{item.id}}</td>
                            </tr>
                            <tr>
                              <td>问诊科室</td>
                              <td>{{item.office_name}}</td>
                            </tr>
                            <tr>
                              <td>主治医生</td>
                              <td>{{item.doctor_name}}</td>
                            </tr>
                            <tr>
                              <td>接待医助</td>
                              <td>{{item.kf_name}}</td>
                            </tr>
                            <tr>
                              <td>创建时间</td>
                              <td>{{item.created_at}}</td>
                            </tr>
                            <tr>
                              <td>病症状态</td>
                              <td>临时保存</td>
                            </tr>
                            <tr>
                              <td>操作</td>
                              <td>
                                <el-button @click="draftsDetail(item.id)">详情</el-button>
                                <el-button @click="edit(item)">继续编辑</el-button>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div class="centered" v-else>草稿箱中暂无用户病症信息</div>
                      <div class="disease-footer">
                        <el-button @click="GoInfo">返回</el-button>
                        <el-button @click="GoAdd2">添加病症</el-button>
                      </div>
                    </div>
                    <div class="disease-add" v-show="diseaseAddStatus">
                      <el-form
                        :model="diseaseData"
                        label-width="85px"
                        class="demo-Form"
                        style="background:#fff;padding:10px 10px;"
                      >
                        <el-form-item label="就诊科室" class="red_star4">
                          <el-select v-model="diseaseData.office_id" placeholder="请选择">
                            <el-option
                              v-for="(item,index) in officeOptions"
                              :key="index"
                              :label="item.name"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="接待医生" class="red_star4">
                          <el-select v-model="diseaseData.docter_id" placeholder="请选择">
                            <el-option
                              v-for="(item,index) in doctorListData"
                              :key="index"
                              :label="item.username"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="姓名" class="red_star1">
                          <el-input v-model="diseaseData.name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别" class="red_star1">
                          <el-radio-group v-model="diseaseData.sex">
                            <el-radio :label="1">男</el-radio>
                            <el-radio :label="2">女</el-radio>
                          </el-radio-group>
                        </el-form-item>
                        <el-form-item label="年龄" class="red_star1">
                          <el-input v-model="diseaseData.age"></el-input>
                        </el-form-item>
                        <el-form-item label="职业" >
                          <el-input v-model="diseaseData.job"></el-input>
                        </el-form-item>
                        <el-form-item label="联系方式">
                          <el-input v-model="diseaseData.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="昵称">
                          <el-input v-model="diseaseData.nickname"></el-input>
                        </el-form-item>
                        <el-form-item label="微信号">
                          <el-input v-model="diseaseData.wechat"></el-input>
                        </el-form-item>
                        <el-form-item label="地址" >
                          <el-input v-model="diseaseData.address"></el-input>
                        </el-form-item>
                        <el-form-item label="常见主诉">
                          <el-tag :key="tag" v-for="tag in zhusuTags" @click="addZhuSu(tag)">{{tag}}</el-tag>
                        </el-form-item>
                        <el-form-item label="主诉" class="red_star1">
                          <el-input v-model="diseaseData.wenzhen_zhusu" type="textarea" rows="2"></el-input>
                        </el-form-item>
                        <el-form-item label="现病史" class="red_star2">
                          <el-input v-model="diseaseData.wenzhen_disease_ing" type="textarea" rows="2"></el-input>
                        </el-form-item>
                        <el-form-item label="常见既往史">
                          <el-tag :key="tag" v-for="tag in historyTags" @click="addhistory(tag)">{{tag}}</el-tag>
                        </el-form-item>
                        <el-form-item label="既往史" class="red_star2">
                          <el-input v-model="diseaseData.wenzhen_disease_ed" type="textarea" rows="2"></el-input>
                        </el-form-item>
                        <el-form-item label="过敏史" class="red_star2">
                          <el-input v-model="diseaseData.guomin" type="textarea" rows="2"></el-input>
                        </el-form-item>
                        <el-form-item label="体检信息" class="red_star4">
                          <el-input v-model="diseaseData.tijian" type="textarea" rows="2"></el-input>
                        </el-form-item>
                        <el-form-item label="辅助信息" class="red_star4">
                          <el-input v-model="diseaseData.fuzhu_result" type="textarea" rows="2"></el-input>
                        </el-form-item>
                        <el-form-item label="病症备注" >
                          <el-input v-model="diseaseData.beizhu" type="textarea" rows="2"></el-input>
                        </el-form-item>
                      </el-form>
                      <div class="footer">
                        <el-button @click="GoInfo2">返回</el-button>
                        <el-button @click="commit(1)">临时保存</el-button>
                        <el-button @click="commit(2)">提交</el-button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="reply" v-show="rightActive === 3">
                  <div class="reply-add">
                    <el-button size="mini" type="primary" @click="replyChange">添 加</el-button>
                  </div>
                  <div class="reply-list">
                    <ul class="list">
                      <li class="item" v-for="(item, index) in phraseList" :key="index">
                        <el-card class="box-card">
                          <div slot="header" class="clearfix">
                            <span>{{item.title}}</span>
                            <el-button
                              size="mini"
                              style="float: right; padding: 3px 0"
                              type="text"
                              @click="compileChange(item)"
                            >编辑</el-button>
                            <el-button size="mini" style="float: right; padding: 3px 0" type="text"></el-button>
                            <el-button
                              size="mini"
                              style="float: right; padding: 3px 0"
                              type="text"
                              @click="delChange(item)"
                            >删除</el-button>
                          </div>
                          <div
                            class="text cursor"
                            @click="contenChange(item.content)"
                          >{{item.content}}</div>
                        </el-card>
                      </li>
                    </ul>
                  </div>
                </div>
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
    <!-- 聊天记录 -->
    <el-dialog title="聊天记录" :visible.sync="chatRecordsShow" width="50%">
      <div class="chatRecords">
        <div class="centered upload" v-show="RecordsShow" @click="chatRecordsGet">加载更多~</div>
        <div class="centered isUpload" v-show="!RecordsShow">无更多消息~</div>
        <ul class="list">
          <li class="item" v-for="(item, index) in chatRecords" :key="index">
            <div class="system" v-if="item.key===1">
              <div class="text">{{item.ctime|formatDate}} {{item.content}}</div>
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
                  <div class="pull-right">{{item.username}}({{item.kf_nickname}})</div>
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
    <!-- 查看大图 -->
    <el-dialog title="查看大图" :visible.sync="largeImageShow" :width="dialogWidth">
      <div class="image" style="text-align:center;">
        <img :src="largePicUrl" alt style="width:100%;">
      </div>
    </el-dialog>
    <!-- 编辑/添加快捷回复 -->
    <el-dialog :title="phraseTltie" :visible.sync="replyShow" width="550px" @close="updateForm()">
      <el-form label-width="100px" :model="phraseFrom">
        <el-form-item label="* 标题">
          <el-input v-model="phraseFrom.title" placeholder="快捷回复标题"></el-input>
        </el-form-item>
        <el-form-item label="* 内容">
          <el-input
            v-model="phraseFrom.content"
            class="textarea"
            type="textarea"
            :rows="3"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="replyShow= false">返 回</el-button>
        <el-button type="primary" @click="replyAdd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 查看大图 -->
    <el-dialog title="病症详情" :visible.sync="diseaseDetailShow" :width="dialogWidth">
      <table>
        <tbody>
          <tr>
            <td style="width:70px;">科室</td>
            <td>{{diseaseDetailData.office_id|office_id}}</td>
          </tr>
          <tr>
          <tr>
            <td >接待医生</td>
            <td>{{diseaseDetailData.doctor_name}}</td>
          </tr>
          <tr>
            <td>姓名</td>
            <td>{{diseaseDetailData.name}}</td>
          </tr>
          <tr>
            <td>性别</td>
            <td>{{diseaseDetailData.sex|sex_type}}</td>
          </tr>
          <tr>
            <td>年龄</td>
            <td>{{diseaseDetailData.age}}</td>
          </tr>
          <tr>
            <td>职业</td>
            <td>{{diseaseDetailData.job}}</td>
          </tr>
          <tr>
            <td>联系方式</td>
            <td>{{diseaseDetailData.mobile}}</td>
          </tr>
          <tr>
            <td>昵称</td>
            <td>{{diseaseDetailData.nickname}}</td>
          </tr>
          <tr>
            <td>微信</td>
            <td>{{diseaseDetailData.wechat}}</td>
          </tr>
          <tr>
            <td>地址</td>
            <td>{{diseaseDetailData.address}}</td>
          </tr>
          <tr>
            <td>主诉</td>
            <td>{{diseaseDetailData.wenzhen_zhusu}}</td>
          </tr>
          <tr>
            <td>现病史</td>
            <td>{{diseaseDetailData.wenzhen_disease_ing}}</td>
          </tr>
          <tr>
            <td>过敏史</td>
            <td>{{diseaseDetailData.guomin}}</td>
          </tr>
          <tr>
            <td>既往史</td>
            <td>{{diseaseDetailData.wenzhen_disease_ed}}</td>
          </tr>
          <tr>
            <td>体检信息</td>
            <td>{{diseaseDetailData.tijian}}</td>
          </tr>
          <tr>
            <td>辅助信息</td>
            <td>{{diseaseDetailData.fuzhu_result}}</td>
          </tr>
          <tr>
            <td>病症备注</td>
            <td>{{diseaseDetailData.beizhu}}</td>
          </tr>
        </tbody>
      </table>
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
  signOut,
  phraseIndex,
  phrasePost,
  phraseUpdate,
  phraseDelete,
  fansInfo,
  modifyName,
  modifyInfo,
  diseaseAdd,
  diseaseList,
  draftsList,
  diseaseDetail,
  draftsDetail,
  officeList,
  giveUpDisease,
  doctorList,
  getMobile
} from "@/api/main.js";
import { formatDate } from "@/utils/index.js";
import { isvalidPhone, isvalidLandlinePhone,validAge,validBlank } from "@/utils/validate.js";
import axios from 'axios';

export default {
  data() {
    return {
      kfInfo: {
        avatar: "",
        nickname: ""
      },
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
      //分组列表
      groupList: [
        {
          group_name: "未分组",
          not_read_num: 0,
          groupid: 1,
          count: 0,
          userList: []
        },
        {
          group_name: "已接待",
          not_read_num: 0,
          groupid: 2,
          count: 0,
          userList: []
        },
        {
          group_name: "有意向",
          not_read_num: 0,
          groupid: 3,
          count: 0,
          userList: []
        },
        {
          group_name: "已成单",
          not_read_num: 0,
          groupid: 4,
          count: 0,
          userList: []
        },
        {
          group_name: "已结束",
          not_read_num: 0,
          groupid: 5,
          count: 0,
          userList: []
        },
        {
          group_name: "广告粉",
          not_read_num: 0,
          groupid: 6,
          count: 0,
          userList: []
        }
      ],
      friendList: [],
      weid: "", //公众号的id
      params: {
        //好友列表的参数
        weid: "",
        groupid: ""
      },
      chatParams: {
        fans_openid: "",
        direct: "",
        page_size: 20,
        min_msg_id: "",
        max_msg_id: ""
      },
      recordsParams: {
        fans_openid: "",
        direct: "",
        page_size: 20,
        min_msg_id: "",
        max_msg_id: ""
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
      chating: {
        groupid: ""
      },
      largeImageShow: false,
      largePicUrl: "", //查看大图的地址
      replyShow: false, //  添加快捷回复显示
      phraseFrom: {
        //  快捷回复参数
        title: "",
        content: ""
      },
      phraseList: [], //  聊天快捷短语列表
      phraseTltie: "", //  添加 编辑
      diseaseInfoStatus: true, //用户病症信息状态
      diseaseAddStatus: false, //添加病症的状态
      draftsStatus: false, //草稿箱的状态
      diseaseData: {
        //添加病症
        fans_openid: "", //fansopenid 必须
        save_type: "", //1：保存草稿，2保存正式
        temp_disease_id: "", //草稿箱病症id
        fy_dis_id:"", //复用病症id
        disease_id: "", //正式病症id
        office_id: "", //科室id
        docter_id:"", //医生id
        name: "", //姓名
        sex: "", //1男2女
        age: "", //年纪
        job: "", //工作
        mobile: "", //联系方式
        nickname: "", //昵称
        wechat: "", //微信
        address: "", //地址
        wenzhen_zhusu: "", //主诉
        wenzhen_disease_ing: "", //现病史
        guomin:"", //过敏史
        wenzhen_disease_ed: "", //既往史
        tijian: "", //体检信息
        fuzhu_result: "", //辅助信息
        beizhu: "" //病症备注
      },
      fansBaseInfo: {}, //公众号用户信息
      fansAttention: {}, //用户关注信息
      filesForm: {}, //用户档案
      diseaseDetailShow: false, //病症详情状态
      diseaseListData: {}, //用戶病症信息
      draftsListData: {}, //草稿箱用戶病症信息
      doctorListData:[],//医生信息
      officeOptions: [], //科室数组
      diseaseDetailData: {}, //病症详情数据
      zhusuTags: [], //主诉标签
      zhusuData: {}, //主诉数据
      historyTags: [], //常见既往史标签
      historyData: {}, //常见既往史数据
      zhusuString: "",
      historyString: "",
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
    this.phraseIndex(); //  聊天快捷短语列表
    this.officeListGet() //获取科室列表
    this.uploadUrl = this.baseURL + "/v1/uploads";
    this.kfInfo.avatar = this.$route.query.avatar;
    this.kfInfo.nickname = this.$route.query.nickname;
  },
  computed: {
    ...mapState({
      token: state => state.token, // token
      device: state => state.device // device
    })
  },
  watch: {
    //监听右侧添加病症中的科室
    'diseaseData.office_id': function(val) {
      this.$nextTick(function() {
        if (val == 1) {
          //补肾科
          this.zhusuTags = this.zhusuData.bushen;
          this.historyTags = this.historyData.bushen;
        }
        if (val == 2) {
          //肛肠科
          this.zhusuTags = this.zhusuData.zhichuang;
          this.historyTags = this.historyData.zhichuang;
        }
        if (val == 3) {
          //鼻炎科
          this.zhusuTags = this.zhusuData.biyan;
          this.historyTags = this.historyData.biyan;
        }
        if (val == 4) {
          //乳腺科
          this.zhusuTags = this.zhusuData.ruxian;
          this.historyTags = this.historyData.ruxian;
        }
      });
    }
  },
  methods: {
    async headClick(val) {
      if (val === 3) {
        //退出登录
        let data = await signOut();
        if (data.code === 200) {
          this.$router.push("/out");
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
          if (item.id == msg.weid) {
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
        // console.log(this.groupList);
      }
    },
    //点击打开公众号列表
    openList(val) {
      // console.log(val);
      this.wechatActive = val.id;
      this.weid = val.id;
      this.params.weid = val.id;
      this.formParams.weid = val.id;
      this.picParams.weid = val.id;
      this.title = val.name;
      //获取公众号下面的分组列表
      this.getGroup();
      //重置右侧菜单的内容
      this.fansBaseInfo={};
      this.fansAttention={};
      this.filesForm={};
      this.diseaseListData={};
      this.draftsListData={};
      this.rightActive=1;
      this.diseaseAddStatus=false;
      this.diseaseInfoStatus=true;
      this.draftsStatus=false;
      this.chatParams.fans_openid="";
      this.diseaseData.office_id = "";
      this.diseaseData.name = "";
      this.diseaseData.sex = "";
      this.diseaseData.age = "";
      this.diseaseData.job = "";
      this.diseaseData.mobile = "";
      this.diseaseData.nickname = "";
      this.diseaseData.wechat = "";
      this.diseaseData.address = "";
      this.diseaseData.wenzhen_zhusu = "";
      this.diseaseData.wenzhen_disease_ing = "";
      this.diseaseData.wenzhen_disease_ed = "";
      this.diseaseData.tijian = "";
      this.diseaseData.fuzhu_result = "";
      this.diseaseData.beizhu = "";
      this.diseaseData.guomin = "";
      this.devShow=false;
    },
    //聊天页面的聊天记录数据
    async getChatList() {
      let data = await chatListGet(this.chatParams);
      if (data.code === 200) {
        this.chatList = data.data.list;
        // console.log(this.chatList);
      }
    },
    //点击打开聊天界面
    chatChange(val) {
      this.fansBaseInfo={};
      this.fansAttention={};
      this.filesForm={};
      this.diseaseListData={};
      this.draftsListData={};
      this.rightActive=1;
      this.diseaseAddStatus=false;
      this.diseaseInfoStatus=true;
      this.draftsStatus=false;
      // console.log(val);
      this.formParams.fans_openid = val.fans_openid;
      this.picParams.fans_openid = val.fans_openid;
      this.chatParams.fans_openid = val.fans_openid;
      this.readMsgParams.fans_openid = val.fans_openid;
      this.readMsgParams.weid = this.weid;
      this.readMsgParams.msg_id = 0;
      this.readMsg();
      val.not_read_num = 0;
      //计算分组的未读消息数
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
      this.chatList = [];
      this.getChatList(); //获取聊天记录数据
      this.fansInfo(); //獲取用戶信息
      // setTimeout(() => {
      this.diseaseList(); //獲取病症信息
      this.doctorListGet(); //获取医生信息
      this.TagsGet();
      // }, 200);
      this.scrollChange(); //  让聊天窗口处于最底部
    },
    OneChange(item) {
      // console.log(item);
      item.status = !item.status;
      this.chating.groupid = item.groupid;
      this.$forceUpdate();
    },
    async send() {
      //  发送提交
      let data = await sendMsg(this.formParams);
      if (data.code === 200) {
        console.log(data);
        let sendData = data.data;
        let chatData = {};
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
          kf_avatar: this.avatar,
          username: sendData.username,
          kf_nickname: sendData.kf_nickname
        };
        this.chatList.push(chatData);
        // console.log(this.chatList)
        this.scrollChange(); //  让聊天窗口处于最底部
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
      const isGif = file.type === "image/gif";
      const isJPG = file.type === "image/jpg";
      const isPNG = file.type === "image/png";
      const isJPEG = file.type === "image/jpeg";
      const isLt4M = file.size / 1024 / 1024 <= 4;
      if (!isJPG && !isJPEG && !isPNG) {
        this.$message.error("上传图片只能是 jpg,png,jpeg 格式!");
      }
      if (!isLt4M) {
        this.$message.error("上传图片大小不能超过 4MB!");
      }
      return (isJPG || isJPEG || isPNG) && isLt4M;
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
          kf_avatar: this.avatar,
          username: receiveData.username,
          kf_nickname: receiveData.kf_nickname
        };
        this.chatList.push(chatData);
        this.imageUrl = "";
        this.imageShow = false;
        this.scrollChange(); //  让聊天窗口处于最底部
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
            if (item.nickname.search(this.keyword) !== -1 ||item.name.search(this.keyword) !== -1) {
              // console.log(item)
              this.userList.push({
                avatar: item.headimgurl,
                nickname: item.nickname,
                groupid: item.groupid,
                id: item.id,
                name:item.name,
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
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)"
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
          kf_avatar: this.avatar,
          username: receiveData.username,
          kf_nickname: receiveData.kf_nickname
        };
        this.chatList.push(chatData);
        this.scrollChange(); //  让聊天窗口处于最底部
        // this.codeImageUrl=data.data.picurl;
      } else {
        loading.close();
      }
      loading.close();
    },
    //弹出收款二维码图片的弹框
    sendQrcode() {
      this.sendCodeGet();
    },
    //弹出聊天记录
    getRecord() {
      this.chatRecordsShow = true;
      this.recordsParams.fans_openid = this.chatParams.fans_openid;
      this.recordsParams.direct = "";
      this.recordsParams.min_msg_id = "";
      this.chatRecords = [];
      this.chatRecordsGet();
      setTimeout(() => {
        var records = document.querySelector(".chatRecords");
        var recordsList = document.querySelector(".chatRecords>.list");
        records.scrollTop = records.scrollHeight;
      }, 500);
    },
    //获取弹框的聊天记录
    async chatRecordsGet() {
      let data = await chatListGet(this.recordsParams);
      if (data.code === 200) {
        this.chatRecords.unshift(...data.data.list);
        if (data.data.list.length > 0) {
          let minId = data.data.list[0].id;
          this.recordsParams.direct = 1;
          this.recordsParams.min_msg_id = minId;
          chatListGet(this.recordsParams).then(item => {
            if (item.code === 200) {
              if (item.data.list.length > 0) {
                this.RecordsShow = true;
              } else {
                this.RecordsShow = false;
              }
            }
          });
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
    //查看大图
    largeImage(item) {
      this.largeImageShow = true;
      this.largePicUrl = item;
    },
    //获取用户基本信息
    async fansInfo() {
      let data = await fansInfo(this.formParams);
      if (data.code === 200) {
        // console.log(data);
        this.fansBaseInfo = data.data.base_info;
        this.fansAttention = data.data.fans_attention_info;
        this.filesForm = data.data.customer;
      }
    },
    //修改备注名
    async modifyName() {
      if(this.fansBaseInfo.name=='' ||validBlank(this.fansBaseInfo.name)){
        this.$message.error("请输入备注名");
        return;
      }
      let params = {};
      params.fans_openid = this.formParams.fans_openid;
      params.name = this.fansBaseInfo.name;
      let data = await modifyName(params);
      if (data.code === 200) {
        this.$message({ message: "修改成功", type: "success" });
        this.userData.name=this.fansBaseInfo.name;
      }
    },
    //提交用户档案信息
    async submitFile() {
      // getMobile(this.chatParams.fans_openid).then(data =>{
      //   if(data.code===200){
      //     this.filesForm.mobile=data.data.mobile
      //   }
      // })
      if(this.filesForm.mobile !=''){
        if (!(isvalidPhone(this.filesForm.mobile) ||isvalidLandlinePhone(this.filesForm.mobile))) {
          this.$message.error("请输入正确的联系方式");
          return;
       }
      }
      if(this.filesForm.age !==""){
        if(!validAge(this.filesForm.age) || this.filesForm.age.length>5){
          this.$message.error("年龄只能输入数字，字母，中文且不超过5个字");
          return;
        }
      }
      this.filesForm.fans_openid=this.chatParams.fans_openid;
      let data = await modifyInfo(this.filesForm);
      if (data.code === 200) {
        this.$message({ message: "提交成功", type: "success" });
      }
    },
    async phraseIndex() {
      //  聊天快捷短语列表
      let data = await phraseIndex();
      if (data.code === 200) {
        // console.log(data)
        this.phraseList = data.data.phraseList;
      }
    },
    replyChange() {
      //  新增快捷短语显示
      this.replyShow = true;
      this.phraseTltie = "添加";
      this.phraseFrom = {
        //  备注参数
        title: "",
        content: ""
      };
    },
    compileChange(item) {
      //  编辑快捷短语
      this.phraseFrom = item;
      this.replyShow = true;
      this.phraseTltie = "编辑";
    },
    //短语刷新
    updateForm() {
      this.phraseIndex();
    },
    async replyAdd() {
      //  聊天快捷短语新增
      if (this.phraseFrom.title === "") {
        this.$message({ message: "请输入标题", type: "warning" });
        return;
      }
      if (this.phraseFrom.content === "") {
        this.$message({ message: "请输入内容", type: "warning" });
        return;
      }
      let data;
      if (this.phraseTltie === "编辑") {
        data = await phraseUpdate(this.phraseFrom);
      } else {
        data = await phrasePost(this.phraseFrom);
      }
      if (data.code === 200) {
        //新增成功,重置input
        this.phraseFrom.title = "";
        this.phraseFrom.content = "";
        this.phraseIndex();
        this.replyShow = false;
        this.$message({ message: data.data.msg, type: "success" });
      }
    },
    delChange(item) {
      //  删除快捷回复
      this.$confirm("此操作将删除此快捷回复, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          phraseDelete({ id: item.id }).then(data => {
            if (data.code === 200) {
              this.phraseIndex();
              this.$message({ message: data.data.msg, type: "success" });
            }
          });
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消操作~" });
        });
    },
    contenChange(conten) {
      //  发送快捷消息
      if (!this.devShow) {
        this.$message({ type: "info", message: "暂无聊天窗口~" });
        return;
      }
      let str = this.formParams.content;
      str += conten;
      this.formParams.content = str;
    },
    //打开草稿箱
    GoDrafts() {
      this.diseaseInfoStatus = false;
      this.draftsStatus = true;
      if(this.chatParams.fans_openid){
        this.draftsList();
      }
    },
    //打开添加病症
    GoAdd() {
      if(this.chatParams.fans_openid ==''){
        this.$message.error("请先选择一位用户");
        return
      }
      this.diseaseInfoStatus = false;
      this.diseaseAddStatus = true;
      this.diseaseData.name = this.filesForm.name;
      // this.diseaseData.mobile = this.filesForm.mobile;
      this.diseaseData.sex = this.filesForm.sex;
      this.diseaseData.age = this.filesForm.age;
      this.diseaseData.beizhu = this.filesForm.remark;
      getMobile(this.chatParams.fans_openid).then(data =>{
        if(data.code===200){
          this.diseaseData.mobile=data.data.mobile
        }
      })
    },
    //从草稿箱打开添加病症
    GoAdd2() {
      if(this.chatParams.fans_openid ==''){
        this.$message.error("请先选择一位用户");
        return
      }
      this.draftsStatus = false;
      this.diseaseAddStatus = true;
      this.diseaseData.name = this.filesForm.name;
      // this.diseaseData.mobile = this.filesForm.mobile;
      this.diseaseData.sex = this.filesForm.sex;
      this.diseaseData.age = this.filesForm.age;
      this.diseaseData.beizhu = this.filesForm.remark;
      getMobile(this.chatParams.fans_openid).then(data =>{
        if(data.code===200){
          this.diseaseData.mobile=data.data.mobile
        }
      })
    },
    //从草稿箱返回病症信息
    GoInfo() {
      this.diseaseInfoStatus = true;
      this.draftsStatus = false;
    },
    //从添加病症返回病症信息
    GoInfo2() {
      this.diseaseInfoStatus = true;
      this.diseaseAddStatus = false;
      this.diseaseData.office_id = "";
      this.diseaseData.name = "";
      this.diseaseData.sex = "";
      this.diseaseData.age = "";
      this.diseaseData.job = "";
      this.diseaseData.mobile = "";
      this.diseaseData.nickname = "";
      this.diseaseData.wechat = "";
      this.diseaseData.address = "";
      this.diseaseData.wenzhen_zhusu = "";
      this.diseaseData.wenzhen_disease_ing = "";
      this.diseaseData.wenzhen_disease_ed = "";
      this.diseaseData.tijian = "";
      this.diseaseData.fuzhu_result = "";
      this.diseaseData.beizhu = "";
      this.diseaseData.guomin = "";
    },
    //添加病症获取科室信息
    async officeListGet() {
      let data = await officeList();
      if (data.code === 200) {
        this.officeOptions = data.data;
      }
    },
    //添加病症获取医生信息
    async doctorListGet(){
      let data = await doctorList(this.chatParams.fans_openid);
      if(data.code ===200){
        // console.log(data)
        this.doctorListData=data.data.doctor_list;
        this.diseaseData.docter_id=data.data.default_doctor_id;
      }
    },
    //獲取用戶病症信息
    async diseaseList() {
      let data = await diseaseList(this.chatParams);
      if (data.code === 200) {
        // console.log(data)
        this.diseaseListData = data.data;
      }
    },
    //獲取草稿箱用戶病症信息
    async draftsList() {
      let data = await draftsList(this.chatParams);
      if (data.code === 200) {
        // console.log(data)
        this.draftsListData = data.data;
      }
    },
    //获取主诉tags和既往史tags的数据
    TagsGet() {
      axios.get("/mocks/zhusu.json").then(response => {
        this.zhusuData = response.data;
      });
      axios.get("/mocks/jiwangshi.json").then(response => {
        this.historyData = response.data;
      });
    },
    //主诉的快捷输入;
    addZhuSu(tag) {
      if (this.diseaseData.wenzhen_zhusu !== undefined) {
        this.zhusuString = this.diseaseData.wenzhen_zhusu;
      } else {
        this.zhusuString = "";
      }
      this.zhusuString += tag;
      this.diseaseData.wenzhen_zhusu = this.zhusuString;
    },
    //既往史的快捷输入；
    addhistory(tag) {
      if (this.diseaseData.wenzhen_disease_ed !== undefined) {
        this.historyString = this.diseaseData.wenzhen_disease_ed;
      } else {
        this.historyString = "";
      }
      this.historyString += tag;
      this.diseaseData.wenzhen_disease_ed = this.historyString;
    },
    //提交病症信息
    async commit(val) {
      if(val === 2){
        //保存正式时验证必填项
        if (this.diseaseData.office_id == "") {
          this.$message.error("请输入就诊科室");
          return;
        }
        if (this.diseaseData.name == "") {
          this.$message.error("请输入姓名");
          return;
        }
        if (this.diseaseData.sex === "") {
          this.$message.error("请选择性别");
          return;
        }
        if (this.diseaseData.age == "") {
          this.$message.error("请输入年龄");
          return;
        }
        if (this.diseaseData.wenzhen_zhusu == "") {
          this.$message.error("请输入主诉");
          return;
        }
        if (this.diseaseData.wenzhen_disease_ing == "") {
          this.$message.error("请输入现病史");
          return;
        }
        if (this.diseaseData.guomin == "") {
          this.$message.error("请输入过敏史");
          return;
        }
        if (this.diseaseData.wenzhen_disease_ed == "") {
          this.$message.error("请输入既往史");
          return;
        }
        if (this.diseaseData.tijian == "") {
          this.$message.error("请输入体检信息");
          return;
        }
        if (this.diseaseData.fuzhu_result == "") {
          this.$message.error("请输入辅助信息");
          return;
        }
      }
      //当输入了联系方式时,验证联系方式
      if(this.diseaseData.mobile !== ""){
        if (!(isvalidPhone(this.diseaseData.mobile) ||isvalidLandlinePhone(this.diseaseData.mobile))) {
          this.$message.error("请输入正确的联系方式");
          return;
        }
      }
      if(this.diseaseData.age !==""){
        if(!validAge(this.diseaseData.age) || this.diseaseData.age.length>5){
          this.$message.error("年龄只能输入数字，字母，中文且不超过5个字");
          return;
        }
      }
      this.diseaseData.fans_openid = this.chatParams.fans_openid;
      this.diseaseData.save_type = val; //1：保存草稿，2保存正式
      let data = await diseaseAdd(this.diseaseData);
      if (data.code == 200) {
        this.$message({ message: "提交成功", type: "success" });
        //清空添加病症的信息
        this.diseaseData.office_id = "";
        this.diseaseData.name = "";
        this.diseaseData.sex = "";
        this.diseaseData.age = "";
        this.diseaseData.job = "";
        this.diseaseData.mobile = "";
        this.diseaseData.nickname = "";
        this.diseaseData.wechat = "";
        this.diseaseData.address = "";
        this.diseaseData.wenzhen_zhusu = "";
        this.diseaseData.wenzhen_disease_ing = "";
        this.diseaseData.wenzhen_disease_ed = "";
        this.diseaseData.tijian = "";
        this.diseaseData.fuzhu_result = "";
        this.diseaseData.beizhu = "";
        this.diseaseData.guomin = "";
        if(val ===1){
          this.diseaseAddStatus=false;
          this.draftsStatus=true;
          this.draftsList();//重新获取草稿箱列表
        }else if(val ===2){
          this.diseaseAddStatus=false;
          this.diseaseInfoStatus=true;
          this.diseaseList(); //获取病症列表
        }
      }
    },
    //病症详情
    async diseaseDetail(val) {
      let data = await diseaseDetail(val);
      if (data.code === 200) {
        // console.log(data);
        this.diseaseDetailData = data.data;
        this.diseaseDetailShow = true;
      }
    },
    //草稿箱的病症详情
    async draftsDetail(val) {
      let data = await draftsDetail(val);
      if (data.code === 200) {
        this.diseaseDetailData = data.data;
        this.diseaseDetailShow = true;
      }
    },
    //驳回原因
    reason(val){
      let content =val;
      this.$alert(content, "驳回原因", {
        confirmButtonText: "确定",
        callback: action => {}
      });
    },
    //放弃病症按钮
    giveUp(params) {
      this.$confirm("放弃病症, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "放弃成功!"
          });
          this.giveUpDisease(params);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //放弃病症
    async giveUpDisease(params) {
      let data = await giveUpDisease(params);
      if (data.code == 200) {
        this.diseaseList(); //放弃成功刷新用户病症信息
      }
    },
     //复用
    reuse(val){
      diseaseDetail(val).then(data=>{
        if(data.code===200){
          this.diseaseData=data.data;
          this.diseaseInfoStatus=false;
          this.diseaseAddStatus=true;
          if(data.data.fy_dis_id =='0'){
            this.diseaseData.fy_dis_id=val;
          }
          getMobile(this.chatParams.fans_openid).then(data =>{
            if(data.code===200){
              this.diseaseData.mobile=data.data.mobile
            }
          })
        }
      });
      
    },
    //草稿箱继续编辑
    edit(item){
      // console.log(item);
      draftsDetail(item.id).then(data=>{
        if(data.code===200){
          this.draftsStatus=false;
          this.diseaseAddStatus=true;
          this.diseaseData=data.data;
          this.diseaseData.temp_disease_id=item.id;
        }
      });
      
    },
    //websocket聊天消息提醒
    WebSocketTest() {
      let timer =null;
      let ws = new WebSocket(
        "ws://tdcsgzh.wuhanlst.com:11111?token=" +
          this.token +
          "&device=" +
          this.device
      );
      ws.onopen = () => {
        ws.send('{"type":"login"}'); //连接上，发送type:login
        timer = setInterval(() => {
          ws.send('{"type":"pong"}');
        }, 3000);
      };
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
          //当聊天界面公众号为新消息所属公众号时，
          if (this.weid === msg.weid) {
            //当聊天界面分组为新消息所属分组时，
            if (this.chating.groupid !== "") {
              if (this.chating.groupid === msg.groupid) {
                //将新来的文字信息渲染到页面
                if (msg.msg_type === 1) {
                  this.groupList.forEach(item => {
                    if (item.groupid === this.chating.groupid) {
                      item.userList.forEach(it => {
                        if (it.fans_openid === msg.fans_openid) {
                          it.last_msg = msg.content;
                        }
                      });
                    }
                  });
                } else {
                }
                //当聊天界面的粉丝id等于发送信息的粉丝id时;
                if (this.formParams.fans_openid == msg.fans_openid) {
                  this.readMsgParams.msg_id = msg.msg_id;
                  //发来的消息已读
                  this.readMsg();
                  msg.not_read_num = 0;
                  this.chatList.push(msg);
                  this.scrollChange(); //  让聊天窗口处于最底部
                  // console.log(this.chatList)
                }
                //当聊天界面的粉丝id不等于发送信息的粉丝id时;
                else if (this.formParams.fans_openid !== msg.fans_openid) {
                  this.groupList.forEach(item => {
                    if (item.groupid === msg.groupid) {
                      item.userList.forEach(it => {
                        if (
                          it.fans_openid == msg.fans_openid &&
                          it.fans_openid !== this.formParams.fans_openid
                        ) {
                          it.not_read_num = msg.not_read_num;
                        }
                      });
                    }
                  });
                  console.log(this.groupList, "发送消息后");
                }
              }
            } else {
              this.groupList.forEach(item => {
                if (item.groupid === msg.groupid) {
                  item.userList.forEach(it => {
                    if (it.fans_openid === msg.fans_openid) {
                      it.not_read_num = msg.not_read_num;
                    }
                    item.not_read_num += it.not_read_num;
                  });
                }
              });
            }
          } else {
          }
          //渲染公众号列表的消息总数
          this.wechatList.forEach(item => {
            if (item.id === msg.weid) {
              item.not_read_num = msg.wx_not_read_num;
            }
          });

          //渲染公众号列表分组的消息总数
          this.groupList.forEach(item => {
            if (item.groupid === msg.groupid) {
              item.not_read_num = 0;
              item.userList.forEach(it => {
                item.not_read_num += it.not_read_num;
              });
            }
          });
        }
      };
      ws.onclose = () => {
        // 关闭 websocket
        // clearInterval(timer);
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
                  .text {
                    width: 170px;
                    .nickname {
                      font-size: 14px;
                      line-height: 24px;
                      overflow: hidden;
                      text-overflow: ellipsis;
                      white-space: nowrap;
                    }
                    .txt {
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
                  .txt {
                    color: #fff;
                  }

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
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
          // background-color: @bg_eaedf1;
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
            padding-bottom: 30px;
            .reply {
              padding-top: 5px;
              .reply-add {
                display: flex;
                align-items: center;
                justify-content: center;
                padding-top: 5px;
              }
              .reply-list {
                .list {
                  margin-top: 10px;
                  .item {
                    // padding: 0 8px;
                    margin-bottom: 8px;
                    .box-card{
                      .text{
                        word-wrap: break-word;
                      }
                    }
                  }
                }
              }
            }
            .userInfo {
              padding-top: 10px;
              padding-left: 10px;
              .userInfo-main {
                h4 {
                  font-size: 20px;
                  line-height: 32px;
                }
                table {
                  width: 370px;
                  margin: 10px 0;
                  border: 1px solid #e2e2e2;
                  border-color: #e2e2e2;
                  border-collapse: collapse;
                  tr {
                    td {
                      padding: 6px 10px;
                      border: 1px solid #e2e2e2;
                      input {
                        // border: 0;
                        margin-right: 5px;
                        line-height: 28px;
                      }
                    }
                  }
                }
                .el-form {
                  margin: 10px 0;
                  .el-input {
                    width: 90% !important;
                  }
                }
              }
            }
            .disease {
              padding-top: 10px;
              padding-left: 10px;
              .disease-main {
                padding-bottom: 30px;
                h4 {
                  font-size: 20px;
                  line-height: 32px;
                }
                .disease-content {
                  table {
                    width: 370px;
                    margin: 10px 0;
                    border: 1px solid #e2e2e2;
                    border-color: #e2e2e2;
                    border-collapse: collapse;
                    tr {
                      td {
                        padding: 6px 10px;
                        border: 1px solid #e2e2e2;
                        input {
                          border: 0;
                          line-height: 28px;
                        }
                      }
                    }
                  }
                }
                .disease-footer {
                  position: fixed;
                  bottom: 10px;
                  right: 0;
                  width: 400px;
                  // border-top:1px solid #e2e2e2;
                  display: flex;
                  button {
                    flex: 1;
                  }
                }
              }
              .disease-add {
                .el-form {
                  .el-form-item {
                    .el-input {
                    }
                  }
                }
                .footer {
                  display: flex;
                  .el-button {
                    flex: 1;
                  }
                }
              }
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
  table {
    width: 90%;
    margin: 10px 0;
    border: 1px solid #e2e2e2;
    border-color: #e2e2e2;
    border-collapse: collapse;
    tr {
      td {
        padding: 6px 10px;
        border: 1px solid #e2e2e2;
        input {
          border: 0;
          line-height: 28px;
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
.red_star1::before {
  position: relative;
  content: "*";
  color: red;
  left: 30px;
  top: 30px;
}
.red_star2::before {
  position: relative;
  content: "*";
  color: red;
  left: 15px;
  top: 30px;
}
.red_star4::before {
  position: relative;
  content: "*";
  color: red;
  left: 0px;
  top: 30px;
}
</style>
