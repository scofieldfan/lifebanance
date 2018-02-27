/**
 * 获取地址栏参数
 */

var util = {
    guid: function () {
        function S4 () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }
        return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4());
    },
    format (value, fmt) {
        var o = {
            // 月份
            'M+': value.getMonth() + 1,
            // 日
            'd+': value.getDate(),
            // 小时
            'h+': value.getHours(),
            // 分
            'm+': value.getMinutes(),
            // 秒
            's+': value.getSeconds(),
            // 季度
            'q+': Math.floor((value.getMonth() + 3) / 3),
            // 毫秒
            'S': value.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (value.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    },
    // 时间
    formateDate (data, formste) {
        return this.format(new Date(data * 1000), formste || 'yyyy-MM-dd hh:mm:ss');
    }
};
export default util;
