/***********官方V8 promise************* */
//https://chromium.googlesource.com/v8/v8/+/3.29.45/src/promise.js?autodive=0/

/*************简单实现promise**************** */
class PromiseM {
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED  = 'rejected'
    constructor (process) {
        this.status = 'pending'
        this.msg = ''
        process(this.resolve.bind(this), this.reject.bind(this))
        return this
    }
    resolve (val) {
        this.status = PromiseM.FULFILLED
        this.msg = val
    }
    reject (err) {
        this.status = PromiseM.REJECTED
        this.msg = err
    }
    then (fufilled, reject) {
        if(this.status === PromiseM.FULFILLED) {
            fufilled(this.msg)
        }
        if(this.status === PromiseM.REJECTED) {
            reject(this.msg)
        }
    }
}


/**********实现promise 还是有缺陷*************** */
class MyPromise{
    static PENDING = 'pending'
    static FULFILLED = 'fulfilled'
    static REJECTED  = 'rejected'
    constructor(handle){
        if(typeof handle !== 'function'){
            throw new Error('param must be function');
        }
        this.status = MyPromise.PENDING;
        this.res = undefined;
        this.fulfilledQueues = [];
        this.rejectedQueues = [];
        try {
            handle(this.resolve.bind(this),this.reject.bind(this));
        } catch (error) {
            this.reject(error);
        }
    }

    resolve(val){
        if(this.status !== MyPromise.PENDING) return;
        // 依次执行成功队列中的函数，并清空队列
        const run=()=>{
            this.status = MyPromise.FULFILLED;
            this.res = val;
            let cb;
            while (cb = this.fulfilledQueues.shift()) {
                cb(val);
            }
        }
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run,0);
    }

    reject(err){
        if(this.status !== MyPromise.PENDING) return;
        // 依次执行失败队列中的函数，并清空队列
        const run=()=>{
            this.status = MyPromise.REJECTED;
            this.res = err;
            let cb;
            while (cb = this.rejectedQueues.shift()) {
                cb(err);
            }
        }
        // 为了支持同步的Promise，这里采用异步调用
        setTimeout(run,0);
    }

    then(onFulfilled,onRejected){

        return new MyPromise((onFulfilledNext,onRejectedNext)=>{
            //封装一个成功时执行的函数
            let fulfilledFun = value=>{
                try {
                    if(typeof onFulfilled !== 'function'){
                        onRejectedNext(value)
                    }else{
                        let data = onFulfilled(value);
                        if(data instanceof MyPromise){
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            data.then(onFulfilledNext,onRejectedNext);
                        }else{
                            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(data);
                        }
                    }
                } catch (err) {
                     // 如果函数执行出错，新的Promise对象的状态为失败
                     onRejectedNext(err);
                }
            }

            // 封装一个失败时执行的函数
            let rejectedFun = error=>{
                try {
                    if(typeof onRejected !== 'function'){
                        onRejectedNext(error);
                    }else{
                        let data = onRejected(error);
                        if(data instanceof MyPromise){
                            // 如果当前回调函数返回MyPromise对象，必须等待其状态改变后在执行下一个回调
                            data.then(onFulfilledNext,onRejectedNext);
                        }else{
                            //否则会将返回结果直接作为参数，传入下一个then的回调函数，并立即执行下一个then的回调函数
                            onFulfilledNext(data);
                        }
                    }
                } catch (err) {
                    // 如果函数执行出错，新的Promise对象的状态为失败
                    onRejectedNext(err);
                }
            }

            //状态
            switch (this.status) {
                case MyPromise.PENDING:
                    this.fulfilledQueues.push(fulfilledFun);
                    this.rejectedQueues.push(rejectedFun);
                    break;
                case MyPromise.FULFILLED:
                    fulfilledFun(this.res);
                    break;
                case MyPromise.REJECTED: 
                    rejectedFun(this.res);
                    break;
            }
        });
    }
}
