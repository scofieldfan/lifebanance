/**
 * 获取地址栏参数
 */

var url = {
    get: function (key) {
        var href = window.location.href;
        var param = href.substring(href.indexOf('?') + 1);
        var index = param.indexOf('#');

        if (index >= 0) {
            param = param.substring(0, index);
        }
        var arr = param.split('&');
        var len = arr.length;
        var paramArr = [];

        for (var i = 0; i < len; i++) {
            var tmpArr = arr[i].split('=');
            paramArr[tmpArr[0]] = arr[i].substring(arr[i].indexOf('=') + 1, arr[i].length);
        }

        return paramArr[key];
    }
};

export default url;
