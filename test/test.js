const assert = require('assert');
const express = require('express');
const router = express.Router();
const http = require('http');
const routerMap = new(require('../index'))(router);

const app = new express();

const testStr = 'test';
const port = 3000;

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
// routerMap.post({
//   '/a/post': (req, res) => res.send(req.testStr)
// });
// routerMap.put({
//   '/b': (req, res) => res.send(testStr)
// });
// routerMap.delete({
//   '/b': (req, res) => res.send(testStr)
// });

app.use(router);
app.listen(port);

const httpGet = (url) => {
  return new Promise((rel, rej) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data+=chunk);
      res.on('end', () => {
        rel(data);
      });
    }).on('error', (e) => {
      rej(e);
    });
  });
};

describe('test express router map', async function () {

  it('test get request one ', async function () {
    let data = await httpGet('http://127.0.0.1:3000/a/single');
    assert(data === testStr);
  });

  it('test get request two ', async function () {
    let data = await httpGet('http://127.0.0.1:3000/a/array');
    assert(data === testStr);
  });

  it('test get request three ', async function () {
    let data = await httpGet('http://127.0.0.1:3000/b');
    assert(data === testStr);
  });

});