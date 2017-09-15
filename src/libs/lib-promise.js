
window.Promise = require('es6-promise').Promise;
require('es6-promise').polyfill();

window.Promise.prototype.finally = function (callback) {
  let promise = this;
  let constructor = promise.constructor;

  return promise.then(value => constructor.resolve(callback()).then(() => value),
    reason => constructor.resolve(callback()).then(() => { throw reason; }));
}