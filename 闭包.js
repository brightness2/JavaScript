/*
 * @Author: Brightness
 * @Date: 2021-06-15 10:09:27
 * @LastEditors: Brightness
 * @LastEditTime: 2021-06-15 11:43:51
 * @Description:
 */
/**** 通过闭包获取内部的变量 **** */
//闭包特点：函数嵌套函数，函数内部可以引用函数外部的参数和变量，参数和变量不会被回收机制回收

/*形式1：函数作为返回值 */
function a() {
  let name = "dov";
  return function () {
    return name;
  };
}

var b = a();
console.log(b()); //dov
//在这段代码中，a()中的返回值是一个匿名函数，这个函数在a()作用域内部，
//所以它可以获取a()作用域下变量name的值，将这个值作为返回值赋给全局作用域下的变量b,
//实现了在全局变量下获取到局部变量中的变量的值

/**经典例子1 */
function fn() {
  let num = 3;
  return function () {
    let n = 0;
    console.log(++n);
    console.log(++num);
  };
}

let fun1 = fn();
fun1(); //1 4
fun1(); //1 5
//一般情况下，在函数fn执行完后，就应该连同它里面的变量一同被销毁，但是在这个例子中，
//匿名函数作为fn的返回值被赋值给了fun1，这时候相当于fun1=function(){let n = 0 ... }，
//并且匿名函数内部引用着fn里的变量num，所以变量num无法被销毁，而变量n是每次被调用时新创建的，
//所以每次fun1执行完后它就把属于自己的变量连同自己一起销毁，于是乎最后就剩下孤零零的num，于是这里就产生了内存消耗的问题

/**经典例子2 - 定时器与闭包 */
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    // console.log(i + " ");
  }, 100);
}
//输出了五次5,等到setTimeout可以执行的时候，for循环已经结束，
//i的值也已经编程5，所以打印出来五个5，那么我们为了实现预期结果应该怎么改这段代码呢

//方法1：
for (var i = 0; i < 5; i++) {
  //自执行函数
  (function (i) {
    setTimeout(() => {
      //   console.log(i + " ");
    }, 100);
  })(i);
}
//0 1 2 3 4
// 方法2 let 声明 i变量
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    // console.log(i + " ");
  }, 100);
}
//0 1 2 3 4

/*形式2：作为参数 */

let num = 15;
let fn1 = (x) => {
  if (x > num) {
    console.log(x);
  }
};
void (function (fn2) {
  let num = 100;
  fn2(30);
})(fn1);
//30
//在这段代码中，函数fn1作为参数传入立即执行函数中，在执行到fn2(30)的时候，
//30作为参数传入fn1中，这时候if(x>num)中的num取的并不是立即执行函数中的num，
//而是取创建函数的作用域中的num这里函数创建的作用域是全局作用域下，所以num取的是全局作用域中的值15，即30>15，打印30

/** 
最后总结一下闭包的好处与坏处

好处

①保护函数内的变量安全 ，实现封装，防止变量流入其他环境发生命名冲突

②在内存中维持一个变量，可以做缓存（但使用多了同时也是一项缺点，消耗内存）

③匿名自执行函数可以减少内存消耗

坏处

①其中一点上面已经有体现了，就是被引用的私有变量不能被销毁，增大了内存消耗，造成内存泄漏，解决方法是可以在使用完变量后手动为它赋值为null；

②其次由于闭包涉及跨域访问，所以会导致性能损失，我们可以通过把跨作用域变量存储在局部变量中，然后直接访问局部变量，来减轻对执行速度的影响

*/
