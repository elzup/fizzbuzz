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
  rules: RuleComp[],
}

type FizzBuzz = {
  it: (to?: number, from?: number) => Generator<string, void, string>,
  at: (n: number) => string,
  take: (to?: number, from?: number) => string[],
  addRule: (rule: Rule) => FizzBuzz,
  from: (num: number) => FizzBuzz,
  to: (num: number) => FizzBuzz,
  rules: (rules: Rule[]) => FizzBuzz,
}

const defaultArgumants = {
  num: 30,
  from: 1,
  rules: basicRules.map(convertComp),
}

function normalizeParams(arg?: Arguments): Params {
  if (!arg) {
    return defaultArgumants
  } else if (typeof arg === 'number') {
    return { ...defaultArgumants, num: arg }
  }
  const rules = arg.rules ? arg.rules.map(convertComp) : defaultArgumants.rules
  return {
    num: arg.num || defaultArgumants.num,
    from: arg.from || defaultArgumants.from,
    rules,
  }
}

function fizzbuzz(arg?: Arguments): FizzBuzz {
  const params = normalizeParams(arg)
  function calc(n: number): number | string {
    const hitRules = params.rules.filter((r: RuleComp) => r.check(n))
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
    addRule: (rule: Rule) => {
      const rules: Rule[] = [...params.rules, rule]
      return fizzbuzz({ num: params.num, from: params.from, rules })
    },
    take: (num: number = params.num, from: number = params.from) => {
      const itr = genIt(num, from)
      return [...itr]
    },
    from: from => {
      return fizzbuzz({
        num: params.num,
        rules: [...params.rules],
        from,
      })
    },
    to: num => {
      return fizzbuzz({ from: params.from, rules: [...params.rules], num })
    },
    rules: rules => {
      return fizzbuzz({ from: params.from, num: params.num, rules })
    },
  }
}

export { basicRules }
export default fizzbuzz
