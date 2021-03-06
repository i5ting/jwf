var fs = require('fs')
var path = require('path')
var debug = require('debug')('jwf')

module.exports = function (file) {
  // ~/index.js
  // index.js
  // ./index.js
  var _path = file.indexOf('/') === -1 ? path.join(__dirname, file) : file
  var obj = require(_path)
  return parse(obj)
}

function parse (obj) {
  var result = {}
  for (var i in obj) {
    debug('result[i] ' + i + ' - ' + obj[i])
    if (typeof obj[i] === 'object') {
      debug(obj[i])
      debug(parse(obj[i]))
      result[i] = parse(obj[i])
      debug(result)
      // break
    } else if (fs.existsSync(obj[i]) === true) {
      debug('existsSync ' + i + ' - ' + obj[i])
      result[i] = require(path.join(__dirname, obj[i]))
      debug(result[i])
    } else {
      result[i] = obj[i]
    }
  }

  return result
}
