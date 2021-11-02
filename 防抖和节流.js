/*
 * @Author: Brightness
 * @Date: 2021-11-02 10:28:07
 * @LastEditors: Brightness
 * @LastEditTime: 2021-11-02 10:51:01
 * @Description:  防抖 和 节流
 */

//防抖,触发高频时间后n秒内函数只会执行一次，如果n秒内高频时间再次触发，则重新计算时间
const debounce = (fn,time = 200)=>{
    let timeout = null;
    return function(){
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.apply(this,arguments);
        }, time);

    }
}
let fn = debounce(()=>{
    console.log('aaa');
});
for (let i = 0; i < 20; i++) {
    fn();
}
//aaa ,只打印一次

/*******高频时间触发，但n秒内只会执行一次，所以节流会稀释函数的执行频率******* */
//节流常应用于鼠标不断点击触发、拖拽、监听滚动事件
const throttle = (fn,time=200)=>{
    let flag = true;
    return function(){
        if(!flag){
            return;
        }
        flag = false;
        setTimeout(() => {
            fn.apply(this,arguments);
            flag = true;
        }, time);
    }
}

let fn2 = debounce(()=>{
    console.log('bbbbb');
});
for (let i = 0; i < 20; i++) {
    fn2();
}