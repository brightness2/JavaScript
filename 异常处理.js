/*
 * @Author: Brightness
 * @Date: 2021-06-15 16:12:39
 * @LastEditors: Brightness
 * @LastEditTime: 2021-06-15 17:03:02
 * @Description:
 */
/* Error 实例对象 */
// JavaScript 解析或运行时，一旦发生错误，引擎就会抛出一个错误对象。JavaScript 原生提供Error构造函数，
//所有抛出的错误都是这个构造函数的实例。
let err = new Error("出错了");
// console.log(err.message); //出错了
// console.log(err.name + ":" + err.stack);
//message：错误提示信息 ,name：错误名称（非标准属性）,stack：错误的堆栈（非标准属性）

/* 原生错误类型 */
// SyntaxError 语法错误 、 ReferenceError 不存在变量错误 、RangeError 数组长度为负数/Number对象的方法参数超出范围/函数堆栈超过最大值
//  TypeError 对象是变量或参数不是预期类型时发生的错误。比如，对字符串、布尔值、数值等原始类型的值使用new命令，就会抛出这种错误，因为new命令的参数应该是一个构造函数
// URIError 对象是 URI 相关函数的参数不正确时抛出的错误，主要涉及encodeURI()、decodeURI()、encodeURIComponent()、decodeURIComponent()、escape()和unescape()这六个函数
// EvalError eval函数没有被正确执行时，会抛出EvalError错误。该错误类型已经不再使用了，只是为了保证与以前代码兼容，才继续保留。

/* 自定义错误 */
function UserError(message) {
  this.message = message || "默认信息";
  this.name = "UserError";
}

UserError.prototype = new Error();
UserError.prototype.constructor = UserError;

/* throw  */
// throw语句的作用是手动中断程序执行，抛出一个错误
// throw new UserError("手动抛出");

/* UserError */
// 一旦发生错误，程序就中止执行了。JavaScript 提供了try...catch结构，允许对错误进行处理，选择是否往下执行。

try {
  throw new UserError("错误将被捕获");
} catch (e) {
  console.log(e.name + ":" + e.message);
  console.log(e.stack);
}
