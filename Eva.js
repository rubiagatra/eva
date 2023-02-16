const assert = require('assert')
const Environment = require('./Environment')

class Eva {
  constructor (global = new Environment()) {
    this.global = global
  }

  eval (exp, env = this.global) {
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

    if (exp[0] === 'var') {
      const [_, name, value] = exp
      return env.define(name, this.eval(value))
    }

    if (isVariableName(exp)) {
      return env.lookup(exp)
    }

    throw new Error(exp)
  }
}

function isNumber (exp) {
  return typeof exp === 'number'
}

function isString (exp) {
  const result = typeof exp === 'string' && exp[0] === '"' && exp.slice(-1) === '"'
  return result
}

function isVariableName (exp) {
  return typeof exp === 'string' && /^[a-zA-Z][a-zA-Z0-9_]*$/.test(exp)
}

const eva = new Eva(new Environment({
  null: null,
  true: true,
  false: false,
  VERSION: '0.1'
}))

assert.strictEqual(eva.eval(1), 1)
assert.strictEqual(eva.eval('"Hello"'), 'Hello')
assert.strictEqual(eva.eval(['+', 2, 3]), 5)
assert.strictEqual(eva.eval(['+', 2, ['+', 3, 2]]), 7)
assert.strictEqual(eva.eval(['+', 2, ['*', 3, 2]]), 8)
assert.strictEqual(eva.eval(['var', 'x', 10]), 10)
assert.strictEqual(eva.eval('x'), 10)
assert.strictEqual(eva.eval('VERSION'), '0.1')
assert.strictEqual(eva.eval(['var', 'isUser', 'true']), true)

console.log('All Test Passed')
