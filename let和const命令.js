/**
 * let命令
 * description: let命令用来声明变量用法类似var但是所声明的变量
 * 只在let命令所在的代码块内有效而且不存在变量提升
 */
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined
b // 1

/**
 * for循环计数器
 * console.log: ReferenceError: i is not defined
 */
for (let i = 0; i < 10; i++) {
  //....
}
console.log(i);

// Example
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = () => {
    console.log(i);
  };
}
a[6](); // 10

var b = [];
for (let i = 0; i < 10; i++) {
  b[i] = () => {
    console.log(i);      
  };
}
b[6](); // 6

/**
 * for循环还有一个特别之处是设置循环变量的那部分是一个父作用域而循环体内是一个单独的子作用域
 * console.log: 输出 四次 hello,world!
 */
for (let i = 0; i < 4; i++) {
  let i = 'hello,world!';
  console.log(i);
}

/**
 * 变量提升
 * var的情况: 会发生变量提升脚本运行时变量foo已经存在只是没有值,打印 undefined
 * let的情况: 不会发生变量提升脚本运行时bar是不存在的,打印 ReferenceError
 */
console.log(foo);
var foo = 'hello';

console.log(bar);
let bar = 'hello';

/**
 * 暂时性死区 TDZ
 * 只要块级作用域存在let命令所声明的变量就'绑定'这个区域不受外部影响而且 typeof 不再是一个
 * 百分之百安全的操作。
 * 本质: 只要一进入当前作用域,所要使用的变量就已经存在了但是不可获取只有等声明变量之后才可以
 * 获取和使用该变量。
 */
var tmp = 123;
if (true) {
  // TDZ 开始
  tmp = 'abc'; // ReferenceError
  console.log(tmp); // ReferenceError

  let tmp; // TDZ结束
  console.log(tmp); // undefined

  tmp = 123;
  console.log(tmp); // 123
}

typeof x; // ReferenceError
let x;

/**
 * 隐蔽性死区
 */
function bar(x = y, y = 2) {
  return [x, y];
}
bar(); // 报错 调用bar的时候 x=y 但是y还没有声明属于‘死区’

function bar(x = 2, y = x) {
  return [x, y];
}
bar(); // [2, 2]

var x = x; // 不报错
let x = x; // 报错 ReferenceError: x is not defined

/**
 * 不允许重复声明
 * let不允许在相同作用域内重复声明同一个变量
 */
// 报错
function func() {
  let a = 10;
  var a = 1;
}
// 报错
function func() {
  let a = 10;
  let a = 1;
}
// 报错
function func(arg) {
  let arg;
}
// 不报错
function func(arg) {
  {
    let arg;
  }
}


/**
 * 块级作用域
 * ES5只有全局作用域和函数作用域没有块级作用域,所以带来很大不合理场景。
 */
// 举例一: 变量提升 代码本意是 打印的是外部tmp 如果为false使用内部的tmp结果变量提升覆盖了外层的tmp
var tmp = new Date();
function f() {
  console.log(tmp);
  if(false) {
    var tmp = 'hello,world!';
  }
}
f(); // undefined

// 举例二: 用来计数的循环变量泄露为全局变量
var s = 'helloWorld';
for (var i = 0; i < s.length; i++) {
  console.log(s[i]);
}
console.log(i); // 5

/**
 * ES6的块级作用域
 */
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
f1();

/**
 * 块级作用域与函数声明
 * 函数可以在块级作用域中声明函数,ES6规定块级作用域中函数声明语句的行为类似于let在块级作用域
 * 之外不可引用
 */
// 会报错
function f() {
  console.log('I am outside!');
}
(function () {
  if (false) {
    // 重复声明一次函数
    function f() {
      console.log('I am inside!');
    }
  }
  f();  
}());

// 正确方式
function f() {
  console.log('I am outside!');
}
(function () {
  if (false) {
    // 重复声明一次函数
    let f = function () {
      console.log('I am inside!');
    }
  }
  f(); // I am outside!
}());

/**
 * ES6的块级作用域允许声明函数的规则但是只有再使用大括号的情况下成立如果没有括号则会报错
 */
// 不报错
'use strict';
if (true) {
  function f() {}
}
// 报错
'use strict';
if (true)
  function f() {}

/**
 * do表达式 
 * 本质上块级作用域是一个语句将多个操作封装在一起没有返回值
 */
// 在块级作用域之外没有办法得到t的值因为块级作用域不返回值
{
  let t = f();
  t = t * t + 1;
}

// do使块级作用域变为表达式就可以返回内部最后执行的表达式的值
// 好像还不能用
// let x = do {
//   let t = f();
//   t = t * t + 1;
// }

/**
 * const命令
 * 基本用法: const声明一个只读的常量，一旦声明常量的值不能改变。并且声明的时候必须立即初始化
 * 本质: const实际上保证的不是变量的值不得改动而是变量指向的那个内存地址不得改动。
 */
const PI = 3.1415;
PI // 3.1415
PI = 3; // TypeError: Assignment to constant variable

// 下面的代码常量foo存储的是一个地址指向一个对象不可变的是这个地址对象是可变的
const foo = {};
// 为foo添加一个属性可以成功
foo.prop = 123;
foo.prop // 123
// 将foo指向另一个对象就会报错
foo = {}; // TypeError: "foo" is read-only

// 要想将对象冻结应该使用 Obejct.freeze方法
const foo = Object.freeze({});
// 常规模式下,下面一行代码不会起作用 严格模式下回报错
foo.prop = 123;

// 除了将对象本身冻结对象的属性也应该冻结，以下是彻底冻结的函数
var constantize = (obj) => {
  Object.freeze(obj);
  Object.keys(obj).forEach((key, i) => {
    if (typeof obj[key] === 'object') {
      constantize(obj[key]);
    }
  });
};

/**
 * ES6声明变量的六种方法
 */
// ES5 var function
// ES6 var function let const import class

/**
 * 顶层对象的属性
 * 顶层对象在浏览器环境是window对象在Node指的是global对象
 * 在ES5中顶层对象的属性与全局变量是等价的
 */
window.a = 1;
a // 1

a = 2;
window.a // 2

// ES6规定 var命令和function命令声明的全局变量依旧是顶层对象的属性
// 另一方面let和const、class命令声明的全局变量不属于顶层对象的属性
var a = 1;
// 如果在node的REPL环境可以写成global.a 或者写成 this.a
window.a // 1
let b = 1;
window.b // undefined

/**
 * global对象
 * ES5顶层对象
 * 浏览器里面，顶层对象是window，但 Node 和 Web Worker 没有window。
 * 浏览器和 Web Worker 里面，self也指向顶层对象，但是 Node 没有self。
 * Node 里面，顶层对象是global，但其他环境都不支持。
 */