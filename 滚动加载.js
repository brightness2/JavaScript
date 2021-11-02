/*
 * @Author: Brightness
 * @Date: 2021-11-02 11:44:34
 * @LastEditors: Brightness
 * @LastEditTime: 2021-11-02 11:49:04
 * @Description:  滚动加载
 */
window.addEventListener('scroll',()=>{
    const clientHeight = document.documentElement.clientHeight;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    if(clientHeight + scrollTop >= scrollHeight){
        //检测到滚动到底部
        //do some think ...
    }
},false);