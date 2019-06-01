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
        url: '/v1/wechat/send_msg',
        method: 'POST',
        data:params
    })
}
/*
 *   NO:5    聊天记录
 */
export function chatListGet(params) {
    return fetch({
        url: '/v1/wechat/index/chat_list?fans_openid='+params.fans_openid+'&page_index='+params.page_index+'&page_size='+params.page_size,
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
        url: '/v1/wechat/send_image_wechat',
        method: 'POST',
        data:params
    })
}



