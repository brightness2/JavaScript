/*
 * @Author: Brightness
 * @Date: 2021-06-15 09:50:09
 * @LastEditors: Brightness
 * @LastEditTime: 2021-06-15 10:08:46
 * @Description:
 */

/************ 局部作用域 ********* */

// 变量在函数内声明，变量为局部作用域。局部变量：只能在函数内部访问

function myFun() {
  let carName = "Volvo";
  //函数内部可调用 carName 变量
  console.log(carName);
}
myFun();
//因为局部变量只作用于函数内，所以不同的函数可以使用相同名称的变量。局部变量在函数开始执行时创建，函数执行完后局部变量会自动销毁。

/************** 全局变量 ********** */
//变量在函数外定义，即为全局变量。全局变量有 全局作用域: 网页中所有脚本和函数均可使用

var newName = "new Volvo";

// 此处可调用 carName 变量
function myFunction() {
  // 函数内可调用 newName 变量
  console.log(newName);
}

myFunction();

/************ 变量提升 全局变量  ******************** */
myFun2();

//执行myFun2 函数后, 此处可调用 fun2
console.log(fun2);
function myFun2() {
  fun2 = "fun2";
  // 此处可调用 fun2 变量
}
/************ let 声明局部变量 var 声明全局变量 ****************** */
{
  let b = "b";
  var c = "c";
}
//console.log(b); //ReferenceError: b is not defined
console.log(c);
