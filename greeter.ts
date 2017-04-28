//布尔值
let isDone : boolean = false;

//数字
let hexLiteral : number = 0x01;//16进制
let decLiteral : number = 6.0;

//字符串
let aname : string = 'june'
let abc :string = '${abc}'

//数组 ：相同类型元素的数组。
let list : number[] = [1,2,3];
let list2 : Array<number>=[4,5,6]; //使用数组泛型,Array<元素类型>

//元组 Tuple : 其实就是不同类型元素的数组，JS本身就支持。
let x : [string,number];//定义元组类型，注意类型顺序。
x=['hello',10];//OK
console.log(x[0]);
console.log(x[1]);
console.log(x[2]);//undefined 索引越界。

//枚举 : 默认从0开始为元素编号，可以手动指定数值
enum Color {Red,Green,Blue,Black=100};
let c:Color = Color.Blue; //获取枚举值
console.log(c); //结果是2
let colorName : string = Color[2];//获取枚举名
console.log(colorName);

//任意值 ： any类型允许你在编译时可选择地包含或移除类型检查。
let notSure : any = 4;
notSure = "maybe a string instead";
notSure = false;

let list3 :any[]=[1,true,'free'];
list3[1]=100;

//空值 ：void(表示没有任何类型)
function warnUser():void{
    console.log("this is my warning message");
}
warnUser();

let unusable : void = undefined;//void类型变量没什么用。

//null 和 undefined。和void类似，本身类型用处不大。
//默认情况下null和undefined是所有类型的子类型。
let num : number = null;

//类型断言 : 它没有运行时的影响，只在编译阶段起作用。
//形式1：
let someValue : any = "this is a string";
let strLength:number = (<string>someValue).length;
//形式2 (更通用)：
let strLength2:number = (someValue as string).length;
console.log(strLength);
console.log(strLength2);

//let : let关键字是JS的一个新概念，TypeScript实现了它，
//很多常见的问题都可以通过使用let解决，所以，尽可能使用let代替 var.

//变量声明
//let 和 const是JS里较新的变量声明方式。
//const是对let的增强，它能阻止对一个变量再次赋值。


//当用let声明变量，它使用的是词法作用域或块作用域。不同于使用var声明的变量那样
//可以在包含它们的函数外访问，块作用域变量在包含它们的块或for循环之外是不能访问的。

//注意下面两循环输出的结果，原因参见P131
for(var i=0;i<10;i++){
    setTimeout(function(){console.log(i);},100*i);
}

for(let i=0;i<10;i++){
    setTimeout(function(){console.log(i);},100*i);
}

//const 声明
const numLivesForCat = 9;


//解构数组
let input = [1,2];
let [first,second] = input;
console.log(first);
console.log(second);

[first,second]=[second,first];
console.log(first);
console.log(second);

//剩余变量列表： ...name
let[a,...others]=['a','b','c','d'];
console.log(a);
console.log(others);

let[,,third,fourth]=[1,2,3,4];



//对象解构
let o ={
    a0:"foo",
    b:12,
    c:"bar"
}
let{a0,b} = o;


//默认值:当属性为undefined时，使用的缺省值
function keepWholeObject(wholeObj:{a:string,b?:number}){
    let {a,b=1001} = wholeObj;
}


//函数声明解构(小心使用)
function f({a,b=0} = {a:""}):void{
    console.log(a);
}
f({a:"yes"});



//接口 ： 为类型命名和为你的代码定义契约。
//要求参数lblObj有一个名为label，类型为string的属性。
function printLabel(lblObj:{label:string}){
    console.log(lblObj.label);
}
let myObj = {size:10,label:"size 10 object"};
printLabel(myObj);

//使用接口来描述上面的代码
//这里的接口只会关注值的外形。只要传入的对象满足必要条件，那么它就是被允许的。
//还有，类型检查器不会检查属性的顺序，只要属性存在并且类型也对就可以了。
interface lblValue{
    label:string;
}

function printLabel2(lblObj:lblValue){
    console.log(lblObj.label);
}

printLabel2(myObj);


//可选属性 : 接口里的属性不全是必须的。
interface SquareConfig{
    color?:string;
    width?:number;
}

function createSquare(config:SquareConfig):{color:string;area:number}{
    let newSquare = {color:'white',area:100};
    if(config.color){
        newSquare.color=config.color;
    }
    if(config.width){
        newSquare.area=config.width*config.width;
    }
    return newSquare;
}

let mySquare=createSquare({color:"black"});
console.log("color:%s,area:%d",mySquare.color,mySquare.area);


//只读属性 ： 只能在对象刚刚创建时修改其值。
interface Point{
    readonly x:number;
    readonly y:number;
}

let p1:Point ={x:10,y:20};
//p1.x=5;//error!


//readonly VS const
//作为变量使用的话用const,作为属性使用readonly.


//函数类型
//接口能够描述JS中对象拥有的各种各样的外形。除了描述带属性的普通对象外，接口也可以描述函数类型。
interface SearchFunc{
    (source:string,subString:string):boolean;
}

let mySearch:SearchFunc;
mySearch = function(source:string,subString:string){
    let result = source.search(subString);
    if(result==-1){
        return false;
    }else{
        return true;
    }
}

if(mySearch("abcd","bc")){
    console.log("containt!");
}
//注：参数类型不需要声明，参数名不需要与接口一致。
mySearch = function(src,sub){
    let result = src.search(sub);
    if(result==-1){
        return false;
    }else{
        return true;
    }
}
if(mySearch("abcd","bc")){
    console.log("containt!!");
}



//可索引的类型
interface StringArray{
    [index:number]:string;
}

let myArray:StringArray;
myArray=["Bob","Fred"];
let mystr:string = myArray[0];
console.log(mystr);



//类类型
interface ClockInterface{
    tick();
}

//类实现接口
class DigitalClock implements ClockInterface{
    constructor(h:number,m:number){}

    tick(){
        console.log("beep beep");
    }
}

let digital = new DigitalClock(12,17);
digital.tick();

//接口扩展
interface Shape{
    color:string;
}

interface Square extends Shape{
    sideLength:number;
}

let square = <Square>{};
square.color="blue";
square.sideLength=10;
console.log(square);


//继承与private修饰符
class Animal{
    private name:string;//私有
    //protected x:string;//在派生类中可以访问
    constructor(theName:string){
        this.name=theName;
    }

    hello(){
        console.log("hello %s",this.name);
    }
}

class Rhino extends Animal{
    constructor(){
        super("Rhino");
    }
}

let rhino = new Rhino();
rhino.hello();

//静态属性
P169

