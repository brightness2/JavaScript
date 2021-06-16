/*
 * @Author: Brightness
 * @Date: 2021-06-15 14:15:58
 * @LastEditors: Brightness
 * @LastEditTime: 2021-06-15 15:09:53
 * @Description:
 */
/************* ES5 ************************ */
//父类
function Parent(name = "parent") {
  this.name = name;
}

Parent.prototype.say = function () {
  console.log(this.name);
};

//子类
function Child(name = "child", like = "like") {
  Parent.call(this, name); //核心
  this.like = like;
}

//核心，通过创建中间对象，子类原型和父类原型，就会隔离开
Child.prototype = Object.create(Parent.prototype);
//修复构造函数指向，必须
Child.prototype.constructor = Child;
Child.prototype.say = function () {
  console.log("name:" + this.name);
};

let boy1 = new Child("小红", "apple");
let p1 = new Parent("小爸爸");
console.log(boy1.constructor); //Child
console.log(p1.constructor); //Parent
p1.say(); //小爸爸
boy1.say(); //name:小红

/***************** ES6 ****************************** */
/*
1、class 可以理解为function,由于class本质还是一个function,因此它也会拥有一个的prototype属性，
当new一个class时，会把class的porototype属性赋值给这个新对象的 __proto属性。

2、constructor 方法是默认添加的方法，在new一个对象时，自动调用该方法，constructor里面定义自己的属性。

3、继承extends和super，class 子类名 extends 父类名实现继承，当然还得在constructor里面写上super(父类的参数)，
意思就是在子类中获得父类的this指针，相当于Animal.call(this)，参考https://www.jianshu.com/p/030b3d890850
*/

class Animal {
  //构造函数，里面写上对象的属性
  constructor(props) {
    this.name = props.name || "Unknown";
  }

  //方法写在后面
  eat() {
    //父类共有的方法
    console.log(this.name + "will eat pests.");
  }
}

//class 继承
class Bird extends Animal {
  //构造函数
  constructor(props, myAttribute) {
    //props是继承过来的属性，myAttribute是自己的属性
    //调用实现父类的构造函数
    super(props); //相当于获得父类的this指向
    this.type = props.type || "Unknown"; //父类的属性，也写在父类中
    this.attr = myAttribute; //自己的私有属性
  }

  fly() {
    //自己私有的方法
    console.log(this.name + "are friendly to people");
  }
  myattr() {
    //自己私有方法
    console.log(this.type + "---" + this.attr);
  }
}

//通过new实例化
let myBird = new Bird(
  {
    name: "小燕子",
    type: "Egg animal", //卵生动物
  },
  "Brid class"
);
myBird.eat();
myBird.fly();
myBird.myattr();
//小燕子will eat pests.
//小燕子are friendly to people
//Egg animal---Brid class
