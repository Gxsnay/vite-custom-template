const fs = require('fs');
const path = require('path');
const express = require('express');
const chalk = require('chalk');
const cuApp = express();
cuApp.use(express.static(path.resolve(__dirname, './dist')))

cuApp.get('*', function(req, res) {
  const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
  res.send(html)
})
cuApp.listen(3331, res => {
  console.log(chalk.yellow('Start Service On 3331'));
});