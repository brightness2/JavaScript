/**函数泛型 */
//T表示任意类型，调用时指定类型
function join<T>(first:T,second:T){
    return `${first}${second}`;
}

//调用时，指定类型
let a = join<number>(2,2);
console.log(a);//22
let b = join<string>('hello',' world');
console.log(b);//hello world

//可以多个泛型类型
function join2<T,P>(first:T,second:P){
    return `${first}${second}`;
}

let c = join2<string,number>("NO.",1);
console.log(c);//NO.1

//数组
function fun<T>(params:T[]){
    return params;
}
fun<string>(['a','b','c']);

/**类中的泛型 */
class SelectGirl<T> {
    private girls;
    constructor( girls:T[]){
        this.girls = girls;
    }

    getGirl(index:number):T{
        return this.girls[index];
    }
}

const selectGirl = new SelectGirl<string>(['one','two','three']);
console.log(selectGirl.getGirl(1));

//泛型中的继承
interface Girl {
    name:string;
}
//意思是我不知道我以后要用什么类型，但是我有一个约束条件，这个类型，必须要有一个name属性
class SelectGirl2<T extends Girl>{
    private girls;
    constructor( girls:T[]){
        this.girls = girls;
    }

    getGirl(index:number):T{
        return this.girls[index];
    }
}

const selectGirl2 = new SelectGirl2([{name:'one'},{name:'two'},{name:'three'}]);

console.log(selectGirl2.getGirl(0));
