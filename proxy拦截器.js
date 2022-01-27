/*
 * @Author: Brightness
 * @Date: 2022-01-07 17:22:36
 * @LastEditors: Brightness
 * @LastEditTime: 2022-01-07 17:24:21
 * @Description:  
 */
//Proxy拦截器
const _proxy = (object,...prototypes) => {
    // 补全代码
        let proxy = new Proxy(object,{
        get:function(target,propkey){
        if(prototypes.includes(propkey)) return 'noright'
            return target[propkey]
        }
    })
    return proxy;
}
      
//Proxy计数器
let count = 0
const _proxy2 = object => {
    // 补全代码
    let proxy = new Proxy(object,{
       get:function(target,propkey){
           if(propkey in target){
               count++
           }else{
               count--;
           }
       }
   })
   return proxy;
}