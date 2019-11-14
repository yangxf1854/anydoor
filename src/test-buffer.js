// buffer用于处理二进制数据流
// buffer 类的实例类似于整数数组，buffer的大小在创建的时候确定，且无法调整
//Buffer 类在nodejs中是一个全局变量
console.log(Buffer.alloc(10));
console.log(Buffer.byteLength('test')); // byteLength
console.log(Buffer.byteLength('测试'));
console.log(Buffer.isBuffer({})); // 判断一个对象是不是buffer对象
console.log(Buffer.isBuffer(Buffer.from([1, 2, 3])));

const buf1 = Buffer.from('this');
const buf2 = Buffer.from('is');
const buf3 = Buffer.from('a');
const buf4 = Buffer.from('test');
const buf5 = Buffer.from('!');

const bufArray = Buffer.concat([buf1, buf2, buf3, buf4, buf5]); // 返回一个合并了 list 中所有 Buffer 实例的新 Buffer
console.log(bufArray.toString());
const buf6 = Buffer.allocUnsafe(10);
console.log(buf6.fill(10, 3, 7)); // 填充

const buf7 = Buffer.from('test');
const buf8 = Buffer.from('test');
console.log(buf7.equals(buf8)); // 比较两个buf的内容是否相同

console.log(buf7.indexOf('es11')); // 查找元素匹配的位置


// 解决中文乱码问题、
const { StringDecoder } = require('string_decoder'); // 字符串解码器
const decoder = new StringDecoder('utf8');
const buf = Buffer.from('中文字符串');

for ( let i = 0; i < buf.length; i += 5 ) {
  const b = Buffer.allocUnsafe(5);
  buf.copy(b, 0, i);
  console.log(decoder.write(b)); // 返回一个已解码的字符串
}
