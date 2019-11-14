
const fs = require('fs');
const path = require('path');
const Handlebar = require('handlebars');
const promisify = require('util').promisify;
const stat = promisify(fs.stat); // fs.stat
const readdir = promisify(fs.readdir);
const config = require('../config//defaultConfig');

const tplPath = path.join(__dirname, '../template/dir.tpl');
// 这边用同步是因为去读取template只会读取一遍，后面都是会缓存的，不会每次都会执行一遍
const source = fs.readFileSync(tplPath);
const template = Handlebar.compile(source.toString());

module.exports = async function(req, res, filePath) {
  console.log(filePath, '4567890');
  
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) { // 对象描述常规文件
      console.log('1111');
      
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      // fs.createReadStream(),将会返回一个新的 fs.ReadStream 对象
      fs.createReadStream(filePath).pipe(res); // 通过流的形式将读的文件一点点给客户端
    } else if (stats.isDirectory()) { // 对象描述文件系统目录
      console.log('2222');
      
      const files = await readdir(filePath); // 读取目录的内容
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      // 文件列表
      const data = {
        title: path.basename(filePath), // 文件名称(带后缀）
        dir: path.relative(config.root, filePath), // 方法根据当前工作目录返回 from 到 to 的相对路径
        files,
      }
      res.end(template(data));
    }
  } catch (ex)  {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end(`${filePath} is not a directory or  file`);
      return;
  }
}