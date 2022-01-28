# WEB知识

## 说一下http和https

1、http：超文本协议，互联网应用最广泛的网络协议。TCP/IP请求和应答标准。
2、https：安全的http通道，基于http加入了SSL层(传输层)，加密详细内容。
3、区别：http未加密，https加密处理。https安全性高，需要ca证书。http默认端口80，https默认端口443。
4、https缺点：加载时间增加，耗电增加，费用增高，需要绑定ip。

## tcp三次握手，一句话概括
客户端和服务端都需要直到各自可收发，因此需要三次握手。C->S->C。

## TCP和UDP的区别
1、TCP面向连接的，udp是无连接的即发送数据前不需要先建立连接；
2、TCP服务可靠，udp不保证可靠；
3、TCP面向字节流，udp面向报文；
4、TCP只能1对1，udp支持1对多。

## HTML5新特性
1、语义化标签；
2、表单类型增加；
3、增加音频视频资源标签；
4、canvas标签；
5、svg标签；
6、增加api；
7、web storage，localStorage，sessionStorage；
8、支持WebSocket；

## WebSocket的实现和应用

1、webSocker是HTML5的协议，支持持久连接；
2、webSocker借用http协议完成一部分握手，基于upgrade，connection属性。

##  HTTP请求的方式，HEAD方式
head 报头，options 参数。

## 一个图片url访问后直接下载怎样实现？
1、返回头，OSS的API返回http头；
2、下载时
x-oss-object-type:normal
x-oss-request-id:598D5ED34F29D01FE2925F41
x-oss-storage-class:Standard

## 几个很实用的BOM属性对象方法
1、BOM是浏览器对象；
2、方法
location，history，navigator

## fetch发送2次请求的原因
fetch 发送post时，总是发送2次，第一次是204，第二次才成功。
原因是，第一次发送options请求，第二次发送真正的请求。

## Cookie、sessionStorage、localStorage的区别
共同点：保存在浏览器端，同源；
不同点：
1、cookie只有4k大小，可设置有效期，客户端与服务端来回传递；
2、sessionStorage浏览关闭后失效；
3、locationStorage永远保存，需要手动删除；

## 说一下web worker
后台运行js，通过postMessage返回主线程，不阻塞主线程；
创建worker，js文件，回传函数等

## iframe是什么？有什么缺点？
iframe 是内联框架；部分浏览器不支持；
缺点：阻塞主页面的onload事件，不利于SEO。

## Cookie如何防范XSS攻击
XSS攻击，html中嵌入js脚本；http头部set-cookie：httponly，禁止js访问cookie；secure：仅在请求为https的时候发送cookie；

## 一句话概括RESTFUL
就是用URL定位资源，用HTTP动词描述操作

## 讲讲viewport和移动端布局
媒体查询、百分比，rem，vw/vh

## 前端优化
1、降低请求量：合并资源，减少http请求，压缩，webpack，lazyload。
2、加快请求速度：预解析DNS，减少域名数，并行加载，CDN分发；
3、缓存：http缓存，离线缓存，离线数据缓存locationStorage。
4、渲染：JS/CSS优化，加载顺序，服务端渲染，pipeline。

## 在地址栏里输入一个URL,到这个页面呈现出来，中间会发生什么？
输入url
--》找服务器ip， (--》寻找浏览器缓存--》寻找系统缓存--》路由器缓存--》hosts文件--》DNS服务器--》得到ip地址--》ip端口)
--》构造http请求
--》http请求封装到tcp包中， (--》传输层--》网络层--》数据链路层--》服务器)
--》服务器返回html给浏览器
--》浏览器根据html构建dom树，执行js脚本，构建cssom树，与dom树合并为渲染树
--》并行下载资源
--》数据缓存
--》完成

## 输入URL到页面加载显示完成发生了什么?
DNS解析--》TCP连接--》发送HTTP请求--》服务器处理并返回http报文--》浏览器解析渲染页面--》连接结束。

##  csrf和xss的网络攻击及防范
1、CSRF：跨站请求伪造，伪造身份信息，发送恶意请求；使用验证码，检查https头部的refer，使用token来防范。
2、XSS：跨站脚本攻击；通过设置cookie httponly，过滤用户输入检查进行防范。

# CSS

## css盒模型
box-sizing(有3个值哦)：border-box,padding-box,content-box.

## 画一条0.5px的线
1、采用meta viewport的方式，<meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
2、采用border-image的方式，
3、采用transform: scale()的方式

##  link标签和import标签的区别
link是html标签，@import是css提供的；
link与页面同时加载，@impor页面加载后加载；
link样式权重高于@import。

## Flex布局
容器的属性：

flex-direction：决定主轴的方向（即子item的排列方法）
.box {
flex-direction: row | row-reverse | column | column-reverse;
}

flex-wrap：决定换行规则
.box{
flex-wrap: nowrap | wrap | wrap-reverse;
}

flex-flow：
.box {
flex-flow: <flex-direction> || <flex-wrap>;
}

justify-content：对其方式，水平主轴对齐方式

align-items：对齐方式，竖直轴线方向

项目的属性（元素的属性）：

order属性：定义项目的排列顺序，顺序越小，排列越靠前，默认为0

flex-grow属性：定义项目的放大比例，即使存在空间，也不会放大

flex-shrink属性：定义了项目的缩小比例，当空间不足的情况下会等比例的缩小，如果定义个item的flow-shrink为0，则为不缩小

flex-basis属性：定义了在分配多余的空间，项目占据的空间。

flex：是flex-grow和flex-shrink、flex-basis的简写，默认值为0 1 auto。

align-self：允许单个项目与其他项目不一样的对齐方式，可以覆盖align-items，默认属性为auto，表示继承父元素的align-items

比如说，用flex实现圣杯布局

##  关于js动画和css3动画的差异性
功能涵盖面，js比css大

实现/重构难度不一，CSS3比js更加简单，性能跳优方向固定

对帧速表现不好的低版本浏览器，css3可以做到自然降级

css动画有天然事件支持

css3有兼容性问题

## 说一下块元素和行元素
块元素：独占一行，并且有自动填满父元素，可以设置margin和pading以及高度和宽度
行元素：不会独占一行，width和height会失效，并且在垂直方向的padding和margin会失效。


## 多行元素的文本省略号
display: -webkit-box
-webkit-box-orient:vertical
-webkit-line-clamp:3
overflow:hidden

## CSS选择器有哪些，优先级呢
id > class > 标签 > 伪元素 > 伪类

# javascript

## 说一下闭包
闭包就是能够读取其他函数内部变量的函数，或者子函数在外调用，子函数所在的父函数的作用域不会被释放。

## 如何解决异步回调地狱
promise、generator、async/await

## 前端中的事件流
JavaScript交互是通过事件驱动来实现的，鼠标onclick等；
事件流：
事件捕获阶段--》处于目标阶段--》事件冒泡阶段

##  如何让事件先冒泡后捕获
dom标准事件模型中，是先捕获再冒泡。监听到捕获事件，先暂缓执行，直到冒泡事件被捕获后再执行捕获事件。

## 说一下事件委托
不在直接dom设置监听函数，而是在父元素设置监听函数，通过事件冒泡，判断dom的类型做出不同的响应。可以提供性能。

## 说一下图片的懒加载和预加载
预加载：提前加载图片，当用户需要查看时可直接从本地缓存中渲染。
懒加载：懒加载的主要目的是作为服务器前端的优化，减少请求或延迟请求数；实现通过src设置同一张图片，通过data-src存储图片路径，到达可视窗口时再加载。

## js的new操作符做了哪些事情
new 操作符，新建新的对象，这个对象的原型指向构造函数的prototype，执行构造函数放回这个对象。

## 异步加载js的方法
defer：只支持IE如果您的脚本不会改变文档的内容，可将 defer 属性加入到<script>标签中，以便加快处理文档的速度。因为浏览器知道它将能够安全地读取文档的剩余部分而不用执行脚本，它将推迟对脚本的解释，直到文档已经显示给用户为止。
async，HTML5属性仅适用于外部脚本，并且如果在IE中，同时存在defer和async，那么defer的优先级比较高，脚本将在页面完成时执行。
创建script标签，插入到DOM中

## Ajax解决浏览器缓存问题
在ajax发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache")。

在URL后面加上一个随机数： "fresh=" + Math.random()。

在URL后面加上时间戳："nowtime=" + new Date().getTime()。

如果是使用jQuery，直接这样就可以了 $.ajaxSetup({cache:false})。

##  eval是做什么的
它的功能是将对应的字符串解析成js并执行，应该避免使用js，因为非常消耗性能（2次，一次解析成js，一次执行）

##  如何理解前端模块化
前端模块化就是复杂的文件编程一个一个独立的模块，比如js文件等等，分成独立的模块有利于重用（复用性）和维护（版本迭代），这样会引来模块之间相互依赖的问题，所以有了commonJS规范，AMD，CMD规范等等，以及用于js打包（编译等处理）的工具webpack

## 对象深度克隆的简单实现
```
function deepClone(obj){
var newObj= obj instanceof Array ? []:{};
for(var item in obj){
var temple= typeof obj[item] == 'object' ? deepClone(obj[item]):obj[item];
newObj[item] = temple;
}
return newObj;
}
```

## 实现一个once函数，传入函数参数只执行一次
```
function ones(func){
    var tag=true;
    return function(){
        if(tag==true){
        func.apply(null,arguments);
        tag=false;
        }
        return undefined
    }
}
```

## 将原生的ajax封装成promise
```
var  myNewAjax=function(url){
    return new Promise(function(resolve,reject){
        var xhr = new XMLHttpRequest();
        xhr.open('get',url);
        xhr.send(data);
        xhr.onreadystatechange=function(){
            if(xhr.status==200&&readyState==4){
                var json=JSON.parse(xhr.responseText);
                resolve(json)
            }else if(xhr.readyState==4&&xhr.status!=200){
                reject('error');
            }
        }
    })
}
```

## js监听对象属性的改变
```
Object.defineProperty(user,'name',{
    set：function(key,value){
    }
})
//缺点：如果id不在user对象中，则不能监听id的变化

//在ES6中可以通过Proxy来实现
var  user = new Proxy(user，{
    set：function(target,key,value,receiver){
    }
})
//这样即使有属性在user中不存在，通过user.id来定义也同样可以这样监听这个属性的变化哦~
```

## 如何实现一个私有变量
```
obj={
name:yuxiaoliang,
getName:function(){
return this.name
}
}
object.defineProperty(obj,"name",{
//不可枚举不可配置

});
```

## 自己实现一个bind函数
```
Function.prototype.bind=function(obj,arg){
    var arg=Array.prototype.slice.call(arguments,1);
    var context=this;
    return function(newArg){
        arg=arg.concat(Array.prototype.slice.call(newArg));
        return context.apply(obj,arg);
    }
}
```

##  js怎么控制一次加载一张图片，加载完后再加载下一张
```
<script type="text/javascript">
var obj=new Image();
obj.src="http://www.phpernote.com/uploadfiles/editor/201107240502201179.jpg";
obj.onload=function(){
alert('图片的宽度为：'+obj.width+'；图片的高度为：'+obj.height);

document.getElementById("mypic").innnerHTML="<img src='"+this.src+"' />";
}
</script>
<div id="mypic">onloading……</div>
```

## 代码的执行顺序
```
setTimeout(function(){console.log(1)},0);
new Promise(function(resolve,reject){
console.log(2);
resolve();
}).then(function(){console.log(3)
}).then(function(){console.log(4)});
process.nextTick(function(){console.log(5)});
console.log(6);
```
//输出2,6,5,3,4,1

## 如何实现sleep的效果
```
function sleep(ms){
var temple=new Promise(
(resolve)=>{
console.log(111);setTimeout(resolve,ms)
});
return temple
}
sleep(500).then(function(){
//console.log(222)
})
```

## Js基本数据类型

Number、String、Boolean、null、undefined、symbol

## promise 实现
```
/*************简单实现promise**************** */
class PromiseM {
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED  = 'rejected'
    constructor (process) {
        this.status = 'pending'
        this.msg = ''
        process(this.resolve.bind(this), this.reject.bind(this))
        return this
    }
    resolve (val) {
        this.status = PromiseM.FULFILLED
        this.msg = val
    }
    reject (err) {
        this.status = PromiseM.REJECTED
        this.msg = err
    }
    then (fufilled, reject) {
        if(this.status === PromiseM.FULFILLED) {
            fufilled(this.msg)
        }
        if(this.status === PromiseM.REJECTED) {
            reject(this.msg)
        }
    }
}
```

## 说一下什么是virtual dom
用JavaScript对象结构表示DOM树的结构；然后用这个对象构建真正的DOM树，插入到文档中；
当状态变更的时候，重新构造一颗新的对象，对比旧的对象，记录差异，把差异更新到真正的DOM树上。
Virtual DOM 本质上就是在 JS 和 DOM 之间做了一个缓存。


## Vue的生命周期
init --》 beforeCreate --》created --》 beforeMount --》 mounted --》 beforeUpdate --》 updated --》 beforeDestroy --》 destroyed


## Generator函数

1、分段执行，可以暂停
2、可以控制阶段和每个阶段的返回值
3、可以知道是否执行到结尾

```
function* g(){
    var o = 1;
    yield o++;
    yield o++;
}
let gen = g();
console.log(gen.next());// {value: 1, done: false}
console.log(gen.next());// {value: 2, done: false}
console.log(gen.next());// {value: undefined, done: true}
```
可以把异步操作写在yield语句里面，等到调用next方法时再往后执行。
Generator函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

## async 函数
异步编程的解决方案，promise，async，await
```
async function asyncFun(){
    const rs1 = await new Promise(res=>{
        setTimeout(()=>{
            let data = 'ddfdd';
            res(data);
        })
    })

    console.log(rs1);
}

```


## 跨域解决
1、JSONP：JSON只支持get，因为script标签只能使用get请求；JSONP需要后端配合返回指定格式的数据。

2、CORS：服务端设置Access-Control-Allow-Origin

3、代理跨域：起一个代理服务器，实现数据的转发


## ajax 请求
```
let xhr = new XMLHttpRequest();
        xhr.open('get','url');
        xhr.send();
        xhr.onreadystatechange = function(){
            if(xhr.readyState==4){
                if(xhr.status == 200){
                    console.log(xhr.responseText);
                }
            }
        }
```

## fetch 使用
```
 let res = fetch('test.html')
        res.then(rs=>{
            if(rs.status == 200){
                return rs.text();
                //如果是json数据
                // return rs.json();
            }
        }).then(data=>{
            console.log(data);
        })
```