/**
 * 二维数组转sku组合
 * 譬如：[[1,2],['a','b']] =》 [[1,'a'],[1,'b'],[2,'a'],[2,'b']]
 * 用法：
     let arr = [
    ["红色", "黄色", "橙色"],
    ["微辣", "中辣"],
    ];
    let res = [];
    recursionSub(res,arr.length,arr,0,-1);
    console.log('组合结果',res);
    
    */
var recursionSub = function (list, count, array, ind, start, indexs) {
    start++;
    if (start > count - 1) {
        return;
    }
    if (start == 0) {
        indexs = new Array(array.length);
    }
    for (indexs[start] = 0; indexs[start] < array[start].length; indexs[start]++) {
        recursionSub(list, count, array, 0, start, indexs);
        if (start == count - 1) {
            var temp = new Array(count);
            for (var i = count - 1; i >= 0; i--) {
                temp[start - i] = array[start - i][indexs[start - i]];
            }
            list.push(temp);
        }
    }
}

let arr = [
    ["红色", "黄色", "橙色"],
    ["微辣", "中辣"],
    ];
    let res = [];
    recursionSub(res,arr.length,arr,0,-1);
    console.log('组合结果',res);