/*
 * @Author: Brightness
 * @Date: 2021-11-02 10:54:14
 * @LastEditors: Brightness
 * @LastEditTime: 2021-11-02 11:05:21
 * @Description:  模拟new
 */
/*******************/
function newOperation(ctor,...args){
    if(typeof ctor != 'function'){
        throw new TypeError('type Error');
    }

    let obj = Object.create(ctor.prototype);
    let res = ctor.apply(obj,args);

    let isObject = typeof res === 'object' && res !== null;
    let isFunction = typeof res === 'function';
    return isObject || isFunction?res:obj;
}


