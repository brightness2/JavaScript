/*
 * @Author: Brightness
 * @Date: 2021-11-02 11:16:57
 * @LastEditors: Brightness
 * @LastEditTime: 2021-11-02 11:39:28
 * @Description:  深拷贝,还没有完成
 */
const cloneDeep = (target,hash = new WeakMap())=>{
    if(typeof target !== 'object' || target === null){
        return target;
    }
    //哈希表中存在，直接返回
    if(hash.has(target)){
        return hash.get(target);
    }
    const cloneTarget = Array.isArray(target)?[]:{};
    hash.set(target,cloneTarget);

    // 针对symbol属性
    const symKeys = Object.getOwnPropertySymbols(target);
    if(symKeys.length){
        symKeys.forEach(symKey=>{
            if(typeof target[symKey] === 'object' && target[symKey] !== null){
                cloneTarget[symKey] = cloneDeep(target[symKey]);
            }else{
                cloneTarget[symKey] = target[symKey];
            }
        })
    }

    for (const i in target) {
        if (Object.hasOwnProperty.call(target, i)) {
            typeof target[i] === 'object'&&target[i] !==null?cloneDeep(target[i],hash):target[i];
            
        }
    }
    return cloneTarget;
}

let a = [1,[2,[4,5],3]];
console.log(a);
let b = cloneDeep(a);
console.log(b);