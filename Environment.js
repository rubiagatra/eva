class Environment {
  constructor (record = {}) {
    this.record = record
  }

  define (name, value) {
    console.log(name, value)
    this.record[name] = value
    return value
  }

  lookup (name) {
    if (!Object.prototype.hasOwnProperty.call(this.record, name)) {
      throw new ReferenceError(`Variable "${name}" is not defined. `)
    }
    return this.record[name]
  }
}

module.exports = Environment
