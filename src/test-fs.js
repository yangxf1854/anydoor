// fs 模块提供了一个 API，用于以模仿标准 POSIX 函数的方式与文件系统进行交互。
// 所有文件系统操作都具有同步和异步的形式。
//异步的形式总是将完成回调作为其最后一个参数。 传给完成回调的参数取决于具体方法，但=====(第一个参数始终预留用于异常)======
// -------读取文件------------
const fs = require('fs');

// 异步读取文件的全部内容
fs.readFile('./test.js', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});

// 同步读取文件的内容
const data = fs.readFileSync('./test.js', 'utf8');
console.log(data);

// ----------写文件writeFile-------
// const newdata = new Uint8Array(Buffer.from('Node.js中文网'));
fs.writeFile('./test.js', 'this is test', { encoding: 'utf8'}, (err) => {
  if (err) throw err;
  console.log('文件已经保存成功');
})
const rs = fs.createReadStream('./test.js');
console.log(rs.pipe(process.stdout));

// -----流的形式写文件createWriteStream-----
const ws = fs.createWriteStream('./test.txt'); // 新建一个流文件
const tid = setInterval(() => {
  const num = parseInt(Math.random() * 10);
  if (num < 8) {
    console.log(num);
    ws.write(`${num}`); // 在这个文件中写入内容
  } else {
    clearInterval(tid);
    ws.end(); // 结束
  }
}, 1000);
ws.on('finish', () => {
  console.log('done');
});


// 解决回调地狱问题(util.promisify)
// 让一个遵循异常优先的回调风格的函数，即 (err, value) => ... 回调函数是最后一个参数，返回一个返回值是一个 promise 版本的函数。
const promisify = require('util').promisify;
const read = promisify(fs.readFile);
read('./test.js').then(data => {
  console.log(data.toString());
}).catch(err => {
  console.log(err);
})

// 用async--await的方式解决回调地狱问题,在async函数里面捕获错误用try {} catch(err) {}
async function test () {
  try {
    const content = await read('./test.js');
    console.log(content.toString());
  } catch (err) {
    console.log(err);
  }
}
test();
