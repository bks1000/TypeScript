var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//布尔值
var isDone = false;
//数字
var hexLiteral = 0x01; //16进制
var decLiteral = 6.0;
//字符串
var aname = 'june';
var abc = '${abc}';
//数组 ：相同类型元素的数组。
var list = [1, 2, 3];
var list2 = [4, 5, 6]; //使用数组泛型,Array<元素类型>
//元组 Tuple : 其实就是不同类型元素的数组，JS本身就支持。
var x; //定义元组类型，注意类型顺序。
x = ['hello', 10]; //OK
console.log(x[0]);
console.log(x[1]);
console.log(x[2]); //undefined 索引越界。
//枚举 : 默认从0开始为元素编号，可以手动指定数值
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
    Color[Color["Black"] = 100] = "Black";
})(Color || (Color = {}));
;
var c = Color.Blue; //获取枚举值
console.log(c); //结果是2
var colorName = Color[2]; //获取枚举名
console.log(colorName);
//任意值 ： any类型允许你在编译时可选择地包含或移除类型检查。
var notSure = 4;
notSure = "maybe a string instead";
notSure = false;
var list3 = [1, true, 'free'];
list3[1] = 100;
//空值 ：void(表示没有任何类型)
function warnUser() {
    console.log("this is my warning message");
}
warnUser();
var unusable = undefined; //void类型变量没什么用。
//null 和 undefined。和void类似，本身类型用处不大。
//默认情况下null和undefined是所有类型的子类型。
var num = null;
//类型断言 : 它没有运行时的影响，只在编译阶段起作用。
//形式1：
var someValue = "this is a string";
var strLength = someValue.length;
//形式2 (更通用)：
var strLength2 = someValue.length;
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
for (var i = 0; i < 10; i++) {
    setTimeout(function () { console.log(i); }, 100 * i);
}
var _loop_1 = function (i_1) {
    setTimeout(function () { console.log(i_1); }, 100 * i_1);
};
for (var i_1 = 0; i_1 < 10; i_1++) {
    _loop_1(i_1);
}
//const 声明
var numLivesForCat = 9;
//解构数组
var input = [1, 2];
var first = input[0], second = input[1];
console.log(first);
console.log(second);
_a = [second, first], first = _a[0], second = _a[1];
console.log(first);
console.log(second);
//剩余变量列表： ...name
var _b = ['a', 'b', 'c', 'd'], a = _b[0], others = _b.slice(1);
console.log(a);
console.log(others);
var _c = [1, 2, 3, 4], third = _c[2], fourth = _c[3];
//对象解构
var o = {
    a0: "foo",
    b: 12,
    c: "bar"
};
var a0 = o.a0, b = o.b;
//默认值:当属性为undefined时，使用的缺省值
function keepWholeObject(wholeObj) {
    var a = wholeObj.a, _a = wholeObj.b, b = _a === void 0 ? 1001 : _a;
}
//函数声明解构(小心使用)
function f(_a) {
    var _b = _a === void 0 ? { a: "" } : _a, a = _b.a, _c = _b.b, b = _c === void 0 ? 0 : _c;
    console.log(a);
}
f({ a: "yes" });
//接口 ： 为类型命名和为你的代码定义契约。
//要求参数lblObj有一个名为label，类型为string的属性。
function printLabel(lblObj) {
    console.log(lblObj.label);
}
var myObj = { size: 10, label: "size 10 object" };
printLabel(myObj);
function printLabel2(lblObj) {
    console.log(lblObj.label);
}
printLabel2(myObj);
function createSquare(config) {
    var newSquare = { color: 'white', area: 100 };
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}
var mySquare = createSquare({ color: "black" });
console.log("color:%s,area:%d", mySquare.color, mySquare.area);
var p1 = { x: 10, y: 20 };
var mySearch;
mySearch = function (source, subString) {
    var result = source.search(subString);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
};
if (mySearch("abcd", "bc")) {
    console.log("containt!");
}
//注：参数类型不需要声明，参数名不需要与接口一致。
mySearch = function (src, sub) {
    var result = src.search(sub);
    if (result == -1) {
        return false;
    }
    else {
        return true;
    }
};
if (mySearch("abcd", "bc")) {
    console.log("containt!!");
}
var myArray;
myArray = ["Bob", "Fred"];
var mystr = myArray[0];
console.log(mystr);
//类实现接口
var DigitalClock = (function () {
    function DigitalClock(h, m) {
    }
    DigitalClock.prototype.tick = function () {
        console.log("beep beep");
    };
    return DigitalClock;
}());
var digital = new DigitalClock(12, 17);
digital.tick();
var square = {};
square.color = "blue";
square.sideLength = 10;
console.log(square);
//继承与private修饰符
var Animal = (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.hello = function () {
        console.log("hello %s %s", this.name, this.x);
    };
    return Animal;
}());
var Rhino = (function (_super) {
    __extends(Rhino, _super);
    function Rhino() {
        return _super.call(this, "Rhino") || this;
    }
    return Rhino;
}(Animal));
var rhino = new Rhino();
rhino.hello();
rhino.x = 'UU';
rhino.hello();
var _a;
