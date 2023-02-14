const assert = require('assert')

class Eva {
  eval (exp) {
    if (isNumber(exp)) {
      return exp
    }
    if (isString(exp)) {
      return exp.slice(1, -1)
    }

    if (exp[0] === '+') {
      return this.eval(exp[1]) + this.eval(exp[2])
    }

    if (exp[0] === '*') {
      return this.eval(exp[1]) * this.eval(exp[2])
    }

    throw new Error(exp)
  }
}

function isNumber (exp) {
  return typeof exp === 'number'
}

function isString (exp) {
  return typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"'
}

const eva = new Eva()

assert.strictEqual(eva.eval(1), 1)
assert.strictEqual(eva.eval('"Hello"'), 'Hello')
assert.strictEqual(eva.eval(['+', 2, 3]), 5)
assert.strictEqual(eva.eval(['+', 2, ['+', 3, 2]]), 7)
assert.strictEqual(eva.eval(['+', 2, ['*', 3, 2]]), 8)
assert.strictEqual(eva.eval(['var', 'x', 10]), 10)
console.log('All Test Passed')
