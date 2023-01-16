//类
class Lady {
    protected name = "";
    public content = "Hello World";
    constructor(name:string){
        this.name = name;
    }
    say(){
        return this.content;
    }
}

const la = new Lady('lucy');
console.log(la.content);
console.log(la.say());

//类继承
class Girl extends Lady{
    private _age = 0;
    constructor(name:string,age:number=0){
        super(name);
        this._age = age;
    }

    get age(){
        return this._age;
    }
    set age(age:number){
        this._age = age
    }
    say2(){
        return super.say() + this.name;
    }
    static run(){
        console.log('running...');
        
    }
}
Girl.run();
const xiaohong = new Girl('xiaohong',18);
xiaohong.age = 20;
console.log(xiaohong.say2());
console.log('my age is ' + xiaohong.age);



