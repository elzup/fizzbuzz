// @flow

type RuleDiv = {|
  n: number,
  name: string,
|}

type RuleComp = {|
  check: (v: number) => boolean,
  name: string,
|}

type Rule = RuleDiv | RuleComp

function convertComp(rule: Rule): RuleComp {
  if (rule.check) {
    return rule
  }
  const { n } = rule // @HACKME
  return {
    name: rule.name,
    check: v => v % n === 0,
  }
}

const basicRules: Rule[] = [{ n: 3, name: 'Fizz' }, { n: 5, name: 'Buzz' }]

class FizzBuzz {
  defaultMax: number
  rules: RuleComp[]

  constructor(defaultMax: number = 1000, rules: Rule[] = basicRules) {
    this.defaultMax = defaultMax
    this.rules = rules.map(convertComp)
  }

  addRule(rule: Rule) {
    this.rules.push(convertComp(rule))
  }

  *it(
    to: number = this.defaultMax,
    from: number = 1
  ): Generator<string, void, string> {
    let i = from
    while (i <= to) {
      yield `${this.calc(i)}`
      i++
    }
  }

  calc(n: number): number | string {
    const hitRules = this.rules.filter((r: RuleComp) => r.check(n))
    if (hitRules.length === 0) {
      return n
    }
    return hitRules.map(v => v.name).join('')
  }

  at(n: number): string {
    return `${this.calc(n)}`
  }

  take(to: number = this.defaultMax, from: number = 1): string[] {
    const it = this.it(to, from)
    return [...it]
  }
}

export { basicRules }
export default FizzBuzz
