function hello(){
    let str:string = "Hello Brightness";
    console.log(str);
    
}

hello();

/**静态类型*/
//number/string/boolean/null/undefined/symbol/object
let num:number = 12;
let str:string = "string";
let bool:boolean = false;
//数组类型
let list:string[] = ["a","b"];//方式一
let list2:Array<number> = [0,1,2,3];//方式二
//联合类型
let str2:string|number = 12;
let list3:Array<number|string> = ["a",1,2,"c"];
//类型别名
type CustomArray = Array<number|boolean>;
let list4:CustomArray = [1,false];
// 函数类型
function add(num1:number,num2:number): number  {
    return num1 + num2;
}

const add2 = (num1:number,num2:number):number=>{
    return num1 + num2;
}

type CustomFunc = (num1:number,num2:number)=>number;
const add3:CustomFunc = (num1,num2)=>{
    return num1 + num2;
}
//函数参数为对象(解构)时
function add6({one,two}:{one:number,two:number}):number{
    return one + two;
}


//void 表示没有返回值
const add4 = ():void => {}

//可选参数  ? 表示该参数或者变量可传可不传  注意：可选参数只能出现在参数列表的最后， 即必须参数必须在可选参数之前
const add5 = (start?:number,end?:number):void=>{}

//对象类型 
//方式一：可读性低，不推荐
let person:{
    name:string;
    sayHello:Function;
    run(start:number):string;
} = {
    name:"Brightness",
    sayHello(){},
    run(start){
        return "running..." + start;
    }
}
//方式二:使用类型别名,推荐
type PersonObj = {
    name:string;
    run(start:number):string;
    age?:number;
};

let person2:PersonObj = {
    name:"Brightness",
    run(start){
        return "running..." + start;
    }
}

/**接口 interface*/
interface IPeople {
    name:string;
    age:number;
    sayHello():void;
}

let p: IPeople = {
    name:"Brightness",
    age:20,
    sayHello(){},
}
/*
接口和自定义类型的区别

相同点：都可以给对象指定类型

不同点： 接口只能为对象指定类型， 类型别名可以为任意类型指定别名

    推荐用 type 来定义
*/
//接口继承
interface Point2D {
    x:number;
    y:number;
}

interface Point3D extends Point2D{
    z:number;
}

let po:Point3D = {
    x:10,
    y:11,
    z:12,
}

/**元组 */
//元组是另一种类型的数组，它确切知道包含多少个元素，以及特定索引对应的类型
let position:[number,string] = [39.4,"44.1"];

/**字面量类型 */
let s = "Brightness";//变量类型为： string
const s2 = "Brightness";//变量类型为 'Brightness'
/*
解释：s 是一个变量(let)，它的值可以是任意字符串，所以类型为:string

s2 是一个常量(const)，它的值不能变化只能是 'Brightness'，所以，它的类型为:'Brightness'

此时，‘Brightness’就是一个字面量类型，即某个特殊的字符串也可以作为 TS 中的类型

任意的 JS 字面量（对象，数组，数字）都可以作为类型使用

*/
//字面量类型 使用场景和模式
// 使用模式：字面量类型配合联合类型一起使用
// 使用场景：用来表示一组明确的可选值列表
// 比如，在贪吃蛇游戏中，游戏的方向的可选值只能是上、下、左、右中的任意一个
type Direction = 'left'|'right'|'up'|'down';
function changeDirection(direction:Direction){
    console.log(direction);
}
changeDirection('right');//调用函数时，会有类型提示
//    解释：参数 direction 的值只能是 up/down/left/right 中的任意一个
// 优势：相比于 string 类型，使用字面量类型更加精确、严谨

/**枚举 */
enum Direction2{
    Up = 'UP',
    Down = 'DOWN',
    Left = 'LEFT',
    Right = 'RIGHT'
}


