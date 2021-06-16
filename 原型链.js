/*
 * @Author: Brightness
 * @Date: 2021-06-15 11:44:54
 * @LastEditors: Brightness
 * @LastEditTime: 2021-06-15 14:12:12
 * @Description:
 */
/****** 构造函数创建对象 ****** */
function Person() {}
let person = new Person();
person.name = "Brightness";
console.log(person.name); //Brightness

//每一个JavaScript对象(null除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

function Car() {}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Car.prototype.name = "五菱";
let car1 = new Car();
let car2 = new Car();
console.log(car1.name); //五菱
console.log(car2.name); //五菱

//每一个JavaScript对象(除了 null )都具有的一个属性，叫proto，这个属性会指向该对象的原型
console.log(car1.__proto__ === Car.prototype); //true

//每个原型都有一个 constructor 属性指向关联的构造函数 实例原型指向构造函数
console.log(Car === Car.prototype.constructor); //true
