/*
 * @Author: Brightness
 * @Date: 2021-11-02 10:15:08
 * @LastEditors: Brightness
 * @LastEditTime: 2021-11-02 10:25:53
 * @Description:  类数组转数组
 */

/******具有length属性，没有数组原型上的方法，常见有argument是，DOM ,Set */

//使用Array.from
let res = Array.from(new Set([1,2]));
console.log(Array.isArray(res));//true

//使用 
let res2 = Array.prototype.splice.call(new Set([4,2]));
console.log(Array.isArray(res2));//true

//扩展运算符
let res3 = [...new Set([4,2])];
console.log(Array.isArray(res3));//true

//使用contact
let res4 = Array.prototype.concat.apply([],new Set([4,2]));
console.log(Array.isArray(res4));//true
