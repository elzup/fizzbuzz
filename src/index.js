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

type OptionArguments = {|
  num?: number,
  from?: number,
  rules?: Rule[],
|}

type Arguments = number | OptionArguments

type Params = {
  num: number,
  from: number,
  rules: Rule[],
}

type FizzBuzz = {
  it: (to?: number, from?: number) => Generator<string, void, string>,
  at: (n: number) => string,
  take: (to?: number, from?: number) => string[],
}

const defaultArgumants: Params = {
  num: 30,
  from: 1,
  rules: basicRules,
}

function normalizeParams(arg?: Arguments): Params {
  if (!arg) {
    return defaultArgumants
  } else if (typeof arg === 'number') {
    return { ...defaultArgumants, num: arg }
  }
  return { ...defaultArgumants, ...arg }
}

function fizzbuzz(arg?: Arguments): FizzBuzz {
  const params = normalizeParams(arg)
  const rules = params.rules.map(convertComp)
  function calc(n: number): number | string {
    const hitRules = rules.filter((r: RuleComp) => r.check(n))
    if (hitRules.length === 0) {
      return n
    }
    return hitRules.map(v => v.name).join('')
  }

  function genIt(
    num: number = params.num,
    from: number = params.from
  ): Generator<string, void, string> {
    return (function*() {
      let i = from
      while (i <= num) {
        yield `${calc(i)}`
        i++
      }
    })()
  }

  return {
    it: genIt,
    at: (n: number) => {
      return `${calc(n)}`
    },
    take: (num: number = params.num, from: number = params.from) => {
      const itr = genIt(num, from)
      return [...itr]
    },
  }
}

export { basicRules }
export default fizzbuzz
