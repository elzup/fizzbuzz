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

type FizzBuzz = {
  max: number,
  rules: RuleComp[],
  it: (to?: number, from?: number) => Generator<string, void, string>,
  at: (n: number) => string,
  take: (to?: number, from?: number) => string[],
}

function fizzbuzz(max: number = 1000, rulesRaw: Rule[] = basicRules): FizzBuzz {
  const rules = rulesRaw.map(convertComp)
  function calc(n: number): number | string {
    const hitRules = rules.filter((r: RuleComp) => r.check(n))
    if (hitRules.length === 0) {
      return n
    }
    return hitRules.map(v => v.name).join('')
  }

  function genIt(
    to: number = max,
    from: number = 1
  ): Generator<string, void, string> {
    return (function*() {
      let i = from
      while (i <= to) {
        yield `${calc(i)}`
        i++
      }
    })()
  }

  return {
    max,
    rules,
    it: genIt,
    at: (n: number) => {
      return `${calc(n)}`
    },
    take: (to: number = max, from: number = 1) => {
      const itr = genIt(to, from)
      return [...itr]
    },
  }
}

export { basicRules }
export default fizzbuzz
