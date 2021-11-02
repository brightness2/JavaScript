/*
 * @Author: Brightness
 * @Date: 2021-11-02 09:53:19
 * @LastEditors: Brightness
 * @LastEditTime: 2021-11-02 10:13:20
 * @Description:  数组去重
 */
const arr = [1,1,'1',17,true,true,false,false,'true','a',{},{}];//=> [1,'1',17,true,false,'true','a',{},{}]

//使用 set
let res1 = Array.from( new Set(arr));
console.log(res1);

//循环
const unique = arr => {

    let len = arr.length;
    for(let i=0;i<len;i++){
        for (let j = i+1; j < len; j++) {
            if(arr[i] === arr[j]){
                arr.splice(j,1);
                len--;
                j--;
            }
            
        }
    }
    return arr;
};
let res2 = unique(arr);
console.log(res2);

//使用indexof
const unique2 = arr=>{
    let len = arr.length;
    let res = [];
    for (let i = 0; i < len; i++) {
        if(res.indexOf(arr[i]) === -1){
            res.push(arr[i]);
        }        
    }
    return res;
};

let res3 = unique2(arr);
console.log(res3);

//使用includes
const unique3 = arr =>{
    let len = arr.length;
    let res = [];
    for (let i = 0; i < len; i++) {
        if(!res.includes(arr[i])){
            res.push(arr[i]);
        }
        
    }
    return res;
};

let res4 = unique3(arr);
console.log(res4);

//使用filter
const unique4 = arr => {
    return arr.filter((item,index)=>{
        return arr.indexOf(item) === index;
    });
};
let res5 = unique4(arr);
console.log(res5);