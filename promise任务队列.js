//通过 promise 递归调用函数实现请求任务队列
function doAction(data){
    let obj = data.pop();
    if(obj){
        return new Promise((res,rej)=>{
            //to do ...
            res(data);
        }).then((data)=>{
            //递归调用
            doAction(data);
        }).catch((data)=>{
            // console.log('任务失败',data); 继续执行下一个任务，或者终止执行
            // doAction(data)
        })
    }
}