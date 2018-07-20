// @flow

type RuleDiv = {|
  n: number,
  label: string,
|}

type RuleComp = {|
  check: (v: number) => boolean,
  label: string,
|}

type Rule = RuleDiv | RuleComp

function convertComp(rule: Rule): RuleComp {
  if (rule.check) {
    return rule
  }
  const { n } = rule // @HACKME
  return {
    label: rule.label,
    check: v => v % n === 0,
  }
}

const basicRules: Rule[] = [{ n: 3, label: 'Fizz' }, { n: 5, label: 'Buzz' }]

class FizzBuzz {
  limit: number
  rules: RuleComp[]

  constructor(limit: number = 1000, rules: Rule[] = basicRules) {
    this.limit = limit
    this.rules = rules.map(convertComp)
  }

  *it(
    to: number = this.limit,
    from: number = 1
  ): Generator<string, void, string> {
    let i = from
    const hit = (r: RuleComp) => r.check(i)
    while (i <= to) {
      const hitRules = this.rules.filter(hit)
      if (hitRules.length === 0) {
        yield `${i}`
      } else {
        yield hitRules.map(v => v.label).join('')
      }
      i++
    }
  }

  take(to: number = this.limit, from: number = 1): string[] {
    const it = this.it(to, from)
    return [...it]
  }
}

export { basicRules }
export default FizzBuzz
