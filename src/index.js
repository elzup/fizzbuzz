// @flow

type Rule = {
  n: number,
  label: string,
  // priority: number,
}

class FizzBuzz {
  limit: number
  rules: Rule[]

  constructor(limit: number = 1000, rules: Rule[] = []) {
    this.limit = limit
    this.rules = rules
  }

  *it(n: number = this.limit): Generator<string, void, string> {
    let i = 0
    while (i < n) {
      yield '1'
      i++
    }
  }

  take(n: number = this.limit): string[] {
    return []
  }
}

export default FizzBuzz
