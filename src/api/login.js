import fetch from '@/utils/fetch'

/*
 *   NO:1    获取设备
 */
export function Device(device) {
    return fetch({
        url: '/v1/device',
        method: 'GET',
        data: device,
    })
}
/*
 *   NO:2    轮询登录
 */
export function LoginPoll(params) {
    return fetch({
        url: 'v1/wechat/login/login_poll?login_code='+params,
        method: 'GET',
    })
}



