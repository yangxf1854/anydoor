// path 模块提供用于处理文件路径和目录路径的实用工具
const { 
  resolve, 
  join, 
  basename, 
  dirname, 
  extname, 
  parse, 
  format 
} = require('path');
console.log(join('/user', '../local', 'bin/')); // 将片段整合
console.log(resolve('./')); // 获取当前路径的绝对路径
const filePath = '/user/local/bin/no.txt';
console.log(basename(filePath)); // 文件名称(带后缀）
console.log(dirname(filePath)); // 所在路径
console.log(extname(filePath)); // 拓展名
const ret = parse(filePath);
console.log(ret);
console.log(format(ret)); // 会从一个对象返回路径字符串，和path.parse()相反。
// __dirname、__filename 总是返回文件的绝对路径
// process.cwd() 总是执行返回node命令所在的文件夹
// (./)  在require方法中总是相对当前文件所在文件，在其他地方和process.cwd()一样，相对node启动文件夹