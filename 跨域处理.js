/*
 * @Author: Brightness
 * @Date: 2021-09-10 16:14:04
 * @LastEditors: Brightness
 * @LastEditTime: 2021-09-10 16:15:37
 * @Description:  跨域处理
 */
// JSONP，只能GET请求，暂不讨论。

// cors解决

// 服务端设置响应头
// PHP

// header('Access-Control-Allow-Origin:*');
// header('Access-Control-Allow-Methods:OPTIONS,POST,GET,PUT');
// header('Access-Control-Allow-Headers:X-Requested-With,Content-Type');


//需要接收cookie,增加下面
// header('Access-Control-Allow-Origin:指定域名');
// header('Access-Control-Allow-Credentials:true');


// 前端设置

//若使用xhr
var xhr = new XMLHttpRequest();
xhr.open('POST', url, true);
xhr.withCredentials = true; //true携带cookie，false不携带cookie
xhr.send(null);


//若使用fetch
fetch(url, {
    method: 'POST',
    credentials: 'include'
})