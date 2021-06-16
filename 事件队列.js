/*
 * @Author: Brightness
 * @Date: 2021-06-15 17:05:24
 * @LastEditors: Brightness
 * @LastEditTime: 2021-06-15 17:48:37
 * @Description:
 */
/* 事件队列 (setTimeout/setInterval/Promise) */
//setTimeout()
//将事件插入到了事件队列，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。
//当主线程时间执行过长，无法保证回调会在事件指定的时间执行。
//浏览器端每次setTimeout会有4ms的延迟，当连续执行多个setTimeout，有可能会阻塞进程，造成性能问题。

function bar() {
  console.log(1);
}

function foo() {
  console.log(2);
  bar();
}

setTimeout(() => {
  console.log(3);
  foo();
}, 500);
//3 2 1
// Promise
// Promise本身是同步的立即执行函数， 当在 executor 中执行 resolve 或者 reject 的时候, 此时是异步操作， 会先执行 then/catch 等，当主栈完成后，才会去调用 resolve/reject 中存放的方法执行，打印 p 的时候，是打印的返回结果，一个 Promise 实例。
let promise = new Promise((resolve, reject) => {
  let bool = false;
  if (bool) {
    resolve("正确结果");
  } else {
    reject("错误结果");
  }
});

promise.then(
  (rs) => {
    console.log(rs);
  },
  (err) => {
    console.log(err);
  }
);

promise
  .then((rs) => {
    console.log(rs);
  })
  .catch((err) => {
    console.log(err);
  });

// async await
// Async/Await就是一个自执行的generate函数。利用generate函数的特性把异步的代码写成“同步”的形式。

// async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。
// 会阻塞
async function test() {
  let str = await (() => {
    setTimeout(() => {
      console.log("test");
    }, 3000);
  })();
}

test();
