import fetch from '@/utils/fetch'
/*
 *   NO:1    获取公众号列表
 */
export function wechatList() {
    return fetch({
        url: '/v1/wechat/index/wechat_list',
        method: 'GET',
    })
}
/*
 *   NO:2    公众号分组
 */
export function wechatGroup(params) {
    return fetch({
        url: '/v1/wechat/index/wechat_group?weid='+params,
        method: 'GET',
    })
}
/*
 *   NO:3    公众号好友列表
 */
export function friendList(params) {
    return fetch({
        url: '/v1/wechat/index/my_friend_list?weid='+params.weid+'&groupid='+params.groupid,
        method: 'GET',
    })
}
/*
 *   NO:4    客服发送消息
 */
export function sendMsg(params) {
    return fetch({
        url: '/v2/wechat/send_msg',
        method: 'POST',
        data:params
    })
}
/*
 *   NO:5    聊天记录
 */
export function chatListGet(params) {
    return fetch({
        url: 'v1/wechat/chat_list_slide?fans_openid='+params.fans_openid+'&direct='+params.direct+'&min_msg_id='+params.min_msg_id+'&max_msg_id='+params.max_msg_id,
        method: 'GET',
        data:params
    })
}
/*
 *   NO:6    上传文件
 */
export function uploads(params) {
    return fetch({
        url: '/v1/uploads',
        method: 'POST',
        data:params
    })
}
/*
 *   NO:7    客服发送图片
 */
export function sendImage(params) {
    return fetch({
        url: '/v2/wechat/send_image',
        method: 'POST',
        data:params
    })
}
/*
 *   NO:8    已读消息上报
 */
export function readMsg(params) {
    return fetch({
        url: '/v1/wechat/index/read_msg?fans_openid='+params.fans_openid+'&msg_id='+params.msg_id+'&weid='+params.weid,
        method: 'GET',
        data:params
    })
}
/*
 *   NO:9    发送收款码
 */
export function sendCode(params) {
    return fetch({
        url: '/v2/wechat/send_pay_code',
        method: 'POST',
        data:params
    })
}
/*
 *   NO:10   更改粉丝分组
 */
export function changeGroup(params) {
    return fetch({
        url: '/v1/wechat/change_group',
        method: 'POST',
        data:params
    })
}
/*
 *   NO:10   更改粉丝分组
 */
export function signOut() {
    return fetch({
        url: '/v1/wechat/login_out',
        method: 'GET',
    })
}
/*
 *   NO:11   聊天快捷短语列表
 */
export function phraseIndex() {
    return fetch({
        url: '/v1/phrase/index',
        method: 'GET',
    })
}
/*
 *   NO:12   聊天快捷短语新增
 */
export function phrasePost(params) {
    return fetch({
        url: '/v1/phrase/post',
        method: 'POST',
        data:params,
    })
}
/*
 *   NO:13   聊天快捷短语修改
 */
export function phraseUpdate(params) {
    return fetch({
        url: '/v1/phrase/update/' + params.id,
        method: 'POST',
        data:params,
    })
}
/*
 *   NO:14   聊天快捷短语删除
 */
export function phraseDelete(params) {
    return fetch({
        url: '/v1/phrase/delete/' + params.id,
        method: 'DELETE',
    })
}
/*
 *   NO:15   公众号用户信息
 */
export function fansInfo(params) {
    return fetch({
        url: '/v1/wechat/fans_info?weid='+params.weid+'&fans_openid='+params.fans_openid,
        method: 'GET',
    })
}
/*
 *   NO:16   修改备注名称
 */
export function modifyName(params) {
    return fetch({
        url: '/v1/wechat/modify_note_name',
        method: 'POST',
        data:params,
    })
}
/*
 *   NO:17   修改档案信息
 */
export function modifyInfo(params) {
    return fetch({
        url: '/v1/wechat/modify_customer_info',
        method: 'POST',
        data:params,
    })
}
/*
 *   NO:18   添加修改病症和草稿
 */
export function diseaseAdd(params) {
    return fetch({
        url: '/v1/disease/save_and_update',
        method: 'POST',
        data:params,
    })
}
/*
 *   NO:19   正式病症列表
 */
export function diseaseList(params) {
    return fetch({
        url: '/v1/disease/disease_list?fans_openid='+params.fans_openid,
        method: 'GET',
    })
}
/*
 *   NO:20   草稿箱列表
 */
export function draftsList(params) {
    return fetch({
        url: '/v1/disease/disease_temp_list?fans_openid='+params.fans_openid,
        method: 'GET',
    })
}
/*
 *   NO:21   病症详情
 */
export function diseaseDetail(params) {
    return fetch({
        url: '/v1/disease/disease_detail?id='+params,
        method: 'GET',
    })
}
/*
 *   NO:22   草稿箱的病症详情
 */
export function draftsDetail(params) {
    return fetch({
        url: '/v1/disease/disease_temp_detail?id='+params,
        method: 'GET',
    })
}
/*
 *   NO:23   科室列表
 */
export function officeList() {
    return fetch({
        url: '/v1/disease/office_list',
        method: 'GET',
    })
}
/*
 *   NO:24   废弃病症
 */
export function giveUpDisease(params) {
    return fetch({
        url: '/v1/disease/abandon_disease?id='+params,
        method: 'GET',
    })
}
/*
 *   NO:25   医生下拉框
 */
export function doctorList(params) {
    return fetch({
        url: '/v1/disease/doctor_list?fans_openid='+params,
        method: 'GET',
    })
}
/*
 *   NO:26   查询手机号
 */
export function getMobile(params) {
    return fetch({
        url: '/v1/wechat/get_customer_mobile?fans_openid='+params,
        method: 'GET',
    })
}
/*
 *   NO:27   接受消息
 */
export function receiveMsg(params) {
    return fetch({
        url: 'v1/wechat/index/receive_msg?msg_id='+params,
        method: 'GET',
    })
}
/*
 *   NO:28   批量接受消息
 */
export function batchReceiveMsg(params) {
    return fetch({
        url: 'v1/wechat/index/batch_receive_msg?msg_ids='+params,
        method: 'GET',
    })
}
/*
 *   NO:29   小程序发送授权
 */
export function auth(params) {
    return fetch({
        url: 'v1/wechat/send_mini_app_auth',
        method: 'POST',
        data:params,
    })
}



