/**
 * 字符的unicode表示法
 */

// js允许采用\uxxxx形式表示一个字符，其中xxxx表示字符的Unicode码点
// 但是只限于码点在\u0000~\uFFFF之间的字符超出这个字符必须双字节形式表示
"\u0061" // "a"
"\uD842\uDF87" // "吉"

// ES6改进了方法只要将码点放入到大括号就能正确解读改字符
"\u{20BB7}" // "吉"
"\u{41}\u{42}\u{42}" // "ABC"
let hello = 123;
// hell\u{6F} 123

// 综上所以js共有6种方法表示一个字符
'\z' === 'z';
'\172' === 'z';
'\x7A' === 'z';
'\u007A' === 'z';
'\u{7A}' === 'z';

/**
 * codePointAt
 */