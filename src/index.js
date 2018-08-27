// @flow

type RuleDiv = {|
  +n: number,
  +name: string,
|}

type CheckFunc = (v: number) => boolean

type RuleComp = {|
  +check: CheckFunc,
  +name: string,
|}

type Rule = RuleDiv | RuleComp

type OptionArguments = {|
  to?: number,
  from?: number,
  rules?: Rule[],
|}

type Params = {|
  +to: number,
  +from: number,
  +rules: Rule[],
|}

type Arguments = number | OptionArguments

type FizzBuzz = {|
  from: (to: number) => FizzBuzz,
  to: (to: number) => FizzBuzz,
  rules: (rules: Rule[]) => FizzBuzz,
  addRule: (rule: Rule) => FizzBuzz,
  take: (to?: number, from?: number) => Array<string>,
  at: (n: number) => string,
  it: (to?: number, from?: number) => Generator<string, void, string>,
|}

const basicRules: Rule[] = [{ n: 3, name: 'Fizz' }, { n: 5, name: 'Buzz' }]

const defaultArgumants: Params = {
  to: 30,
  from: 1,
  rules: basicRules,
}

const normalizeParams = (arg?: Arguments): Params => {
  if (!arg) {
    return defaultArgumants
  }
  if (typeof arg === 'number') {
    return {
      from: defaultArgumants.from,
      rules: defaultArgumants.rules,
      to: arg,
    }
  }
  return {
    ...defaultArgumants,
    ...arg,
  }
}

const makeDiv = (n: number): CheckFunc => v => v % n === 0
const convertComp = (rule: Rule): RuleComp => {
  if (rule.check) {
    return rule
  }
  return {
    name: rule.name,
    check: makeDiv(rule.n),
  }
}

function fizzbuzz(arg?: Arguments): FizzBuzz {
  const params = normalizeParams(arg)
  const compRules = params.rules.map(convertComp)
  const calc = (n: number): string => {
    const hitRules = compRules.filter(r => r.check(n))
    if (hitRules.length === 0) {
      return `${n}`
    }
    return hitRules.map(v => v.name).join('')
  }

  const genIt = (
    to: number = params.to,
    from: number = params.from
  ): Generator<string, void, string> =>
    (function*() {
      for (let i = from; i <= to; i++) {
        yield calc(i)
      }
    })()

  return {
    from: from => fizzbuzz({ ...params, from }),
    to: to => fizzbuzz({ ...params, to }),
    rules: rules => fizzbuzz({ ...params, rules }),
    addRule: rule => fizzbuzz({ ...params, rules: [...params.rules, rule] }),
    take: (to = params.to, from = params.from) => [...genIt(to, from)],
    at: n => calc(n),
    it: genIt,
  }
}

export { basicRules }
export default fizzbuzz
