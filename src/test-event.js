// 所有能触发事件的对象都是 EventEmitter 类的实例
const EventEmitter = require('events');
class CustomEvent extends EventEmitter {}
const ce = new CustomEvent(); // 实例化一个事件程序

ce.on('error', (err, time) => {
  console.log(err, time);
})
function f1() {
  console.log('11');
}

function f2() {
  console.log('22');
}

ce.on('test', f1);
ce.on('test', f2);
// ce.emit('error', new Error('oops!'), Date.now()); // 触发error，传递2个参数

setInterval(() => {
  ce.emit('test'); // emit用于触发函数，按照监听器注册的顺序，同步地调用每个注册到名为 eventName 的事件的监听器，并传入提供的参数
}, 1000);

setTimeout(() => {
  // ce.removeListener('test', f1); // 移除f1监听事件
  ce.removeAllListeners('test'); // 移除所有监听test的事件
}, 1500)