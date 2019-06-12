import Vue from 'vue';


//病症状态

Vue.filter('dis_type', val => {
    if (val == 1) return "待诊断";
    if (val == 2) return "已诊断";
    if (val == 3) return "已确诊";
    if (val == 4) return "放弃确诊";
    if (val == 6) return "已下处方";
    if (val == 7) return "已下单";
    if (val == 8) return "未成单";
    if (val == 9) return "已驳回";
    if (val == 10) return "取消病症";
    if (val == 11) return "临时保存";
})

//操作按鈕
Vue.filter('button_type', val => {
    if (val == 1) return "驳回原因";
    if (val == 2) return "弃用";
    if (val == 3) return "复用";
})

//科室列表
Vue.filter('office_id', val => {
    if (val == 1) return "男科";
    if (val == 2) return "肛肠科";
    if (val == 3) return "鼻炎科";
    if (val == 4) return "乳腺科";
})
//性别
Vue.filter('sex_type', val => {
    if (val == 1) return "男";
    if (val == 2) return "女";
})
