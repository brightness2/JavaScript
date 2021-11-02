/*
 * @Author: Brightness
 * @Date: 2021-11-02 09:36:45
 * @LastEditors: Brightness
 * @LastEditTime: 2021-11-02 09:53:34
 * @Description:  数组扁平化
 */
//实现一下功能
const arr = [1, [2, [3, [4, 5]]], 6];//=> [1,2,3,4,5,6]

//使用flat
let res1 = arr.flat(Infinity);
console.log(res1);

//使用正则
let res2 = JSON.parse('[' + JSON.stringify(arr).replace(/\[|\]/g, '') + ']');
console.log(res2);

//使用reduce
const flatten = arr => {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
    }, []);
}

let res3 = flatten(arr);
console.log(res3);

//使用递归
let res4 = [];
const fn = arr => {
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            fn(arr[i]);
        } else {
            res4.push(arr[i]);
        }
    }
}

fn(arr);
console.log(res4);