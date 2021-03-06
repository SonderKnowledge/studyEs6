/**
 * 数组的解构赋值
 * ES6 允许按照一定模式从数组和对象中提取值对变量进行赋值称为解构赋值
 */

// 以前是这样
let a = 1;
let b = 2;
let c = 3;
// ES6允许写成下面这样 从数组中提取值按照对应位置对变量赋值
let [a, b, c] = [1, 2, 3];

// 使用嵌套数组进行解构的例子
let [foo, [[bar], baz]] = [1, [[2], 3]];
foo // 1
bar // 2
baz // 3

let [ , , third] = ['foo', 'bar', 'baz'];
third // 'baz'

let [x, , y] = [1, 2, 3];
x // 1
y // 3

let [head, ...tail] = [1, 2, 3, 4];
head // 1
tail // [2, 3, 4]

let [x, y, ...z] = ['a']
x // 'a'
y // undefined 解构不成功 变量的值就为 undefined
z // []

let [foo] = []; // foo undefined
let [bar, foo] = [1] // foo undefined

// 不完全解构 等号左边的模式只匹配一部分的等号右边的数组
let [x, y] = [1, 2, 3];
x // 1
y // 2

let [a, [b], d] = [1, [2, 3], 4];
a // 1
b // 2
d // 4

// 对于set结构也可以使用数组的解构赋值
let [x, y, z] = new Set(['a', 'b', 'c']);
x // 'a'

// 只要某种数据结构具有Iterator接口都可以采用数组形式的解构赋值
function* fibs() {
  let a = 0;
  let b = 1;
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}
let [first, second, third, fourth, fifth, sixth] = fibs();
sixth // 5

// 默认值 解构赋值允许指定默认值 ES6内部使用严格相等运算符 ===
let [foo = true] = [];
foo // true
let [x, y = 'b'] = ['a']; // x = 'a', y = 'b'
let [x, y = 'b'] = ['a', undefined]; // x = 'a', y = 'b'

// 如果默认值是一个表达式那么这个表达式是惰性求值的只有在用到的时候才会求值
function f() {
  console.log('aaa');
}
let [x = f()] = [1]; // x = 1
// 等价于下面代码
let x;
if ([1][0] === undefined) {
  x = f();
} else {
  x = [1][0];
}

// 默认值可以引用解构赋值的其他变量但该变量必须已经声明
let [x = 1, y = x] = []; // x = 1, y = 1
let [x = 1, y = x] = [2]; // x = 1, y = 2
let [x = 1, y = x] = [1, 2]; // x = 1, y = 2
let [x = y, y = 1] = []; // ReferenceError: y is not defined

/**
 * 对象的解构赋值
 * 解构不仅可以用于数组还可以用于对象
 * 与数组的区别在于数组的元素是按次序排列的而对象是变量必须和属性同名
 */
let { foo, bar } = { foo: 'aaa', bar: 'bbb'};
foo // aaa
bar // bbb 

let { baz } = { foo: 'aaa', bar: 'bbb'};
baz // undefined

// 如果变量名与属性名不一样必须写成下面这样
let { foo: baz } = { foo: 'aaa', bar: 'bbb'};
baz // aaa

let obj = { first: 'hello', last: 'world'};
let { first: f, last: l} = obj;
f // hello
l // world

// 对象解构赋值的内部机制是先找到同名属性然后再赋值给对应的变量真正被赋值是后者而不是前者
let { foo: baz } = { foo: 'aaa', bar: 'bbb'};
baz // aaa
foo // error: foo is not defined

// 解构用于嵌套结构的对象
let obj = {
  p: [
    'hello',
    { y: 'world'}
  ]
};
let { p: [x, { y }] } = obj;
x // hello
y // world

const node = {
  loc: {
    start: {
      line: 1,
      column: 5
    }
  }
};
let { loc, loc: { start }, loc: { start: { line }} } = node;
line // 1
loc // Object { start: Object }
start // Object { line: 1, column: 5 }

// 嵌套赋值的例子
let obj = {};
let arr = [];

({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true});
obj // {prop:123}
arr // [true]

// 对象的解构也可以指定默认值
var { x = 3 } = {};
x // 3

var { x, y = 5 } = { x: 1 };
x // 1
y // 5

var { x: y = 3 } = {};
y // 3

var { x: y = 3 } = { x: 5 };
y // 5

var { message: msg = 'hello, world!' } = {};
meg // hello, world!

// 默认值生效的条件是对象的属性值严格等于 undefined
var { x = 3 } = { x: undefined };
x // 3

var  { x = 3 } = { x: null };
x // null

// 如果将一个已经声明的变量用于解构赋值必须非常小心
// 错误的写法
// let x;
// {x} = { x: 1 }; 报错默认{x}为一个代码块

// 正确的写法
let x;
({x} = {x: 1});

// 解构赋值允许等号左边的模式之中，不放置任何变量名。因此，可以写出非常古怪的赋值表达式。
({} = [true, false]);
({} = 'abc');
({} = []);

// 对象的解构赋值可以很方便的将现有对象的方法赋值到某个变量
let { log, sin, cos } = Math; // log = Math.log 

// 由于数组本质是特殊的对象因此可以对数组进行对象属性的解构
let arr = [1, 2, 3];
let {0: first, [arr.length - 1]: last} = arr;
first // 1
last // 3

/**
 * 字符创的解构赋值
 * 字符串也可以解构赋值是因为字符串被转换成了一个类似数组的对象
 */
const [a, b, c, d, e] = 'hello';
a // h
b // e
c // l
d // l
e // o

// 类似数组的对象都有一个length属性因此还可以对这个属性解构赋值
let {length: len} = 'hello';
len // 5

/**
 * 数值和布尔值的解构赋值
 */
// 解构赋值时如果等号左边是数组和布尔值则会先转为对象
// 解构赋值的规则是 只要等号右边的值不是对象或数组就将其转为对象
// 由于undefined 和 null 无法转为对象所以对它们进行解构赋值都会报错
let {toString: s} = 123;
s === Number.prototype.toString // true

let {toString: s} = true;
s === Boolean.prototype.toString // true

let {prop: x} = undefined; // TpyeEerroe
let {prop: y} = null; // TypeError

/**
 * 函数参数的解构赋值
 * 函数的参数也可以使用解构赋值
 */
// 函数add表面是一个数组但是在传入参数的那一刻就被解构成变量 x 和 y
function add([x, y]) {
  return x + y;
}
add([1, 2]); // 3

[[1, 2], [3, 4]].map(([a, b]) => a + b); // [3, 7]

// 函数参数的解构也可以使用默认值
function move({x = 0, y = 0} = {}) {
  return [x, y];
}
move({x: 3, y: 8}); // [3, 8]
move({x: 3}) // [3, 0]
move({}); // [0, 0]
move(); // [0, 0]

// 下面代码为函数move1的参数指定默认值而不是为变量x和y指定默认值
function move1({x, y} = {x: 0, y: 0}) {
  return [x, y];
}
move1({x: 3, y: 4}); // [3, 4]
move1({x: 3}); // [3, undefined]
move1({}); // [undefined, undefined]
move1();

// undefined会触发函数参数的默认值
[1, undefined, 3].map((x = 'yes') => x); // [1, 'yes', 3]

/**
 * 圆括号问题
 * 解构赋值对于编译器来说判断一个式子是模式还是表达式没有办法从一开始就知道
 * ES6规则是只要有可能导致解构的歧义就不得使用圆括号
 */
// 不能使用圆括号的情况
// 1. 变量声明语句
// let [(a)] = [1];

// let {x: (c)} = {};
// let ({x: c}) = {};
// let {(x: c)} = {};
// let {(x): c} = {};

// let { o: ({ p: p }) } = { o: { p: 2 } };

// 2. 函数参数
// 报错
// function f([(z)]) { return z; }
// 报错
// function f([z,(x)]) { return x; }

// 赋值语句模式
// 全部报错
// ({ p: a }) = { p: 42 };
// ([a]) = [5];
// 报错
// [({ p: a }), { x: c }] = [{}, {}];

/**
 * 变量的解构赋值的用途
 */
// 1. 交换变量的值
let x = 1;
let y = 2;
[x, y] = [y, x];

// 2. 从函数返回多个值
function example() {
  return [1, 2, 3]
}
let [a, b, c] = example();

function example1() {
  return {
    foo: 1,
    bar: 2
  };
}
let { foo, bar } = example1();

// 3. 函数参数的定义
// 参数是一组有次序的值
function f([x, y, x]) {}
f([1, 2, 3]);

// 参数是一组无次序的值
function f1({x, y, z}) {}
f1({ z: 3, y: 2, x: 4});

// 4. 提取JSON数据
let jsonData = {
  id: 42,
  name: 'hhh',
  data: [1, 2]
};
let { id, name, data } = jsonData;

// 5. 函数参数的默认值
data = function(url, {
  async = true,
  global = true
}) {}

// 6. 遍历Map解构
const map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
  console.log(key + 'is' + value);
}

// 只获取键名
for (let [key] of map) {
  console.log(key);
}

// 只获取键值
for (let [,value] of map) {
  console.log(value);
}

/**
 * 输入模块的指定方法
 */
const { SourceMapConsumer, SourceNode } = require("source-map");