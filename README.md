## express-router-map
转换 express router 的写法

![npm](https://img.shields.io/npm/v/express-router-map.svg)
![npm](https://img.shields.io/npm/dm/express-router-map.svg)
![npm](https://img.shields.io/npm/l/express-router-map.svg)

[![GitHub forks](https://img.shields.io/github/forks/JYFiaueng/express-router-map.svg?style=social&label=Fork)](https://github.com/JYFiaueng/express-router-map/fork)
[![GitHub stars](https://img.shields.io/github/stars/JYFiaueng/express-router-map.svg?style=social&label=Star)](https://github.com/JYFiaueng/express-router-map)

### Installation
```
npm i express-router-map
```

### example：
```
const express = require('express');
const router = express.Router();

// 封装路由的书写方式
// 支持 use/get/post/put/delete
// 写法转变
router.get('/a', () => {});
router.get('/b', () => {});
router.get('/c', () => {});

routerMap.get({
  '/a': () => {},
  '/b': () => {},
  '/c': () => {}
});


// 示例：
// 将 router 传入
const routerMap = new(require('express-router-map'))(router);
routerMap.use({
  '/a': (req, res, next) => {req.testData = testStr; next();}
});
routerMap.get({
  '/a/single': (req, res) => res.send(req.testData),
  '/a/array': [
    (req, res, next) => next(), 
    (req, res) => res.send(req.testData)
  ],
  '/b': (req, res) => res.send(testStr)
});

const app = new express();
app.use(router);
app.listen(3000);

```