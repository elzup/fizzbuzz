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

class FizzBuzz {
  limit: number
  rules: RuleComp[]

  constructor(limit: number = 1000, rules: Rule[] = []) {
    this.limit = limit
    this.rules = rules.map(convertComp)
  }

  *it(n: number = this.limit): Generator<string, void, string> {
    let i = 1
    const hit = (r: RuleComp) => r.check(i)
    while (i <= n) {
      const hitRules = this.rules.filter(hit)
      if (hitRules.length === 0) {
        yield `${i}`
      } else {
        yield hitRules.map(v => v.label).join('')
      }
      i++
    }
  }

  take(n: number = this.limit): string[] {
    const it = this.it(n)
    return [...it]
  }
}

export default FizzBuzz
