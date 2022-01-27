function deepClone(obj){
    let newObj = Array.isArray(obj)?[]:{};
    for (const key in obj) {
        newObj[key] = typeof(obj[key]) == 'object' ? deepClone(obj[key]) : obj[key];
    }
    return newObj;
}

let a = {
    a:'a',
    c:[1,3]
}
console.log(deepClone(a));