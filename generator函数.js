
function readFile(pwd,callback){
    //文件读取成
    let p = new Promise((resolve,reject)=>{
        setTimeout(()=>{
            let data = pwd+"-- read success!";
            resolve(data)
        },2000)
    })
    //回调
    p.then(data=>{
        let res = callback(data);
        return res;
    }).then(res=>{
        console.log('打印回调结果:',res+'--done!');
    })
}
readFile('/etc/passwd',data=>{console.log('回调结果：',data);return data;});

/************generator函数 ****************/
//语法是 function*    yield
//优点是可以随时暂停，缺点是流程管理却不方便
function* readFile2(pwd){

     nextParam = yield new Promise((resolve,reject)=>{
        setTimeout(()=>{
            let data = pwd+"-- read success!";
            resolve(data)
        },2000)
    });

    yield console.log('打印回调结果(通过next方法传参):',nextParam+'--done!');
}


let gen = readFile2('/etc/passwd');
gen.next().value.then(data=>{
    console.log('回调结果：',data);
    //generator可以随时暂停，对结果处理，再执行下一步
    gen.next(data);
})


//推荐使用 async 函数，自动执行器不用手动执行next
