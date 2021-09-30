/*
 * @Author: Brightness
 * @Date: 2021-09-30 09:46:55
 * @LastEditors: Brightness
 * @LastEditTime: 2021-09-30 16:40:16
 * @Description:  函数式编程
 */
/**
 * 组合  ， 管道  ， 柯里化
 * compose ,pipe,curry
 */
/**
 * 传递给compose的参数规范
 * 必须只有一个形参，而且函数返回值是下一个函数的实参
 * @param {*} args
 * @return {*} 
 */
function compose(...args){
    return (result)=>{
        return args.reduceRight((result,fn)=>{
            return fn(result);
        },result);
    }
}
let fn_c = compose(y=>y*2,x=>x+4);//组合成新的函数
// (1+4)*2 = 10
// console.log(fn_c(1));//10

/**
 * compose(f,compose(g,h));
 * 等同于
 * compose(compose(f,g),h);//数学的结合律
 * 等同于
 * compose(f,g,h);
 */

/**
 * 同 compose，只是执行方向不同，从左到右执行
 *
 * @param {*} args
 * @return {*} 
 */
function pipe(...args){
    return (result)=>{
        return args.reduce((result,fn)=>{
            return fn(result);
        },result);
    }
}
let fn_p = pipe(x=>x+4,y=>y*2);//组合成新的函数
// (1+4)*2 = 10
// console.log(fn_p(1));//10

/**柯里化 把接受多个参数的函数变成接受单一参数的函数，并且返回接受余下参数，返回结果的新函数技术 */

// 比如 打折方法
function discount(price,dis){
    return price*dis;
}

//根据打折方法，创造打九折的新方法,这样，新方法就是接受单一参数的函数
function nineDiscount(price){
    return discount(price,0.9);
}
// console.log(nineDiscount(100));//90

/**
 * 所以 一个方法有n个参数时，进行柯里化
 * 递归实现
 */
function curry(fn,...args){
    if(args.length >= fn.length){
        return fn(...args);
    }
    return function(...args2){
        return curry(fn,...args,...args2);
    }
}

let add = (x,y)=>x+y;
// 2+3 = 5
let sum1 = curry(add,2,3)
let sum2 = curry(add)(2)(3);

// console.log(sum1);//5
// console.log(sum2);//5

// 组合 + 柯里化
let mu = (x,y)=>x*y;

let newFn = pipe(curry(add)(2),curry(mu)(3));
// (4+2)*3 = 18
// console.log(newFn(4));//18

/***
 * 函子 functor
 * 函子是函数式编程里最重要的数据类型，也是基本的运算单位和功能单位，是一个范畴(容器),
 * 包含值和变形关系(依次作用于每个值，转变成其它范畴)；
 *                 f=喜欢的早餐 ，人名范畴转成早餐的范畴
 * 比如 Sam，Mary -----------------------------------> 面包，鸡蛋
 */

//任何具有map方法的数据结构，都可以当作函子的实现

class Functor1{
    constructor(val){
        this.val = val;
    }

    map(f){
        return new Functor1(f(this.val));
    }
}

//用法举例

const res = (new Functor1('bombs')).map(s=>{
    return s.toUpperCase();
});
// console.log(res);//Functor { val: 'BOMBS' }

//of 方法替换 new Functor 的操作

class Functor2{
    constructor(val){
        this.val = val;
    }

    map(f){
        return Functor2.of(f(this.val));
    }
   
}
Functor2.of = function(val){
    return new this(val);
}
//用法举例
const res2 = Functor2.of('bombs').map(s=>{
    return s.toUpperCase();
});
// console.log(res2);//Functor2 { val: 'BOMBS' }

/************常见的函子************** */

/**
 * Maybe 函子
 * 可以处理空值,不会报错
 * @class Maybe
 * @extends {Functor2}
 */
class Maybe extends Functor2{
    constructor(val){
        super(val);
    }
    map(f){
        return this.val?Maybe.of(f(this.val)):Maybe.of(null);
    }
}

let res3 = Maybe.of(null).map(function(s){
    return s.toUpperCase();
});
// console.log(res3);//Maybe { val: null }

/**
 * Either 函子
 * 条件运算 if...else...
 * @class Either
 */
class Either{
    constructor(left,right){
        this.left = left;
        this.right = right;
    }
    map(f){
        
        return this.left? Either.of(f(this.left),this.right):Either.of(this.left,f(this.right));
    }
}
Either.of = function(left,right){
    return new this(left,right);
}

//使用
let addOne = x => x+1;
let res4 = Either.of(5,6).map(addOne);
// console.log(res4);//Either { left: 6, right: 6 }
let res5 = Either.of(null,6).map(addOne);
// console.log(res5);//Either { left: null, right: 7 }

/**
 * Ap 函子
 * 一个函子的值是函数a，另一个函子是值b，作为前一个函数a的参数，所以要执行 a(b),这就是Ap函子的作用
 * @class Ap
 * @extends {Functor2}
 */
class Ap extends Functor2{
    constructor(val){
        super(val);
    }

    //参数不是函数，而是另一个函子
    ap(F){
        return Ap.of(this.val(F.val));
    }
}

//使用
let addTwo = x=>x+2;

let res6 = Ap.of(addTwo).ap(Functor2.of(2));
// console.log(res6);//Ap { val: 4 }
//等价于
const A = Functor2.of(2);
const B = Functor2.of(addTwo);
let res7 = Functor2.of( B.val(A.val));
// console.log(res7);//Functor2 { val: 4 }

/*ap 函子的意义在于，那些多参数的函数，可以从多个容器(函子)中取值*/
//举例
function sum(x,y){
    return x+y;
}

let res8 = Ap.of(curry(sum)).ap(Maybe.of(20)).ap(Maybe.of(30));
//多参数的函数 sum (注意需要柯里化后) 分别从 两个Maybe函子中获取值作为参数
// 20+30 = 50
// console.log(res8);//Ap { val: 50 }

/**  
 * Monad 函子
 * 函子中包含函子是合法的，会出现多层嵌套，Monad 函子就是解决嵌套的问题
 */
Maybe.of(
    Maybe.of(
        Maybe.of({name:'Brightness',sex:1})
    )
);

//如果要得到 {name:'Brightness',sex:1},需要进行三次 this.val 获取，很麻烦

/**
 * Monad 函子
 * 总是返回单层的函子
 * @class Monad
 * @extends {Functor2}
 */
class Monad extends Functor2{
    constructor(val){
        super(val);
    }

    map(f){
        return Monad.of(f(this.val));
    }

    join(){
        return this.val;
    }

    flatMap(f){
        return this.map(f).join();
    }
}

//使用,常常用于IO操作,IO是一个monad函子

const fs = require('fs');


// IO函子
class IO {
    constructor (fn) {
        this._value = fn;
    }
    static of (value) {
        return new IO(function () {
            return value
        })
    }
    map (fn) {
        return new IO(compose(fn, this._value));
    }
    // monad新增函数
    join () {
        return this._value();
    }
    // monad新增函数
    flatMap (fn) {
        return this.map(fn).join();
    }
}
// 读取文件
function readFile (filename) {
    return new IO(function () {
        return fs.readFileSync(filename, 'utf-8');
    })
}

// 打印文件中内容
function print (value) {
    return new IO(function () {
        console.log(value);
        return value;
    })
}
const r = readFile('./test.txt') 
            .flatMap(print)
            .join();