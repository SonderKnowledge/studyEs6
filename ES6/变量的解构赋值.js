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